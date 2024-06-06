class Quest {
    constructor(name, description, objectives, rewards) {
      this.name = name;
      this.description = description;
      this.objectives = objectives; // Array of objectives
      this.rewards = rewards; // Object containing rewards (e.g., items, experience points, etc.)
      this.status = 'Not Started'; // Status can be 'Not Started', 'In Progress', or 'Completed'
    }
  
    // Method to start the quest
    startQuest() {
      if (this.status === 'Not Started') {
        this.status = 'In Progress';
        console.log(`Quest "${this.name}" started!`);
      } else {
        console.log(`Quest "${this.name}" is already in progress or completed.`);
      }
    }
  
    // Method to complete an objective
    completeObjective(objectiveIndex) {
      if (this.status === 'In Progress' && this.objectives[objectiveIndex]) {
        this.objectives[objectiveIndex].completed = true;
        console.log(`Objective "${this.objectives[objectiveIndex].description}" completed!`);
        
        // Check if all objectives are completed
        if (this.objectives.every(obj => obj.completed)) {
          this.completeQuest();
        }
      } else {
        console.log(`Objective not found or quest not in progress.`);
      }
    }
  
    // Method to complete the quest
    completeQuest() {
      if (this.status === 'In Progress') {
        this.status = 'Completed';
        console.log(`Quest "${this.name}" completed!`);
        this.giveRewards();
      } else {
        console.log(`Quest "${this.name}" is not in progress.`);
      }
    }
  
    // Method to give rewards to the player
    giveRewards() {
      console.log(`Rewards for completing "${this.name}":`);
      for (let reward in this.rewards) {
        console.log(`${reward}: ${this.rewards[reward]}`);
      }
    }
  }

export default Quest;