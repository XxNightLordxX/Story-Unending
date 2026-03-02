/**
 * WorldEngine - Advanced World-Building System
 * 
 * Features:
 * - Procedural location generation
 * - World history and lore
 * - Faction system
 * - Dynamic world events
 * - Location description generator
 */

class WorldEngine {
  constructor() {
    this.world = {
      name: 'Eclipsis Online',
      description: 'A vast virtual reality MMORPG where players can extract items into the real world',
      history: {
        ancient_events: [],
        recent_events: [],
        timeline: new Map()
      },
      locations: new Map(),
      factions: new Map(),
      cultures: new Map(),
      magic_system: {
        name: 'Essence Magic',
        source: 'The life force that flows through all living things',
        types: ['Elemental', 'Restoration', 'Destruction', 'Illusion', 'Necromancy'],
        limitations: ['Requires mana', 'Can be resisted', 'Has cooldowns'],
        costs: ['Mana consumption', 'Physical fatigue', 'Mental strain'],
        dangers: ['Mana burnout', 'Backlash', 'Corruption']
      },
      events: []
    };

    this.locationCounter = 0;
    this.factionCounter = 0;
    this.cultureCounter = 0;
    this.eventCounter = 0;

    // Initialize with starting locations
    this.initializeStartingLocations();
  }

  /**
   * Initialize starting locations
   */
  initializeStartingLocations() {
    const startingLocations = [
      {
        name: 'Novice Village',
        type: 'city',
        description: 'A peaceful village where new players begin their journey',
        atmosphere: 'welcoming and safe',
        inhabitants: ['villagers', 'new players', 'guides'],
        secrets: ['hidden training ground', 'ancient shrine'],
        landmarks: ['Central Plaza', 'Training Grounds', 'Inn'],
        resources: ['basic equipment', 'healing potions', 'food'],
        dangers: ['none'],
        connections: []
      },
      {
        name: 'Whispering Forest',
        type: 'forest',
        description: 'A dense forest filled with mysterious sounds and hidden paths',
        atmosphere: 'eerie and enchanting',
        inhabitants: ['forest creatures', 'druids', 'spirits'],
        secrets: ['ancient grove', 'hidden cave'],
        landmarks: ['Ancient Oak', 'Spirit Pond', 'Mushroom Circle'],
        resources: ['herbs', 'wood', 'rare materials'],
        dangers: ['wild beasts', 'poisonous plants', 'getting lost'],
        connections: ['Novice Village']
      }
    ];

    startingLocations.forEach(loc => {
      this.generateLocation(loc);
    });
  }

  /**
   * Generate a new location procedurally
   */
  generateLocation(options = {}) {
    this.locationCounter++;
    const id = `loc_${this.locationCounter}`;

    const location = {
      id: id,
      name: options.name || this.generateLocationName(),
      type: options.type || this.generateLocationType(),
      description: options.description || this.generateLocationDescription(options.type),
      atmosphere: options.atmosphere || this.generateAtmosphere(),
      inhabitants: options.inhabitants || this.generateInhabitants(options.type),
      secrets: options.secrets || this.generateSecrets(),
      landmarks: options.landmarks || this.generateLandmarks(),
      resources: options.resources || this.generateResources(options.type),
      dangers: options.dangers || this.generateDangers(options.type),
      connections: options.connections || [],
      first_visited: options.first_visited || 0,
      visit_count: 0,
      events: []
    };

    this.world.locations.set(id, location);
    return location;
  }

