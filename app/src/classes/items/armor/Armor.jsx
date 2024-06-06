import Item from '../Item';

class Armor extends Item {
    constructor(name, useEffect, armor, price, quantity = 1) {
        super(name, useEffect, false, price, quantity);
        this.armor = armor;
    }
}

export default Armor;