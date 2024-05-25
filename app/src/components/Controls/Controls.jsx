import { Player, Enemy } from '../Character';
import { Item } from '../Item';
import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({handleMove, handleAction}) => {
    
  return (
    <>
        <div className='controlBox'>
        <h2>Controls</h2>
        <div className='controls'>
            <button onClick={() => handleMove(-1, 0)}>Move Left</button>
            <button onClick={() => handleMove(1, 0)}>Move Right</button>
            <button onClick={() => handleMove(0, -1)}>Move Up</button>
            <button onClick={() => handleMove(0, 1)}>Move Down</button>
        </div>
        <div className='buttons'>
            <button onClick={() => handleAction('attack')}>Attack</button>
            <button onClick={() => handleAction('special')}>Use Special</button>
            <button onClick={() => handleAction('usePotion')}>Use Potion</button>
        </div>
        </div>
    </>
  )
}

Controls.propTypes = {
    player: PropTypes.instanceOf(Player).isRequired,
    enemy: PropTypes.instanceOf(Enemy).isRequired,
    map: PropTypes.shape({
        isValidPosition: PropTypes.func.isRequired,
        getItem: PropTypes.func.isRequired,
        removeItem: PropTypes.func.isRequired,
    }).isRequired,
    playerPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    handleMove: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired,
    log: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateLog: PropTypes.func.isRequired,
    inventory: PropTypes.arrayOf(PropTypes.instanceOf(Item)).isRequired,
    setInventory: PropTypes.func.isRequired,
};

export default Controls