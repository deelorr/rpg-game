import Item from '../Item'

class Weapon extends Item {
    constructor(name, useEffect, weaponDmg, price, quantity = 1) {
        super(name, useEffect, false, price, quantity);
        this.weaponDmg = weaponDmg;
    }
}

export default Weapon;