import { updateLog, removeEnemyFromMap } from '../GameUtils/GameUtils';
import Weapon from '../../classes/items/weapons/Weapon';
import Armor from '../../classes/items/armor/Armor';

const useActions = (
    player, 
    enemy, 
    inBattle, 
    setInBattle, 
    setLog, 
    setInventory, 
    map, 
    setEnemy
    ) => {
        
    const handleBattleAction = (action) => {
        updateLog(action, setLog);
        if (enemy.hp <= 0) {
            setInBattle(false);
            removeEnemyFromMap(enemy, map);
            setEnemy(null);
        } else {
            updateLog(enemy.attack(player), setLog);
            if (player.hp <= 0) {
                updateLog("You have been defeated!", setLog);
                setInBattle(false);
            }
        }
    };

    const handleItemAction = (item) => {
        if (item.isConsumable) {
            updateLog(player.useItem(item.name, player), setLog);
            setInventory([...player.inventory]);
        } else if (item instanceof Weapon) {
            updateLog(`Equipping weapon: ${item.name}`, setLog);
            player.equipWeapon(item);
        } else if (item instanceof Armor) {
            updateLog(`Equipping armor: ${item.name}`, setLog);
            player.equipArmor(item);
        }
    };

    const handleAction = (actionType, item) => {
        if (!inBattle) {
            switch (actionType) {
                case 'attack':
                    updateLog("No enemy to attack!", setLog);
                    break;
                case 'special':
                    updateLog("No enemy to use special on!", setLog);
                    break;
                case 'useItem':
                    handleItemAction(item);
                    break;
                default:
                    break;
            }
            return;
        }

        switch (actionType) {
            case 'attack':
                handleBattleAction(player.attack(enemy));
                break;
            case 'special':
                handleBattleAction(player.useSpecial(enemy));
                break;
            case 'useItem':
                handleItemAction(item);
                break;
            default:
                break;
        }
    };

    return handleAction;
};

export default useActions;
