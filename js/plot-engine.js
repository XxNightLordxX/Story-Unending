/**
 * PlotEngine - Advanced Plot Progression System
 * 
 * Features:
 * - Story arc system
 * - Sub-plot management
 * - Conflict generation
 * - Plot twist system
 * - Chapter purpose system
 * - Pacing system
 */

class PlotEngine {
  constructor() {
    this.plot = {
      main_story: {
        arc: 'awakening',
        current_stage: 1,
        stages: [
          'discovery',
          'acceptance',
          'growth',
          'challenge',
          'transformation',
          'confrontation',
          'resolution'
        ],
        objectives: [
          'discover Vampire Progenitor class',
          'accept the power',
          'master the abilities',
          'face the nemesis',
          'transform completely',
          'confront the truth',
          'save Yuna'
        ],
        completed_objectives: [],
        conflicts: [],
        resolutions: []
      },
      sub_plots: [],
      chapter_purposes: [],
      pacing: {
        tension: 50,
        action: 50,
        mystery: 50,
        emotion: 50,
        recent_chapters: []
      }
    };

    this.subPlotCounter = 0;
    this.chapterPurposeCounter = 0;
  }

  /**
   * Generate a new sub-plot
   */
  generateSubPlot(options = {}) {
    this.subPlotCounter++;
    const id = `subplot_${this.subPlotCounter}`;

    const subPlot = {
      id: id,
      name: options.name || this.generateSubPlotName(),
      type: options.type || this.generateSubPlotType(),
      status: 'active',
      importance: options.importance || Math.floor(Math.random() * 10) + 1,
      characters_involved: options.characters_involved || [],
      objectives: options.objectives || this.generateSubPlotObjectives(),
      progress: 0,
      twists: [],
      resolution: null
    };

    this.plot.sub_plots.push(subPlot);
    return subPlot;
  }

