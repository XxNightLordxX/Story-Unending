/**
 * QualityEngine - Content Quality Enhancement System
 * 
 * Features:
 * - Opening hooks
 * - Cliffhanger system
 * - Emotional resonance
 * - Sensory detail enhancement
 * - Dialogue system
 */

class QualityEngine {
  constructor() {
    this.hookTemplates = [];
    this.cliffhangerTemplates = [];
    this.emotionalThemes = [];
    this.sensoryDetails = [];
    this.dialoguePatterns = [];
    
    this.initializeTemplates();
  }

  /**
   * Initialize quality templates
   */
  initializeTemplates() {
    // Opening hooks
    this.hookTemplates = [
      'The world changed in an instant.',
      'Nothing would ever be the same.',
      'The truth was finally revealed.',
      'The moment had arrived.',
      'Everything led to this.',
      'The choice was made.',
      'The battle began.',
      'The secret was out.',
      'The journey continued.',
      'The stakes had never been higher.',
      'The darkness descended.',
      'The light emerged.',
      'The past caught up.',
      'The future arrived.',
      'The transformation was complete.'
    ];

    // Cliffhangers
    this.cliffhangerTemplates = [
      'But the real danger was just beginning.',
      'And then, everything changed.',
      'The truth was more terrifying than imagined.',
      'The battle was far from over.',
      'The consequences would be devastating.',
      'The choice had been made.',
      'The sacrifice was necessary.',
      'The revelation shattered everything.',
      'The enemy was closer than ever.',
      'The power was overwhelming.',
      'The mystery deepened.',
      'The threat was real.',
      'The time had come.',
      'The end was approaching.',
      'The beginning was near.'
    ];

    // Emotional themes
    this.emotionalThemes = [
      'hope and despair',
      'love and loss',
      'triumph and failure',
      'courage and fear',
      'sacrifice and gain',
      'redemption and fall',
      'truth and deception',
      'power and weakness',
      'freedom and bondage',
      'life and death'
    ];

    // Sensory details
    this.sensoryDetails = {
      sight: [
        'The light danced across the surface.',
        'Shadows stretched long and thin.',
        'Colors swirled in impossible patterns.',
        'The world seemed to shimmer.',
        'Everything was bathed in golden light.',
        'Darkness pressed in from all sides.',
        'The scene was etched in memory.',
        'Vision blurred and cleared.',
        'The image burned into the mind.',
        'Reality seemed to bend.'
      ],
      sound: [
        'The silence was deafening.',
        'Voices echoed in the distance.',
        'The sound was unmistakable.',
        'Music filled the air.',
        'The noise was overwhelming.',
        'Whispers carried on the wind.',
        'The rhythm was hypnotic.',
        'Thunder rolled overhead.',
        'The melody was haunting.',
        'The cacophony was chaotic.'
      ],
      smell: [
        'The scent was intoxicating.',
        'Aroma filled the senses.',
        'The smell was unmistakable.',
        'Fragrance drifted through the air.',
        'The odor was overpowering.',
        'Perfume lingered.',
        'The stench was unbearable.',
        'Fresh air rushed in.',
        'The aroma was nostalgic.',
        'The scent was foreign.'
      ],
      touch: [
        'The texture was rough against the skin.',
        'Smooth surfaces gleamed.',
        'The touch was electric.',
        'Cold bit into the flesh.',
        'Warmth spread through.',
        'The surface was slippery.',
        'The grip was firm.',
        'Softness enveloped.',
        'The contact was jarring.',
        'The sensation was overwhelming.'
      ],
      taste: [
        'The flavor was exquisite.',
        'Bitterness filled the mouth.',
        'Sweetness lingered.',
        'The taste was unfamiliar.',
        'Sourness puckered.',
        'The flavor was nostalgic.',
        'Spice burned.',
        'The taste was metallic.',
        'Savory notes emerged.',
        'The flavor was complex.'
      ]
    };

    // Dialogue patterns
    this.dialoguePatterns = {
      confrontation: [
        '"You shouldn\'t have come here," they said.',
        '"This ends now," the declaration came.',
        '"I\'ve been waiting for this moment," the voice was cold.',
        '"You\'ll regret this," the warning was clear.',
        '"The time has come," the statement was final.'
      ],
      revelation: [
        '"The truth is..." the voice trembled.',
        '"I never told anyone," the confession began.',
        '"You need to know," the urgency was clear.',
        '"The secret is..." the words hung in the air.',
        '"What I\'m about to say will change everything," the warning came.'
      ],
      comfort: [
        '"It\'s going to be okay," the assurance was gentle.',
        '"I\'m here for you," the promise was sincere.',
        '"You\'re not alone," the reminder was comforting.',
        '"We\'ll get through this together," the solidarity was clear.',
        '"Everything will work out," the hope was evident.'
      ],
      challenge: [
        '"Prove yourself," the demand was clear.',
        '"Show me what you\'ve got," the challenge was issued.',
        '"Can you handle this?" the question hung in the air.',
        '"The test begins now," the announcement was made.',
        '"Let\'s see what you\'re made of," the invitation was extended.'
      ],
      mystery: [
        '"There\'s something you should know," the hint was dropped.',
        '"The truth is more complicated," the revelation began.',
        '"Not everything is as it seems," the warning was cryptic.',
        '"The pieces don\'t fit," the observation was made.',
        '"There\'s more to this story," the implication was clear.'
      ]
    };
  }

