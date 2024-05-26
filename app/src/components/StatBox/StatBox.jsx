import './StatBox.css'
import { Player, Enemy } from '../Character'
import PropTypes from 'prop-types'

const StatBox = ({ player, enemy, inBattle }) => {
  return (
      <div className="statBox">
        <div className='stats'>
        <h2>Player Stats</h2>
          <p>Name: {player.name}</p>
          <p>HP: {player.hp}</p>
          <p>Damage: {player.dmg}</p>
          <p>Special: {player.special}</p>
          <p>Gold: {player.gold}</p>
        </div>
          {inBattle && enemy && (
            <div className='enemyStats'>
                <h2>Enemy Stats</h2>
                <p>Name: {enemy.name}</p>
                <p>HP: {enemy.hp}</p>
                <p>Damage: {enemy.dmg}</p>
                <p>Weakness: {enemy.weakness}</p>
            </div>
          )}
      </div>
  );
};

StatBox.propTypes = {
    player: PropTypes.instanceOf(Player).isRequired,
    enemy: PropTypes.instanceOf(Enemy),
    inBattle: PropTypes.bool.isRequired
}

export default StatBox