  /**
   * Generate location name
   */
  generateLocationName() {
    const prefixes = [
      'Ancient', 'Dark', 'Forgotten', 'Hidden', 'Mystic', 'Sacred', 'Shadow',
      'Silent', 'Whispering', 'Crystal', 'Emerald', 'Golden', 'Silver', 'Iron',
      'Storm', 'Thunder', 'Lightning', 'Frost', 'Flame', 'Abyss', 'Celestial'
    ];

    const suffixes = [
      'Cavern', 'Citadel', 'City', 'Dungeon', 'Forest', 'Fortress', 'Grove',
      'Keep', 'Mountain', 'Palace', 'Ruins', 'Sanctuary', 'Temple', 'Tower',
      'Valley', 'Village', 'Wastes', 'Woods', 'Depths', 'Heights', 'Realm'
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix} ${suffix}`;
  }

  /**
   * Generate location type
   */
  generateLocationType() {
    const types = ['city', 'forest', 'dungeon', 'mountain', 'ocean', 'desert', 'ruins', 'castle'];
    const weights = [20, 15, 15, 10, 10, 10, 10, 10];

    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < types.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return types[i];
      }
    }

    return 'city';
  }

  /**
   * Generate location description
   */
  generateLocationDescription(type) {
    const descriptions = {
      city: [
        'A bustling metropolis filled with towering spires and busy streets',
        'A fortified city with high walls and vigilant guards',
        'A trading hub where merchants from across the world gather',
        'A city built around a central plaza with markets and shops'
      ],
      forest: [
        'A dense woodland with ancient trees and hidden paths',
        'A mystical forest where magic permeates the air',
        'A dark forest filled with dangerous creatures and secrets',
        'A peaceful grove where nature thrives undisturbed'
      ],
      dungeon: [
        'A labyrinthine complex of tunnels and chambers',
        'An ancient ruin filled with traps and treasures',
        'A underground fortress carved into the rock',
        'A mysterious dungeon with unknown depths'
      ],
      mountain: [
        'A towering peak reaching into the clouds',
        'A mountain range with treacherous passes and hidden valleys',
        'A volcanic mountain with rivers of molten rock',
        'A sacred mountain where ancient rituals are performed'
      ],
      ocean: [
        'A vast expanse of water stretching to the horizon',
        'A stormy sea with towering waves and dangerous currents',
        'A peaceful ocean with crystal clear waters',
        'An underwater realm filled with coral and marine life'
      ],
      desert: [
        'A barren wasteland of sand and rock',
        'A desert oasis with palm trees and water',
        'A scorching desert with mirages and heat haze',
        'A desert canyon with ancient petroglyphs'
      ],
      ruins: [
        'Ancient crumbled structures from a forgotten age',
        'Ruined temples with faded murals and broken statues',
        'A fallen city reclaimed by nature',
        'Mysterious ruins with unknown origins'
      ],
      castle: [
        'A majestic fortress with high towers and thick walls',
        'A dark castle perched on a cliff edge',
        'A royal palace with opulent halls and gardens',
        'A haunted castle with a tragic history'
      ]
    };

    const typeDescriptions = descriptions[type] || descriptions.city;
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
  }

  /**
   * Generate atmosphere
   */
  generateAtmosphere() {
    const atmospheres = [
      'peaceful and serene', 'eerie and unsettling', 'majestic and awe-inspiring',
      'dangerous and threatening', 'mysterious and enigmatic', 'chaotic and turbulent',
      'ancient and timeless', 'magical and enchanting', 'oppressive and heavy',
      'welcoming and warm', 'cold and unforgiving', 'vibrant and lively'
    ];

    return atmospheres[Math.floor(Math.random() * atmospheres.length)];
  }

  /**
   * Generate inhabitants
   */
  generateInhabitants(type) {
    const inhabitantsByType = {
      city: ['citizens', 'guards', 'merchants', 'nobles', 'thieves'],
      forest: ['forest creatures', 'druids', 'hunters', 'spirits', 'beasts'],
      dungeon: ['monsters', 'undead', 'traps', 'guardians', 'adventurers'],
      mountain: ['mountain folk', 'goats', 'eagles', 'giants', 'elementals'],
      ocean: ['sea creatures', 'merfolk', 'pirates', 'sailors', 'monsters'],
      desert: ['nomads', 'scavengers', 'snakes', 'insects', 'spirits'],
      ruins: ['ghosts', 'constructs', 'treasure hunters', 'guardians', 'monsters'],
      castle: ['knights', 'servants', 'nobles', 'guards', 'royalty']
    };

    const inhabitants = inhabitantsByType[type] || ['creatures', 'beings'];
    const numInhabitants = Math.floor(Math.random() * 3) + 2; // 2-4 inhabitants
    const selected = [];

    while (selected.length < numInhabitants) {
      const inhabitant = inhabitants[Math.floor(Math.random() * inhabitants.length)];
      if (!selected.includes(inhabitant)) {
        selected.push(inhabitant);
      }
    }

    return selected;
  }

  /**
   * Generate secrets
   */
  generateSecrets() {
    const secrets = [
      'hidden treasure',
      'ancient artifact',
      'forbidden knowledge',
      'secret passage',
      'mysterious shrine',
      'hidden chamber',
      'ancient ritual site',
      'forgotten grave',
      'magical spring',
      'cursed object'
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
   * Generate landmarks
   */
  generateLandmarks() {
    const landmarks = [
      'Ancient Tree', 'Crystal Cave', 'Forgotten Altar', 'Mystic Fountain',
      'Ruined Tower', 'Sacred Grove', 'Hidden Bridge', 'Ancient Statue',
      'Mysterious Portal', 'Cursed Well', 'Grand Hall', 'Secret Garden'
    ];

    const numLandmarks = Math.floor(Math.random() * 2) + 1; // 1-2 landmarks
    const selected = [];

    while (selected.length < numLandmarks) {
      const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];
      if (!selected.includes(landmark)) {
        selected.push(landmark);
      }
    }

    return selected;
  }

  /**
   * Generate resources
   */
  generateResources(type) {
    const resourcesByType = {
      city: ['gold', 'equipment', 'information', 'services', 'food'],
      forest: ['wood', 'herbs', 'rare plants', 'animal parts', 'honey'],
      dungeon: ['treasure', 'ancient items', 'materials', 'gold', 'artifacts'],
      mountain: ['ore', 'gems', 'rare metals', 'stone', 'ice'],
      ocean: ['fish', 'pearls', 'coral', 'sea materials', 'treasure'],
      desert: ['sand', 'rare minerals', 'oasis water', 'ancient artifacts', 'gems'],
      ruins: ['ancient knowledge', 'forgotten items', 'materials', 'gold', 'artifacts'],
      castle: ['royal treasures', 'weapons', 'armor', 'books', 'maps']
    };

    const resources = resourcesByType[type] || ['materials', 'resources'];
    const numResources = Math.floor(Math.random() * 3) + 2; // 2-3 resources
    const selected = [];

    while (selected.length < numResources) {
      const resource = resources[Math.floor(Math.random() * resources.length)];
      if (!selected.includes(resource)) {
        selected.push(resource);
      }
    }

    return selected;
  }

  /**
   * Generate dangers
   */
  generateDangers(type) {
    const dangersByType = {
      city: ['thieves', 'guards', 'political intrigue', 'disease', 'riots'],
      forest: ['wild beasts', 'poisonous plants', 'getting lost', 'traps', 'spirits'],
      dungeon: ['monsters', 'traps', 'undead', 'cave-ins', 'curses'],
      mountain: ['avalanches', 'extreme cold', 'falling', 'creatures', 'thin air'],
      ocean: ['storms', 'sea monsters', 'drowning', 'pirates', 'currents'],
      desert: ['dehydration', 'heat stroke', 'sandstorms', 'scorpions', 'mirages'],
      ruins: ['collapsing structures', 'curses', 'traps', 'undead', 'spirits'],
      castle: ['guards', 'traps', 'political enemies', 'assassins', 'curses']
    };

    const dangers = dangersByType[type] || ['dangers', 'threats'];
    const numDangers = Math.floor(Math.random() * 2) + 1; // 1-2 dangers
    const selected = [];

    while (selected.length < numDangers) {
      const danger = dangers[Math.floor(Math.random() * dangers.length)];
      if (!selected.includes(danger)) {
        selected.push(danger);
      }
    }

    return selected;
  }

  /**
   * Connect two locations
   */
  connectLocations(locId1, locId2) {
    const loc1 = this.world.locations.get(locId1);
    const loc2 = this.world.locations.get(locId2);

    if (!loc1 || !loc2) return;

    if (!loc1.connections.includes(locId2)) {
      loc1.connections.push(locId2);
    }
    if (!loc2.connections.includes(locId1)) {
      loc2.connections.push(locId1);
    }
  }

  /**
   * Generate a new faction
   */
  generateFaction(options = {}) {
    this.factionCounter++;
    const id = `faction_${this.factionCounter}`;

    const faction = {
      id: id,
      name: options.name || this.generateFactionName(),
      type: options.type || this.generateFactionType(),
      ideology: options.ideology || this.generateIdeology(),
      goals: options.goals || this.generateFactionGoals(),
      members: options.members || [],
      leaders: options.leaders || [],
      allies: options.allies || [],
      enemies: options.enemies || [],
      reputation: options.reputation || 0,
      influence: options.influence || Math.floor(Math.random() * 50) + 10,
      history: options.history || this.generateFactionHistory(),
      secrets: options.secrets || this.generateSecrets()
    };

    this.world.factions.set(id, faction);
    return faction;
  }

  /**
   * Generate faction name
   */
  generateFactionName() {
    const prefixes = [
      'Brotherhood', 'Order', 'Guild', 'Cult', 'Society', 'Circle',
      'Alliance', 'League', 'Council', 'Covenant', 'Syndicate', 'Clan'
    ];

    const suffixes = [
      'of Light', 'of Shadows', 'of the Dawn', 'of the Night', 'of Truth',
      'of Power', 'of Wisdom', 'of Justice', 'of Freedom', 'of Eternal Flame',
      'of the Silver Hand', 'of the Crimson Moon'
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix} ${suffix}`;
  }

