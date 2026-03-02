/**
 * Simple Test Suite for New Story System
 * Tests all engines without large-scale generation
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
});

runTest('CharacterEngine: Generate character', () => {
  const engine = new CharacterEngine();
  const character = engine.generateCharacter();
  assert(character !== null, 'Character should be generated');
  assert(character.name !== '', 'Character should have a name');
  assert(character.personality.traits.length > 0, 'Character should have traits');
});

runTest('CharacterEngine: Character relationships', () => {
  const engine = new CharacterEngine();
  const char1 = engine.generateCharacter({ role: 'ally' });
  engine.addRelationship('protagonist', char1.id, 'allies');
  const protagonist = engine.getCharacter('protagonist');
  assert(protagonist.relationships.allies.includes(char1.id), 'Char1 should be ally');
});

runTest('CharacterEngine: Create nemesis', () => {
  const engine = new CharacterEngine();
  const nemesis = engine.createNemesis(50);
  assertEqual(nemesis.role, 'nemesis', 'Should be nemesis role');
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
});

runTest('WorldEngine: Generate faction', () => {
  const engine = new WorldEngine();
  const faction = engine.generateFaction();
  assert(faction !== null, 'Faction should be generated');
  assert(faction.name !== '', 'Faction should have a name');
});

runTest('WorldEngine: Generate sensory description', () => {
  const engine = new WorldEngine();
  const location = engine.generateLocation();
  const description = engine.generateLocationDescriptionWithSenses(location.id, 'day', 'clear');
  assert(description !== '', 'Description should be generated');
});

// ============================================
// TEST 3: PlotEngine Tests
// ============================================
console.log('\n=== Testing PlotEngine ===\n');

runTest('PlotEngine: Generate sub-plot', () => {
  const engine = new PlotEngine();
  const subPlot = engine.generateSubPlot();
  assert(subPlot !== null, 'Sub-plot should be generated');
  assertEqual(subPlot.status, 'active', 'Sub-plot should be active');
});

runTest('PlotEngine: Advance main story', () => {
  const engine = new PlotEngine();
  const initialStage = engine.plot.main_story.current_stage;
  engine.advanceMainStory();
  assertEqual(engine.plot.main_story.current_stage, initialStage + 1, 'Stage should advance');
});

runTest('PlotEngine: Generate conflict', () => {
  const engine = new PlotEngine();
  const conflict = engine.generateConflict();
  assert(conflict !== null, 'Conflict should be generated');
  assertEqual(conflict.status, 'active', 'Conflict should be active');
});

runTest('PlotEngine: Update pacing', () => {
  const engine = new PlotEngine();
  const initialTension = engine.plot.pacing.tension;
  engine.updatePacing('combat', 1);
  assert(engine.plot.pacing.tension > initialTension, 'Tension should increase');
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
  const template = '[CHARACTER_NAME] moved to [LOCATION]';
  const context = { characterName: 'Kael', location: 'the forest' };
  const content = engine.generateContextAwareContent(template, context);
  assert(content.includes('Kael'), 'Should include character name');
  assert(content.includes('the forest'), 'Should include location');
});

runTest('VarietyEngine: 100% variety guarantee (10 paragraphs)', () => {
  const engine = new VarietyEngine();
  const template = '[CHARACTER_NAME] [ACTION] with [EMOTION]';
  const context = { characterName: 'Kael', action: 'acted', emotion: 'felt something' };
  
  const count = 10;
  for (let i = 0; i < count; i++) {
    engine.generateUniqueParagraph(template, context);
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
  assertEqual(thread.status, 'active', 'Thread should be active');
});

runTest('ContinuityEngine: Resolve thread', () => {
  const engine = new ContinuityEngine();
  const thread = engine.createThread();
  engine.resolveThread(thread.id, 'Resolved', 10);
  const resolved = engine.narrativeThreads.get(thread.id);
  assertEqual(resolved.status, 'resolved', 'Thread should be resolved');
});

runTest('ContinuityEngine: Create foreshadowing', () => {
  const engine = new ContinuityEngine();
  const foreshadow = engine.createForeshadowing();
  assert(foreshadow !== null, 'Foreshadowing should be created');
  assertEqual(foreshadow.revealed, false, 'Foreshadowing should not be revealed');
});

runTest('ContinuityEngine: Create callback', () => {
  const engine = new ContinuityEngine();
  const callback = engine.createCallback();
  assert(callback !== null, 'Callback should be created');
  assertEqual(callback.called, false, 'Callback should not be called');
});

runTest('ContinuityEngine: Generate transition', () => {
  const engine = new ContinuityEngine();
  const transition = engine.generateTransition(1, 2, {});
  assert(transition !== '', 'Transition should be generated');
});

// ============================================
// TEST 6: QualityEngine Tests
// ============================================
console.log('\n=== Testing QualityEngine ===\n');

runTest('QualityEngine: Generate opening hook', () => {
  const engine = new QualityEngine();
  const hook = engine.generateOpeningHook();
  assert(hook !== '', 'Hook should be generated');
});

runTest('QualityEngine: Generate cliffhanger', () => {
  const engine = new QualityEngine();
  const cliffhanger = engine.generateCliffhanger();
  assert(cliffhanger !== '', 'Cliffhanger should be generated');
});

runTest('QualityEngine: Generate sensory details', () => {
  const engine = new QualityEngine();
  const details = engine.generateSensoryDetails();
  assert(details.length > 0, 'Should generate sensory details');
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
});

runTest('StorySystemIntegration: Generate integrated chapter', () => {
  const system = new StorySystemIntegration();
  const chapter = system.generateIntegratedChapter(1);
  assert(chapter !== null, 'Chapter should be generated');
  assertEqual(chapter.chapterNumber, 1, 'Chapter number should be 1');
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
});

runTest('StorySystemIntegration: Generate 10 chapters', () => {
  const system = new StorySystemIntegration();
  system.initialize();
  
  const count = 10;
  for (let i = 1; i <= count; i++) {
    system.generateIntegratedChapter(i);
  }
  
  const stats = system.getSystemStatistics();
  assertEqual(stats.chaptersGenerated, count, `Should have generated ${count} chapters`);
  
  const varietyStats = system.varietyEngine.getVarietyStatistics();
  assertEqual(varietyStats.varietyPercentage, '100.00', 'Should have 100% variety');
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