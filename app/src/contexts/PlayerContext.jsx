import { createContext, useState } from 'react';
import { Player } from '../classes/Character';
import PropTypes from 'prop-types';

const PlayerContext = createContext();

const initialPlayer = new Player("Ally", 150, 10, "Teleport Strike");
const initialPlayerPosition = { x: 0, y: 0 };

const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(initialPlayer);
    const [enemy, setEnemy] = useState(null);
    const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);

    const updatePlayerPosition = (newPosition) => {
        setPlayerPosition(newPosition);
    };

    return (
        <PlayerContext.Provider value={{ player, setPlayer, enemy, setEnemy, playerPosition, setPlayerPosition, updatePlayerPosition }}>
            {children}
        </PlayerContext.Provider>
    );
};

PlayerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PlayerProvider };
export default PlayerContext;
