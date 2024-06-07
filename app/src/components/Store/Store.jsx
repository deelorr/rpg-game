import PropTypes from 'prop-types';
import './Store.css';

const Store = ({ storeInventory, handleBuyItem, closeStore }) => {
    return (
        <div className="storeBox">
            <h2>Store</h2>
            <div className="storeItems">
                {storeInventory.length === 0 && <p className="soldOut">SOLD OUT!</p>}
                {storeInventory.map((item, index) => (
                    <li key={index}>
                        <div className="itemInfo">
                            <div className="itemNamePrice">{item.name}: {item.price} Coin</div>
                            <div className="itemStock">Stock: {item.quantity || 0}</div>
                        </div>
                        <button onClick={() => handleBuyItem(item)}>Buy</button>
                    </li>
                ))}
            </div>
            <button className="closeButton" onClick={closeStore}>Close Store</button>
        </div>
    );
};

Store.propTypes = {
    storeInventory: PropTypes.array.isRequired,
    handleBuyItem: PropTypes.func.isRequired,
    closeStore: PropTypes.func.isRequired,
};

export default Store;
