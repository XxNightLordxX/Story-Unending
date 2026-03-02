/**
 * ContinuityEngine - Seamless Story Flow System
 * 
 * Features:
 * - Narrative thread tracking
 * - Foreshadowing system
 * - Callback system
 * - Seamless transitions
 * - Timeline consistency
 */

class ContinuityEngine {
  constructor() {
    this.narrativeThreads = new Map(); // id -> Thread
    this.threadCounter = 0;
    this.foreshadowing = [];
    this.callbacks = [];
    this.timeline = new Map(); // chapter -> events
    this.chapterConnections = []; // Track chapter-to-chapter connections
  }

  /**
   * Create a new narrative thread
   */
  createThread(options = {}) {
    this.threadCounter++;
    const id = `thread_${this.threadCounter}`;

    const thread = {
      id: id,
      type: options.type || this.generateThreadType(),
      topic: options.topic || this.generateThreadTopic(),
      introduced: options.introduced || 1,
      status: 'active',
      mentions: [options.introduced || 1],
      importance: options.importance || Math.floor(Math.random() * 10) + 1,
      resolution: null,
      context: options.context || {}
    };

    this.narrativeThreads.set(id, thread);
    return thread;
  }

  /**
   * Generate thread type
   */
  generateThreadType() {
    const types = ['character', 'plot', 'world', 'mystery', 'relationship', 'conflict'];
    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * Generate thread topic
   */
  generateThreadTopic() {
    const topics = [
      'the mysterious artifact',
      'the hidden enemy',
      'the ancient prophecy',
      'the lost kingdom',
      'the forbidden power',
      'the character\'s past',
      'the secret organization',
      'the magical phenomenon',
      'the political intrigue',
      'the personal vendetta'
    ];

    return topics[Math.floor(Math.random() * topics.length)];
  }

  /**
   * Mention a thread in a chapter
   */
  mentionThread(threadId, chapterNumber) {
    const thread = this.narrativeThreads.get(threadId);
    if (!thread) return null;

    thread.mentions.push(chapterNumber);
    return thread;
  }

  /**
   * Resolve a thread
   */
  resolveThread(threadId, resolution, chapterNumber) {
    const thread = this.narrativeThreads.get(threadId);
    if (!thread) return null;

    thread.status = 'resolved';
    thread.resolution = resolution;
    thread.mentions.push(chapterNumber);

    return thread;
  }

  /**
   * Get active threads
   */
  getActiveThreads() {
    return Array.from(this.narrativeThreads.values()).filter(t => t.status === 'active');
  }

  /**
   * Get threads by importance
   */
  getThreadsByImportance(minImportance = 5) {
    return Array.from(this.narrativeThreads.values())
      .filter(t => t.importance >= minImportance && t.status === 'active');
  }

  /**
   * Get threads that should be mentioned in current chapter
   */
  getThreadsToMention(chapterNumber, maxThreads = 3) {
    const activeThreads = this.getActiveThreads();
    
    // Sort by importance and recency
    const sorted = activeThreads.sort((a, b) => {
      // Prioritize threads that haven't been mentioned recently
      const aLastMention = Math.max(...a.mentions);
      const bLastMention = Math.max(...b.mentions);
      const aRecency = chapterNumber - aLastMention;
      const bRecency = chapterNumber - bLastMention;
      
      // Balance importance and recency
      const aScore = a.importance * 10 + aRecency;
      const bScore = b.importance * 10 + bRecency;
      
      return bScore - aScore;
    });

    return sorted.slice(0, maxThreads);
  }

  /**
   * Create foreshadowing
   */
  createForeshadowing(options = {}) {
    const foreshadow = {
      id: `foreshadow_${Date.now()}`,
      topic: options.topic || this.generateForeshadowTopic(),
      hint: options.hint || this.generateForeshadowHint(),
      introduced: options.introduced || 1,
      revealed: false,
      revealChapter: options.revealChapter || null,
      importance: options.importance || Math.floor(Math.random() * 10) + 1
    };

    this.foreshadowing.push(foreshadow);
    return foreshadow;
  }

  /**
   * Generate foreshadow topic
   */
  generateForeshadowTopic() {
    const topics = [
      'a betrayal',
      'a hidden power',
      'a secret identity',
      'a future conflict',
      'a revelation',
      'a transformation',
      'a loss',
      'a gain',
      'a connection',
      'a truth'
    ];

    return topics[Math.floor(Math.random() * topics.length)];
  }

  /**
   * Generate foreshadow hint
   */
  generateForeshadowHint() {
    const hints = [
      'There was something they weren\'t saying',
      'The signs had been there all along',
      'A shadow moved at the edge of vision',
      'The truth lay just beneath the surface',
      'Something was about to change',
      'The pieces were falling into place',
      'A choice would have to be made',
      'The past was catching up',
      'The future was being written',
      'Nothing was as it seemed'
    ];

    return hints[Math.floor(Math.random() * hints.length)];
  }

  /**
   * Reveal foreshadowing
   */
  revealForeshadow(foreshadowId, chapterNumber) {
    const foreshadow = this.foreshadowing.find(f => f.id === foreshadowId);
    if (!foreshadow) return null;

    foreshadow.revealed = true;
    foreshadow.revealChapter = chapterNumber;

    return foreshadow;
  }

  /**
   * Get unrevealed foreshadowing
   */
  getUnrevealedForeshadowing() {
    return this.foreshadowing.filter(f => !f.revealed);
  }

  /**
   * Get foreshadowing ready to reveal
   */
  getForeshadowingToReveal(chapterNumber, maxForeshadows = 2) {
    const unrevealed = this.getUnrevealedForeshadowing();
    
    // Sort by importance and time since introduction
    const sorted = unrevealed.sort((a, b) => {
      const aTime = chapterNumber - a.introduced;
      const bTime = chapterNumber - b.introduced;
      
      // Prioritize older, more important foreshadowing
      const aScore = a.importance * 10 + aTime;
      const bScore = b.importance * 10 + bTime;
      
      return bScore - aScore;
    });

    return sorted.slice(0, maxForeshadows);
  }

  /**
   * Create a callback
   */
  createCallback(options = {}) {
    const callback = {
      id: `callback_${Date.now()}`,
      reference: options.reference || this.generateCallbackReference(),
      context: options.context || this.generateCallbackContext(),
      established: options.established || 1,
      called: false,
      callChapter: options.callChapter || null,
      importance: options.importance || Math.floor(Math.random() * 10) + 1
    };

    this.callbacks.push(callback);
    return callback;
  }

  /**
   * Generate callback reference
   */
  generateCallbackReference() {
    const references = [
      'a past conversation',
      'an earlier event',
      'a previous discovery',
      'a memory',
      'a lesson learned',
      'a promise made',
      'a warning received',
      'a choice taken',
      'a sacrifice made',
      'a truth revealed'
    ];

    return references[Math.floor(Math.random() * references.length)];
  }

  /**
   * Generate callback context
   */
  generateCallbackContext() {
    const contexts = [
      'resurfaced at an unexpected moment',
      'proved more important than realized',
      'held the key to understanding',
      'changed everything',
      'came back to haunt',
      'provided the answer',
      'revealed its true meaning',
      'showed its consequences',
      'proved decisive',
      'made all the difference'
    ];

    return contexts[Math.floor(Math.random() * contexts.length)];
  }

  /**
   * Call a callback
   */
  callCallback(callbackId, chapterNumber) {
    const callback = this.callbacks.find(c => c.id === callbackId);
    if (!callback) return null;

    callback.called = true;
    callback.callChapter = chapterNumber;

    return callback;
  }

  /**
   * Get uncalled callbacks
   */
  getUncalledCallbacks() {
    return this.callbacks.filter(c => !c.called);
  }

  /**
   * Get callbacks ready to call
   */
  getCallbacksToCall(chapterNumber, maxCallbacks = 2) {
    const uncalled = this.getUncalledCallbacks();
    
    // Sort by importance and time since establishment
    const sorted = uncalled.sort((a, b) => {
      const aTime = chapterNumber - a.established;
      const bTime = chapterNumber - b.established;
      
      // Prioritize older, more important callbacks
      const aScore = a.importance * 10 + aTime;
      const bScore = b.importance * 10 + bTime;
      
      return bScore - aScore;
    });

    return sorted.slice(0, maxCallbacks);
  }

  /**
   * Generate seamless transition between chapters
   */
  generateTransition(fromChapter, toChapter, context = {}) {
    const transitionTypes = [
      'temporal',
      'narrative',
      'thematic',
      'character',
      'action'
    ];

    const transitionType = transitionTypes[Math.floor(Math.random() * transitionTypes.length)];

    const transitions = {
      temporal: [
        `Hours passed, and the world had changed.`,
        `The sun had set by the time the next chapter began.`,
        `Morning brought new challenges.`,
        `The night passed in uneasy silence.`,
        `Time moved forward, carrying everything with it.`
      ],
      narrative: [
        `The story continued, as stories always do.`,
        `The narrative thread pulled tighter.`,
        `The next chapter unfolded naturally.`,
        `The tale pressed onward.`,
        `The journey continued.`
      ],
      thematic: [
        `The theme shifted, but the essence remained.`,
        `Patterns emerged from the chaos.`,
        `The underlying truth became clearer.`,
        `The pieces of the puzzle aligned.`,
        `The deeper meaning revealed itself.`
      ],
      character: [
        `${context.characterName || 'The protagonist'} carried the weight of what had passed.`,
        `The character's resolve had only strengthened.`,
        `The lessons of the previous chapter remained.`,
        `The growth was undeniable.`,
        `The transformation continued.`
      ],
      action: [
        `The momentum carried forward.`,
        `The action resumed with renewed intensity.`,
        `The stakes had never been higher.`,
        `The conflict escalated.`,
        `The battle continued.`
      ]
    };

    const transitionList = transitions[transitionType] || transitions.narrative;
    return transitionList[Math.floor(Math.random() * transitionList.length)];
  }

  /**
   * Record timeline event
   */
  recordTimelineEvent(chapterNumber, event) {
    if (!this.timeline.has(chapterNumber)) {
      this.timeline.set(chapterNumber, []);
    }

    this.timeline.get(chapterNumber).push({
      event: event,
      timestamp: Date.now()
    });
  }

  /**
   * Get timeline events for chapter
   */
  getTimelineEvents(chapterNumber) {
    return this.timeline.get(chapterNumber) || [];
  }

  /**
   * Check timeline consistency
   */
  checkTimelineConsistency(chapterNumber) {
    const issues = [];

    // Check for contradictions
    const events = this.getTimelineEvents(chapterNumber);
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        if (this.eventsContradict(events[i].event, events[j].event)) {
          issues.push({
            type: 'contradiction',
            event1: events[i].event,
            event2: events[j].event
          });
        }
      }
    }