  /**
   * Generate opening hook
   */
  generateOpeningHook(context = {}) {
    const hooks = [...this.hookTemplates];

    // Add context-specific hooks
    if (context.combat) {
      hooks.push('The battle began without warning.');
      hooks.push('Steel met steel in a clash of wills.');
      hooks.push('The enemy emerged from the shadows.');
    }

    if (context.mystery) {
      hooks.push('The truth was hidden in plain sight.');
      hooks.push('Something didn\'t add up.');
      hooks.push('The mystery deepened.');
    }

    if (context.emotion) {
      hooks.push('The weight of the moment was crushing.');
      hooks.push('Emotions surged like a tide.');
      hooks.push('The heart raced with anticipation.');
    }

    return hooks[Math.floor(Math.random() * hooks.length)];
  }

  /**
   * Generate cliffhanger
   */
  generateCliffhanger(context = {}) {
    const cliffhangers = [...this.cliffhangerTemplates];

    // Add context-specific cliffhangers
    if (context.danger) {
      cliffhangers.push('The danger was far from over.');
      cliffhangers.push('The threat was closing in.');
      cliffhangers.push('Survival was not guaranteed.');
    }

    if (context.mystery) {
      cliffhangers.push('The answer was just out of reach.');
      cliffhangers.push('The truth was more terrifying than imagined.');
      cliffhangers.push('The mystery had only deepened.');
    }

    if (context.revelation) {
      cliffhangers.push('The revelation changed everything.');
      cliffhangers.push('The truth was finally revealed.');
      cliffhangers.push('Nothing would ever be the same.');
    }

    return cliffhangers[Math.floor(Math.random() * cliffhangers.length)];
  }

  /**
   * Generate emotional resonance
   */
  generateEmotionalResonance(context = {}) {
    const themes = [...this.emotionalThemes];

    // Add context-specific themes
    if (context.tragedy) {
      themes.push('grief and loss');
      themes.push('sorrow and pain');
      themes.push('heartbreak and despair');
    }

    if (context.triumph) {
      themes.push('victory and glory');
      themes.push('success and achievement');
      themes.push('triumph and celebration');
    }

    if (context.conflict) {
      themes.push('struggle and perseverance');
      themes.push('battle and sacrifice');
      themes.push('conflict and resolution');
    }

    const theme = themes[Math.floor(Math.random() * themes.length)];

    const resonanceTemplates = [
      `The moment was defined by ${theme}.`,
      `${theme.charAt(0).toUpperCase() + theme.slice(1)} filled the air.`,
      `The essence of ${theme} was undeniable.`,
      `In that moment, ${theme} was everything.`,
      `The weight of ${theme} pressed down.`,
      `${theme.charAt(0).toUpperCase() + theme.slice(1)} surged through.`,
      `The experience was marked by ${theme}.`,
      `The feeling of ${theme} was overwhelming.`,
      `${theme.charAt(0).toUpperCase() + theme.slice(1)} colored everything.`,
      `The truth of ${theme} was revealed.`
    ];

    return resonanceTemplates[Math.floor(Math.random() * resonanceTemplates.length)];
  }

  /**
   * Generate sensory details
   */
  generateSensoryDetails(context = {}) {
    const senses = ['sight', 'sound', 'smell', 'touch', 'taste'];
    const selectedSenses = [];

    // Randomly select 2-3 senses
    const numSenses = Math.floor(Math.random() * 2) + 2;
    const availableSenses = [...senses];

    while (selectedSenses.length < numSenses && availableSenses.length > 0) {
      const index = Math.floor(Math.random() * availableSenses.length);
      selectedSenses.push(availableSenses[index]);
      availableSenses.splice(index, 1);
    }

    const details = [];
    for (const sense of selectedSenses) {
      const senseDetails = this.sensoryDetails[sense];
      const detail = senseDetails[Math.floor(Math.random() * senseDetails.length)];
      details.push(detail);
    }

    return details;
  }

  /**
   * Generate dialogue
   */
  generateDialogue(speaker, type, context = {}) {
    const patterns = this.dialoguePatterns[type] || this.dialoguePatterns.mystery;
    const template = patterns[Math.floor(Math.random() * patterns.length)];

    // Replace generic references with speaker name
    let dialogue = template.replace(/they said|the voice|the declaration|the warning|the statement|the confession|the assurance|the promise|the reminder|the demand|the challenge|the question|the announcement|the invitation|the hint|the observation|the implication/gi, `${speaker} said`);

    return dialogue;
  }

