import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Map from '../classes/Map';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    
    const [map, setMap] = useState(new Map(6, 6));
    const [log, setLog] = useState([]);
    const [inBattle, setInBattle] = useState(false);
    const [storeOpen, setStoreOpen] = useState(false);

    const values = {
        map,
        setMap,
        log,
        setLog,
        inBattle,
        setInBattle,
        storeOpen,
        setStoreOpen
    };

    return (
        <GameContext.Provider value={values}>
            {children}
        </GameContext.Provider>
    );
};

GameProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GameContext;
