import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { Weapon, Armor } from '../../classes/Item';
import './Inventory.css';

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

const Inventory = ({ player, inventory }) => {
    const groupedInventory = useMemo(() => groupInventoryItems(inventory), [inventory]);

    const filteredInventory = groupedInventory.filter(({ item }) => !(item instanceof Weapon) && !(item instanceof Armor));

    if (!player) {
        return null;
    }

    return (
        <div className='inventory'>
            <h2>Inventory:</h2>
            {filteredInventory.length === 0 ? (
                <div className='invBox'>
                    <p>Empty</p>
                </div>
            ) : (
                <div className='invBox'>
                    {filteredInventory.map(({ item, count }, index) => (
                        <p key={index}>
                            {item.name}{count > 1 ? ` x${count}` : ''}
                        </p>
                    ))}
                </div>
            )}
            <h2>Equipped:</h2>
            <div className='equippedBox'>
                <span><p>Weapon: {player.equippedWeapon?.name || "None"}</p></span>
                <span><p>Armor: {player.equippedArmor?.name || "None"}</p></span>
            </div>
        </div>
    );
};

Inventory.propTypes = {
    player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        hp: PropTypes.number.isRequired,
        dmg: PropTypes.number.isRequired,
        level: PropTypes.number.isRequired,
        xp: PropTypes.number.isRequired,
        inventory: PropTypes.array.isRequired,
        equippedWeapon: PropTypes.shape({
            name: PropTypes.string,
        }),
        equippedArmor: PropTypes.shape({
            name: PropTypes.string,
        }),
        addItem: PropTypes.func.isRequired,
        useItem: PropTypes.func.isRequired,
        attack: PropTypes.func.isRequired,
        takeDmg: PropTypes.func.isRequired,
        levelUp: PropTypes.func.isRequired,
        completeQuest: PropTypes.func.isRequired,
        useSpecial: PropTypes.func.isRequired,
    }).isRequired,
    inventory: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        useEffect: PropTypes.func,
        isConsumable: PropTypes.bool,
        price: PropTypes.number,
        stock: PropTypes.number,
    })).isRequired,
};

export default Inventory;
