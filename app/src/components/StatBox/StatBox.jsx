import './StatBox.css'
import { Player, Enemy } from '../Character'

const StatBox = () => {
    const player = new Player("Ally", 150, 10, "Teleport Strike");
    const enemy = new Enemy("Matt", 100, 5, "Fire");

  return (
    <>
        <div className="statBox">
                    <h1>Stats Component</h1>
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

export default StatBox