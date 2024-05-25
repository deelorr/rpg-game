import PropTypes from 'prop-types'
import './Inventory.css'

const Inventory = ({player, inventory}) => {
  return (
    <>
        <div className='inventoryBox'>
            <div className='inventory'>
                <h2>Inventory:</h2>
                {inventory.map((item, index) => <p key={index}>{item.name}</p>)}
            </div>
            <div className='equippedBox'>
                <h2>Equipped:</h2>
                <p>Weapon: {player.equippedWeapon?.name || "None"}</p>
                <p>Armor: {player.equippedArmor?.name || "None"}</p>
            </div>
        </div>
    </>
  )
}

Inventory.propTypes = {
  player: PropTypes.object.isRequired,
  inventory: PropTypes.array.isRequired
}

export default Inventory