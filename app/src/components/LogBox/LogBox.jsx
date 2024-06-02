import PropTypes from 'prop-types';
import './LogBox.css';

const LogBox = ({ log }) => {
  return (
    <div className='logContainer'>
      <div className='innerLogContainer'>
        <div className='logContent'>
          {log.map((entry, index) => (
            <p key={index}>{entry}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

LogBox.propTypes = {
  log: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LogBox;
