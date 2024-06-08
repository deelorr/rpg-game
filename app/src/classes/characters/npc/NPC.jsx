import Character from '../Character';

class NPC extends Character {
    constructor(name = 'NPC', hp = 100, dmg = 0) {
        super(name, hp, dmg);
    }

    talk() {
        return `Hello, my name is ${this.name}. Nice to meet you!`;
    }

    giveQuest(quest) {
        this.quests.push(quest);
        return `${this.name} gives you the quest: ${quest.name}.`;
    }
}

export default NPC;