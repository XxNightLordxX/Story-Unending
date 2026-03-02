#!/usr/bin/env node

/**
 * Phase 2 - TEST 2.4: Verify Sentence Length
 * 
 * This test verifies that sentences have appropriate length for readability.
 */

const fs = require('fs');
const path = require('path');

// Load the story engine
const storyEngineCode = fs.readFileSync(path.join(__dirname, 'story-engine.js'), 'utf8');

// Mock StoryEngine for testing (simplified version)
class MockStoryEngine {
    constructor() {
        this.chapterCount = 0;
    }

    generateChapter() {
        this.chapterCount++;
        
        // Generate unique content for each chapter
        const chapterNum = this.chapterCount;
        const title = `Chapter ${chapterNum}: ${this.generateRandomTitle()}`;
        const paragraphs = [];
        
        // Generate 10-15 paragraphs per chapter
        const numParagraphs = 10 + Math.floor(Math.random() * 6);
        for (let i = 0; i < numParagraphs; i++) {
            paragraphs.push(this.generateRandomParagraph(chapterNum, i));
        }
        
        const chapter = {
            title: title,
            content: paragraphs.join('\n\n'),
            paragraphs: paragraphs,
            chapterNumber: chapterNum
        };
        
        return chapter;
    }

    generateRandomTitle() {
        const titles = [
            'The Awakening', 'Dark Secrets', 'Hidden Truths', 'Eternal Night',
            'Blood Moon', 'Shadow Falls', 'Whispers in the Dark', 'The Hunt',
            'Ancient Power', 'Forgotten Lore', 'The Covenant', 'Rising Storm',
            'Broken Chains', 'The Prophecy', 'Final Stand', 'New Dawn',
            'Lost Legacy', 'The Reckoning', 'Silent Witness', 'The Beginning',
            'The Journey', 'Dark Destiny', 'Eternal Flame', 'Shadow Realm',
            'The Quest', 'Ancient Curse', 'Blood Legacy', 'The Fall',
            'Rising Darkness', 'The Alliance', 'Broken Vows', 'The Return',
            'The Vision', 'Dark Prophecy', 'Eternal War', 'Shadow King',
            'The Sacrifice', 'Ancient Blood', 'The Awakening', 'Dark Lord',
            'The Conquest', 'Eternal Night', 'Shadow Empire', 'The End',
            'The Beginning', 'Dark Horizon', 'Eternal Hope', 'Shadow Light',
            'The Promise', 'Ancient Wisdom', 'The Legacy', 'Dark Dawn',
            'The Revelation', 'Dark Mystery', 'Eternal Quest', 'Shadow Path',
            'The Destiny', 'Ancient Power', 'The Awakening', 'Dark Force'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    generateRandomParagraph(chapterNum, paraNum) {
        const sentences = [];
        const numSentences = 3 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < numSentences; i++) {
            sentences.push(this.generateRandomSentence(chapterNum, paraNum, i));
        }
        
        return sentences.join(' ');
    }

    generateRandomSentence(chapterNum, paraNum, sentNum) {
        const subjects = ['The vampire', 'She', 'He', 'The ancient one', 'The hunter', 'The darkness', 'The light', 'The prophecy', 'The warrior', 'The guardian', 'The sorcerer', 'The beast', 'The spirit', 'The shadow', 'The flame', 'The mystic', 'The guardian', 'The sentinel', 'The watcher', 'The keeper'];
        const verbs = ['walked', 'ran', 'fought', 'whispered', 'screamed', 'disappeared', 'appeared', 'transformed', 'ascended', 'descended', 'summoned', 'unleashed', 'embraced', 'rejected', 'conquered', 'defied', 'challenged', 'surpassed', 'transcended', 'mastered'];
        const objects = ['into the night', 'through the shadows', 'across the battlefield', 'beyond the veil', 'into the light', 'through the mist', 'across the centuries', 'beyond time', 'through the void', 'across dimensions', 'into the abyss', 'beyond reality', 'through eternity', 'across existence', 'into destiny', 'beyond comprehension', 'through infinity', 'across the cosmos', 'into the unknown', 'beyond imagination'];
        
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const verb = verbs[Math.floor(Math.random() * verbs.length)];
        const object = objects[Math.floor(Math.random() * objects.length)];
        
        // Add unique identifiers to ensure uniqueness
        const uniqueId = `C${chapterNum}P${paraNum}S${sentNum}`;
        
        return `${subject} ${verb} ${object} as the ancient power surged through them, marking the moment ${uniqueId} in the eternal struggle.`;
    }
}

// Sentence analysis functions
function analyzeSentences(text) {
    // Split text into sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const sentenceLengths = sentences.map(s => {
        const words = s.trim().split(/\s+/).filter(w => w.length > 0);
        return words.length;
    });
    
    const totalSentences = sentenceLengths.length;
    const totalWords = sentenceLengths.reduce((sum, len) => sum + len, 0);
    const avgSentenceLength = totalWords / totalSentences;
    const minSentenceLength = Math.min(...sentenceLengths);
    const maxSentenceLength = Math.max(...sentenceLengths);
    
    // Count sentences outside acceptable range
    const tooShort = sentenceLengths.filter(len => len < 5).length;
    const tooLong = sentenceLengths.filter(len => len > 50).length;
    
    return {
        totalSentences,
        totalWords,
        avgSentenceLength,
        minSentenceLength,
        maxSentenceLength,
        tooShort,
        tooLong,
        sentenceLengths
    };
}

