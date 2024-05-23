class Quest {
    constructor(name, description, reward, isComplete = false) {
        this.name = name;
        this.description = description;
        this.reward = reward;
        this.isComplete = isComplete;
    }

    completeQuest(player) {
        this.isComplete = true;
        player.gainXP(this.reward.xp);
        if (this.reward.item) {
            player.addItem(this.reward.item);
        }
        return `${player.name} has completed the quest: ${this.name}!`;
    }
}

export default Quest;
