class Character {
    
    constructor(name, hp, dmg) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }

    attack(target) {
        target.takeDmg(this.dmg);
        return `${this.name} attacks ${target.name} for ${this.dmg} damage.`;
    }

    takeDmg(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            return `${this.name} takes ${amount} damage and has been defeated.`;
        } else {
            return `${this.name} takes ${amount} damage. HP is now ${this.hp}.`;
        }
    }
}

export default Character;