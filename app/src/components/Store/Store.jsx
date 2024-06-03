import PropTypes from 'prop-types';
import './Store.css';

const Store = ({ items, buyItem, closeStore }) => {
    return (
        <div className="storeBox">
            <h2>Store</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price} gold - {item.quantity || 0} in stock
                        <button onClick={() => buyItem(item)}>Buy</button>
                    </li>
                ))}
            </ul>
            <button onClick={closeStore}>Close Store</button>
        </div>
    );
};

Store.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired, // Ensure quantity is required
        })
    ).isRequired,
    buyItem: PropTypes.func.isRequired,
    closeStore: PropTypes.func.isRequired,
};

export default Store;
