import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({ handleAction }) => {
  return (
    <div className='controlBox'>
      <h2>Controls</h2>
      <div className='buttons'>
        <button className='attackBtn' onClick={() => handleAction('attack')}>Attack</button>
        <button className='specialBtn' onClick={() => handleAction('special')}>Use Special</button>
      </div>
    </div>
  );
};

Controls.propTypes = {
  handleAction: PropTypes.func.isRequired,
};

export default Controls;
