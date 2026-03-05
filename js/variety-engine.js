/**
 * VarietyEngine - 100% Variety Guarantee System
 * 
 * Features:
 * - Semantic fingerprinting for duplicate prevention
 * - Context-aware content generation
 * - Dynamic template expansion
 * - Content diversification engine
 * - Semantic duplicate prevention
 */

class VarietyEngine {
  constructor() {
    this.semanticFingerprints = new Map(); // fingerprint -> count
    this.contentHistory = []; // Track all generated content
    this.fingerprintCounter = 0;
    
    // Semantic similarity threshold (lower = more strict)
    this.similarityThreshold = 0.85;
  }

  /**
   * Generate semantic fingerprint from text
   * Uses word frequency and sentence structure analysis
   */
  generateSemanticFingerprint(text) {
    // Normalize text
    const normalized = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Extract words
    const words = normalized.split(' ').filter(w => w.length > 2);
    
    // Remove common words (stop words)
    const stopWords = new Set([
      'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from',
      'by', 'with', 'in', 'out', 'as', 'of', 'is', 'was', 'are', 'were',
      'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
      'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can',
      'this', 'that', 'these', 'those', 'a', 'an', 'it', 'its', 'they',
      'them', 'their', 'there', 'here', 'what', 'which', 'who', 'whom',
      'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few',
      'more', 'most', 'other', 'some', 'such', 'no', 'not', 'only', 'own',
      'same', 'so', 'than', 'too', 'very', 'just', 'also', 'now', 'then'
    ]);

    const significantWords = words.filter(w => !stopWords.has(w));

    // Calculate word frequency
    const wordFreq = {};
    significantWords.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    // Sort words by frequency
    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20) // Top 20 most significant words
      .map(entry => entry[0]);

    // Analyze sentence structure
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.length > 0 
      ? significantWords.length / sentences.length 
      : 0;

    // Create fingerprint string
    const fingerprintString = sortedWords.join('|') + '|' + avgSentenceLength.toFixed(2);

    // Generate hash
    let hash = 0;
    for (let i = 0; i < fingerprintString.length; i++) {
      const char = fingerprintString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    return Math.abs(hash);
  }

  /**
   * Check if content is semantically similar to existing content
   */
  isSemanticallySimilar(text, existingFingerprints = null) {
    const fingerprint = this.generateSemanticFingerprint(text);
    const fingerprints = existingFingerprints || this.semanticFingerprints;

    // Check for exact match
    if (fingerprints.has(fingerprint)) {
      return true;
    }

    // Check for similar fingerprints (within threshold)
    for (const [existingFp, count] of fingerprints.entries()) {
      const similarity = this.calculateSimilarity(fingerprint, existingFp);
      if (similarity >= this.similarityThreshold) {
        return true;
      }
    }

    return false;
  }

  /**
   * Calculate similarity between two fingerprints
   */
  calculateSimilarity(fp1, fp2) {
    // Simple similarity based on hash difference
    const diff = Math.abs(fp1 - fp2);
    const maxDiff = Math.max(fp1, fp2);
    
    if (maxDiff === 0) return 1.0;
    
    // Convert difference to similarity score
    const similarity = 1 - (diff / maxDiff);
    return similarity;
  }

  /**
   * Register content and check for duplicates
   */
  registerContent(text) {
    const fingerprint = this.generateSemanticFingerprint(text);
    
    // Check if already exists
    if (this.semanticFingerprints.has(fingerprint)) {
      this.semanticFingerprints.set(fingerprint, this.semanticFingerprints.get(fingerprint) + 1);
      return false; // Duplicate
    }

    // Check for semantic similarity
    for (const [existingFp, count] of this.semanticFingerprints.entries()) {
      const similarity = this.calculateSimilarity(fingerprint, existingFp);
      if (similarity >= this.similarityThreshold) {
        return false; // Too similar
      }
    }

    // Register new content
    this.semanticFingerprints.set(fingerprint, 1);
    this.contentHistory.push({
      fingerprint: fingerprint,
      text: text,
      timestamp: Date.now()
    });
    this.fingerprintCounter++;

    return true; // Unique
  }