  /**
   * Enhance paragraph with quality elements
   */
  enhanceParagraph(paragraph, options = {}) {
    let enhanced = paragraph;

    // Add opening hook if requested
    if (options.addHook && !options.hookAdded) {
      const hook = this.generateOpeningHook(options.context);
      enhanced = `${hook} ${enhanced.charAt(0).toLowerCase()}${enhanced.slice(1)}`;
      options.hookAdded = true;
    }

    // Add sensory details if requested
    if (options.addSensory && Math.random() < 0.3) {
      const details = this.generateSensoryDetails(options.context);
      const detail = details[Math.floor(Math.random() * details.length)];
      enhanced = `${enhanced} ${detail}`;
    }

    // Add emotional resonance if requested
    if (options.addEmotion && Math.random() < 0.2) {
      const emotion = this.generateEmotionalResonance(options.context);
      enhanced = `${enhanced} ${emotion}`;
    }

    // Add dialogue if requested
    if (options.addDialogue && Math.random() < 0.15) {
      const speaker = options.speaker || 'a voice';
      const type = options.dialogueType || 'mystery';
      const dialogue = this.generateDialogue(speaker, type, options.context);
      enhanced = `${enhanced} ${dialogue}`;
    }

    return enhanced;
  }

  /**
   * Generate engaging opening for chapter
   */
  generateChapterOpening(context = {}) {
    const hook = this.generateOpeningHook(context);
    const details = this.generateSensoryDetails(context);
    const emotion = this.generateEmotionalResonance(context);

    return `${hook} ${details[0] || ''} ${emotion}`;
  }

  /**
   * Generate compelling closing for chapter
   */
  generateChapterClosing(context = {}) {
    const cliffhanger = this.generateCliffhanger(context);
    const emotion = this.generateEmotionalResonance(context);

    return `${emotion} ${cliffhanger}`;
  }

  /**
   * Generate dialogue scene
   */
  generateDialogueScene(speakers, type, context = {}) {
    const numExchanges = Math.floor(Math.random() * 3) + 2; // 2-4 exchanges
    const scene = [];

    for (let i = 0; i < numExchanges; i++) {
      const speaker = speakers[i % speakers.length];
      const dialogue = this.generateDialogue(speaker, type, context);
      scene.push(dialogue);
    }

    return scene.join(' ');
  }

  /**
   * Generate action scene
   */
  generateActionScene(context = {}) {
    const actions = [
      'The attack came without warning.',
      'Reflexes took over.',
      'The battle was joined.',
      'Steel met steel.',
      'The clash was deafening.',
      'Movement was a blur.',
      'The strike landed true.',
      'The enemy fell back.',
      'The advantage shifted.',
      'The fight continued.'
    ];

    const numActions = Math.floor(Math.random() * 3) + 2; // 2-3 actions
    const scene = [];

    for (let i = 0; i < numActions; i++) {
      const action = actions[Math.floor(Math.random() * actions.length)];
      scene.push(action);
    }

    return scene.join(' ');
  }

  /**
   * Generate introspection scene
   */
  generateIntrospectionScene(context = {}) {
    const thoughts = [
      'The weight of the moment settled in.',
      'Questions without answers filled the mind.',
      'The truth was hard to accept.',
      'The path forward was unclear.',
      'The past refused to stay buried.',
      'The future was uncertain.',
      'The choice had been made.',
      'The consequences were inevitable.',
      'The meaning was elusive.',
      'The purpose remained unclear.'
    ];

    const numThoughts = Math.floor(Math.random() * 3) + 2; // 2-3 thoughts
    const scene = [];

    for (let i = 0; i < numThoughts; i++) {
      const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
      scene.push(thought);
    }

    return scene.join(' ');
  }

  /**
   * Get quality statistics
   */
  getQualityStatistics() {
    return {
      hookTemplates: this.hookTemplates.length,
      cliffhangerTemplates: this.cliffhangerTemplates.length,
      emotionalThemes: this.emotionalThemes.length,
      sensoryDetails: Object.keys(this.sensoryDetails).length,
      dialoguePatterns: Object.keys(this.dialoguePatterns).length
    };
  }

  /**
   * Export quality data
   */
  exportData() {
    return {
      hookTemplates: this.hookTemplates,
      cliffhangerTemplates: this.cliffhangerTemplates,
      emotionalThemes: this.emotionalThemes,
      sensoryDetails: this.sensoryDetails,
      dialoguePatterns: this.dialoguePatterns
    };
  }

  /**
   * Import quality data
   */
  importData(data) {
    this.hookTemplates = data.hookTemplates || this.hookTemplates;
    this.cliffhangerTemplates = data.cliffhangerTemplates || this.cliffhangerTemplates;
    this.emotionalThemes = data.emotionalThemes || this.emotionalThemes;
    this.sensoryDetails = data.sensoryDetails || this.sensoryDetails;
    this.dialoguePatterns = data.dialoguePatterns || this.dialoguePatterns;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QualityEngine;
}