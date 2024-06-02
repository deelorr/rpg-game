import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Weapon, Armor } from '../components/Item';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [storeInventory, setStoreInventory] = useState([[
        new Item("Potion", (target) => { target.hp += 50; }, true, 10, 2),
        new Weapon("Sword", (target) => { target.hp -= 15; }, 15, 50, 1),
        new Armor("Shield", (target) => { target.hp += 20; }, 20, 50, 1)
    ]]);

    InventoryProvider.propTypes = {
        children: PropTypes.node
    };

    return (
        <InventoryContext.Provider value={{ inventory, setInventory, storeInventory, setStoreInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};

export default InventoryContext;
