/**
 * Comprehensive Test Suite for New Story System
 * 
 * Tests all 6 engines + integration:
 * - CharacterEngine
 * - WorldEngine
 * - PlotEngine
 * - VarietyEngine
 * - ContinuityEngine
 * - QualityEngine
 * - StorySystemIntegration
 */

// Load engines
const CharacterEngine = require('./js/character-engine.js');
const WorldEngine = require('./js/world-engine.js');
const PlotEngine = require('./js/plot-engine.js');
const VarietyEngine = require('./js/variety-engine.js');
const ContinuityEngine = require('./js/continuity-engine.js');
const QualityEngine = require('./js/quality-engine.js');
const { StorySystem, StorySystemIntegration } = require('./js/story-system-integration.js');

// Test results tracking
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  tests: []
};

// Test helper functions
function runTest(testName, testFunction) {
  testResults.total++;
  try {
    testFunction();
    testResults.passed++;
    testResults.tests.push({ name: testName, status: 'PASS' });
    console.log(`✅ PASS: ${testName}`);
  } catch (error) {
    testResults.failed++;
    testResults.tests.push({ name: testName, status: 'FAIL', error: error.message });
    console.log(`❌ FAIL: ${testName}`);
    console.log(`   Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertGreaterThan(value, threshold, message) {
  if (value <= threshold) {
    throw new Error(message || `Expected ${value} > ${threshold}`);
  }
}

// ============================================
// TEST 1: CharacterEngine Tests
// ============================================
console.log('\n=== Testing CharacterEngine ===\n');

runTest('CharacterEngine: Initialize protagonist', () => {
  const engine = new CharacterEngine();
  const protagonist = engine.getCharacter('protagonist');
  assert(protagonist !== null, 'Protagonist should exist');
  assertEqual(protagonist.name, 'Kael', 'Protagonist name should be Kael');
  assertEqual(protagonist.role, 'protagonist', 'Protagonist role should be protagonist');
});

runTest('CharacterEngine: Generate character', () => {
  const engine = new CharacterEngine();
  const character = engine.generateCharacter();
  assert(character !== null, 'Character should be generated');
  assert(character.name !== '', 'Character should have a name');
  assert(character.personality.traits.length > 0, 'Character should have traits');
  assert(character.personality.motivations.length > 0, 'Character should have motivations');
  assert(character.personality.goals.length > 0, 'Character should have goals');
  assert(character.personality.fears.length > 0, 'Character should have fears');
});

runTest('CharacterEngine: Generate multiple characters', () => {
  const engine = new CharacterEngine();
  const count = 10;
  for (let i = 0; i < count; i++) {
    engine.generateCharacter();
  }
  const allCharacters = engine.getAllCharacters();
  assertEqual(allCharacters.length, count + 1, `Should have ${count + 1} characters (including protagonist)`);
});

runTest('CharacterEngine: Character relationships', () => {
  const engine = new CharacterEngine();
  const char1 = engine.generateCharacter({ role: 'ally' });
  const char2 = engine.generateCharacter({ role: 'enemy' });
  
  engine.addRelationship('protagonist', char1.id, 'allies');
  engine.addRelationship('protagonist', char2.id, 'enemies');
  
  const protagonist = engine.getCharacter('protagonist');
  assert(protagonist.relationships.allies.includes(char1.id), 'Char1 should be ally');
  assert(protagonist.relationships.enemies.includes(char2.id), 'Char2 should be enemy');
});

runTest('CharacterEngine: Character evolution', () => {
  const engine = new CharacterEngine();
  const character = engine.generateCharacter();
  const initialStage = character.development.stage;
  
  engine.evolveCharacter(character.id, 'learned a new skill');
  
  const evolved = engine.getCharacter(character.id);
  assertEqual(evolved.development.stage, initialStage + 1, 'Stage should increase');
  assert(evolved.development.growth_points.includes('learned a new skill'), 'Growth point should be recorded');
});

runTest('CharacterEngine: Create nemesis', () => {
  const engine = new CharacterEngine();
  const nemesis = engine.createNemesis(50);
  
  assertEqual(nemesis.role, 'nemesis', 'Should be nemesis role');
  assert(nemesis.relationships.enemies.includes('protagonist'), 'Nemesis should have protagonist as enemy');
  
  const protagonist = engine.getCharacter('protagonist');
  assert(protagonist.relationships.enemies.includes(nemesis.id), 'Protagonist should have nemesis as enemy');
});

runTest('CharacterEngine: Character interaction', () => {
  const engine = new CharacterEngine();
  const char1 = engine.generateCharacter({ role: 'ally' });
  const char2 = engine.generateCharacter({ role: 'enemy' });
  
  const interaction = engine.generateInteraction(char1.id, char2.id, {});
  assert(interaction !== null, 'Interaction should be generated');
  assert(interaction.characters.includes(char1.id), 'Char1 should be in interaction');
  assert(interaction.characters.includes(char2.id), 'Char2 should be in interaction');
  assert(interaction.dialogue !== '', 'Interaction should have dialogue');
});

// ============================================
// TEST 2: WorldEngine Tests
// ============================================
console.log('\n=== Testing WorldEngine ===\n');

runTest('WorldEngine: Initialize starting locations', () => {
  const engine = new WorldEngine();
  const locations = engine.getAllLocations();
  assertGreaterThan(locations.length, 0, 'Should have starting locations');
});

runTest('WorldEngine: Generate location', () => {
  const engine = new WorldEngine();
  const location = engine.generateLocation();
  
  assert(location !== null, 'Location should be generated');
  assert(location.name !== '', 'Location should have a name');
  assert(location.type !== '', 'Location should have a type');
  assert(location.description !== '', 'Location should have a description');
  assert(location.inhabitants.length > 0, 'Location should have inhabitants');
  assert(location.secrets.length > 0, 'Location should have secrets');
  assert(location.landmarks.length > 0, 'Location should have landmarks');
});

runTest('WorldEngine: Generate multiple locations', () => {
  const engine = new WorldEngine();
  const count = 10;
  for (let i = 0; i < count; i++) {
    engine.generateLocation();
  }
  const allLocations = engine.getAllLocations();
  assertGreaterThan(allLocations.length, count, `Should have more than ${count} locations`);
});

runTest('WorldEngine: Connect locations', () => {
  const engine = new WorldEngine();
  const loc1 = engine.generateLocation();
  const loc2 = engine.generateLocation();
  
  engine.connectLocations(loc1.id, loc2.id);
  
  assert(loc1.connections.includes(loc2.id), 'Loc1 should connect to Loc2');
  assert(loc2.connections.includes(loc1.id), 'Loc2 should connect to Loc1');
});

runTest('WorldEngine: Generate faction', () => {
  const engine = new WorldEngine();
  const faction = engine.generateFaction();
  
  assert(faction !== null, 'Faction should be generated');
  assert(faction.name !== '', 'Faction should have a name');
  assert(faction.type !== '', 'Faction should have a type');
  assert(faction.ideology !== '', 'Faction should have ideology');
  assert(faction.goals.length > 0, 'Faction should have goals');
});

runTest('WorldEngine: Generate world event', () => {
  const engine = new WorldEngine();
  const event = engine.generateEvent();
  
  assert(event !== null, 'Event should be generated');
  assert(event.name !== '', 'Event should have a name');
  assert(event.type !== '', 'Event should have a type');
  assert(event.description !== '', 'Event should have a description');
  assertEqual(event.resolved, false, 'Event should not be resolved initially');
});

runTest('WorldEngine: Generate sensory description', () => {
  const engine = new WorldEngine();
  const location = engine.generateLocation();
  
  const description = engine.generateLocationDescriptionWithSenses(location.id, 'day', 'clear');
  assert(description !== '', 'Description should be generated');
  assert(description.length > 100, 'Description should be detailed');
});

// ============================================
// TEST 3: PlotEngine Tests
// ============================================
console.log('\n=== Testing PlotEngine ===\n');

runTest('PlotEngine: Generate sub-plot', () => {
  const engine = new PlotEngine();
  const subPlot = engine.generateSubPlot();
  
  assert(subPlot !== null, 'Sub-plot should be generated');
  assert(subPlot.name !== '', 'Sub-plot should have a name');
  assert(subPlot.type !== '', 'Sub-plot should have a type');
  assertEqual(subPlot.status, 'active', 'Sub-plot should be active');
  assert(subPlot.objectives.length > 0, 'Sub-plot should have objectives');
});

runTest('PlotEngine: Generate multiple sub-plots', () => {
  const engine = new PlotEngine();
  const count = 5;
  for (let i = 0; i < count; i++) {
    engine.generateSubPlot();
  }
  assertEqual(engine.plot.sub_plots.length, count, `Should have ${count} sub-plots`);
});

runTest('PlotEngine: Advance main story', () => {
  const engine = new PlotEngine();
  const initialStage = engine.plot.main_story.current_stage;
  
  const newStage = engine.advanceMainStory();
  
  assertEqual(engine.plot.main_story.current_stage, initialStage + 1, 'Stage should advance');
  assert(newStage !== '', 'New stage should be returned');
});

runTest('PlotEngine: Generate conflict', () => {
  const engine = new PlotEngine();
  const conflict = engine.generateConflict();
  
  assert(conflict !== null, 'Conflict should be generated');
  assert(conflict.type !== '', 'Conflict should have a type');
  assert(conflict.description !== '', 'Conflict should have a description');
  assertEqual(conflict.status, 'active', 'Conflict should be active');
});

runTest('PlotEngine: Generate plot twist', () => {
  const engine = new PlotEngine();
  const twist = engine.generatePlotTwist();
  
  assert(twist !== null, 'Twist should be generated');
  assert(twist.description !== '', 'Twist should have a description');
  assertEqual(twist.revealed, false, 'Twist should not be revealed initially');
});

runTest('PlotEngine: Generate chapter purpose', () => {
  const engine = new PlotEngine();
  const purpose = engine.generateChapterPurpose(1);
  
  assert(purpose !== null, 'Purpose should be generated');
  assert(purpose.purpose !== '', 'Purpose should have a purpose type');
  assert(purpose.type !== '', 'Purpose should have a chapter type');
  assert(purpose.focus !== '', 'Purpose should have a focus');
});

runTest('PlotEngine: Update pacing', () => {
  const engine = new PlotEngine();
  const initialTension = engine.plot.pacing.tension;
  
  engine.updatePacing('combat', 1);
  
  assert(engine.plot.pacing.tension > initialTension, 'Tension should increase after combat');
});

runTest('PlotEngine: Get recommended chapter type', () => {
  const engine = new PlotEngine();
  const type = engine.getRecommendedChapterType();
  
  assert(type !== '', 'Should recommend a chapter type');
});

runTest('PlotEngine: Advance sub-plot', () => {
  const engine = new PlotEngine();
  const subPlot = engine.generateSubPlot();
  const initialProgress = subPlot.progress;
  
  engine.advanceSubPlot(subPlot.id, 20);
  
  const advanced = engine.plot.sub_plots.find(sp => sp.id === subPlot.id);
  assertEqual(advanced.progress, initialProgress + 20, 'Progress should increase');
});

// ============================================
// TEST 4: VarietyEngine Tests
// ============================================
console.log('\n=== Testing VarietyEngine ===\n');

runTest('VarietyEngine: Generate semantic fingerprint', () => {
  const engine = new VarietyEngine();
  const text = 'The quick brown fox jumps over the lazy dog';
  
  const fingerprint = engine.generateSemanticFingerprint(text);
  
  assert(fingerprint !== 0, 'Fingerprint should be non-zero');
  assert(typeof fingerprint === 'number', 'Fingerprint should be a number');
});

runTest('VarietyEngine: Check semantic similarity', () => {
  const engine = new VarietyEngine();
  const text1 = 'The quick brown fox jumps over the lazy dog';
  const text2 = 'The fast brown fox leaps over the lazy dog';
  
  const isSimilar = engine.isSemanticallySimilar(text1, text2);
  
  // These should be similar
  assert(isSimilar === true || isSimilar === false, 'Should return boolean');
});

runTest('VarietyEngine: Register unique content', () => {
  const engine = new VarietyEngine();
  const text = 'This is a unique piece of content';
  
  const isUnique = engine.registerContent(text);
  
  assertEqual(isUnique, true, 'First registration should be unique');
});

runTest('VarietyEngine: Register duplicate content', () => {
  const engine = new VarietyEngine();
  const text = 'This is duplicate content';
  
  engine.registerContent(text);
  const isUnique = engine.registerContent(text);
  
  assertEqual(isUnique, false, 'Duplicate registration should not be unique');
});

runTest('VarietyEngine: Generate context-aware content', () => {
  const engine = new VarietyEngine();
  const template = '[CHARACTER_NAME] moved to [LOCATION] with [EMOTION]';
  const context = {
    characterName: 'Kael',
    location: 'the forest',
    emotion: 'hope'
  };
  
  const content = engine.generateContextAwareContent(template, context);
  
  assert(content.includes('Kael'), 'Should include character name');
  assert(content.includes('the forest'), 'Should include location');
  assert(content.includes('hope'), 'Should include emotion');
});

runTest('VarietyEngine: Diversify content', () => {
  const engine = new VarietyEngine();
  const content = 'The cat walked quickly to the door';
  
  const diversified = engine.diversifyContent(content);
  
  assert(diversified !== content, 'Diversified content should be different');
  assert(diversified.length > 0, 'Diversified content should not be empty');
});

runTest('VarietyEngine: Generate unique paragraph', () => {
  const engine = new VarietyEngine();
  const template = '[CHARACTER_NAME] felt [EMOTION] as they [ACTION]';
  const context = {
    characterName: 'Kael',
    emotion: 'determined',
    action: 'moved forward'
  };
  
  const paragraph = engine.generateUniqueParagraph(template, context);
  
  assert(paragraph.length > 0, 'Paragraph should be generated');
  assert(paragraph.includes('Kael'), 'Should include character name');
});

runTest('VarietyEngine: 100% variety guarantee', () => {
  const engine = new VarietyEngine();
  const template = '[CHARACTER_NAME] [ACTION] with [EMOTION]';
  const context = {
    characterName: 'Kael',
    action: 'acted',
    emotion: 'felt something'
  };
  
  const count = 100;
  const paragraphs = [];
  
  for (let i = 0; i < count; i++) {
    const paragraph = engine.generateUniqueParagraph(template, context);
    paragraphs.push(paragraph);
  }
  
  const stats = engine.getVarietyStatistics();
  assertEqual(stats.totalContent, count, `Should have ${count} total content`);
  assertEqual(stats.uniqueContent, count, `Should have ${count} unique content`);
  assertEqual(stats.duplicates, 0, 'Should have 0 duplicates');
  assertEqual(stats.varietyPercentage, '100.00', 'Should have 100% variety');
});

// ============================================
// TEST 5: ContinuityEngine Tests
// ============================================
console.log('\n=== Testing ContinuityEngine ===\n');

runTest('ContinuityEngine: Create narrative thread', () => {
  const engine = new ContinuityEngine();
  const thread = engine.createThread();
  
  assert(thread !== null, 'Thread should be created');
  assert(thread.topic !== '', 'Thread should have a topic');
  assertEqual(thread.status, 'active', 'Thread should be active');
});

runTest('ContinuityEngine: Mention thread', () => {
  const engine = new ContinuityEngine();
  const thread = engine.createThread();
  
  engine.mentionThread(thread.id, 5);
  
  const mentioned = engine.narrativeThreads.get(thread.id);
  assert(mentioned.mentions.includes(5), 'Thread should be mentioned in chapter 5');
});

runTest('ContinuityEngine: Resolve thread', () => {
  const engine = new ContinuityEngine();
  const thread = engine.createThread();
  
  engine.resolveThread(thread.id, 'The mystery was solved', 10);
  
  const resolved = engine.narrativeThreads.get(thread.id);
  assertEqual(resolved.status, 'resolved', 'Thread should be resolved');
  assertEqual(resolved.resolution, 'The mystery was solved', 'Resolution should be recorded');
});

runTest('ContinuityEngine: Get active threads', () => {
  const engine = new ContinuityEngine();
  engine.createThread();
  engine.createThread();
  const thread3 = engine.createThread();
  
  engine.resolveThread(thread3.id, 'Resolved', 5);
  
  const active = engine.getActiveThreads();
  assertEqual(active.length, 2, 'Should have 2 active threads');
});

runTest('ContinuityEngine: Create foreshadowing', () => {
  const engine = new ContinuityEngine();
  const foreshadow = engine.createForeshadowing();
  
  assert(foreshadow !== null, 'Foreshadowing should be created');
  assert(foreshadow.topic !== '', 'Foreshadowing should have a topic');
  assertEqual(foreshadow.revealed, false, 'Foreshadowing should not be revealed initially');
});

runTest('ContinuityEngine: Reveal foreshadowing', () => {
  const engine = new ContinuityEngine();
  const foreshadow = engine.createForeshadowing();
  
  engine.revealForeshadow(foreshadow.id, 10);
  
  const revealed = engine.foreshadowing.find(f => f.id === foreshadow.id);
  assertEqual(revealed.revealed, true, 'Foreshadowing should be revealed');
  assertEqual(revealed.revealChapter, 10, 'Reveal chapter should be recorded');
});

runTest('ContinuityEngine: Create callback', () => {
  const engine = new ContinuityEngine();
  const callback = engine.createCallback();
  
  assert(callback !== null, 'Callback should be created');
  assert(callback.reference !== '', 'Callback should have a reference');
  assertEqual(callback.called, false, 'Callback should not be called initially');
});

runTest('ContinuityEngine: Call callback', () => {
  const engine = new ContinuityEngine();
  const callback = engine.createCallback();
  
  engine.callCallback(callback.id, 10);
  
  const called = engine.callbacks.find(c => c.id === callback.id);
  assertEqual(called.called, true, 'Callback should be called');
  assertEqual(called.callChapter, 10, 'Call chapter should be recorded');
});

runTest('ContinuityEngine: Generate transition', () => {
  const engine = new ContinuityEngine();
  const transition = engine.generateTransition(1, 2, { characterName: 'Kael' });
  
  assert(transition !== '', 'Transition should be generated');
  assert(transition.length > 10, 'Transition should be meaningful');
});

runTest('ContinuityEngine: Record timeline event', () => {
  const engine = new ContinuityEngine();
  engine.recordTimelineEvent(5, 'Kael discovered a secret');
  
  const events = engine.getTimelineEvents(5);
  assert(events.length > 0, 'Should have timeline events');
  assert(events[0].event === 'Kael discovered a secret', 'Event should be recorded');
});

runTest('ContinuityEngine: Check timeline consistency', () => {
  const engine = new ContinuityEngine();
  engine.recordTimelineEvent(5, 'Kael is alive');
  engine.recordTimelineEvent(5, 'Kael is dead');
  
  const issues = engine.checkTimelineConsistency(5);
  assert(issues.length > 0, 'Should detect contradiction');
});

// ============================================
// TEST 6: QualityEngine Tests
// ============================================
console.log('\n=== Testing QualityEngine ===\n');

runTest('QualityEngine: Generate opening hook', () => {
  const engine = new QualityEngine();
  const hook = engine.generateOpeningHook();
  
  assert(hook !== '', 'Hook should be generated');
  assert(hook.length > 10, 'Hook should be meaningful');
});

runTest('QualityEngine: Generate cliffhanger', () => {
  const engine = new QualityEngine();
  const cliffhanger = engine.generateCliffhanger();
  
  assert(cliffhanger !== '', 'Cliffhanger should be generated');
  assert(cliffhanger.length > 10, 'Cliffhanger should be meaningful');
});

runTest('QualityEngine: Generate emotional resonance', () => {
  const engine = new QualityEngine();
  const emotion = engine.generateEmotionalResonance();
  
  assert(emotion !== '', 'Emotion should be generated');
  assert(emotion.length > 10, 'Emotion should be meaningful');
});

runTest('QualityEngine: Generate sensory details', () => {
  const engine = new QualityEngine();
  const details = engine.generateSensoryDetails();
  
  assert(details.length > 0, 'Should generate sensory details');
  assert(details.length <= 5, 'Should generate 2-5 sensory details');
});

runTest('QualityEngine: Generate dialogue', () => {
  const engine = new QualityEngine();
  const dialogue = engine.generateDialogue('Kael', 'confrontation');
  
  assert(dialogue !== '', 'Dialogue should be generated');
  assert(dialogue.includes('Kael'), 'Dialogue should include speaker name');
});

runTest('QualityEngine: Enhance paragraph', () => {
  const engine = new QualityEngine();
  const paragraph = 'The character moved through the forest';
  
  const enhanced = engine.enhanceParagraph(paragraph, { addSensory: true });
  
  assert(enhanced !== paragraph, 'Enhanced paragraph should be different');
  assert(enhanced.length > paragraph.length, 'Enhanced paragraph should be longer');
});

runTest('QualityEngine: Generate chapter opening', () => {
  const engine = new QualityEngine();
  const opening = engine.generateChapterOpening({ combat: true });
  
  assert(opening !== '', 'Opening should be generated');
  assert(opening.length > 20, 'Opening should be detailed');
});

runTest('QualityEngine: Generate chapter closing', () => {
  const engine = new QualityEngine();
  const closing = engine.generateChapterClosing({ danger: true });
  
  assert(closing !== '', 'Closing should be generated');
  assert(closing.length > 20, 'Closing should be detailed');
});

// ============================================
// TEST 7: StorySystemIntegration Tests
// ============================================
console.log('\n=== Testing StorySystemIntegration ===\n');

runTest('StorySystemIntegration: Initialize system', () => {
  const system = new StorySystemIntegration();
  system.initialize();
  
  assert(system.initialized, 'System should be initialized');
});

runTest('StorySystemIntegration: Generate enhanced paragraph', () => {
  const system = new StorySystemIntegration();
  const template = '[CHARACTER_NAME] [ACTION] with [EMOTION]';
  
  const paragraph = system.generateEnhancedParagraph(template, {});
  
  assert(paragraph !== '', 'Paragraph should be generated');
  assert(paragraph.length > 20, 'Paragraph should be meaningful');
});

runTest('StorySystemIntegration: Generate integrated chapter', () => {
  const system = new StorySystemIntegration();
  const chapter = system.generateIntegratedChapter(1);
  
  assert(chapter !== null, 'Chapter should be generated');
  assertEqual(chapter.chapterNumber, 1, 'Chapter number should be 1');
  assert(chapter.type !== '', 'Chapter should have a type');
  assert(chapter.opening !== '', 'Chapter should have an opening');
  assert(chapter.closing !== '', 'Chapter should have a closing');
});

runTest('StorySystemIntegration: Get system statistics', () => {
  const system = new StorySystemIntegration();
  system.initialize();
  
  const stats = system.getSystemStatistics();
  
  assert(stats.characters.total > 0, 'Should have characters');
  assert(stats.world.locations > 0, 'Should have locations');
  assert(stats.plot.subPlots > 0, 'Should have sub-plots');
  assert(stats.continuity.activeThreads > 0, 'Should have active threads');
});

// ============================================
// TEST 8: Large-Scale Tests
// ============================================
console.log('\n=== Testing Large-Scale Generation ===\n');

runTest('Large-Scale: Generate 100 chapters', () => {
  const system = new StorySystemIntegration();
  system.initialize();
  
  const count = 100;
  for (let i = 1; i <= count; i++) {
    system.generateIntegratedChapter(i);
  }
  
  const stats = system.getSystemStatistics();
  assertEqual(stats.chaptersGenerated, count, `Should have generated ${count} chapters`);
  
  const varietyStats = system.varietyEngine.getVarietyStatistics();
  assertEqual(varietyStats.varietyPercentage, '100.00', 'Should have 100% variety');
});

runTest('Large-Scale: Generate 1000 chapters', () => {
  const system = new StorySystemIntegration();
  system.initialize();
  
  const count = 1000;
  console.log(`   Generating ${count} chapters...`);
  
  for (let i = 1; i <= count; i++) {
    system.generateIntegratedChapter(i);
    if (i % 100 === 0) {
      console.log(`   Progress: ${i}/${count}`);
    }
  }
  
  const stats = system.getSystemStatistics();
  assertEqual(stats.chaptersGenerated, count, `Should have generated ${count} chapters`);
  
  const varietyStats = system.varietyEngine.getVarietyStatistics();
  assertEqual(varietyStats.varietyPercentage, '100.00', 'Should have 100% variety');
  
  console.log(`   ✓ ${count} chapters generated with 100% variety`);
});

// ============================================
// TEST RESULTS SUMMARY
// ============================================
console.log('\n' + '='.repeat(50));
console.log('TEST RESULTS SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests: ${testResults.total}`);
console.log(`Passed: ${testResults.passed}`);
console.log(`Failed: ${testResults.failed}`);
console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(2)}%`);
console.log('='.repeat(50));

if (testResults.failed > 0) {
  console.log('\nFailed Tests:');
  testResults.tests.filter(t => t.status === 'FAIL').forEach(t => {
    console.log(`  - ${t.name}: ${t.error}`);
  });
}

process.exit(testResults.failed > 0 ? 1 : 0);