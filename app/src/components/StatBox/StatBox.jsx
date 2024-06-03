import './StatBox.css';
import { Player, Enemy } from '../../classes/Character';
import PropTypes from 'prop-types';

const StatBox = ({ player, enemy, inBattle }) => {
  return (
    <>
      <div className='stats'>
        <h2>Stats</h2>
        <div className='stat-item'>
          <h3>HP:</h3><p>{player.hp}</p>
        </div>
        <div className='stat-item'>
          <h3>Damage:</h3><p>{player.dmg}</p>
        </div>
        <div className='stat-item'>
          <h3>Special:</h3><p>{player.special}</p>
        </div>
        <div className='stat-item'>
          <h3>Gold:</h3><p>{player.gold}</p>
        </div>
      </div>
      {inBattle && enemy && (
        <div className='enemyStats'>
          <h2>Enemy Stats</h2>
          <div className='stat-item'>
            <h3>Name:</h3><p>{enemy.name}</p>
          </div>
          <div className='stat-item'>
            <h3>HP:</h3><p>{enemy.hp}</p>
          </div>
          <div className='stat-item'>
            <h3>Damage:</h3><p>{enemy.dmg}</p>
          </div>
          <div className='stat-item'>
            <h3>Weakness:</h3><p>{enemy.weakness}</p>
          </div>
        </div>
      )}
    </>
  );
};

StatBox.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
  enemy: PropTypes.instanceOf(Enemy),
  inBattle: PropTypes.bool.isRequired
};

export default StatBox;
