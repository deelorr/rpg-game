import PropTypes from 'prop-types'

const Debug = ({player}) => {
  return (
    <>
    <div>Debug Menu</div>
    <button onClick={() => console.log(player.inventory)}>Check Inventory</button>
    </>
  )
}

Debug.propTypes = {
  player: PropTypes.object.isRequired
}

export default Debug