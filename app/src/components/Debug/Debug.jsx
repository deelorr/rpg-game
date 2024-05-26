import PropTypes from 'prop-types'

const Debug = ({player, addGold}) => {
  return (
    <>
    <div>Debug Menu</div>
    <button onClick={() => console.log(player.inventory)}>Check Inventory</button>
    <button onClick={() => console.log(player)}>Check Player</button>
    <button onClick={addGold}>Add 100 Gold</button>
    </>
  )
}

Debug.propTypes = {
  player: PropTypes.object.isRequired,
  addGold: PropTypes.func.isRequired
}

export default Debug