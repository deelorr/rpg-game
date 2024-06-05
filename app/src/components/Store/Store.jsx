import PropTypes from 'prop-types';
import './Store.css';

const Store = ({ storeItems, handleBuyItem, closeStore }) => {
    return (
        <div className="storeBox">
            <h2>Store</h2>
            {storeItems.length === 0 && <p>SOLD OUT!</p>}
                {storeItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.price} gold - {item.quantity || 0} in stock
                        <button onClick={() => handleBuyItem(item)}>Buy</button>
                    </li>
                ))}
            <button onClick={closeStore}>Close Store</button>
        </div>
    );
};

Store.propTypes = {
    storeItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired, // Ensure quantity is required
        })
    ).isRequired,
    handleBuyItem: PropTypes.func.isRequired,
    closeStore: PropTypes.func.isRequired,
};

export default Store;
