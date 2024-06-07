import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Weapon from '../../classes/items/weapons/Weapon';
import Armor from '../../classes/items/armor/Armor';
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

const Inventory = ({ player, inventory, handleAction }) => {
    const groupedInventory = useMemo(() => groupInventoryItems(inventory), [inventory]);
    const filteredInventory = groupedInventory.filter(({ item }) => !(item instanceof Weapon) && !(item instanceof Armor));

    if (!player) {
        return null;
    }

    return (
        <>
        <div className='inventory'>
            <div className='top-inv'>
                <h2>Inventory:</h2>
            {filteredInventory.length === 0 ? (
                <div className='invBox'>
                    <p>Empty</p>
                </div>
            ) : (
                <div className='invBox'>
                        <ul>
                            {filteredInventory.map(({ item, count }, index) => (
                                <li className='invList' key={index}>
                                    {item.name}{count > 1 ? ` x${count}` : ''}
                                    {item.isConsumable && (
                                        <button 
                                            className='useButton' 
                                            onClick={() => handleAction('useItem', item)}>
                                            Use
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                </div>
            )}
            </div>
            <div className='bottom-inv'>
                <h2>Equipped:</h2>
                <div className='equippedBox'>
                    <div className='equippedWeapon'>
                        <p>Weapon:</p>
                        <span className='weaponText'>{player.equippedWeapon?.name || "None"}</span>
                    </div>
                    <div className='equippedArmor'>
                        <p>Armor:</p>
                        <span className='armorText'>{player.equippedArmor?.name || "None"}</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

Inventory.propTypes = {
    player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        hp: PropTypes.number.isRequired,
        dmg: PropTypes.number.isRequired,
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
        useSpecial: PropTypes.func.isRequired,
    }).isRequired,
    inventory: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        useEffect: PropTypes.func,
        isConsumable: PropTypes.bool,
        price: PropTypes.number,
        stock: PropTypes.number,
    })).isRequired,
    handleAction: PropTypes.func.isRequired,
};

export default Inventory;
