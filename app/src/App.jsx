import { useState } from 'react';
import { Player, Enemy, Equipment } from './components/Character.jsx';
import Item from './components/Item.jsx';
import Game from './components/Game.jsx';
import './App.css';

const App = () => {
    const [player, setPlayer] = useState(new Player("Ally", 150, 10, "Teleport Strike"));
    const [enemy, setEnemy] = useState(new Enemy("Matt", 100, 5, "Fire"));
    const [log, setLog] = useState([]);

    const updateLog = (message) => {
        setLog(prevLog => [...prevLog, message]);
    }

    const handleAttack = () => {
        updateLog(player.attack(enemy));
        if (enemy.hp > 0) {
            updateLog(enemy.attack(player));
        }
    }

    const handleSpecial = () => {
        updateLog(player.useSpecial(enemy));
        if (enemy.hp > 0) {
            updateLog(enemy.attack(player));
        }
    }

    const handlePotion = () => {
        const potionLog = player.useItem("Potion", player);
        updateLog(potionLog);
    }

    // Initial setup
    if (!player.inventory.length) {
        const potion = new Item("Potion", (target) => {
            target.hp += 50;
        }, true);
        const sword = new Equipment("Sword", "weapon", 5);
        const armor = new Equipment("Armor", "armor", 10);

        updateLog(player.addItem(potion));
        updateLog(player.addItem(sword));
        updateLog(player.addItem(armor));
        updateLog(player.equip(sword));
        updateLog(player.equip(armor));
    }

    return (
        <>
        <div className='title'>
            <h1>RPG Game</h1>
        </div>
        <div className='gameScreen'>
        <div className='gameBox'>
        <div className='statScreen'>
            <div className='stats'>
                <h2>Player Stats</h2>
                <p>Name: {player.name}</p>
                <p>HP: {player.hp}</p>
                <p>DMG: {player.dmg}</p>
                {/* <p>Level: {player.level}</p>
                <p>XP: {player.xp}</p> */}
            </div>
            <div className='stats'>
                <h2>Enemy Stats</h2>
                <p>Name: {enemy.name}</p>
                <p>HP: {enemy.hp}</p>
                <p>DMG: {enemy.dmg}</p>
            </div>
        </div>
        <div className='buttons'>
                <button onClick={handleAttack}>Attack</button>
                <button onClick={handleSpecial}>Use Special</button>
                <button onClick={handlePotion}>Use Potion</button>
        </div>
        </div>
        <div className='logScreen'>
            <div className='logBox'>
                <div className='logContent'>
            {log.map((entry, index) => <p key={index}>{entry}</p>)}
                </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default App;