    return issues;
  }

  /**
   * Check if two events contradict each other
   */
  eventsContradict(event1, event2) {
    const contradictions = [
      ['alive', 'dead'],
      ['present', 'absent'],
      ['true', 'false'],
      ['won', 'lost'],
      ['succeeded', 'failed']
    ];

    for (const [word1, word2] of contradictions) {
      if (event1.toLowerCase().includes(word1) && event2.toLowerCase().includes(word2)) {
        return true;
      }
      if (event2.toLowerCase().includes(word1) && event1.toLowerCase().includes(word2)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Record chapter connection
   */
  recordChapterConnection(fromChapter, toChapter, type, description) {
    this.chapterConnections.push({
      from: fromChapter,
      to: toChapter,
      type: type,
      description: description,
      timestamp: Date.now()
    });
  }

  /**
   * Get chapter connections
   */
  getChapterConnections(chapterNumber) {
    return this.chapterConnections.filter(c => c.from === chapterNumber || c.to === chapterNumber);
  }

  /**
   * Generate continuity summary for chapter
   */
  generateContinuitySummary(chapterNumber) {
    const threads = this.getThreadsToMention(chapterNumber);
    const foreshadows = this.getForeshadowingToReveal(chapterNumber);
    const callbacks = this.getCallbacksToCall(chapterNumber);
    const events = this.getTimelineEvents(chapterNumber);

    return {
      chapter: chapterNumber,
      threadsToMention: threads,
      foreshadowsToReveal: foreshadows,
      callbacksToCall: callbacks,
      timelineEvents: events,
      activeThreads: this.getActiveThreads().length,
      unrevealedForeshadows: this.getUnrevealedForeshadowing().length,
      uncalledCallbacks: this.getUncalledCallbacks().length
    };
  }

  /**
   * Export continuity data
   */
  exportData() {
    return {
      narrativeThreads: Array.from(this.narrativeThreads.entries()),
      foreshadowing: this.foreshadowing,
      callbacks: this.callbacks,
      timeline: Array.from(this.timeline.entries()),
      chapterConnections: this.chapterConnections,
      threadCounter: this.threadCounter
    };
  }

  /**
   * Import continuity data
   */
  importData(data) {
    this.narrativeThreads = new Map(data.narrativeThreads);
    this.foreshadowing = data.foreshadowing;
    this.callbacks = data.callbacks;
    this.timeline = new Map(data.timeline);
    this.chapterConnections = data.chapterConnections;
    this.threadCounter = data.threadCounter;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContinuityEngine;
}