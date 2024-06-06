class Item {
    constructor(name, useEffect, isConsumable, price, quantity = 1) {
        this.name = name;
        this.useEffect = useEffect;  // The function to execute on use
        this.isConsumable = isConsumable;
        this.price = price;
        this.quantity = quantity;
    }

    use(target) {
        if (typeof this.useEffect === 'function') {
            this.useEffect(target);  // Ensure this is called correctly
        } else {
            throw new Error(`No effect available for ${this.name}`);
        }
    }
}

export default Item;