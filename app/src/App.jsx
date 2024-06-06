import GameScreen from './components/GameScreen/GameScreen';
import './App.css';
import { PlayerProvider } from './contexts/PlayerContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { GameProvider } from './contexts/GameContext';

const App = () => {

    return (
    <GameProvider>
        <PlayerProvider>
            <InventoryProvider>
                <GameScreen />
            </InventoryProvider>
        </PlayerProvider>
    </GameProvider>
    );
}

export default App;