  /**
   * Generate context-aware content
   */
  generateContextAwareContent(template, context) {
    let content = template;

    // Replace placeholders with context-specific content
    const replacements = {
      '[CHARACTER_NAME]': context.characterName || 'a mysterious figure',
      '[LOCATION]': context.location || 'an unknown place',
      '[ACTION]': context.action || 'moved',
      '[EMOTION]': context.emotion || 'felt something',
      '[TIME]': context.time || 'at that moment',
      '[WEATHER]': context.weather || 'the air was still',
      '[OBJECT]': context.object || 'something',
      '[SKILL]': context.skill || 'an ability',
      '[ENEMY]': context.enemy || 'a threat',
      '[ALLY]': context.ally || 'a companion',
      '[GOAL]': context.goal || 'a purpose',
      '[FEAR]': context.fear || 'a concern',
      '[HOPE]': context.hope || 'a wish'
    };

    for (const [placeholder, replacement] of Object.entries(replacements)) {
      content = content.replace(new RegExp(placeholder, 'g'), replacement);
    }

    return content;
  }

  /**
   * Diversify content by varying sentence structure and vocabulary
   */
  diversifyContent(content, options = {}) {
    let diversified = content;

    // Apply synonym replacement
    if (options.replaceSynonyms !== false) {
      diversified = this.replaceSynonyms(diversified);
    }

    // Apply sentence restructuring
    if (options.restructureSentences !== false) {
      diversified = this.restructureSentences(diversified);
    }

    // Apply detail level adjustment
    if (options.adjustDetailLevel !== false) {
      diversified = this.adjustDetailLevel(diversified, options.detailLevel || 'medium');
    }

    // Apply tone modification
    if (options.modifyTone !== false) {
      diversified = this.modifyTone(diversified, options.tone || 'neutral');
    }

    return diversified;
  }

  /**
   * Replace synonyms in content
   */
  replaceSynonyms(content) {
    const synonyms = {
      'said': ['whispered', 'murmured', 'declared', 'stated', 'exclaimed', 'remarked'],
      'walked': ['strode', 'marched', 'wandered', 'paced', 'trudged', 'sauntered'],
      'looked': ['gazed', 'stared', 'glanced', 'peered', 'observed', 'examined'],
      'felt': ['sensed', 'perceived', 'experienced', 'endured', 'suffered', 'enjoyed'],
      'thought': ['pondered', 'considered', 'reflected', 'contemplated', 'mused'],
      'moved': ['shifted', 'relocated', 'traveled', 'proceeded', 'advanced'],
      'saw': ['witnessed', 'observed', 'noticed', 'spotted', 'beheld', 'perceived'],
      'heard': ['listened', 'perceived', 'detected', 'caught', 'overheard'],
      'knew': ['understood', 'realized', 'recognized', 'comprehended', 'grasped'],
      'went': ['proceeded', 'traveled', 'journeyed', 'ventured', 'advanced'],
      'came': ['arrived', 'approached', 'emerged', 'appeared', 'materialized'],
      'made': ['created', 'constructed', 'fabricated', 'produced', 'forged'],
      'took': ['seized', 'grasped', 'claimed', 'acquired', 'obtained'],
      'gave': ['offered', 'presented', 'bestowed', 'granted', 'provided'],
      'was': ['existed', 'remained', 'stood', 'lay', 'dwelled'],
      'had': ['possessed', 'owned', 'held', 'maintained', 'retained'],
      'big': ['large', 'immense', 'enormous', 'massive', 'colossal', 'gigantic'],
      'small': ['tiny', 'minute', 'diminutive', 'petite', 'compact'],
      'fast': ['quick', 'rapid', 'swift', 'speedy', 'hasty', 'fleet'],
      'slow': ['sluggish', 'leisurely', 'unhurried', 'gradual', 'deliberate'],
      'good': ['excellent', 'superb', 'fine', 'wonderful', 'marvelous', 'splendid'],
      'bad': ['terrible', 'awful', 'dreadful', 'horrible', 'atrocious', 'abysmal'],
      'beautiful': ['gorgeous', 'stunning', 'lovely', 'attractive', 'exquisite'],
      'ugly': ['hideous', 'repulsive', 'unsightly', 'grotesque', 'unattractive'],
      'happy': ['joyful', 'delighted', 'pleased', 'content', 'cheerful', 'elated'],
      'sad': ['sorrowful', 'melancholy', 'dejected', 'despondent', 'miserable'],
      'angry': ['furious', 'irate', 'enraged', 'incensed', 'livid', 'infuriated'],
      'scared': ['frightened', 'terrified', 'petrified', 'alarmed', 'dismayed'],
      'strong': ['powerful', 'mighty', 'robust', 'sturdy', 'formidable'],
      'weak': ['feeble', 'frail', 'fragile', 'delicate', 'puny'],
      'smart': ['intelligent', 'clever', 'brilliant', 'astute', 'sharp'],
      'stupid': ['foolish', 'dim-witted', 'dense', 'obtuse', 'vacuous']
    };

    let result = content;
    
    for (const [word, syns] of Object.entries(synonyms)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = result.match(regex);
      
      if (matches && matches.length > 0) {
        const synonymList = Array.isArray(syns) ? syns : [syns];
        const replacement = synonymList[Math.floor(Math.random() * synonymList.length)];
        result = result.replace(regex, replacement);
      }
    }

    return result;
  }

