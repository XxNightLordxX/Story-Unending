/**
 * Story System Integration - Unified Story Generation System
 * 
 * Integrates all engines into a cohesive story generation system:
 * - CharacterEngine: Character management and development
 * - WorldEngine: World-building and locations
 * - PlotEngine: Plot progression and arcs
 * - VarietyEngine: 100% variety guarantee
 * - ContinuityEngine: Narrative threads and continuity
 * - QualityEngine: Content quality enhancement
 */

// Load engines
const CharacterEngine = require('./character-engine.js');
const WorldEngine = require('./world-engine.js');
const PlotEngine = require('./plot-engine.js');
const VarietyEngine = require('./variety-engine.js');
const ContinuityEngine = require('./continuity-engine.js');
const QualityEngine = require('./quality-engine.js');

class StorySystemIntegration {
  constructor() {
    // Initialize all engines
    this.characterEngine = new CharacterEngine();
    this.worldEngine = new WorldEngine();
    this.plotEngine = new PlotEngine();
    this.varietyEngine = new VarietyEngine();
    this.continuityEngine = new ContinuityEngine();
    this.qualityEngine = new QualityEngine();

    // System state
    this.chapterCounter = 0;
    this.initialized = false;
  }

  /**
   * Initialize the story system
   */
  initialize() {
    if (this.initialized) return;

    // Generate initial characters
    this.generateInitialCharacters();

    // Generate initial world elements
    this.generateInitialWorld();

    // Generate initial plot elements
    this.generateInitialPlot();

    // Generate initial continuity elements
    this.generateInitialContinuity();

    this.initialized = true;
  }

  /**
   * Generate initial characters
   */
  generateInitialCharacters() {
    // Generate allies
    const allyCount = Math.floor(Math.random() * 3) + 2; // 2-4 allies
    for (let i = 0; i < allyCount; i++) {
      const ally = this.characterEngine.generateCharacter({
        role: 'ally',
        trust: Math.floor(Math.random() * 30) + 40, // 40-70
        respect: Math.floor(Math.random() * 30) + 40,
        affection: Math.floor(Math.random() * 20)
      });
      
      // Add to protagonist's allies
      this.characterEngine.addRelationship('protagonist', ally.id, 'allies');
    }

    // Generate rivals
    const rivalCount = Math.floor(Math.random() * 2) + 1; // 1-2 rivals
    for (let i = 0; i < rivalCount; i++) {
      const rival = this.characterEngine.generateCharacter({
        role: 'rival',
        trust: Math.floor(Math.random() * 20),
        respect: Math.floor(Math.random() * 40) + 30,
        affection: 0
      });
      
      this.characterEngine.addRelationship('protagonist', rival.id, 'rivals');
    }

    // Generate nemesis (appears later)
    const nemesis = this.characterEngine.createNemesis(50); // Appears around chapter 50
  }

  /**
   * Generate initial world elements
   */
  generateInitialWorld() {
    // Generate additional locations
    const locationCount = Math.floor(Math.random() * 5) + 5; // 5-10 locations
    for (let i = 0; i < locationCount; i++) {
      this.worldEngine.generateLocation();
    }

    // Generate factions
    const factionCount = Math.floor(Math.random() * 3) + 2; // 2-4 factions
    for (let i = 0; i < factionCount; i++) {
      this.worldEngine.generateFaction();
    }

    // Generate world events
    const eventCount = Math.floor(Math.random() * 3) + 1; // 1-3 events
    for (let i = 0; i < eventCount; i++) {
      this.worldEngine.generateEvent();
    }
  }

  /**
   * Generate initial plot elements
   */
  generateInitialPlot() {
    // Generate sub-plots
    const subPlotCount = Math.floor(Math.random() * 3) + 2; // 2-4 sub-plots
    for (let i = 0; i < subPlotCount; i++) {
      this.plotEngine.generateSubPlot({
        importance: Math.floor(Math.random() * 10) + 1
      });
    }

    // Generate conflicts
    const conflictCount = Math.floor(Math.random() * 2) + 1; // 1-2 conflicts
    for (let i = 0; i < conflictCount; i++) {
      this.plotEngine.generateConflict();
    }
  }

  /**
   * Generate initial continuity elements
   */
  generateInitialContinuity() {
    // Generate narrative threads
    const threadCount = Math.floor(Math.random() * 3) + 2; // 2-3 threads
    for (let i = 0; i < threadCount; i++) {
      this.continuityEngine.createThread({
        introduced: 1,
        importance: Math.floor(Math.random() * 10) + 1
      });
    }

    // Generate foreshadowing
    const foreshadowCount = Math.floor(Math.random() * 3) + 2; // 2-3 foreshadows
    for (let i = 0; i < foreshadowCount; i++) {
      this.continuityEngine.createForeshadowing({
        introduced: 1,
        importance: Math.floor(Math.random() * 10) + 1
      });
    }

    // Generate callbacks
    const callbackCount = Math.floor(Math.random() * 2) + 1; // 1-2 callbacks
    for (let i = 0; i < callbackCount; i++) {
      this.continuityEngine.createCallback({
        established: 1,
        importance: Math.floor(Math.random() * 10) + 1
      });
    }
  }

