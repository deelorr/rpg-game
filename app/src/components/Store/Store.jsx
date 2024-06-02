import PropTypes from 'prop-types';
import './Store.css';

const Store = ({ items, buyItem, closeStore }) => {
    return (
        <div className="storeBox">
            <h2>Store</h2>
                {items.map((item, index) => (
                    <ul key={index}>
                        {item.name} - {item.price} gold - {item.quantity} in stock
                        <button onClick={() => buyItem(item)}>Buy</button>
                    </ul>
                ))}
            <button onClick={closeStore}>Close Store</button>
        </div>
    );
};

Store.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    buyItem: PropTypes.func.isRequired,
    closeStore: PropTypes.func.isRequired,
};

export default Store;
