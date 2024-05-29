import { useState, useEffect } from 'react';
import { Player, Enemy, NPC } from '../Character';
import { Item, Weapon, Armor } from '../Item';
import Map from '../Map';
import StatBox from '../StatBox/StatBox';
import Controls from '../Controls/Controls';
import LogBox from '../LogBox/LogBox';
import Inventory from '../Inventory/Inventory';
import Store from '../Store/Store';
import Debug from '../Debug/Debug';
import useActions  from '../GameUtils/useActions'
import useMovement from '../GameUtils/useMovement';
import Grid from '../Grid/Grid';
import './GameScreen.css';

export default function GameScreen() {
    const [player, setPlayer] = useState(new Player("Ally", 150, 10, "Teleport Strike"));
    const [enemy, setEnemy] = useState(null); // No active enemy initially
    const [log, setLog] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [map, setMap] = useState(new Map(15, 15)); // Initialize with proper dimensions
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [inBattle, setInBattle] = useState(false); // Battle state
    const [storeOpen, setStoreOpen] = useState(false); // Store state

    const storeItems = [
        new Item("Potion", (target) => { target.hp += 50; }, true, 10),
        new Weapon("Sword", (target) => { target.hp -= 15; }, 15, 50),
        new Armor("Shield", (target) => { target.hp += 20; }, 20, 50)
    ];

    const handleMove = useMovement(inBattle, playerPosition, map, setPlayerPosition, setInBattle, setEnemy, player, setInventory, setLog, setStoreOpen);
    const handleAction = useActions(player, enemy, inventory, inBattle, setInBattle, setLog, setInventory, map, setEnemy);

    const updateLog = (message) => {
        setLog(prevLog => [...prevLog, message]);
    };

    useEffect(() => {
        const potion = new Item("Potion", (target) => {
            target.hp += 50;
        }, true);

        const npc = new NPC("Porter");

        map.placeEnemy(new Enemy("Matt", 100, 5, "Fire"), randomInt(0, map.width), randomInt(0, map.height));
        map.placeItem(potion, randomInt(0, map.width), randomInt(0, map.height));
        map.placeItem(potion, randomInt(0, map.width), randomInt(0, map.height));
        map.placeItem("store", 3, 3); // Add store tile
        map.placeNPC(npc, randomInt(0, map.width), randomInt(0, map.height));

        updateLog("Game started!");
    }, [map]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (storeOpen || inBattle) return;

            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                    handleMove(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                    handleMove(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                    handleMove(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                    handleMove(1, 0);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleMove, storeOpen, inBattle]);

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const handleBuyItem = (item) => {
        if (player.gold >= item.price) {
            player.gold -= item.price;
            updateLog(`Bought ${item.name} for ${item.price} gold.`);
            player.addItem(item);
            setInventory([...player.inventory]); // Update inventory state
        } else {
            updateLog("Not enough gold.");
        }
    };

    const closeStore = () => {
        setStoreOpen(false);
        updateLog("Left the store.");
    };

    const addGold = () => {
        player.gold += 100;
        updateLog("Added 100 gold.");
    };

    return (
        <>
            <div className='gameScreen'>
                {!storeOpen && (
                    <div className='defaultDiv'>
                        <StatBox player={player} enemy={enemy} inBattle={inBattle} />
                        <Controls 
                            playerPosition={playerPosition} 
                            handleMove={handleMove} 
                            handleAction={handleAction}
                        />
                    </div>
                )}
                {storeOpen && (
                    <Store 
                        items={storeItems} 
                        buyItem={handleBuyItem} 
                        closeStore={closeStore} 
                    />
                )}
                <div>
                    <Grid map={map} playerPosition={playerPosition} />
                    <Inventory player={player} inventory={inventory} />
                </div> 
                <LogBox log={log} />
            </div>
            <Debug player={player} addGold={addGold} />
        </>
    );
}
