import PropTypes from 'prop-types';
import { Weapon, Armor, Item } from '../Item'; // Adjust the import paths as needed
import { Enemy, NPC } from '../Character'; // Adjust the import paths as needed
import './Grid.css';

const Grid = ({ map, playerPosition }) => {
    const renderGrid = () => {
        const rows = [];
        for (let y = 0; y < map.height; y++) {
            const cells = [];
            for (let x = 0; x < map.width; x++) {
                if (x === playerPosition.x && y === playerPosition.y) {
                    cells.push(<td key={`${x},${y}`} className="player">P</td>);
                } else if (map.grid[y][x] instanceof Weapon) {
                    cells.push(<td key={`${x},${y}`} className="weapon">W</td>);
                } else if (map.grid[y][x] instanceof Armor) {
                    cells.push(<td key={`${x},${y}`} className="armor">A</td>);
                } else if (map.grid[y][x] instanceof Item) {
                    cells.push(<td key={`${x},${y}`} className="item">I</td>);
                } else if (map.grid[y][x] instanceof Enemy) {
                    cells.push(<td key={`${x},${y}`} className="enemy">E</td>);
                } else if (map.grid[y][x] instanceof NPC) {
                    cells.push(<td key={`${x},${y}`} className="npc">N</td>);
                } else if (map.grid[y][x] === "store") {
                    cells.push(<td key={`${x},${y}`} className="store">S</td>);
                } else {
                    cells.push(<td key={`${x},${y}`} className="plainTile"></td>);
                }
            }
            rows.push(<tr key={y}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <>        
            <table className='map'>
            <h2>Map</h2> 
                <tbody>
                    {renderGrid()}
                </tbody>
            </table>
        </>
    );
};

Grid.propTypes = {
    map: PropTypes.object.isRequired,
    playerPosition: PropTypes.object.isRequired,
};

export default Grid;