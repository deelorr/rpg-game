import PropTypes from 'prop-types'
import './Debug.css'

const Debug = ({player, playerPosition, addGold}) => {
  return (
    <>
    <div className='debug'>
      <span className='debug-title'><h5>DEBUG MENU</h5></span>
      <div className='debug-buttons'>
        <button onClick={() => console.log(player.inventory)}>Check Inventory</button>
        <button onClick={() => console.log(player)}>Check Player</button>
        <button onClick={addGold}>Add 100 Gold</button>
      </div>
      <div className='debug-stats'>
        <h5>Player Position: X:{playerPosition.x}, Y:{playerPosition.y}</h5>
      </div>
    </div>
    </>
  )
}

Debug.propTypes = {
  player: PropTypes.object.isRequired,
  playerPosition: PropTypes.object.isRequired,
  addGold: PropTypes.func.isRequired
}

export default Debug