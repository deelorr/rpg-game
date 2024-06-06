import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Item from '../classes/items/Item';
import Weapon from '../classes/items/weapons/Weapon';
import Armor from '../classes/items/armor/Armor';

const InventoryContext = createContext();

const initialInventory = [];
const initialStoreInventory = [
    new Item("Potion", (target) => { target.hp += 50; }, true, 10, 2),
    new Weapon("Sword", null, 15, 50, 1),
    new Armor("Shield", null, 20, 50, 1),
];

const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState(initialInventory);
    const [storeInventory, setStoreInventory] = useState(initialStoreInventory);

    const addItemToInventory = (item) => {
        setInventory((prevInventory) => [...prevInventory, item]);
    };

    const removeItemFromInventory = (itemName) => {
        setInventory((prevInventory) => prevInventory.filter(item => item.name !== itemName));
    };

    return (
        <InventoryContext.Provider value={{ inventory, setInventory, storeInventory, setStoreInventory, addItemToInventory, removeItemFromInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};

InventoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { InventoryProvider };
export default InventoryContext;
