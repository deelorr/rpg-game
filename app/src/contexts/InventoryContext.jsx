import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);

    InventoryProvider.propTypes = {
        children: PropTypes.node
    };

    return (
        <InventoryContext.Provider value={{ inventory, setInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};

export default InventoryContext;
