import Item from '../../classes/items/Item';
import Enemy from '../../classes/characters/enemies/Enemy';
import Matt from '../../classes/characters/enemies/Matt';
import NPC from '../../classes/characters/npc/NPC';
import Porter from '../../classes/characters/npc/Porter';
import { updateLog } from '../GameUtils/GameUtils';

export const initializeGame = (map, setLog) => {

    // Create items
    const potion = new Item("Potion", (target) => {
        target.hp += 50;
    }, true, 10, 1);

    const dmgPotion = new Item("Damage Potion", (target) => {
        target.dmg += 50;
    }, true, 10, 1);

    // randomInt(0, map.width), randomInt(0, map.height)
    // Place objects on the map
    map.placeObject("player", 0, 0);
    map.placeObject(new NPC, 0, 3);
    map.placeObject(new Porter, 2, 3);
    map.placeObject(new Enemy, 4, 5);
    map.placeObject(new Matt, 3, 5);
    map.placeObject(potion, 0, 1);
    map.placeObject(dmgPotion, 1, 1);
    map.placeObject("store", 1, 2);

    updateLog("Game started!", setLog);
};

export default initializeGame;
