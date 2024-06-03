// GameUtils.js

export const updateLog = (message, setLog) => {
    setLog(prevLog => [...prevLog, message]);
};

export const removeEnemyFromMap = (enemy, map) => {
    const enemyPosition = map.findItemPosition(enemy);
    if (enemyPosition) {
        map.removeItem(enemyPosition.x, enemyPosition.y);
    }
};
