import Enemy from './Enemy';

class Matt extends Enemy {
    
    constructor(name='Matt', hp=150, dmg=10) {
        super(name, hp, dmg);
        this.weakness = 'fire';
    }

    showWeakness() {
        return `This enemy is weak to ${this.weakness}`;
    }

    talk() {
        return `Matt says: I am the best!`;
    }
}

export default Matt;