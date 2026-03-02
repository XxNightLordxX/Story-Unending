/**
 * CharacterEngine - Advanced Character Management System
 * 
 * Features:
 * - Procedural character generation
 * - Character development and evolution
 * - Relationship tracking and dynamics
 * - Nemesis system
 * - Character interaction system
 */

class CharacterEngine {
  constructor() {
    this.characters = new Map(); // id -> Character
    this.characterCounter = 0;
    this.relationshipHistory = [];
    this.developmentEvents = [];
    
    // Initialize with protagonist
    this.initializeProtagonist();
  }

  /**
   * Initialize the protagonist character
   */
  initializeProtagonist() {
    const protagonist = {
      id: 'protagonist',
      name: 'Kael',
      age: 20,
      appearance: 'Lean but muscular build, dark hair that falls over intense eyes, pale skin from long hours indoors',
      personality: {
        traits: ['determined', 'protective', 'resourceful', 'introspective', 'loyal'],
        motivations: ['save sister', 'master Vampire Progenitor class', 'uncover game secrets'],
        goals: ['awaken Yuna', 'reach maximum level', 'understand extraction ability'],
        fears: ['losing Yuna', 'failing to protect others', 'becoming a monster']
      },
      background: {
        origin: 'Modern Earth, struggling with comatose sister',
        history: [
          'Parents died in car accident when Kael was 18',
          'Yuna fell into coma shortly after',
          'Kael discovered Eclipsis Online VR game',
          'Received unique Vampire Progenitor class',
          'Discovered ability to extract game items to real world'
        ],
        secrets: [
          'Can extract game items into reality',
          'Vampire Progenitor class is changing his real body',
          'Feels the game is more real than reality'
        ]
      },
      relationships: {
        friends: [],
        enemies: [],
        family: ['Yuna'],
        romantic: [],
        mentors: [],
        allies: [],
        rivals: []
      },
      development: {
        arc: 'awakening',
        stage: 1,
        growth_points: [
          'discovered extraction ability',
          'accepted Vampire Progenitor class',
          'began physical transformation'
        ],
        transformations: []
      },
      role: 'protagonist',
      class: 'Vampire Progenitor',
      level: 1,
      skills: ['Crimson Aura', 'Blood Drain', 'Predator\'s Instinct'],
      first_appearance: 1,
      last_appearance: 1,
      total_appearances: 1,
      relationship_with_protagonist: null // Protagonist doesn't track relationship with self
    };

    this.characters.set('protagonist', protagonist);
  }

  /**
   * Generate a new character procedurally
   */
  generateCharacter(options = {}) {
    this.characterCounter++;
    const id = `char_${this.characterCounter}`;
    
    const character = {
      id: id,
      name: options.name || this.generateName(),
      age: options.age || this.generateAge(),
      appearance: options.appearance || this.generateAppearance(),
      personality: {
        traits: options.traits || this.generateTraits(),
        motivations: options.motivations || this.generateMotivations(),
        goals: options.goals || this.generateGoals(),
        fears: options.fears || this.generateFears()
      },
      background: {
        origin: options.origin || this.generateOrigin(),
        history: options.history || this.generateHistory(),
        secrets: options.secrets || this.generateSecrets()
      },
      relationships: {
        friends: [],
        enemies: [],
        family: [],
        romantic: [],
        mentors: [],
        allies: [],
        rivals: []
      },
      development: {
        arc: options.arc || this.generateCharacterArc(),
        stage: 1,
        growth_points: [],
        transformations: []
      },
      role: options.role || this.generateRole(),
      class: options.class || this.generateClass(),
      level: options.level || this.generateLevel(),
      skills: options.skills || this.generateSkills(),
      first_appearance: options.first_appearance || 0,
      last_appearance: 0,
      total_appearances: 0,
      relationship_with_protagonist: {
        trust: options.trust || 50,
        respect: options.respect || 50,
        affection: options.affection || 0,
        debt: options.debt || 0,
        history: []
      }
    };

    this.characters.set(id, character);
    return character;
  }

