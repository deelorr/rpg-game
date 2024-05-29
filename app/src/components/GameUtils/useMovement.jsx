import { useCallback } from 'react';
import { Enemy, NPC } from '../Character'
import { Item } from '../Item';
import { updateLog } from '../GameUtils/GameUtils';

const useMovement = (inBattle, playerPosition, map, setPlayerPosition, setInBattle, setEnemy, player, setInventory, setLog, setStoreOpen) => {
    const handleMove = useCallback((dx, dy) => {
        if (inBattle) {
            updateLog("You can't move during a battle!", setLog);
            return;
        }

        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
        if (map.isValidPosition(newX, newY)) {
            setPlayerPosition({ x: newX, y: newY });
            const itemOrEnemy = map.getItem(newX, newY);
            if (itemOrEnemy) {
                if (itemOrEnemy instanceof Item) {
                    updateLog(player.addItem(itemOrEnemy), setLog);
                    setInventory([...player.inventory]);
                    map.removeItem(newX, newY);
                } else if (itemOrEnemy instanceof Enemy) {
                    updateLog("You encountered an enemy!", setLog);
                    setEnemy(itemOrEnemy);
                    setInBattle(true);
                } else if (itemOrEnemy === "store") {
                    updateLog("You found a store!", setLog);
                    setStoreOpen(true);
                } else if (itemOrEnemy instanceof NPC) {
                    updateLog(`Hello! My name is ${itemOrEnemy.name}.`, setLog);
                }
            }
        }
    }, [inBattle, map, player, playerPosition, setInventory, setInBattle, setEnemy, setPlayerPosition, setStoreOpen, setLog]);

    return handleMove;
};

export default useMovement;
