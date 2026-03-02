// Test individual engines without slow operations
console.log('Testing CharacterEngine...');
const CharacterEngine = require('./js/character-engine.js');
const charEngine = new CharacterEngine();
const protagonist = charEngine.getCharacter('protagonist');
console.log(`✓ Protagonist: ${protagonist.name}`);
console.log(`✓ CharacterEngine works!`);

console.log('\nTesting WorldEngine...');
const WorldEngine = require('./js/world-engine.js');
const worldEngine = new WorldEngine();
const locations = worldEngine.getAllLocations();
console.log(`✓ Locations: ${locations.length}`);
console.log(`✓ WorldEngine works!`);

console.log('\nTesting PlotEngine...');
const PlotEngine = require('./js/plot-engine.js');
const plotEngine = new PlotEngine();
const subPlot = plotEngine.generateSubPlot();
console.log(`✓ Sub-plot: ${subPlot.name}`);
console.log(`✓ PlotEngine works!`);

console.log('\nTesting VarietyEngine...');
const VarietyEngine = require('./js/variety-engine.js');
const varietyEngine = new VarietyEngine();
const fingerprint = varietyEngine.generateSemanticFingerprint('Test text');
console.log(`✓ Fingerprint: ${fingerprint}`);
console.log(`✓ VarietyEngine works!`);

console.log('\nTesting ContinuityEngine...');
const ContinuityEngine = require('./js/continuity-engine.js');
const continuityEngine = new ContinuityEngine();
const thread = continuityEngine.createThread();
console.log(`✓ Thread: ${thread.topic}`);
console.log(`✓ ContinuityEngine works!`);

console.log('\nTesting QualityEngine...');
const QualityEngine = require('./js/quality-engine.js');
const qualityEngine = new QualityEngine();
const hook = qualityEngine.generateOpeningHook();
console.log(`✓ Hook: ${hook.substring(0, 50)}...`);
console.log(`✓ QualityEngine works!`);

console.log('\n✅ All engines loaded and basic functionality verified!');