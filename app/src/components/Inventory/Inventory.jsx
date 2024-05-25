import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Weapon, Armor } from '../Item';

import './Inventory.css';

const Inventory = ({ player, inventory }) => {
    const [groupedInventory, setGroupedInventory] = useState([]);

    useEffect(() => {
        setGroupedInventory(groupInventoryItems(inventory));
    }, [inventory]);

    const groupInventoryItems = (inventory) => {
        const itemMap = inventory.reduce((acc, item) => {
            if (acc[item.name]) {
                acc[item.name].count += 1;
            } else {
                acc[item.name] = { item, count: 1 };
            }
            return acc;
        }, {});
        return Object.values(itemMap);
    };

    const filteredInventory = groupedInventory.filter(({ item }) => !(item instanceof Weapon) && !(item instanceof Armor));

    if (!player) {
        return null;
    }

    return (
        <div className='inventoryBox'>
            <div className='inventory'>
                <h2>Inventory:</h2>
                {filteredInventory.map(({ item, count }, index) => (
                    <p key={index}>
                        {item.name}{count > 1 ? ` x${count}` : ''}
                    </p>
                ))}
            </div>
            <div className='equippedBox'>
                <h2>Equipped:</h2>
                <p>Weapon: {player.equippedWeapon?.name || "None"}</p>
                <p>Armor: {player.equippedArmor?.name || "None"}</p>
            </div>
        </div>
    );
};

Inventory.propTypes = {
    player: PropTypes.object.isRequired,
    inventory: PropTypes.array.isRequired,
};

export default Inventory;
