import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({ handleAction }) => {
  return (
    <div className='buttons'>
      <h2>Controls</h2>
      <button onClick={() => handleAction('attack')}>Attack</button>
      <button onClick={() => handleAction('special')}>Use Special</button>
      <button onClick={() => handleAction('usePotion')}>Use Potion</button>
    </div>
  );
};

Controls.propTypes = {
  handleAction: PropTypes.func.isRequired,
};

export default Controls;
