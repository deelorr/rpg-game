import PropTypes from 'prop-types';
import './Debug.css';

const Debug = ({ player, playerPosition, addGold }) => {
  return (
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
  );
};

Debug.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    dmg: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    xp: PropTypes.number.isRequired,
    inventory: PropTypes.array.isRequired,
    equippedWeapon: PropTypes.shape({
      name: PropTypes.string,
    }),
    equippedArmor: PropTypes.shape({
      name: PropTypes.string,
    }),
    addItem: PropTypes.func.isRequired,
    useItem: PropTypes.func.isRequired,
    attack: PropTypes.func.isRequired,
    takeDmg: PropTypes.func.isRequired,
    levelUp: PropTypes.func.isRequired,
    completeQuest: PropTypes.func.isRequired,
    useSpecial: PropTypes.func.isRequired,
  }).isRequired,
  playerPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  addGold: PropTypes.func.isRequired,
};

export default Debug;