  /**
   * Generate enhanced paragraph with 100% variety guarantee
   */
  generateEnhancedParagraph(template, context, options = {}) {
    // Ensure system is initialized
    if (!this.initialized) {
      this.initialize();
    }

    // Build context from all engines
    const enhancedContext = {
      ...context,
      characterName: context.characterName || this.getRandomCharacterName(),
      location: context.location || this.getRandomLocationName(),
      action: context.action || this.getRandomAction(),
      emotion: context.emotion || this.getRandomEmotion(),
      skill: context.skill || this.getRandomSkill(),
      enemy: context.enemy || this.getRandomEnemyName(),
      ally: context.ally || this.getRandomAllyName(),
      goal: context.goal || this.getRandomGoal(),
      fear: context.fear || this.getRandomFear(),
      hope: context.hope || this.getRandomHope()
    };

    // Generate unique paragraph with semantic guarantee
    const paragraph = this.varietyEngine.generateUniqueParagraph(
      template,
      enhancedContext,
      {
        maxAttempts: options.maxAttempts || 100,
        replaceSynonyms: options.replaceSynonyms !== false,
        restructureSentences: options.restructureSentences !== false,
        adjustDetailLevel: options.adjustDetailLevel !== false,
        modifyTone: options.modifyTone !== false,
        detailLevel: options.detailLevel || 'medium',
        tone: options.tone || 'neutral'
      }
    );

    // Enhance with quality elements
    const enhancedParagraph = this.qualityEngine.enhanceParagraph(paragraph, {
      addHook: options.addHook,
      addSensory: options.addSensory,
      addEmotion: options.addEmotion,
      addDialogue: options.addDialogue,
      context: enhancedContext,
      speaker: options.speaker,
      dialogueType: options.dialogueType
    });

    return enhancedParagraph;
  }

  /**
   * Generate chapter with full system integration
   */
  generateIntegratedChapter(chapterNumber, options = {}) {
    // Ensure system is initialized
    if (!this.initialized) {
      this.initialize();
    }

    this.chapterCounter++;

    // Update plot pacing
    const chapterType = options.type || this.plotEngine.getRecommendedChapterType();
    this.plotEngine.updatePacing(chapterType, chapterNumber);

    // Generate chapter purpose
    const chapterPurpose = this.plotEngine.generateChapterPurpose(chapterNumber, {
      type: chapterType
    });

    // Get continuity elements
    const continuitySummary = this.continuityEngine.generateContinuitySummary(chapterNumber);

    // Generate opening
    const opening = this.qualityEngine.generateChapterOpening({
      combat: ['combat', 'boss_fight', 'pvp'].includes(chapterType),
      mystery: ['lore_discovery', 'investigation', 'flashback'].includes(chapterType),
      emotion: ['introspection', 'sister_moment', 'romance_scene'].includes(chapterType)
    });

    // Generate closing
    const closing = this.qualityEngine.generateChapterClosing({
      danger: ['combat', 'boss_fight', 'pvp'].includes(chapterType),
      mystery: ['lore_discovery', 'investigation'].includes(chapterType),
      revelation: ['vampire_power', 'extraction', 'skill_evolution'].includes(chapterType)
    });

    // Generate transition from previous chapter
    const transition = chapterNumber > 1 
      ? this.continuityEngine.generateTransition(chapterNumber - 1, chapterNumber, {
          characterName: this.characterEngine.getCharacter('protagonist').name
        })
      : '';

    // Record timeline events
    this.continuityEngine.recordTimelineEvent(chapterNumber, `Chapter ${chapterNumber} generated with type: ${chapterType}`);

    // Return integrated chapter data
    return {
      chapterNumber: chapterNumber,
      type: chapterType,
      purpose: chapterPurpose,
      opening: opening,
      transition: transition,
      closing: closing,
      continuity: continuitySummary,
      pacing: this.plotEngine.plot.pacing,
      variety: this.varietyEngine.getVarietyStatistics()
    };
  }

  /**
   * Get random character name
   */
  getRandomCharacterName() {
    const characters = this.characterEngine.getAllCharacters();
    const nonProtagonist = characters.filter(c => c.id !== 'protagonist');
    
    if (nonProtagonist.length > 0) {
      const character = nonProtagonist[Math.floor(Math.random() * nonProtagonist.length)];
      return character.name;
    }

    return 'a mysterious figure';
  }

  /**
   * Get random location name
   */
  getRandomLocationName() {
    const locations = this.worldEngine.getAllLocations();
    
    if (locations.length > 0) {
      const location = locations[Math.floor(Math.random() * locations.length)];
      return location.name;
    }

    return 'an unknown place';
  }

  /**
   * Get random action
   */
  getRandomAction() {
    const actions = ['moved', 'acted', 'struck', 'defended', 'advanced', 'retreated', 'observed', 'prepared'];
    return actions[Math.floor(Math.random() * actions.length)];
  }

