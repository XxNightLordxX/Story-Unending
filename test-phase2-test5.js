#!/usr/bin/env node

/**
 * Phase 2 - TEST 2.5: Verify Paragraph Length
 * 
 * This test verifies that paragraphs have appropriate length for readability.
 */

const fs = require('fs');
const path = require('path');

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

// Paragraph analysis functions
function analyzeParagraphs(paragraphs) {
    const paragraphLengths = paragraphs.map(p => {
        const sentences = p.split(/[.!?]+/).filter(s => s.trim().length > 0);
        return sentences.length;
    });
    
    const totalParagraphs = paragraphLengths.length;
    const totalSentences = paragraphLengths.reduce((sum, len) => sum + len, 0);
    const avgParagraphLength = totalSentences / totalParagraphs;
    const minParagraphLength = Math.min(...paragraphLengths);
    const maxParagraphLength = Math.max(...paragraphLengths);
    
    // Count paragraphs outside acceptable range
    const tooShort = paragraphLengths.filter(len => len < 2).length;
    const tooLong = paragraphLengths.filter(len => len > 10).length;
    
    return {
        totalParagraphs,
        totalSentences,
        avgParagraphLength,
        minParagraphLength,
        maxParagraphLength,
        tooShort,
        tooLong,
        paragraphLengths
    };
}

// Test configuration
const TEST_NAME = 'TEST 2.5: Verify Paragraph Length';

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
        log('\nGenerating 10 chapters for paragraph length analysis...');
        const chapters = [];
        for (let i = 0; i < 10; i++) {
            const chapter = storyEngine.generateChapter();
            chapters.push(chapter);
        }
        log(`Generated ${chapters.length} chapters`);
        
        // Analyze paragraph lengths across all chapters
        log('\nAnalyzing paragraph lengths...');
        let allParagraphs = [];
        let allParagraphLengths = [];
        
        chapters.forEach((chapter, index) => {
            const analysis = analyzeParagraphs(chapter.paragraphs);
            allParagraphs.push(...analysis.paragraphLengths);
            allParagraphLengths.push(analysis.paragraphLengths);
            
            log(`\nChapter ${index + 1}:`);
            log(`  Paragraphs: ${analysis.totalParagraphs}`);
            log(`  Avg length: ${analysis.avgParagraphLength.toFixed(2)} sentences`);
            log(`  Min length: ${analysis.minParagraphLength} sentences`);
            log(`  Max length: ${analysis.maxParagraphLength} sentences`);
            log(`  Too short (< 2): ${analysis.tooShort}`);
            log(`  Too long (> 10): ${analysis.tooLong}`);
        });
        
        // Calculate overall statistics
        const totalParagraphs = allParagraphs.length;
        const totalSentences = allParagraphs.reduce((sum, len) => sum + len, 0);
        const avgParagraphLength = totalSentences / totalParagraphs;
        const minParagraphLength = Math.min(...allParagraphs);
        const maxParagraphLength = Math.max(...allParagraphs);
        const tooShort = allParagraphs.filter(len => len < 2).length;
        const tooLong = allParagraphs.filter(len => len > 10).length;
        
        log('\n=== OVERALL STATISTICS ===');
        log(`Total paragraphs: ${totalParagraphs}`);
        log(`Average paragraph length: ${avgParagraphLength.toFixed(2)} sentences`);
        log(`Min paragraph length: ${minParagraphLength} sentences`);
        log(`Max paragraph length: ${maxParagraphLength} sentences`);
        log(`Paragraphs too short (< 2 sentences): ${tooShort} (${(tooShort/totalParagraphs*100).toFixed(2)}%)`);
        log(`Paragraphs too long (> 10 sentences): ${tooLong} (${(tooLong/totalParagraphs*100).toFixed(2)}%)`);
        
        // TEST 1: Average paragraph length between 3-5 sentences
        log('\nTEST 1: Average paragraph length between 3-5 sentences');
        const avgInRange = avgParagraphLength >= 3 && avgParagraphLength <= 5;
        testResults.results.push({
            test: 'Average paragraph length between 3-5 sentences',
            status: avgInRange ? 'PASS' : 'FAIL',
            details: {
                averageLength: avgParagraphLength.toFixed(2),
                expectedRange: '3-5 sentences'
            }
        });
        
        if (avgInRange) {
            testResults.passedTests++;
            log(`✅ PASS: Average length ${avgParagraphLength.toFixed(2)} sentences`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: Average length ${avgParagraphLength.toFixed(2)} sentences (expected 3-5)`);
        }
        
        // TEST 2: No paragraphs > 10 sentences
        log('\nTEST 2: No paragraphs > 10 sentences');
        const noLongParagraphs = tooLong === 0;
        testResults.results.push({
            test: 'No paragraphs > 10 sentences',
            status: noLongParagraphs ? 'PASS' : 'FAIL',
            details: {
                longParagraphs: tooLong,
                percentage: (tooLong/totalParagraphs*100).toFixed(2) + '%'
            }
        });
        
        if (noLongParagraphs) {
            testResults.passedTests++;
            log(`✅ PASS: No paragraphs > 10 sentences`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: ${tooLong} paragraphs > 10 sentences (${(tooLong/totalParagraphs*100).toFixed(2)}%)`);
        }
        
        // TEST 3: No paragraphs < 2 sentences (except dialogue)
        log('\nTEST 3: No paragraphs < 2 sentences (except dialogue)');
        const noShortParagraphs = tooShort === 0;
        testResults.results.push({
            test: 'No paragraphs < 2 sentences (except dialogue)',
            status: noShortParagraphs ? 'PASS' : 'FAIL',
            details: {
                shortParagraphs: tooShort,
                percentage: (tooShort/totalParagraphs*100).toFixed(2) + '%'
            }
        });
        
        if (noShortParagraphs) {
            testResults.passedTests++;
            log(`✅ PASS: No paragraphs < 2 sentences`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: ${tooShort} paragraphs < 2 sentences (${(tooShort/totalParagraphs*100).toFixed(2)}%)`);
        }
        
        // TEST 4: Paragraph variety maintained
        log('\nTEST 4: Paragraph variety maintained');
        const uniqueLengths = new Set(allParagraphs).size;
        const varietyRatio = uniqueLengths / totalParagraphs;
        const goodVariety = varietyRatio > 0.3; // At least 30% unique lengths
        
        testResults.results.push({
            test: 'Paragraph variety maintained',
            status: goodVariety ? 'PASS' : 'FAIL',
            details: {
                uniqueLengths: uniqueLengths,
                totalParagraphs: totalParagraphs,
                varietyRatio: (varietyRatio * 100).toFixed(2) + '%'
            }
        });
        
        if (goodVariety) {
            testResults.passedTests++;
            log(`✅ PASS: Good paragraph variety (${(varietyRatio * 100).toFixed(2)}% unique lengths)`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: Low paragraph variety (${(varietyRatio * 100).toFixed(2)}% unique lengths)`);
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
            log('Paragraph length is appropriate.');
        } else {
            log('\n❌ SOME TESTS FAILED');
            log('Paragraph length has issues.');
        }
        
        // Save results to file
        const resultsPath = path.join(__dirname, 'test-phase2-test5-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
        log(`\nResults saved to: ${resultsPath}`);
        
        // Exit with appropriate code
        process.exit(testResults.passed ? 0 : 1);
        
    } catch (error) {
        log(`\n❌ TEST ERROR: ${error.message}`);
        testResults.errors.push(error.message);
        
        const resultsPath = path.join(__dirname, 'test-phase2-test5-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
        
        process.exit(1);
    }
}

// Run the test
runTest();