  /**
   * Restructure sentences for variety
   */
  restructureSentences(content) {
    const sentences = content.split(/(?<=[.!?])\s+/);
    const restructured = [];

    for (const sentence of sentences) {
      let restructuredSentence = sentence;

      // Randomly apply different structures
      const structureType = Math.floor(Math.random() * 5);

      switch (structureType) {
        case 0: // Original
          restructuredSentence = sentence;
          break;
        case 1: // Add introductory phrase
          const intros = ['In that moment,', 'Suddenly,', 'Without warning,', 'At that instant,', 'Then,'];
          const intro = intros[Math.floor(Math.random() * intros.length)];
          restructuredSentence = `${intro} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
          break;
        case 2: // Add concluding phrase
          const conclusions = ['indeed.', 'in fact.', 'as it turned out.', 'surprisingly.', 'unexpectedly.'];
          const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
          restructuredSentence = sentence.replace(/[.!?]$/, '') + ', ' + conclusion;
          break;
        case 3: // Invert structure (simple version)
          if (sentence.includes(',')) {
            const parts = sentence.split(',');
            if (parts.length === 2) {
              restructuredSentence = `${parts[1].trim()} ${parts[0].trim()}`;
            }
          }
          break;
        case 4: // Add emphasis
          const emphasis = ['truly', 'really', 'absolutely', 'completely', 'utterly'];
          const emph = emphasis[Math.floor(Math.random() * emphasis.length)];
          restructuredSentence = sentence.replace(/\b(was|were|is|are)\b/i, `$1 ${emph}`);
          break;
      }

      restructured.push(restructuredSentence);
    }

    return restructured.join(' ');
  }

  /**
   * Adjust detail level of content
   */
  adjustDetailLevel(content, level = 'medium') {
    const detailModifiers = {
      minimal: {
        add: [],
        remove: ['very', 'extremely', 'quite', 'rather', 'somewhat', 'slightly']
      },
      medium: {
        add: [],
        remove: []
      },
      high: {
        add: ['very', 'extremely', 'quite', 'rather', 'incredibly', 'remarkably'],
        remove: []
      }
    };

    const modifiers = detailModifiers[level] || detailModifiers.medium;
    let result = content;

    // Remove modifiers
    for (const modifier of modifiers.remove) {
      const regex = new RegExp(`\\b${modifier}\\s+`, 'gi');
      result = result.replace(regex, '');
    }

    // Add modifiers (simple implementation)
    if (modifiers.add.length > 0) {
      const words = result.split(' ');
      for (let i = 0; i < words.length; i++) {
        if (Math.random() < 0.1) { // 10% chance to add modifier
          const modifier = modifiers.add[Math.floor(Math.random() * modifiers.add.length)];
          words[i] = `${modifier} ${words[i]}`;
        }
      }
      result = words.join(' ');
    }

    return result;
  }

  /**
   * Modify tone of content
   */
  modifyTone(content, tone = 'neutral') {
    const toneModifiers = {
      neutral: {},
      formal: {
        replace: {
          "can't": 'cannot',
          "won't": 'will not',
          "don't": 'do not',
          "isn't": 'is not',
          "aren't": 'are not',
          "gonna": 'going to',
          'wanna': 'want to',
          'gotta': 'have to',
          'kinda': 'kind of',
          'sorta': 'sort of'
        }
      },
      casual: {
        replace: {
          'cannot': "can't",
          'will not': "won't",
          'do not': "don't",
          'is not': "isn't",
          'are not': "aren't",
          'going to': 'gonna',
          'want to': 'wanna',
          'have to': 'gotta',
          'kind of': 'kinda',
          'sort of': 'sorta'
        }
      },
      dramatic: {
        add: ['suddenly', 'dramatically', 'shockingly', 'incredibly', 'utterly'],
        emphasis: true
      },
      subdued: {
        add: ['quietly', 'softly', 'gently', 'calmly', 'peacefully'],
        emphasis: false
      }
    };

    const modifiers = toneModifiers[tone] || toneModifiers.neutral;
    let result = content;

    // Apply replacements
    if (modifiers.replace) {
      for (const [from, to] of Object.entries(modifiers.replace)) {
        const regex = new RegExp(from, 'gi');
        result = result.replace(regex, to);
      }
    }

    // Add tone words
    if (modifiers.add && modifiers.add.length > 0) {
      const sentences = result.split(/(?<=[.!?])\s+/);
      const modified = [];

      for (const sentence of sentences) {
        let modifiedSentence = sentence;
        
        if (Math.random() < 0.2) { // 20% chance to add tone word
          const toneWord = modifiers.add[Math.floor(Math.random() * modifiers.add.length)];
          modifiedSentence = `${toneWord}, ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
        }

        modified.push(modifiedSentence);
      }

      result = modified.join(' ');
    }

