import { useContext, useEffect, useCallback } from 'react';
import { Enemy, NPC } from '../../classes/Character';
import { Item } from '../../classes/Item';
import PlayerContext from '../../contexts/PlayerContext';
import InventoryContext from '../../contexts/InventoryContext';
import GameContext from '../../contexts/GameContext';
import StatBox from '../StatBox/StatBox';
import Controls from '../Controls/Controls';
import LogBox from '../LogBox/LogBox';
import Inventory from '../Inventory/Inventory';
import Store from '../Store/Store';
import Debug from '../Debug/Debug';
import useActions from '../GameUtils/useActions';
import useMovement from '../GameUtils/useMovement';
import Grid from '../Grid/Grid';
import './GameScreen.css';

export default function GameScreen() {
    const { player, enemy, setEnemy, playerPosition, setPlayerPosition } = useContext(PlayerContext);
    const { inventory, setInventory, storeInventory, setStoreInventory } = useContext(InventoryContext);
    const { map, log, setLog, inBattle, setInBattle, storeOpen, setStoreOpen } = useContext(GameContext);

    const storeItems = storeInventory;

    const handleMove = useMovement(inBattle, playerPosition, map, setPlayerPosition, setInBattle, setEnemy, player, setInventory, setLog, setStoreOpen);
    const handleAction = useActions(player, enemy, inventory, inBattle, setInBattle, setLog, setInventory, map, setEnemy);

    const updateLog = useCallback((message) => {
        setLog((prevLog) => [...prevLog, message]);
    }, [setLog]);

    useEffect(() => {
        const initializeGame = () => {
            const potion = new Item("Potion", (target) => {
                target.hp += 50;
            }, true, 10, 1);
            const npc = new NPC("Porter");

            map.placeEnemy(new Enemy("Matt", 100, 5, "Fire"), randomInt(0, map.width), randomInt(0, map.height));
            map.placeItem(potion, randomInt(0, map.width), randomInt(0, map.height));
            map.placeItem(potion, randomInt(0, map.width), randomInt(0, map.height));
            map.placeItem("store", 3, 3);
            map.placeNPC(npc, randomInt(0, map.width), randomInt(0, map.height));

            updateLog("Game started!");
        };

        initializeGame();
    }, [map, updateLog]);

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

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

    const handleBuyItem = (item) => {
        if (player.gold >= item.price) {
            player.gold -= item.price;
            updateLog(`Bought ${item.name} for ${item.price} gold.`);
            player.addItem(item);
            setInventory([...player.inventory]);
            
            setStoreInventory((prevStoreInventory) => {
                const itemIndex = prevStoreInventory.findIndex((storeItem) => storeItem.name === item.name);
                if (itemIndex !== -1) { // logic for updating quantity of item in store
                    const updatedStoreInventory = [...prevStoreInventory];
                    if (updatedStoreInventory[itemIndex].quantity > 1) {
                        updatedStoreInventory[itemIndex].quantity -= 1;
                    } else {
                        updatedStoreInventory.splice(itemIndex, 1);
                    }
                    return updatedStoreInventory;
                }
                return prevStoreInventory;
            });
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
                    <div className='firstDiv'>
                        <StatBox player={player} enemy={enemy} inBattle={inBattle} />
                        <Controls playerPosition={playerPosition} handleMove={handleMove} handleAction={handleAction} />
                        <Inventory player={player} inventory={inventory} />
                    </div>
                )}
                {storeOpen && (
                    <div className='firstDiv'>
                        <StatBox player={player} enemy={enemy} inBattle={inBattle} />
                        <Store storeItems={storeItems} handleBuyItem={handleBuyItem} closeStore={closeStore} />
                        <Inventory player={player} inventory={inventory} />
                    </div>
                )}
                <div className='middleDiv'>
                    <Grid map={map} playerPosition={playerPosition} />
                </div>
                <div className='thirdDiv'>
                    <LogBox log={log} />
                </div>
            </div>
            <Debug player={player} playerPosition={playerPosition} addGold={addGold} />
        </>
    );
}
