import { Player, Enemy } from '../Character';
import { useState, useEffect } from 'react';
import { Item, Weapon, Armor } from '../Item';
import Map from '../Map'; // Map class
import './GameScreen.css';
import StatBox from '../StatBox/StatBox';
import Controls from '../Controls/Controls';
import LogBox from '../LogBox/LogBox';
import Inventory from '../Inventory/Inventory';
import MapComponent from '../MapComponent/MapComponent';
import Debug from '../Debug/Debug';

export default function GameScreen() {
    const [player, setPlayer] = useState(new Player("Ally", 150, 10, "Teleport Strike"));
    const [enemy, setEnemy] = useState(null); // No active enemy initially
    const [log, setLog] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [map, setMap] = useState(new Map(15, 15)); // Initialize with proper dimensions
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [inBattle, setInBattle] = useState(false); // Battle state

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
        if (inBattle) {
            updateLog("You can't move during a battle!");
            return;
        }

        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
        if (map.isValidPosition(newX, newY)) {
            setPlayerPosition({ x: newX, y: newY });
            const itemOrEnemy = map.getItem(newX, newY);
            if (itemOrEnemy) {
                if (itemOrEnemy instanceof Item) {
                    updateLog(player.addItem(itemOrEnemy));
                    setInventory([...player.inventory]); // Ensure state update with new array
                    map.removeItem(newX, newY);
                } else if (itemOrEnemy instanceof Enemy) {
                    updateLog("You encountered an enemy!");
                    setEnemy(itemOrEnemy);
                    setInBattle(true); // Start battle
                }
            }
        }
    };

    const handleAction = (actionType) => {
        if (!inBattle) {
            updateLog("No enemy to fight!");
            return;
        }

        switch (actionType) {
            case 'attack':
                updateLog(player.attack(enemy));
                if (enemy.hp <= 0) {
                    updateLog(player.completeQuest("Defeat Matt"));
                    setInBattle(false); // End battle
                    removeEnemyFromMap(enemy); // Remove enemy from map
                    setEnemy(null);
                } else {
                    updateLog(enemy.attack(player));
                    if (player.hp <= 0) {
                        updateLog("You have been defeated!");
                        setInBattle(false); // End battle
                        // Handle player defeat (e.g., reset game or respawn)
                    }
                }
                break;
            case 'special':
                updateLog(player.useSpecial(enemy));
                if (enemy.hp <= 0) {
                    updateLog(player.completeQuest("Defeat Matt"));
                    setInBattle(false); // End battle
                    removeEnemyFromMap(enemy); // Remove enemy from map
                    setEnemy(null);
                } else {
                    updateLog(enemy.attack(player));
                    if (player.hp <= 0) {
                        updateLog("You have been defeated!");
                        setInBattle(false); // End battle
                        // Handle player defeat (e.g., reset game or respawn)
                    }
                }
                break;
            case 'usePotion':
                if (!inventory.some(item => item.name === "Potion")) {
                    updateLog("No potions in inventory.");
                } else {
                    updateLog(player.useItem("Potion", player));
                    setInventory([...player.inventory]); // Ensure state update with new array
                }
                break;
            default:
                break;
        }
    };

    const removeEnemyFromMap = (enemy) => {
        const enemyPosition = map.findItemPosition(enemy);
        if (enemyPosition) {
            map.removeItem(enemyPosition.x, enemyPosition.y);
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
            <div className='gameScreen'>
                <div className='defaultDiv'>
                    <StatBox player={player} enemy={enemy} inBattle={inBattle} />
                    <Controls 
                        playerPosition={playerPosition} 
                        handleMove={handleMove} 
                        handleAction={handleAction}
                    />
                </div>
                <div>
                    <MapComponent renderGrid={renderGrid} playerPosition={playerPosition} />
                    <Inventory player={player} inventory={inventory} />
                </div> 
                <LogBox log={log} />
            </div>
            <Debug player={player} inventory={inventory} />
        </>
    );
}