  /**
   * Get random emotion
   */
  getRandomEmotion() {
    const emotions = ['felt hope', 'felt fear', 'felt determination', 'felt doubt', 'felt joy', 'felt sorrow', 'felt anger', 'felt peace'];
    return emotions[Math.floor(Math.random() * emotions.length)];
  }

  /**
   * Get random skill
   */
  getRandomSkill() {
    const protagonist = this.characterEngine.getCharacter('protagonist');
    if (protagonist && protagonist.skills.length > 0) {
      return protagonist.skills[Math.floor(Math.random() * protagonist.skills.length)];
    }
    return 'an ability';
  }

  /**
   * Get random enemy name
   */
  getRandomEnemyName() {
    const enemies = this.characterEngine.getCharactersByRole('enemy');
    const rivals = this.characterEngine.getCharactersByRole('rival');
    const nemeses = this.characterEngine.getCharactersByRole('nemesis');
    
    const allEnemies = [...enemies, ...rivals, ...nemeses];
    
    if (allEnemies.length > 0) {
      const enemy = allEnemies[Math.floor(Math.random() * allEnemies.length)];
      return enemy.name;
    }

    return 'a threat';
  }

  /**
   * Get random ally name
   */
  getRandomAllyName() {
    const allies = this.characterEngine.getCharactersByRole('ally');
    
    if (allies.length > 0) {
      const ally = allies[Math.floor(Math.random() * allies.length)];
      return ally.name;
    }

    return 'a companion';
  }

  /**
   * Get random goal
   */
  getRandomGoal() {
    const protagonist = this.characterEngine.getCharacter('protagonist');
    if (protagonist && protagonist.personality.goals.length > 0) {
      return protagonist.personality.goals[Math.floor(Math.random() * protagonist.personality.goals.length)];
    }
    return 'a purpose';
  }

  /**
   * Get random fear
   */
  getRandomFear() {
    const protagonist = this.characterEngine.getCharacter('protagonist');
    if (protagonist && protagonist.personality.fears.length > 0) {
      return protagonist.personality.fears[Math.floor(Math.random() * protagonist.personality.fears.length)];
    }
    return 'a concern';
  }

  /**
   * Get random hope
   */
  getRandomHope() {
    const hopes = ['saving Yuna', 'mastering the class', 'uncovering the truth', 'finding peace', 'protecting others'];
    return hopes[Math.floor(Math.random() * hopes.length)];
  }

  /**
   * Get system statistics
   */
  getSystemStatistics() {
    return {
      characters: {
        total: this.characterEngine.getAllCharacters().length,
        allies: this.characterEngine.getCharactersByRole('ally').length,
        enemies: this.characterEngine.getCharactersByRole('enemy').length,
        rivals: this.characterEngine.getCharactersByRole('rival').length,
        nemeses: this.characterEngine.getCharactersByRole('nemesis').length
      },
      world: {
        locations: this.worldEngine.getAllLocations().length,
        factions: this.worldEngine.getAllFactions().length,
        events: this.worldEngine.world.events.length
      },
      plot: {
        subPlots: this.plotEngine.plot.sub_plots.length,
        activeSubPlots: this.plotEngine.getActiveSubPlots().length,
        conflicts: this.plotEngine.plot.main_story.conflicts.length,
        currentStage: this.plotEngine.getCurrentMainStoryStage()
      },
      continuity: {
        activeThreads: this.continuityEngine.getActiveThreads().length,
        unrevealedForeshadows: this.continuityEngine.getUnrevealedForeshadowing().length,
        uncalledCallbacks: this.continuityEngine.getUncalledCallbacks().length
      },
      variety: this.varietyEngine.getVarietyStatistics(),
      quality: this.qualityEngine.getQualityStatistics(),
      chaptersGenerated: this.chapterCounter
    };
  }

  /**
   * Export all system data
   */
  exportAllData() {
    return {
      characterEngine: this.characterEngine.exportData(),
      worldEngine: this.worldEngine.exportData(),
      plotEngine: this.plotEngine.exportData(),
      varietyEngine: this.varietyEngine.exportData(),
      continuityEngine: this.continuityEngine.exportData(),
      qualityEngine: this.qualityEngine.exportData(),
      chapterCounter: this.chapterCounter,
      initialized: this.initialized
    };
  }

  /**
   * Import all system data
   */
  importAllData(data) {
    this.characterEngine.importData(data.characterEngine);
    this.worldEngine.importData(data.worldEngine);
    this.plotEngine.importData(data.plotEngine);
    this.varietyEngine.importData(data.varietyEngine);
    this.continuityEngine.importData(data.continuityEngine);
    this.qualityEngine.importData(data.qualityEngine);
    this.chapterCounter = data.chapterCounter || 0;
    this.initialized = data.initialized || false;
  }
}

// Create global instance
const StorySystem = new StorySystemIntegration();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorySystem, StorySystemIntegration };
}