import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Item from '../classes/items/Item';
import Weapon from '../classes/items/weapons/Weapon';
import Armor from '../classes/items/armor/Armor';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {

    const [inventory, setInventory] = useState([]);
    const [storeInventory, setStoreInventory] = useState([
        new Item("Potion", (target) => {target.hp += 50}, true, 10, 2),
        new Weapon("Sword", null, 15, 50, 1),
        new Weapon("Axe", null, 20, 75, 1),
        new Armor("Shield", null, 20, 50, 1),
        new Armor("Helmet", null, 10, 25, 1)
    ]);

    const addItemToInventory = (item) => {
        setInventory((prevInventory) => [...prevInventory, item]);
    };

    const removeItemFromInventory = (itemName) => {
        setInventory((prevInventory) => prevInventory.filter(item => item.name !== itemName));
    };

    const values = {
        inventory,
        setInventory,
        storeInventory,
        setStoreInventory,
        addItemToInventory,
        removeItemFromInventory
    };

    return (
        <InventoryContext.Provider value={ values }>
            {children}
        </InventoryContext.Provider>
    );
};

InventoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default InventoryContext;
