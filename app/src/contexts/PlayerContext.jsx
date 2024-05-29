import { createContext, useState } from 'react';
import { Player } from '../components/Character';
import PropTypes from 'prop-types';

const PlayerContext = createContext();

// name, hp, damage, special

export const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(new Player
        ("Ally", 
        150, 
        10, 
        "Teleport Strike"
    ));

    PlayerProvider.propTypes = {
        children: PropTypes.node
    };

    return (
        <PlayerContext.Provider value={{ player, setPlayer }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