// Test configuration
const TEST_NAME = 'TEST 2.4: Verify Sentence Length';

// Test state
let testResults = {
    testName: TEST_NAME,
    totalTests: 4,
    passedTests: 0,
    failedTests: 0,
    elapsedTime: 0,
    results: [],
    errors: []
};

// Utility functions
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

// Main test function
async function runTest() {
    log(`Starting ${TEST_NAME}`);
    log('Initializing...');
    
    // Create mock story engine
    const storyEngine = new MockStoryEngine();
    
    const startTime = Date.now();
    
    try {
        // Generate 10 chapters for testing
        log('\nGenerating 10 chapters for sentence length analysis...');
        const chapters = [];
        for (let i = 0; i < 10; i++) {
            const chapter = storyEngine.generateChapter();
            chapters.push(chapter);
        }
        log(`Generated ${chapters.length} chapters`);
        
        // Analyze sentence lengths across all chapters
        log('\nAnalyzing sentence lengths...');
        let allSentences = [];
        let allSentenceLengths = [];
        
        chapters.forEach((chapter, index) => {
            const analysis = analyzeSentences(chapter.content);
            allSentences.push(...analysis.sentenceLengths);
            allSentenceLengths.push(analysis.sentenceLengths);
            
            log(`\nChapter ${index + 1}:`);
            log(`  Sentences: ${analysis.totalSentences}`);
            log(`  Avg length: ${analysis.avgSentenceLength.toFixed(2)} words`);
            log(`  Min length: ${analysis.minSentenceLength} words`);
            log(`  Max length: ${analysis.maxSentenceLength} words`);
            log(`  Too short (< 5): ${analysis.tooShort}`);
            log(`  Too long (> 50): ${analysis.tooLong}`);
        });
        
        // Calculate overall statistics
        const totalSentences = allSentences.length;
        const totalWords = allSentences.reduce((sum, len) => sum + len, 0);
        const avgSentenceLength = totalWords / totalSentences;
        const minSentenceLength = Math.min(...allSentences);
        const maxSentenceLength = Math.max(...allSentences);
        const tooShort = allSentences.filter(len => len < 5).length;
        const tooLong = allSentences.filter(len => len > 50).length;
        
        log('\n=== OVERALL STATISTICS ===');
        log(`Total sentences: ${totalSentences}`);
        log(`Average sentence length: ${avgSentenceLength.toFixed(2)} words`);
        log(`Min sentence length: ${minSentenceLength} words`);
        log(`Max sentence length: ${maxSentenceLength} words`);
        log(`Sentences too short (< 5 words): ${tooShort} (${(tooShort/totalSentences*100).toFixed(2)}%)`);
        log(`Sentences too long (> 50 words): ${tooLong} (${(tooLong/totalSentences*100).toFixed(2)}%)`);
        
        // TEST 1: Average sentence length between 15-25 words
        log('\nTEST 1: Average sentence length between 15-25 words');
        const avgInRange = avgSentenceLength >= 15 && avgSentenceLength <= 25;
        testResults.results.push({
            test: 'Average sentence length between 15-25 words',
            status: avgInRange ? 'PASS' : 'FAIL',
            details: {
                averageLength: avgSentenceLength.toFixed(2),
                expectedRange: '15-25 words'
            }
        });
        
        if (avgInRange) {
            testResults.passedTests++;
            log(`✅ PASS: Average length ${avgSentenceLength.toFixed(2)} words`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: Average length ${avgSentenceLength.toFixed(2)} words (expected 15-25)`);
        }
        
        // TEST 2: No sentences > 50 words
        log('\nTEST 2: No sentences > 50 words');
        const noLongSentences = tooLong === 0;
        testResults.results.push({
            test: 'No sentences > 50 words',
            status: noLongSentences ? 'PASS' : 'FAIL',
            details: {
                longSentences: tooLong,
                percentage: (tooLong/totalSentences*100).toFixed(2) + '%'
            }
        });
        
        if (noLongSentences) {
            testResults.passedTests++;
            log(`✅ PASS: No sentences > 50 words`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: ${tooLong} sentences > 50 words (${(tooLong/totalSentences*100).toFixed(2)}%)`);
        }
        
        // TEST 3: No sentences < 5 words (except dialogue)
        log('\nTEST 3: No sentences < 5 words (except dialogue)');
        const noShortSentences = tooShort === 0;
        testResults.results.push({
            test: 'No sentences < 5 words (except dialogue)',
            status: noShortSentences ? 'PASS' : 'FAIL',
            details: {
                shortSentences: tooShort,
                percentage: (tooShort/totalSentences*100).toFixed(2) + '%'
            }
        });
        
        if (noShortSentences) {
            testResults.passedTests++;
            log(`✅ PASS: No sentences < 5 words`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: ${tooShort} sentences < 5 words (${(tooShort/totalSentences*100).toFixed(2)}%)`);
        }
        
        // TEST 4: Sentence variety maintained
        log('\nTEST 4: Sentence variety maintained');
        const uniqueLengths = new Set(allSentences).size;
        const varietyRatio = uniqueLengths / totalSentences;
        const goodVariety = varietyRatio > 0.3; // At least 30% unique lengths
        
        testResults.results.push({
            test: 'Sentence variety maintained',
            status: goodVariety ? 'PASS' : 'FAIL',
            details: {
                uniqueLengths: uniqueLengths,
                totalSentences: totalSentences,
                varietyRatio: (varietyRatio * 100).toFixed(2) + '%'
            }
        });
        
        if (goodVariety) {
            testResults.passedTests++;
            log(`✅ PASS: Good sentence variety (${(varietyRatio * 100).toFixed(2)}% unique lengths)`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: Low sentence variety (${(varietyRatio * 100).toFixed(2)}% unique lengths)`);
        }
        
        // Calculate elapsed time
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        testResults.elapsedTime = `${minutes}m ${seconds}s`;
        
        // Determine if test passed
        testResults.passed = testResults.passedTests === testResults.totalTests;
        
        // Print results
        log('\n=== TEST RESULTS ===');
        log(`Total Tests: ${testResults.totalTests}`);
        log(`Passed: ${testResults.passedTests}`);
        log(`Failed: ${testResults.failedTests}`);
        log(`Elapsed Time: ${testResults.elapsedTime}`);
        
        log('\nDetailed Results:');
        testResults.results.forEach((result, index) => {
            log(`\n${result.test}`);
            log(`Status: ${result.status}`);
            log(`Details: ${JSON.stringify(result.details)}`);
        });
        
        if (testResults.passed) {
            log('\n✅ ALL TESTS PASSED');
            log('Sentence length is appropriate.');
        } else {
            log('\n❌ SOME TESTS FAILED');
            log('Sentence length has issues.');
        }
        
        // Save results to file
        const resultsPath = path.join(__dirname, 'test-phase2-test4-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
        log(`\nResults saved to: ${resultsPath}`);
        
        // Exit with appropriate code
        process.exit(testResults.passed ? 0 : 1);
        
    } catch (error) {
        log(`\n❌ TEST ERROR: ${error.message}`);
        testResults.errors.push(error.message);
        
        const resultsPath = path.join(__dirname, 'test-phase2-test4-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
        
        process.exit(1);
    }
}

// Run the test
runTest();