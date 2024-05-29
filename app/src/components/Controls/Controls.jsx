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
    playerPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    handleMove: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired
};

export default Controls