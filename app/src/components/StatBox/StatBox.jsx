import './StatBox.css'
import { Player, Enemy } from '../Character'
import PropTypes from 'prop-types'

const StatBox = ({player, enemy}) => {
  return (
    <>
        <div className="statBox">
                    <div className='stats'>
                            <h2>Player Stats</h2>
                            <p>Name: {player.name}</p>
                            <p>HP: {player.hp}</p>
                            <p>DMG: {player.dmg}</p>
                            <p>Special: {player.special}</p>
                            <p>Level: {player.level}</p>
                        </div>
                        <div className='stats'>
                            <h2>Enemy Stats</h2>
                            <p>Name: {enemy.name}</p>
                            <p>HP: {enemy.hp}</p>
                            <p>DMG: {enemy.dmg}</p>
                        </div>
                </div>
    </>    
  )
}

StatBox.propTypes = {
    player: PropTypes.instanceOf(Player),
    enemy: PropTypes.instanceOf(Enemy)
}

export default StatBox