class Item {
    constructor(name, effect, isConsumable = true) {
        this.name = name;
        this.effect = effect;
        this.isConsumable = isConsumable;
    }

    use(target) {
        this.effect(target);
    }
}

export default Item;
