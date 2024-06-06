import Character from '../Character';

class NPC extends Character {
    constructor(name, hp, dmg) {
        super(name, hp, dmg);
    }

    talk() {
        return `Hello, my name is ${this.name}. Please defeat Matt the asshole!`;
    }

    giveQuest(quest) {
        this.quests.push(quest);
        return `${this.name} gives you the quest: ${quest.name}.`;
    }
}

export default NPC;