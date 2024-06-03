import PropTypes from 'prop-types';
import { Weapon, Armor, Item } from '../../classes/Item'; // Adjust the import paths as needed
import { Enemy, NPC } from '../../classes/Character'; // Adjust the import paths as needed
import './Grid.css';

const Grid = ({ map, playerPosition }) => {
    const getClassForCell = (x, y) => {
        if (x === playerPosition.x && y === playerPosition.y) return 'player';
        const item = map.grid[y][x];
        if (item instanceof Weapon) return 'weapon';
        if (item instanceof Armor) return 'armor';
        if (item instanceof Item) return 'item';
        if (item instanceof Enemy) return 'enemy';
        if (item instanceof NPC) return 'npc';
        if (item === 'store') return 'store';
        return 'plainTile';
    };

    const renderGrid = () => {
        const rows = [];
        for (let y = 0; y < map.height; y++) {
            const cells = [];
            for (let x = 0; x < map.width; x++) {
                const cellClass = getClassForCell(x, y);
                cells.push(<td key={`${x},${y}`} className={cellClass}></td>);
            }
            rows.push(<tr key={y}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <div>
            <h2>Map</h2>
            <table className='map'>
                <tbody>
                    {renderGrid()}
                </tbody>
            </table>
        </div>
    );
};

Grid.propTypes = {
    map: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        grid: PropTypes.arrayOf(PropTypes.array).isRequired,
        getItem: PropTypes.func.isRequired,
        isValidPosition: PropTypes.func.isRequired,
        placeItem: PropTypes.func.isRequired,
        placeEnemy: PropTypes.func.isRequired,
        placeNPC: PropTypes.func.isRequired,
        removeItem: PropTypes.func.isRequired,
        findItemPosition: PropTypes.func.isRequired,
    }).isRequired,
    playerPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
};

export default Grid;