  /**
   * Generate a character name
   */
  generateName() {
    const firstNames = [
      'Aria', 'Caelum', 'Darius', 'Elara', 'Fenris', 'Gideon', 'Hana', 'Iris',
      'Jasper', 'Kira', 'Lysander', 'Mira', 'Nyx', 'Orion', 'Phoenix', 'Quinn',
      'Raven', 'Soren', 'Talia', 'Uriel', 'Vesper', 'Willow', 'Xander', 'Yara', 'Zephyr',
      'Adrian', 'Bryn', 'Cassian', 'Dante', 'Ember', 'Felix', 'Gwen', 'Hugo',
      'Ivy', 'Jace', 'Kai', 'Luna', 'Milo', 'Nova', 'Oscar', 'Piper',
      'Rex', 'Sage', 'Theo', 'Uma', 'Vance', 'Wren', 'Xena', 'Yuki', 'Zane'
    ];

    const lastNames = [
      'Ashford', 'Blackwood', 'Cromwell', 'Darkholme', 'Everhart', 'Frostbane',
      'Grimshaw', 'Holloway', 'Ironwood', 'Jasper', 'Kingsley', 'Lancaster',
      'Mercer', 'Nightshade', 'Oakenshield', 'Pendragon', 'Quicksilver', 'Ravenwood',
      'Stormwind', 'Thornwood', 'Underhill', 'Valerius', 'Winterbourne', 'Xavier', 'Yorke'
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  }

  /**
   * Generate character age
   */
  generateAge() {
    return Math.floor(Math.random() * 40) + 18; // 18-58
  }

  /**
   * Generate character appearance
   */
  generateAppearance() {
    const builds = ['slender', 'athletic', 'muscular', 'lean', 'average'];
    const heights = ['short', 'average height', 'tall'];
    const hairColors = ['black', 'brown', 'blonde', 'red', 'silver', 'white'];
    const hairStyles = ['short', 'long', 'medium-length', 'braided', 'shaved'];
    const eyeColors = ['brown', 'blue', 'green', 'hazel', 'gray', 'amber', 'violet'];
    const features = [
      'a small scar on their cheek',
      'freckles across their nose',
      'a distinctive tattoo',
      'piercing eyes',
      'a warm smile',
      'a stern expression',
      'an air of mystery',
      'a confident posture'
    ];

    const build = builds[Math.floor(Math.random() * builds.length)];
    const height = heights[Math.floor(Math.random() * heights.length)];
    const hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    const hairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    const feature = features[Math.floor(Math.random() * features.length)];

    return `${build} and ${height}, with ${hairColor} ${hairStyle} hair and ${eyeColor} eyes, ${feature}`;
  }

  /**
   * Generate personality traits
   */
  generateTraits() {
    const allTraits = [
      'brave', 'cautious', 'curious', 'loyal', 'ambitious', 'honest', 'deceptive',
      'compassionate', 'ruthless', 'playful', 'serious', 'creative', 'logical',
      'impulsive', 'patient', 'stubborn', 'flexible', 'confident', 'insecure',
      'generous', 'selfish', 'optimistic', 'pessimistic', 'adventurous', 'cautious'
    ];

    const numTraits = Math.floor(Math.random() * 3) + 2; // 2-4 traits
    const traits = [];
    
    while (traits.length < numTraits) {
      const trait = allTraits[Math.floor(Math.random() * allTraits.length)];
      if (!traits.includes(trait)) {
        traits.push(trait);
      }
    }

    return traits;
  }

  /**
   * Generate motivations
   */
  generateMotivations() {
    const motivations = [
      'seeking power', 'protecting loved ones', 'seeking knowledge', 'seeking revenge',
      'seeking wealth', 'seeking fame', 'seeking redemption', 'seeking freedom',
      'seeking love', 'seeking truth', 'seeking adventure', 'seeking peace'
    ];

    const numMotivations = Math.floor(Math.random() * 2) + 1; // 1-2 motivations
    const selected = [];

    while (selected.length < numMotivations) {
      const motivation = motivations[Math.floor(Math.random() * motivations.length)];
      if (!selected.includes(motivation)) {
        selected.push(motivation);
      }
    }

    return selected;
  }

  /**
   * Generate goals
   */
  generateGoals() {
    const goals = [
      'reach maximum level', 'master their class', 'build a powerful guild',
      'uncover ancient secrets', 'defeat a legendary enemy', 'find a legendary item',
      'protect their home', 'avenge a wrong', 'find their purpose',
      'become famous', 'accumulate wealth', 'find love'
    ];

    const numGoals = Math.floor(Math.random() * 2) + 1; // 1-2 goals
    const selected = [];

    while (selected.length < numGoals) {
      const goal = goals[Math.floor(Math.random() * goals.length)];
      if (!selected.includes(goal)) {
        selected.push(goal);
      }
    }

    return selected;
  }

  /**
   * Generate fears
   */
  generateFears() {
    const fears = [
      'losing loved ones', 'failure', 'death', 'weakness', 'betrayal',
      'being alone', 'losing control', 'the unknown', 'pain', 'humiliation'
    ];

    const numFears = Math.floor(Math.random() * 2) + 1; // 1-2 fears
    const selected = [];

    while (selected.length < numFears) {
      const fear = fears[Math.floor(Math.random() * fears.length)];
      if (!selected.includes(fear)) {
        selected.push(fear);
      }
    }

    return selected;
  }

  /**
   * Generate character origin
   */
  generateOrigin() {
    const origins = [
      'born in a small village',
      'raised in a bustling city',
      'orphaned at a young age',
      'from a noble family',
      'from a poor family',
      'trained from birth',
      'self-taught survivor',
      'exiled from their homeland'
    ];

    return origins[Math.floor(Math.random() * origins.length)];
  }

  /**
   * Generate character history
   */
  generateHistory() {
    const histories = [
      'discovered their talent for magic early in life',
      'lost everything in a tragic event',
      'trained under a legendary master',
      'made a deal with a mysterious entity',
      'survived against impossible odds',
      'carries a burden from their past',
      'is searching for someone important',
      'is hiding from their past'
    ];

    const numEvents = Math.floor(Math.random() * 2) + 1; // 1-2 events
    const selected = [];

    while (selected.length < numEvents) {
      const event = histories[Math.floor(Math.random() * histories.length)];
      if (!selected.includes(event)) {
        selected.push(event);
      }
    }

    return selected;
  }

  /**
   * Generate character secrets
   */
  generateSecrets() {
    const secrets = [
      'hides a dark past',
      'is not who they claim to be',
      'carries a forbidden knowledge',
      'has a hidden agenda',
      'is being hunted',
      'is hunting someone',
      'has a connection to the protagonist',
      'knows more than they reveal'
    ];

    const numSecrets = Math.floor(Math.random() * 2) + 1; // 1-2 secrets
    const selected = [];

    while (selected.length < numSecrets) {
      const secret = secrets[Math.floor(Math.random() * secrets.length)];
      if (!selected.includes(secret)) {
        selected.push(secret);
      }
    }

    return selected;
  }

  /**
   * Generate character arc
   */
  generateCharacterArc() {
    const arcs = [
      'redemption', 'fall from grace', 'rise to power', 'self-discovery',
      'revenge', 'love', 'sacrifice', 'transformation', 'mastery', 'freedom'
    ];

    return arcs[Math.floor(Math.random() * arcs.length)];
  }

  /**
   * Generate character role
   */
  generateRole() {
    const roles = ['ally', 'enemy', 'neutral', 'mentor', 'rival', 'nemesis'];
    const weights = [40, 20, 20, 10, 8, 2]; // Higher weight = more likely

    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < roles.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return roles[i];
      }
    }

