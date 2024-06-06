import { useContext, useEffect } from 'react';
import Enemy from '../../classes/characters/Enemy';
import NPC from '../../classes/characters/NPC';
import Item from '../../classes/items/Item';
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
import { randomInt, handleBuyItem, closeStore, addGold, updateLog } from '../GameUtils/GameUtils';
import './GameScreen.css';

export default function GameScreen() {
    const { player, enemy, setEnemy, playerPosition, setPlayerPosition } = useContext(PlayerContext);
    const { inventory, setInventory, storeInventory, setStoreInventory } = useContext(InventoryContext);
    const { map, log, setLog, inBattle, setInBattle, storeOpen, setStoreOpen } = useContext(GameContext);

    const storeItems = storeInventory;

    const handleMove = useMovement(inBattle, playerPosition, map, setPlayerPosition, setInBattle, setEnemy, player, setInventory, setLog, setStoreOpen);
    const handleAction = useActions(player, enemy, inventory, inBattle, setInBattle, setLog, setInventory, map, setEnemy);

    useEffect(() => {
        const initializeGame = () => {
            const potion = new Item("Potion", (target) => {
                target.hp += 50;
            }, true, 10, 1);
            const npc = new NPC("Porter");

            map.placeObject(new Enemy("Matt", 100, 5, "Fire"), randomInt(0, map.width), randomInt(0, map.height));
            map.placeObject(potion, randomInt(0, map.width), randomInt(0, map.height));
            map.placeObject(potion, randomInt(0, map.width), randomInt(0, map.height));
            map.placeObject("store", 3, 3);
            map.placeObject(npc, randomInt(0, map.width), randomInt(0, map.height));
            updateLog("Game started!", setLog);
        };

        initializeGame();
    }, [map, setLog]);

    return (
        <>
            <div className='gameScreen'>
                {!storeOpen && (
                    <div className='firstDiv'>
                        <StatBox player={player} enemy={enemy} inBattle={inBattle} />
                        <Controls playerPosition={playerPosition} handleMove={handleMove} handleAction={handleAction} />
                        <Inventory player={player} inventory={inventory} handleAction={handleAction} />
                    </div>
                )}
                {storeOpen && (
                    <div className='firstDiv'>
                        <StatBox 
                            player={player} 
                            enemy={enemy} 
                            inBattle={inBattle} 
                        />
                        <Store 
                            storeItems={storeItems} 
                            handleBuyItem={(item) => handleBuyItem(item, player, updateLog, setInventory, setStoreInventory, setLog)} 
                            closeStore={() => closeStore(setStoreOpen, updateLog, setLog)} 
                        /> 
                        <Inventory 
                            player={player} 
                            inventory={inventory} 
                            handleAction={handleAction}
                        />
                    </div>
                )}
                <div className='middleDiv'>
                    <Grid 
                        map={map} 
                        playerPosition={playerPosition} 
                    />
                    <Debug 
                        player={player} 
                        playerPosition={playerPosition} 
                        addGold={() => addGold(player, updateLog, setLog)} 
                    />
                </div>
                <div className='thirdDiv'>
                    <LogBox log={log} />
                </div>
            </div>
        </>
    );
}
