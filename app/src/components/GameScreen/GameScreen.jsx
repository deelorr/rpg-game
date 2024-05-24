import { Player, Enemy } from '../Character';
import { useState, useEffect } from 'react';
import { Item, Weapon, Armor } from '../Item';
import  Map  from '../Map';
import './GameScreen.css';
import StatBox from '../StatBox/StatBox';

export default function GameScreen() {
    const [player, setPlayer] = useState(new Player("Ally", 150, 10, "Teleport Strike"));
    const [enemy, setEnemy] = useState(new Enemy("Matt", 100, 5, "Fire"));
    const [log, setLog] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [map, setMap] = useState(new Map(5, 5)); // Initialize with proper dimensions
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

    const updateLog = (message) => {
        setLog(prevLog => [...prevLog, message]);
    };

    useEffect(() => {
        const sword = new Weapon("Sword", (target) => {
            target.hp -= 10;
        }, 10);

        const shield = new Armor("Shield", (target) => {
            target.hp += 50;
        }, 50);

        const potion = new Item("Potion", (target) => {
            target.hp += 50;
        }, true);

        map.placeItem(sword, 1, 1);
        map.placeItem(shield, 1, 2);
        map.placeEnemy(new Enemy("Matt", 100, 5, "Fire"), 4, 4);
        map.placeItem(potion, 2, 2);
        map.placeItem(potion, 4, 2);

        updateLog("Game started!");
    }, [map]);

    const handleMove = (dx, dy) => {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
        if (map.isValidPosition(newX, newY)) {
            setPlayerPosition({ x: newX, y: newY });
            const itemOrEnemy = map.getItem(newX, newY);
            if (itemOrEnemy) {
                if (itemOrEnemy instanceof Item) {
                    updateLog(player.addItem(itemOrEnemy));
                    setInventory([...inventory, itemOrEnemy]);
                    map.removeItem(newX, newY);
                } else if (itemOrEnemy instanceof Enemy) {
                    updateLog("You encountered an enemy!");
                }
            }
        }
    };

    const handleAction = (actionType) => {
        switch (actionType) {
            case 'attack':
                updateLog(player.attack(enemy));
                if (enemy.hp > 0) {
                    updateLog(enemy.attack(player));
                } else {
                    updateLog(player.completeQuest("Defeat Matt"));
                }
                break;
            case 'special':
                updateLog(player.useSpecial(enemy));
                if (enemy.hp > 0) {
                    updateLog(enemy.attack(player));
                } else {
                    updateLog(player.completeQuest("Defeat Matt"));
                }
                break;
            case 'usePotion':
                if (!inventory.some(item => item.name === "Potion")) {
                    updateLog("No potions in inventory.");
                } else {
                    player.useItem("Potion", player);
                    updateLog("You used a potion!");
                    setInventory(inventory.filter(item => item.name !== "Potion"));
                }
                break;
            default:
                break;
        }
    };

    const renderGrid = () => {
        const rows = [];
        for (let y = 0; y < map.height; y++) {
            const cells = [];
            for (let x = 0; x < map.width; x++) {
                if (x === playerPosition.x && y === playerPosition.y) {
                    cells.push(<td key={`${x},${y}`} className="player">P</td>);
                } else if (map.grid[y][x] instanceof Weapon) {
                    cells.push(<td key={`${x},${y}`} className="weapon">W</td>);
                } else if (map.grid[y][x] instanceof Armor) {
                    cells.push(<td key={`${x},${y}`} className="armor">A</td>);
                } else if (map.grid[y][x] instanceof Item) {
                    cells.push(<td key={`${x},${y}`} className="item">I</td>);
                } else if (map.grid[y][x] instanceof Enemy) {
                    cells.push(<td key={`${x},${y}`} className="enemy">E</td>);
                } else {
                    cells.push(<td key={`${x},${y}`} className="plainTile"></td>);
                }
            }
            rows.push(<tr key={y}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <>
            <div>
                <div className='gameBox'>
                    <div className='statScreen'>
                    <StatBox player={player} enemy={enemy} />
                        <div className='stats'>
                            <h2>Player Stats</h2>
                            <p>Name: {player.name}</p>
                            <p>HP: {player.hp}</p>
                            <p>DMG: {player.dmg}</p>
                            <p>Special: {player.special}</p>
                            <p>Level: {player.level}</p>
                        </div>
                        <div className='stats'>
                            <h2>Enemy Stats</h2>
                            <p>Name: {enemy.name}</p>
                            <p>HP: {enemy.hp}</p>
                            <p>DMG: {enemy.dmg}</p>
                        </div>
                        <div className='buttons'>
                            <button onClick={() => handleAction('attack')}>Attack</button>
                            <button onClick={() => handleAction('special')}>Use Special</button>
                            <button onClick={() => handleAction('usePotion')}>Use Potion</button>
                        </div>
                        <div className='logScreen'>
                            <div className='logBox'>
                                <div className='logContent'>
                                    {log.map((entry, index) => <p key={index}>{entry}</p>)}
                                </div>
                            </div>
                        </div>
                        <div className='inventoryBox'>
                            <div className='inventory'>
                                <h2>Inventory:</h2>
                                {inventory.map((item, index) => <p key={index}>{item.name}</p>)}
                            </div>
                            <div className='equippedBox'>
                                <p>Equipped Weapon: {player.equippedWeapon?.name || "None"}</p>
                                <p>Equipped Armor: {player.equippedArmor?.name || "None"}</p>
                            </div>
                        </div>
                        <div className='mapBox'>
                            <h2>Map</h2>
                            <table>
                                <tbody>
                                    {renderGrid()}
                                </tbody>
                            </table>
                            <div className='controls'>
                                <h2>Controls</h2>
                                <button onClick={() => handleMove(-1, 0)}>Move Left</button>
                                <button onClick={() => handleMove(1, 0)}>Move Right</button>
                                <button onClick={() => handleMove(0, -1)}>Move Up</button>
                                <button onClick={() => handleMove(0, 1)}>Move Down</button>
                                <p>Player position: {playerPosition.x}, {playerPosition.y}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