    return 'neutral';
  }

  /**
   * Generate character class
   */
  generateClass() {
    const classes = [
      'Warrior', 'Mage', 'Rogue', 'Healer', 'Ranger', 'Paladin',
      'Necromancer', 'Berserker', 'Monk', 'Druid', 'Bard', 'Summoner',
      'Assassin', 'Knight', 'Sorcerer', 'Cleric', 'Hunter', 'Shaman'
    ];

    return classes[Math.floor(Math.random() * classes.length)];
  }

  /**
   * Generate character level
   */
  generateLevel() {
    // Weighted towards lower levels initially
    const weights = [30, 25, 20, 15, 10]; // Levels 1-5
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return i + 1;
      }
    }

    return 1;
  }

  /**
   * Generate character skills
   */
  generateSkills() {
    const skillPools = {
      'Warrior': ['Slash', 'Block', 'Charge', 'Intimidate', 'Berserker Rage'],
      'Mage': ['Fireball', 'Ice Shard', 'Lightning Bolt', 'Mana Shield', 'Teleport'],
      'Rogue': ['Backstab', 'Stealth', 'Pickpocket', 'Poison', 'Evasion'],
      'Healer': ['Heal', 'Cleanse', 'Bless', 'Resurrect', 'Divine Shield'],
      'Ranger': ['Arrow Shot', 'Trap', 'Track', 'Beast Companion', 'Camouflage'],
      'Paladin': ['Holy Strike', 'Smite Evil', 'Heal', 'Divine Shield', 'Aura'],
      'Necromancer': ['Raise Dead', 'Drain Life', 'Curse', 'Soul Harvest', 'Bone Armor'],
      'Berserker': ['Rage', 'Cleave', 'Intimidate', 'Blood Frenzy', 'Unstoppable'],
      'Monk': ['Palm Strike', 'Meditate', 'Dodge', 'Chi Blast', 'Inner Peace'],
      'Druid': ['Shape Shift', 'Nature\'s Wrath', 'Heal', 'Summon Animal', 'Entangle'],
      'Bard': ['Inspire', 'Lullaby', 'Charm', 'Disrupt', 'Song of Power'],
      'Summoner': ['Summon Demon', 'Summon Elemental', 'Bind', 'Portal', 'Mass Summon'],
      'Assassin': ['Assassinate', 'Poison', 'Stealth', 'Shadow Step', 'Critical Strike'],
      'Knight': ['Shield Bash', 'Holy Strike', 'Charge', 'Defend', 'Rally'],
      'Sorcerer': ['Arcane Blast', 'Mana Burn', 'Teleport', 'Time Slow', 'Arcane Shield'],
      'Cleric': ['Heal', 'Smite', 'Bless', 'Turn Undead', 'Divine Intervention'],
      'Hunter': ['Aimed Shot', 'Track', 'Trap', 'Beast Mastery', 'Camouflage'],
      'Shaman': ['Lightning Bolt', 'Heal', 'Totem', 'Spirit Walk', 'Elemental Fury']
    };

    const defaultSkills = ['Attack', 'Defend', 'Dodge'];
    const characterClass = this.generateClass();
    const classSkills = skillPools[characterClass] || defaultSkills;

    const numSkills = Math.floor(Math.random() * 3) + 2; // 2-4 skills
    const selected = [];

    while (selected.length < numSkills) {
      const skill = classSkills[Math.floor(Math.random() * classSkills.length)];
      if (!selected.includes(skill)) {
        selected.push(skill);
      }
    }

    return selected;
  }

  /**
   * Get character by ID
   */
  getCharacter(id) {
    return this.characters.get(id);
  }

  /**
   * Get all characters
   */
  getAllCharacters() {
    return Array.from(this.characters.values());
  }

  /**
   * Get characters by role
   */
  getCharactersByRole(role) {
    return this.getAllCharacters().filter(char => char.role === role);
  }

  /**
   * Update character relationship with protagonist
   */
  updateRelationship(characterId, changes) {
    const character = this.getCharacter(characterId);
    if (!character || character.id === 'protagonist') return;

    const relationship = character.relationship_with_protagonist;
    
    if (changes.trust !== undefined) {
      relationship.trust = Math.max(0, Math.min(100, relationship.trust + changes.trust));
    }
    if (changes.respect !== undefined) {
      relationship.respect = Math.max(0, Math.min(100, relationship.respect + changes.respect));
    }
    if (changes.affection !== undefined) {
      relationship.affection = Math.max(0, Math.min(100, relationship.affection + changes.affection));
    }
    if (changes.debt !== undefined) {
      relationship.debt += changes.debt;
    }

    // Record relationship change
    this.relationshipHistory.push({
      characterId: characterId,
      timestamp: Date.now(),
      changes: changes,
      newValues: { ...relationship }
    });
  }

  /**
   * Add relationship between two characters
   */
  addRelationship(charId1, charId2, type) {
    const char1 = this.getCharacter(charId1);
    const char2 = this.getCharacter(charId2);

    if (!char1 || !char2) return;

    if (!char1.relationships[type].includes(charId2)) {
      char1.relationships[type].push(charId2);
    }
    if (!char2.relationships[type].includes(charId1)) {
      char2.relationships[type].push(charId1);
    }
  }

  /**
   * Remove relationship between two characters
   */
  removeRelationship(charId1, charId2, type) {
    const char1 = this.getCharacter(charId1);
    const char2 = this.getCharacter(charId2);

    if (!char1 || !char2) return;

    char1.relationships[type] = char1.relationships[type].filter(id => id !== charId2);
    char2.relationships[type] = char2.relationships[type].filter(id => id !== charId1);
  }

  /**
   * Evolve character development
   */
  evolveCharacter(characterId, growthPoint) {
    const character = this.getCharacter(characterId);
    if (!character) return;

    character.development.growth_points.push(growthPoint);
    character.development.stage++;

    // Check for transformation
    if (character.development.stage % 5 === 0) {
      const transformation = this.generateTransformation(character);
      character.development.transformations.push(transformation);
    }

    this.developmentEvents.push({
      characterId: characterId,
      growthPoint: growthPoint,
      stage: character.development.stage,
      timestamp: Date.now()
    });
  }

  /**
   * Generate character transformation
   */
  generateTransformation(character) {
    const transformations = [
      'gained new insight into their purpose',
      'overcame a personal fear',
      'made a difficult choice that changed them',
      'discovered a hidden strength',
      'let go of a past burden',
      'embraced a new aspect of themselves',
      'forgave someone who wronged them',
      'accepted a difficult truth'
    ];

    return transformations[Math.floor(Math.random() * transformations.length)];
  }

  /**
   * Generate character interaction
   */
  generateInteraction(charId1, charId2, context) {
    const char1 = this.getCharacter(charId1);
    const char2 = this.getCharacter(charId2);

    if (!char1 || !char2) return null;

    const relationship = char1.relationships;
    const interactionType = this.determineInteractionType(char1, char2, context);
    const dialogue = this.generateDialogue(char1, char2, interactionType, context);

    return {
      characters: [charId1, charId2],
      type: interactionType,
      dialogue: dialogue,
      context: context,
      timestamp: Date.now()
    };
  }

  /**
   * Determine interaction type based on relationship
   */
  determineInteractionType(char1, char2, context) {
    const relationship1 = char1.relationships;
    const relationship2 = char2.relationships;

    // Check for specific relationships
    if (relationship1.enemies.includes(char2.id) || relationship2.enemies.includes(char1.id)) {
      return 'hostile';
    }
    if (relationship1.friends.includes(char2.id) || relationship2.friends.includes(char1.id)) {
      return 'friendly';
    }
    if (relationship1.romantic.includes(char2.id) || relationship2.romantic.includes(char1.id)) {
      return 'romantic';
    }
    if (relationship1.mentors.includes(char2.id) || relationship2.mentors.includes(char1.id)) {
      return 'mentorship';
    }
    if (relationship1.rivals.includes(char2.id) || relationship2.rivals.includes(char1.id)) {
      return 'competitive';
    }

    return 'neutral';
  }

  /**
   * Generate dialogue between characters
   */
  generateDialogue(char1, char2, type, context) {
    const dialogueTemplates = {
      hostile: [
        `"You shouldn't have come here," ${char2.name} said, their voice cold.`,
        `"I've been waiting for this moment," ${char2.name} declared.`,
        `"You'll regret crossing me," ${char2.name} warned.`,
        `"This ends now," ${char2.name} stated firmly.`
      ],
      friendly: [
        `"It's good to see you," ${char2.name} smiled.`,
        `"I've missed our conversations," ${char2.name} admitted.`,
        `"You can always count on me," ${char2.name} assured.`,
        `"Let's do this together," ${char2.name} suggested.`
      ],
      romantic: [
        `"I've been thinking about you," ${char2.name} whispered.`,
        `"You mean everything to me," ${char2.name} confessed.`,
        `"I never want to be apart from you," ${char2.name} said softly.`,
        `"You make me want to be better," ${char2.name} admitted.`
      ],
      mentorship: [
        `"Pay attention to what I'm about to show you," ${char2.name} instructed.`,
        `"You've learned much, but there's still more," ${char2.name} said.`,
        `"The path ahead is difficult, but you're ready," ${char2.name} encouraged.`,
        `"Remember what I taught you," ${char2.name} reminded.`
      ],
      competitive: [
        `"I'll show you who's superior," ${char2.name} challenged.`,
        `"Don't get too comfortable," ${char2.name} warned.`,
        `"I've been training for this," ${char2.name} claimed.`,
        `"Let's see what you're really made of," ${char2.name} said.`
      ],
      neutral: [
        `"We need to talk," ${char2.name} said.`,
        `"There's something you should know," ${char2.name} began.`,
        `"I have a proposition for you," ${char2.name} offered.`,
        `"Interesting times we live in," ${char2.name} mused.`
      ]
    };

    const templates = dialogueTemplates[type] || dialogueTemplates.neutral;
    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Create nemesis character
   */
  createNemesis(chapterNumber) {
    const nemesis = this.generateCharacter({
      role: 'nemesis',
      level: Math.floor(chapterNumber / 10) + 5, // Scales with story
      trust: 0,
      respect: 0,
      affection: 0,
      debt: 0
    });

    // Nemesis has special relationship with protagonist
    nemesis.relationship_with_protagonist.trust = 0;
    nemesis.relationship_with_protagonist.respect = 0;
    nemesis.relationship_with_protagonist.affection = 0;
    nemesis.relationship_with_protagonist.debt = 0;

    // Add protagonist to nemesis's enemies
    nemesis.relationships.enemies.push('protagonist');

    // Add nemesis to protagonist's enemies
    const protagonist = this.getCharacter('protagonist');
    protagonist.relationships.enemies.push(nemesis.id);

    return nemesis;
  }

  /**
   * Get character description for story
   */
  getCharacterDescription(characterId) {
    const character = this.getCharacter(characterId);
    if (!character) return '';

    const traits = character.personality.traits.join(', ');
    const motivations = character.personality.motivations.join(', ');
    
    return `${character.name}, a ${character.age}-year-old ${character.class} with ${character.appearance}. They are ${traits}, driven by ${motivations}.`;
  }

  /**
   * Export character data
   */
  exportData() {
    return {
      characters: Array.from(this.characters.entries()),
      characterCounter: this.characterCounter,
      relationshipHistory: this.relationshipHistory,
      developmentEvents: this.developmentEvents
    };
  }

  /**
   * Import character data
   */
  importData(data) {
    this.characters = new Map(data.characters);
    this.characterCounter = data.characterCounter;
    this.relationshipHistory = data.relationshipHistory;
    this.developmentEvents = data.developmentEvents;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CharacterEngine;
}