import Character from './Character';

class NPC extends Character {
    constructor(name, hp, dmg) {
        super(name, hp, dmg);
    }

    talk() {
        return `Hello, my name is ${this.name}.`;
    }
}

export default NPC;