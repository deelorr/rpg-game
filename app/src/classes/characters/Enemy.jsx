import Character from './Character';

class Enemy extends Character {
    
    constructor(name, hp, dmg, weakness) {
        super(name, hp, dmg);
        this.weakness = weakness;
    }

    showWeakness() {
        return `This enemy is weak to ${this.weakness}`;
    }
}

export default Enemy;