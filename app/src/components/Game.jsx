class Game {
    static battle(player, enemy, log) {
        let turn = 0;
        while (player.hp > 0 && enemy.hp > 0) {
            if (turn % 2 === 0) {
                log(player.attack(enemy));
            } else {
                log(enemy.attack(player));
            }
            turn++;
        }
        if (player.hp > 0) {
            log(`${player.name} wins!`);
            log(player.gainXP(10));
        } else {
            log(`${enemy.name} wins!`);
        }
    }
}

export default Game;
