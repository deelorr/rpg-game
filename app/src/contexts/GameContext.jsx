import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Map from '../classes/Map';
import { Item, Weapon, Armor } from '../classes/Item';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [map, setMap] = useState(new Map(15, 15));
    const [log, setLog] = useState([]);
    const [inBattle, setInBattle] = useState(false);
    const [storeOpen, setStoreOpen] = useState(false);
    const [enemy, setEnemy] = useState(null);

    // Ensure storeInventory items have a quantity property
    const [storeInventory, setStoreInventory] = useState([
        new Item("Potion", (target) => { target.hp += 50; }, true, 10, 2),
        new Weapon("Sword", null, 15, 50, 1),
        new Armor("Shield", null, 20, 50, 1)
    ]);

    GameProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    return (
        <GameContext.Provider value={{ map, setMap, log, setLog, inBattle, setInBattle, storeOpen, setStoreOpen, enemy, setEnemy, storeInventory, setStoreInventory }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