  /**
   * Generate sub-plot name
   */
  generateSubPlotName() {
    const names = [
      'The Hidden Truth', 'Ancient Secrets', 'The Lost Artifact',
      'Betrayal', 'Redemption', 'The Mysterious Stranger',
      'The Forbidden Power', 'The Ancient Prophecy', 'The Dark Past',
      'The Rising Threat', 'The Hidden Enemy', 'The Sacred Duty'
    ];

    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate sub-plot type
   */
  generateSubPlotType() {
    const types = ['character', 'world', 'mystery', 'romance', 'revenge'];
    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * Generate sub-plot objectives
   */
  generateSubPlotObjectives() {
    const objectives = [
      'uncover the truth',
      'find the artifact',
      'defeat the enemy',
      'save the innocent',
      'discover the secret',
      'complete the ritual',
      'protect the location',
      'avenge the wrong',
      'master the power',
      'solve the mystery'
    ];

    const numObjectives = Math.floor(Math.random() * 2) + 1; // 1-2 objectives
    const selected = [];

    while (selected.length < numObjectives) {
      const objective = objectives[Math.floor(Math.random() * objectives.length)];
      if (!selected.includes(objective)) {
        selected.push(objective);
      }
    }

    return selected;
  }

  /**
   * Advance main story arc
   */
  advanceMainStory() {
    const mainStory = this.plot.main_story;
    
    // Check if current objective is complete
    if (mainStory.current_stage <= mainStory.stages.length) {
      const currentObjective = mainStory.objectives[mainStory.current_stage - 1];
      if (!mainStory.completed_objectives.includes(currentObjective)) {
        mainStory.completed_objectives.push(currentObjective);
      }
    }

    // Advance to next stage
    if (mainStory.current_stage < mainStory.stages.length) {
      mainStory.current_stage++;
    }

    return mainStory.stages[mainStory.current_stage - 1];
  }

  /**
   * Generate a conflict
   */
  generateConflict(options = {}) {
    const conflict = {
      id: `conflict_${Date.now()}`,
      type: options.type || this.generateConflictType(),
      description: options.description || this.generateConflictDescription(options.type),
      severity: options.severity || Math.floor(Math.random() * 10) + 1,
      participants: options.participants || [],
      status: 'active',
      resolution: null
    };

    this.plot.main_story.conflicts.push(conflict);
    return conflict;
  }

  /**
   * Generate conflict type
   */
  generateConflictType() {
    const types = ['internal', 'external', 'environmental', 'social', 'moral'];
    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * Generate conflict description
   */
  generateConflictDescription(type) {
    const descriptions = {
      internal: 'A struggle within oneself',
      external: 'A confrontation with an enemy',
      environmental: 'A challenge from the world itself',
      social: 'A conflict with society or relationships',
      moral: 'A difficult ethical dilemma'
    };

    return descriptions[type] || descriptions.internal;
  }

  /**
   * Generate a plot twist
   */
  generatePlotTwist(subPlotId = null) {
    const twist = {
      id: `twist_${Date.now()}`,
      description: this.generateTwistDescription(),
      impact: Math.floor(Math.random() * 10) + 1,
      foreshadowed: false,
      revealed: false
    };

    if (subPlotId) {
      const subPlot = this.plot.sub_plots.find(sp => sp.id === subPlotId);
      if (subPlot) {
        subPlot.twists.push(twist);
      }
    }

    return twist;
  }

  /**
   * Generate twist description
   */
  generateTwistDescription() {
    const twists = [
      'The ally was actually an enemy',
      'The enemy was actually an ally',
      'The prophecy was misinterpreted',
      'The artifact was a fake',
      'The mentor was hiding something',
      'The protagonist has a hidden connection',
      'The villain has a sympathetic motive',
      'The goal was never what it seemed',
      'The past is not what was believed',
      'The future has been changed'
    ];

    return twists[Math.floor(Math.random() * twists.length)];
  }

  /**
   * Generate chapter purpose
   */
  generateChapterPurpose(chapterNumber, context = {}) {
    this.chapterPurposeCounter++;
    const id = `purpose_${this.chapterPurposeCounter}`;

    const purpose = {
      id: id,
      chapter_number: chapterNumber,
      purpose: this.generatePurposeType(context),
      type: this.generateChapterType(context),
      focus: this.generateFocus(context),
      advancement: this.generateAdvancement(context),
      setup: this.generateSetup(context),
      payoff: this.generatePayoff(context)
    };

    this.plot.chapter_purposes.push(purpose);
    return purpose;
  }

  /**
   * Generate purpose type
   */
  generatePurposeType(context) {
    const purposes = [
      'advance main plot',
      'develop character',
      'expand world',
      'setup future events',
      'resolve previous setup',
      'control pacing',
      'introduce conflict',
      'resolve conflict',
      'build tension',
      'release tension'
    ];

    return purposes[Math.floor(Math.random() * purposes.length)];
  }

  /**
   * Generate chapter type
   */
  generateChapterType(context) {
    const types = [
      'exploration', 'combat', 'boss_fight', 'introspection', 'sister_moment',
      'extraction', 'vampire_power', 'lore_discovery', 'flashback', 'dialogue',
      'social', 'world_event', 'relationship', 'romance_scene', 'mentor_lesson',
      'rival_encounter', 'clan_guild', 'crafting', 'pvp', 'quest'
    ];

    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * Generate focus
   */
  generateFocus(context) {
    const focuses = [
      'character development',
      'plot advancement',
      'world-building',
      'relationship building',
      'conflict resolution',
      'mystery deepening',
      'power progression',
      'emotional resonance'
    ];

    return focuses[Math.floor(Math.random() * focuses.length)];
  }

  /**
   * Generate advancement
   */
  generateAdvancement(context) {
    const advancements = [
      'moves main story forward',
      'develops sub-plot',
      'reveals new information',
      'resolves a conflict',
      'creates a new conflict',
      'deepens mystery',
      'strengthens relationships',
      'weakens relationships'
    ];

    return advancements[Math.floor(Math.random() * advancements.length)];
  }

  /**
   * Generate setup
   */
  generateSetup(context) {
    const setups = [
      'introduces a new character',
      'establishes a new location',
      'hints at future events',
      'plants a clue',
      'creates tension',
      'builds anticipation',
      'establishes a mystery',
      'sets up a conflict'
    ];

    const numSetups = Math.floor(Math.random() * 2) + 1; // 1-2 setups
    const selected = [];

    while (selected.length < numSetups) {
      const setup = setups[Math.floor(Math.random() * setups.length)];
      if (!selected.includes(setup)) {
        selected.push(setup);
      }
    }

    return selected;
  }

  /**
   * Generate payoff
   */
  generatePayoff(context) {
    const payoffs = [
      'resolves a mystery',
      'reveals a secret',
      'pays off a setup',
      'resolves a conflict',
      'advances a relationship',
      'completes a character arc',
      'answers a question',
      'delivers on foreshadowing'
    ];

    const numPayoffs = Math.floor(Math.random() * 2); // 0-1 payoffs
    const selected = [];

    while (selected.length < numPayoffs) {
      const payoff = payoffs[Math.floor(Math.random() * payoffs.length)];
      if (!selected.includes(payoff)) {
        selected.push(payoff);
      }
    }

    return selected;
  }

  /**
   * Update pacing
   */
  updatePacing(chapterType, chapterNumber) {
    const pacing = this.plot.pacing;
    
    // Adjust pacing based on chapter type
    const pacingChanges = {
      combat: { tension: 10, action: 15, mystery: -5, emotion: 0 },
      boss_fight: { tension: 15, action: 20, mystery: -10, emotion: 5 },
      introspection: { tension: -5, action: -10, mystery: 5, emotion: 15 },
      sister_moment: { tension: -10, action: -15, mystery: 0, emotion: 20 },
      exploration: { tension: 5, action: 5, mystery: 10, emotion: 0 },
      lore_discovery: { tension: 0, action: -5, mystery: 15, emotion: 5 },
      dialogue: { tension: 0, action: -5, mystery: 5, emotion: 10 },
      social: { tension: -5, action: -10, mystery: 0, emotion: 10 },
      world_event: { tension: 10, action: 10, mystery: 10, emotion: 5 },
      romance_scene: { tension: 5, action: -10, mystery: 0, emotion: 20 },
      mentor_lesson: { tension: -5, action: -5, mystery: 5, emotion: 10 },
      rival_encounter: { tension: 10, action: 10, mystery: 5, emotion: 5 },
      pvp: { tension: 15, action: 15, mystery: -5, emotion: 0 },
      crafting: { tension: -10, action: -10, mystery: 5, emotion: 0 },
      quest: { tension: 5, action: 5, mystery: 10, emotion: 0 }
    };

    const changes = pacingChanges[chapterType] || { tension: 0, action: 0, mystery: 0, emotion: 0 };

    pacing.tension = Math.max(0, Math.min(100, pacing.tension + changes.tension));
    pacing.action = Math.max(0, Math.min(100, pacing.action + changes.action));
    pacing.mystery = Math.max(0, Math.min(100, pacing.mystery + changes.mystery));
    pacing.emotion = Math.max(0, Math.min(100, pacing.emotion + changes.emotion));

    // Track recent chapters
    pacing.recent_chapters.push({ number: chapterNumber, type: chapterType });
    if (pacing.recent_chapters.length > 10) {
      pacing.recent_chapters.shift();
    }

    return pacing;
  }

  /**
   * Get recommended chapter type based on pacing
   */
  getRecommendedChapterType() {
    const pacing = this.plot.pacing;
    const recentTypes = pacing.recent_chapters.map(c => c.type);

    // If tension is high, need release
    if (pacing.tension > 80) {
      return ['introspection', 'sister_moment', 'social', 'crafting'][Math.floor(Math.random() * 4)];
    }

    // If action is high, need slower pace
    if (pacing.action > 80) {
      return ['introspection', 'dialogue', 'lore_discovery', 'exploration'][Math.floor(Math.random() * 4)];
    }

    // If mystery is high, need revelation
    if (pacing.mystery > 80) {
      return ['lore_discovery', 'flashback', 'dialogue', 'investigation'][Math.floor(Math.random() * 4)];
    }

    // If emotion is high, need action
    if (pacing.emotion > 80) {
      return ['combat', 'boss_fight', 'pvp', 'quest'][Math.floor(Math.random() * 4)];
    }

    // If all are balanced, vary based on recent chapters
    const allTypes = [
      'exploration', 'combat', 'boss_fight', 'introspection', 'sister_moment',
      'extraction', 'vampire_power', 'lore_discovery', 'flashback', 'dialogue',
      'social', 'world_event', 'relationship', 'romance_scene', 'mentor_lesson',
      'rival_encounter', 'clan_guild', 'crafting', 'pvp', 'quest'
    ];

    // Avoid repeating recent types
    const availableTypes = allTypes.filter(type => !recentTypes.includes(type));
    
    if (availableTypes.length > 0) {
      return availableTypes[Math.floor(Math.random() * availableTypes.length)];
    }

    return allTypes[Math.floor(Math.random() * allTypes.length)];
  }

  /**
   * Advance sub-plot
   */
  advanceSubPlot(subPlotId, progress = 10) {
    const subPlot = this.plot.sub_plots.find(sp => sp.id === subPlotId);
    if (!subPlot) return null;

    subPlot.progress = Math.min(100, subPlot.progress + progress);

    // Check if sub-plot is complete
    if (subPlot.progress >= 100) {
      subPlot.status = 'resolved';
      subPlot.resolution = this.generateResolution(subPlot);
    }

    return subPlot;
  }

  /**
   * Generate resolution for sub-plot
   */
  generateResolution(subPlot) {
    const resolutions = {
      character: 'The character has grown and changed',
      world: 'The world has been altered',
      mystery: 'The mystery has been solved',
      romance: 'The relationship has evolved',
      revenge: 'The revenge has been achieved or abandoned'
    };

    return resolutions[subPlot.type] || 'The sub-plot has reached its conclusion';
  }

  /**
   * Get active sub-plots
   */
  getActiveSubPlots() {
    return this.plot.sub_plots.filter(sp => sp.status === 'active');
  }

  /**
   * Get sub-plots by importance
   */
  getSubPlotsByImportance(minImportance = 5) {
    return this.plot.sub_plots.filter(sp => sp.importance >= minImportance && sp.status === 'active');
  }

  /**
   * Get current main story stage
   */
  getCurrentMainStoryStage() {
    const mainStory = this.plot.main_story;
    return {
      stage: mainStory.stages[mainStory.current_stage - 1],
      objective: mainStory.objectives[mainStory.current_stage - 1],
      progress: mainStory.current_stage / mainStory.stages.length * 100
    };
  }

  /**
   * Get plot summary
   */
  getPlotSummary() {
    return {
      main_story: {
        current_stage: this.getCurrentMainStoryStage(),
        completed_objectives: this.plot.main_story.completed_objectives.length,
        total_objectives: this.plot.main_story.objectives.length,
        active_conflicts: this.plot.main_story.conflicts.filter(c => c.status === 'active').length
      },
      sub_plots: {
        total: this.plot.sub_plots.length,
        active: this.getActiveSubPlots().length,
        resolved: this.plot.sub_plots.filter(sp => sp.status === 'resolved').length
      },
      pacing: this.plot.pacing
    };
  }

  /**
   * Export plot data
   */
  exportData() {
    return {
      plot: this.plot,
      subPlotCounter: this.subPlotCounter,
      chapterPurposeCounter: this.chapterPurposeCounter
    };
  }

  /**
   * Import plot data
   */
  importData(data) {
    this.plot = data.plot;
    this.subPlotCounter = data.subPlotCounter;
    this.chapterPurposeCounter = data.chapterPurposeCounter;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlotEngine;
}