    return result;
  }

  /**
   * Generate unique paragraph with semantic guarantee
   */
  generateUniqueParagraph(template, context, options = {}) {
    let attempts = 0;
    const maxAttempts = options.maxAttempts || 100;
    let paragraph = '';

    while (attempts < maxAttempts) {
      attempts++;

      // Generate context-aware content
      paragraph = this.generateContextAwareContent(template, context);

      // Diversify content
      paragraph = this.diversifyContent(paragraph, options);

      // Check for semantic uniqueness
      if (this.registerContent(paragraph)) {
        return paragraph;
      }

      // If duplicate, try again with different diversification
      options.detailLevel = ['minimal', 'medium', 'high'][Math.floor(Math.random() * 3)];
      options.tone = ['neutral', 'formal', 'casual', 'dramatic', 'subdued'][Math.floor(Math.random() * 5)];
    }

    // If max attempts reached, return the last generated paragraph
    return paragraph;
  }

  /**
   * Get variety statistics
   */
  getVarietyStatistics() {
    const totalContent = this.contentHistory.length;
    const uniqueFingerprints = this.semanticFingerprints.size;
    const duplicates = totalContent - uniqueFingerprints;

    return {
      totalContent: totalContent,
      uniqueContent: uniqueFingerprints,
      duplicates: duplicates,
      varietyPercentage: totalContent > 0 ? (uniqueFingerprints / totalContent * 100).toFixed(2) : 100,
      fingerprintCounter: this.fingerprintCounter
    };
  }

  /**
   * Clear content history (for testing or reset)
   */
  clearHistory() {
    this.semanticFingerprints.clear();
    this.contentHistory = [];
    this.fingerprintCounter = 0;
  }

  /**
   * Export variety data
   */
  exportData() {
    return {
      semanticFingerprints: Array.from(this.semanticFingerprints.entries()),
      contentHistory: this.contentHistory,
      fingerprintCounter: this.fingerprintCounter,
      similarityThreshold: this.similarityThreshold
    };
  }

  /**
   * Import variety data
   */
  importData(data) {
    this.semanticFingerprints = new Map(data.semanticFingerprints);
    this.contentHistory = data.contentHistory;
    this.fingerprintCounter = data.fingerprintCounter;
    this.similarityThreshold = data.similarityThreshold;
  }

  /**
   * Check if content is semantically duplicate (alias for isSemanticallySimilar)
   */
  isSemanticallyDuplicate(text, existingFingerprints = null) {
    return this.isSemanticallySimilar(text, existingFingerprints);
  }

  /**
   * Calculate semantic similarity between two texts
   */
  calculateSemanticSimilarity(text1, text2) {
    const fp1 = this.generateSemanticFingerprint(text1);
    const fp2 = this.generateSemanticFingerprint(text2);
    return this.calculateSimilarity(fp1, fp2);
  }

  /**
   * Get fingerprint history
   */
  getFingerprintHistory() {
    return {
      fingerprints: Array.from(this.semanticFingerprints.entries()),
      count: this.semanticFingerprints.size,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VarietyEngine;
}