  /**
   * Generate faction type
   */
  generateFactionType() {
    const types = ['guild', 'kingdom', 'cult', 'rebellion', 'merchant', 'military'];
    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * Generate ideology
   */
  generateIdeology() {
    const ideologies = [
      'Believes in order and hierarchy',
      'Values freedom above all else',
      'Seeks knowledge and truth',
      'Desires power and control',
      'Protects the weak and innocent',
      'Worships ancient gods',
      'Seeks to destroy the current system',
      'Values wealth and prosperity',
      'Believes in balance and harmony',
      'Follows a strict code of honor'
    ];

    return ideologies[Math.floor(Math.random() * ideologies.length)];
  }

  /**
   * Generate faction goals
   */
  generateFactionGoals() {
    const goals = [
      'Expand their influence across the world',
      'Acquire ancient artifacts of power',
      'Overthrow the ruling government',
      'Protect a sacred location',
      'Accumulate vast wealth',
      'Spread their beliefs to others',
      'Destroy their enemies',
      'Uncover forbidden knowledge',
      'Establish a new world order',
      'Protect the innocent from harm'
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
   * Generate faction history
   */
  generateFactionHistory() {
    const histories = [
      'Founded by a group of like-minded individuals',
      'Born from the ashes of a fallen organization',
      'Created to oppose a powerful enemy',
      'Established to protect a sacred cause',
      'Formed by a charismatic leader',
      'Grew from a small gathering to a powerful force',
      'Split from a larger organization',
      'Merged with several smaller groups'
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
   * Generate a world event
   */
  generateEvent(options = {}) {
    this.eventCounter++;
    const id = `event_${this.eventCounter}`;

    const event = {
      id: id,
      name: options.name || this.generateEventName(),
      type: options.type || this.generateEventType(),
      description: options.description || this.generateEventDescription(options.type),
      impact: options.impact || this.generateEventImpact(),
      participants: options.participants || [],
      consequences: options.consequences || [],
      timeline: options.timeline || Date.now(),
      resolved: false
    };

    this.world.events.push(event);
    return event;
  }

  /**
   * Generate event name
   */
  generateEventName() {
    const names = [
      'The Great War', 'The Cataclysm', 'The Awakening', 'The Betrayal',
      'The Discovery', 'The Invasion', 'The Rebellion', 'The Purge',
      'The Eclipse', 'The Resurrection', 'The Fall', 'The Rise'
    ];

    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate event type
   */
  generateEventType() {
    const types = ['war', 'disaster', 'discovery', 'political', 'magical', 'economic'];
    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * Generate event description
   */
  generateEventDescription(type) {
    const descriptions = {
      war: 'A massive conflict between powerful factions',
      disaster: 'A catastrophic event that devastated the land',
      discovery: 'The revelation of something long forgotten',
      political: 'A shift in power and influence',
      magical: 'A surge of magical energy that changed everything',
      economic: 'A dramatic change in the world economy'
    };

    return descriptions[type] || descriptions.discovery;
  }

  /**
   * Generate event impact
   */
  generateEventImpact() {
    const impacts = [
      'Changed the balance of power',
      'Destroyed ancient civilizations',
      'Created new opportunities',
      'Revealed hidden truths',
      'United former enemies',
      'Divided former allies',
      'Transformed the landscape',
      'Altered the course of history'
    ];

    return impacts[Math.floor(Math.random() * impacts.length)];
  }

  /**
   * Generate location description with sensory details
   */
  generateLocationDescriptionWithSenses(locationId, timeOfDay = 'day', weather = 'clear') {
    const location = this.world.locations.get(locationId);
    if (!location) return '';

    const sensoryDetails = {
      sight: this.generateVisualDetails(location, timeOfDay, weather),
      sound: this.generateAuditoryDetails(location, timeOfDay, weather),
      smell: this.generateOlfactoryDetails(location, timeOfDay, weather),
      touch: this.generateTactileDetails(location, timeOfDay, weather),
      taste: this.generateGustatoryDetails(location, timeOfDay, weather)
    };

    return `${location.name} was ${location.description}. ${sensoryDetails.sight} ${sensoryDetails.sound} ${sensoryDetails.smell} ${sensoryDetails.touch}`;
  }

  /**
   * Generate visual details
   */
  generateVisualDetails(location, timeOfDay, weather) {
    const timeDescriptions = {
      day: 'Sunlight filtered through',
      night: 'Moonlight cast shadows across',
      dawn: 'The first light of dawn revealed',
      dusk: 'The fading light of dusk illuminated'
    };

    const weatherDescriptions = {
      clear: 'clear skies',
      cloudy: 'clouds gathered overhead',
      rainy: 'rain fell steadily',
      stormy: 'lightning flashed and thunder rumbled',
      foggy: 'mist swirled through',
      snowy: 'snowflakes drifted down'
    };

    const timeDesc = timeDescriptions[timeOfDay] || timeDescriptions.day;
    const weatherDesc = weatherDescriptions[weather] || weatherDescriptions.clear;

    return `${timeDesc} ${weatherDesc}, revealing ${location.landmarks.join(', ')}.`;
  }

  /**
   * Generate auditory details
   */
  generateAuditoryDetails(location, timeOfDay, weather) {
    const sounds = {
      city: ['bustling crowds', 'merchant calls', 'distant music', 'clanging metal'],
      forest: ['rustling leaves', 'bird calls', 'flowing water', 'creature sounds'],
      dungeon: ['dripping water', 'echoing footsteps', 'distant groans', 'creaking stone'],
      mountain: ['howling wind', 'falling rocks', 'eagle cries', 'rushing streams'],
      ocean: ['crashing waves', 'seagull calls', 'wind in sails', 'distant thunder'],
      desert: ['howling wind', 'shifting sand', 'distant coyotes', 'silence'],
      ruins: ['creaking stone', 'whispering winds', 'distant echoes', 'silence'],
      castle: ['clanking armor', 'marching feet', 'distant trumpets', 'hushed voices']
    };

    const locationSounds = sounds[location.type] || sounds.city;
    const numSounds = Math.floor(Math.random() * 2) + 1; // 1-2 sounds
    const selected = [];

    while (selected.length < numSounds) {
      const sound = locationSounds[Math.floor(Math.random() * locationSounds.length)];
      if (!selected.includes(sound)) {
        selected.push(sound);
      }
    }

    return `The air was filled with the sounds of ${selected.join(' and ')}.`;
  }

  /**
   * Generate olfactory details
   */
  generateOlfactoryDetails(location, timeOfDay, weather) {
    const scents = {
      city: ['baking bread', 'spices', 'smoke', 'unwashed bodies'],
      forest: ['pine needles', 'wildflowers', 'earth', 'fresh air'],
      dungeon: ['mold', 'dust', 'stagnant water', 'decay'],
      mountain: ['cold air', 'pine', 'snow', 'minerals'],
      ocean: ['salt spray', 'fish', 'seaweed', 'fresh air'],
      desert: ['dry heat', 'dust', 'sagebrush', 'heat'],
      ruins: ['ancient stone', 'dust', 'decay', 'mystery'],
      castle: ['wax candles', 'polished wood', 'metal', 'food']
    };

    const locationScents = scents[location.type] || scents.city;
    const numScents = Math.floor(Math.random() * 2) + 1; // 1-2 scents
    const selected = [];

    while (selected.length < numScents) {
      const scent = locationScents[Math.floor(Math.random() * locationScents.length)];
      if (!selected.includes(scent)) {
        selected.push(scent);
      }
    }

    return `The scent of ${selected.join(' and ')} hung in the air.`;
  }

  /**
   * Generate tactile details
   */
  generateTactileDetails(location, timeOfDay, weather) {
    const textures = {
      city: ['rough stone', 'smooth wood', 'cold metal', 'warm fabric'],
      forest: ['rough bark', 'soft moss', 'cool leaves', 'damp earth'],
      dungeon: ['cold stone', 'slimy walls', 'rough floor', 'dusty air'],
      mountain: ['cold rock', 'sharp edges', 'smooth ice', 'hard ground'],
      ocean: ['wet sand', 'cold water', 'rough shells', 'slippery rocks'],
      desert: ['hot sand', 'dry air', 'rough stone', 'blowing dust'],
      ruins: ['crumbling stone', 'dusty surfaces', 'cold air', 'rough textures'],
      castle: ['smooth stone', 'cold metal', 'rich fabric', 'polished wood']
    };

    const locationTextures = textures[location.type] || textures.city;
    const numTextures = Math.floor(Math.random() * 2) + 1; // 1-2 textures
    const selected = [];

    while (selected.length < numTextures) {
      const texture = locationTextures[Math.floor(Math.random() * locationTextures.length)];
      if (!selected.includes(texture)) {
        selected.push(texture);
      }
    }

    return `The surfaces felt ${selected.join(' and ')}.`;
  }

  /**
   * Generate gustatory details
   */
  generateGustatoryDetails(location, timeOfDay, weather) {
    const flavors = {
      city: ['spiced food', 'fresh bread', 'ale', 'roasted meat'],
      forest: ['wild berries', 'fresh water', 'herbs', 'honey'],
      dungeon: ['stale air', 'dust', 'nothing', 'bitter water'],
      mountain: ['cold water', 'fresh air', 'nothing', 'snow'],
      ocean: ['salt air', 'fresh fish', 'seaweed', 'nothing'],
      desert: ['dry air', 'dust', 'nothing', 'bitter water'],
      ruins: ['dust', 'stale air', 'nothing', 'ancient decay'],
      castle: ['fine wine', 'roasted meat', 'fresh bread', 'spices']
    };

    const locationFlavors = flavors[location.type] || flavors.city;
    const numFlavors = Math.floor(Math.random() * 1) + 1; // 1 flavor
    const selected = [];

    while (selected.length < numFlavors) {
      const flavor = locationFlavors[Math.floor(Math.random() * locationFlavors.length)];
      if (!selected.includes(flavor)) {
        selected.push(flavor);
      }
    }

    if (selected[0] === 'nothing') {
      return '';
    }

    return `There was a faint taste of ${selected[0]}.`;
  }

  /**
   * Get location by ID
   */
  getLocation(id) {
    return this.world.locations.get(id);
  }

  /**
   * Get all locations
   */
  getAllLocations() {
    return Array.from(this.world.locations.values());
  }

  /**
   * Get faction by ID
   */
  getFaction(id) {
    return this.world.factions.get(id);
  }

  /**
   * Get all factions
   */
  getAllFactions() {
    return Array.from(this.world.factions.values());
  }

  /**
   * Export world data
   */
  exportData() {
    return {
      world: {
        ...this.world,
        locations: Array.from(this.world.locations.entries()),
        factions: Array.from(this.world.factions.entries()),
        cultures: Array.from(this.world.cultures.entries())
      },
      locationCounter: this.locationCounter,
      factionCounter: this.factionCounter,
      cultureCounter: this.cultureCounter,
      eventCounter: this.eventCounter
    };
  }

  /**
   * Import world data
   */
  importData(data) {
    this.world = {
      ...data.world,
      locations: new Map(data.world.locations),
      factions: new Map(data.world.factions),
      cultures: new Map(data.world.cultures)
    };
    this.locationCounter = data.locationCounter;
    this.factionCounter = data.factionCounter;
    this.cultureCounter = data.cultureCounter;
    this.eventCounter = data.eventCounter;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WorldEngine;
}