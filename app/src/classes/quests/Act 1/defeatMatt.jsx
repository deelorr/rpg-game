import Quest from '../Quest';

const defeatMatt = new Quest(
    'Defeat Matt.',
    'Find Matt and destroy him.',
    [
      { description: 'Find Matt', completed: false },
      { description: 'Defeat Matt', completed: false }
    ],
    { experience: 500, gold: 100, item: 'Ancient Sword' }
);

export default defeatMatt