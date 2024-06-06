import NPC from './NPC';

class Porter extends NPC {
    constructor(name, hp, dmg) {
        super(name, hp, dmg);
    }

    talk() {
        return `Hello, my name is ${this.name}. Please defeat Matt!`;
    }

    giveQuest(quest, player) {
        player.quests.push(quest);
        return `${this.name} gives you the quest: ${quest.name}`;
    }
}

export default Porter;