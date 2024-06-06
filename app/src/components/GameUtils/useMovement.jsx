import { useCallback, useEffect } from 'react';
import Enemy from '../../classes/characters/Enemy';
import NPC from '../../classes/characters/NPC';
import Item from '../../classes/items/Item';
import { updateLog } from '../GameUtils/GameUtils';

const useMovement = (inBattle, playerPosition, map, setPlayerPosition, setInBattle, setEnemy, player, setInventory, setLog, setStoreOpen, storeOpen) => {
    const handleItemEncounter = (item, x, y) => {
        updateLog(player.addItem(item), setLog);
        setInventory([...player.inventory]);
        map.removeItem(x, y);
    };

    const handleEnemyEncounter = (enemy) => {
        updateLog("You encountered an enemy!", setLog);
        setEnemy(enemy);
        setInBattle(true);
    };

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
                    handleItemEncounter(itemOrEnemy, newX, newY);
                } else if (itemOrEnemy instanceof Enemy) {
                    handleEnemyEncounter(itemOrEnemy);
                } else if (itemOrEnemy === "store") {
                    updateLog("You found a store!", setLog);
                    setStoreOpen(true);
                } else if (itemOrEnemy instanceof NPC) {
                    updateLog(`Hello! My name is ${itemOrEnemy.name}.`, setLog);
                }
            }
        }
    }, [inBattle, playerPosition, map, player, setInventory, setInBattle, setEnemy, setPlayerPosition, setStoreOpen, setLog]);

    const handleKeyDown = useCallback((event) => {
        if (inBattle || storeOpen) return;

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
    }, [handleMove, inBattle, storeOpen]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return handleMove;
};

export default useMovement;
