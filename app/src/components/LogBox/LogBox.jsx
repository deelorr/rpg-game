import PropTypes from 'prop-types'
import './LogBox.css'

const LogBox = ({log}) => {
  return (
    <>
      <div className='logScreen'>
        <div className='logBox'>
          <div className='logContent'>
            {log.map((entry, index) => <p key={index}>{entry}</p>)}
          </div>
        </div>
      </div>
    </>
  )
}

LogBox.propTypes = {
  log: PropTypes.array.isRequired
}

export default LogBox