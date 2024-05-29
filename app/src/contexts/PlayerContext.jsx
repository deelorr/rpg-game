import { createContext, useState } from 'react';
import { Player } from '../components/Character';
import PropTypes from 'prop-types';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(new Player
        ("Ally", 150, 10, "Teleport Strike"));
    const [enemy, setEnemy] = useState(null);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });


    PlayerProvider.propTypes = {
        children: PropTypes.node
    };

    return (
        <PlayerContext.Provider value={{ player, setPlayer, enemy, setEnemy, playerPosition, setPlayerPosition }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
