import PropTypes from 'prop-types';
import './MapComponent.css';

const MapComponent = ({ renderGrid }) => {
    return (
        <div className='mapBox'>
            <h2>Map</h2>
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
};

export default MapComponent;
