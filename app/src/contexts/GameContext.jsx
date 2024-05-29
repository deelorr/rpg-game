import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Map from '../components/Map';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [map, setMap] = useState(new Map(15, 15));
    const [log, setLog] = useState([]);
    const [inBattle, setInBattle] = useState(false);
    const [storeOpen, setStoreOpen] = useState(false);
    const [enemy, setEnemy] = useState(null); // Add enemy state

    GameProvider.propTypes = {
        children: PropTypes.node
    };

    return (
        <GameContext.Provider value={{ map, setMap, log, setLog, inBattle, setInBattle, storeOpen, setStoreOpen, enemy, setEnemy }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
