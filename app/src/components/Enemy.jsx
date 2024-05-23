import PropTypes from 'prop-types';
import Character from './components/Character.jsx';

class Enemy extends Character {
    showWeakness = () => {
        console.log(`This enemy is weak to ${this.props.weakness}`);
    }

    render() {
        return (
            <div>
                {super.render()}
                <button onClick={this.showWeakness}>Show Weakness</button>
            </div>
        );
    }
}

Enemy.propTypes = {
    name: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    dmg: PropTypes.number.isRequired,
    weakness: PropTypes.string.isRequired,
};

export default Enemy;
