import NPC from './NPC';

class Porter extends NPC {
    constructor(name = 'Porter', hp = 100, dmg = 50) {
        super(name, hp, dmg);
    }

    talk() {
        return `Hello, my name is ${this.name}. Please defeat Matt!`;
    }

    giveQuest(quest, player) {
        if (player.quests.includes(quest)) {
            return `${this.name} says: You already have this quest!`;
        } else {
            player.quests.push(quest);
            return `${this.name} gives you the quest: ${quest.name}`;
        }
    }
}

export default Porter;
