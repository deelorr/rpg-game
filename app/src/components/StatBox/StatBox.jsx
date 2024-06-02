import './StatBox.css'
import { Player, Enemy } from '../Character'
import PropTypes from 'prop-types'

const StatBox = ({ player, enemy, inBattle }) => {
  return (
    <>
      <div className='stats'>
        <h2>Stats</h2>
          <span><h3>HP:</h3><p>{player.hp}</p></span>
          <span><h3>Damage:</h3><p>{player.dmg}</p></span>
          <span><h3>Special:</h3><p>{player.special}</p></span>
          <span><h3>Gold:</h3><p>{player.gold}</p></span>
        </div>
        {inBattle && enemy && (
        <div className='enemyStats'>
          <h2>Enemy Stats</h2>
            <span><h3>Name:</h3><p>{enemy.name}</p></span>
            <span><h3>HP:</h3><p>{enemy.hp}</p></span>
            <span><h3>Damage:</h3><p>{enemy.dmg}</p></span>
            <span><h3>Weakness:</h3><p>{enemy.weakness}</p></span>
        </div>
        )}
    </>
  );
};

StatBox.propTypes = {
    player: PropTypes.instanceOf(Player).isRequired,
    enemy: PropTypes.instanceOf(Enemy),
    inBattle: PropTypes.bool.isRequired
}

export default StatBox