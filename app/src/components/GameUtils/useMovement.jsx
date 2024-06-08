import { useCallback, useEffect } from 'react';
import NPC from '../../classes/characters/npc/NPC';
import Enemy from '../../classes/characters/enemies/Enemy';
import Item from '../../classes/items/Item';
import { updateLog } from '../GameUtils/GameUtils';
import Porter from '../../classes/characters/npc/Porter';
import defeatMatt from '../../classes/quests/Act 1/defeatMatt';

const useMovement = (
    inBattle, 
    playerPosition, 
    map, 
    setPlayerPosition, 
    setInBattle, 
    setEnemy, 
    player, 
    setInventory, 
    setLog, 
    setStoreOpen, 
    storeOpen
    ) => {

    const handleItemEncounter = useCallback((item, x, y) => {
        updateLog(player.addItem(item), setLog);
        setInventory([...player.inventory]);
        map.removeItem(x, y);
    }, [player, setLog, setInventory, map]);

    const handleMove = useCallback((dx, dy) => {
        if (inBattle) {
            updateLog("You can't move during a battle!", setLog);
            return;
        }

        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (map.isValidPosition(newX, newY)) {
            setPlayerPosition({ x: newX, y: newY });
            const tileObject = map.getItem(newX, newY);
            if (tileObject) {
                if (tileObject instanceof NPC) {
                    updateLog(tileObject.talk(), setLog);
                    if (tileObject instanceof Porter) {
                        const questMessage = tileObject.giveQuest(defeatMatt, player);
                        updateLog(questMessage, setLog);
                        defeatMatt.startQuest(); }
                } else if (tileObject instanceof Item) {
                    handleItemEncounter(tileObject, newX, newY);
                } else if (tileObject === "store") {
                    updateLog("You found a store!", setLog);
                    setStoreOpen(true);
                } else if (tileObject instanceof Enemy) {
                    if (tileObject.name === 'Matt') {
                        defeatMatt.completeObjective(0);
                    }
                    setEnemy(tileObject);
                    setInBattle(true);
                    
                    // Uncomment the following else block to handle other enemies
                    // else {
                    //     handleEnemyEncounter(tileObject);
                    // }
                }
            }
        }
    }, [inBattle, player, playerPosition, map, setEnemy, setInBattle, setPlayerPosition, setStoreOpen, setLog, handleItemEncounter]);

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
    }, [inBattle, storeOpen, handleMove]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return handleMove;
};

export default useMovement;
