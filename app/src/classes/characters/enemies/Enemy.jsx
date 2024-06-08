import Character from '../Character';

class Enemy extends Character {
    
    constructor(name='Enemy', hp=100, dmg=5, ) {
        super(name, hp, dmg);
    }
}

export default Enemy;