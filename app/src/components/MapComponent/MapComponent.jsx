import PropTypes from 'prop-types';
import './MapComponent.css';

const MapComponent = ({ renderGrid, playerPosition }) => {
    return (
        <div className='mapBox'>
            <h2>Map</h2>             
            <p>Player position: {playerPosition.x}, {playerPosition.y}</p>
            <table>
                <tbody>
                    {renderGrid()}
                </tbody>
            </table>
        </div>
    );
}

MapComponent.propTypes = {
    renderGrid: PropTypes.func.isRequired,
    playerPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
};

export default MapComponent;
