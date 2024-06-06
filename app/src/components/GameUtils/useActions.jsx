import { updateLog, removeEnemyFromMap } from './GameUtils';

const useActions = (player, enemy, inventory, inBattle, setInBattle, setLog, setInventory, map, setEnemy) => {
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

    const handleAction = (actionType) => {
        if (!inBattle) {
            switch (actionType) {
                case 'attack':
                    updateLog("No enemy to attack!", setLog);
                    break;
                case 'special':
                    updateLog("No enemy to use special on!", setLog);
                    break;
                case 'usePotion':
                    if (!inventory.some(item => item.name === "Potion")) {
                        updateLog("No potions in inventory.", setLog);
                    } else {
                        updateLog(player.useItem("Potion", player), setLog);
                        setInventory([...player.inventory]);
                    }
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
            case 'usePotion':
                if (!inventory.some(item => item.name === "Potion")) {
                    updateLog("No potions in inventory.", setLog);
                } else {
                    updateLog(player.useItem("Potion", player), setLog);
                    setInventory([...player.inventory]);
                }
                break;
            default:
                break;
        }
    };

    return handleAction;
};

export default useActions;
