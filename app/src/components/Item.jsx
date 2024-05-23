export class Item {
    constructor(name, effect, isConsumable = true) {
        this.name = name;
        this.effect = effect;
        this.isConsumable = isConsumable;
    }

    use(target) {
        this.effect(target);
    }
}

export class Weapon extends Item {
    constructor(name, effect, weaponDmg) {
        super(name, effect);
        this.weaponDmg = weaponDmg;
    }
}

export class Armor extends Item {
    constructor(name, effect, armor) {
        super(name, effect);
        this.armor = armor;
    }
}
