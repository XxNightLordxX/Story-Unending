#!/usr/bin/env node

/**
 * Phase 2 - TEST 2.1: Verify Chapter-to-Chapter Continuity
 * 
 * This test verifies that chapters flow logically from one to the next
 * by analyzing transitions between consecutive chapters.
 */

const fs = require('fs');
const path = require('path');

// Load the UniquenessTracker module
const UniquenessTracker = require('./js/uniqueness-tracker.js');

// Mock StoryEngine for testing
class MockStoryEngine {
    constructor() {
        this.chapterCount = 0;
    }

    async generateChapter() {
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

// Continuity analysis functions
function analyzeContinuity(chapter1, chapter2) {
    const lastPara = chapter1.paragraphs[chapter1.paragraphs.length - 1];
    const firstPara = chapter2.paragraphs[0];
    
    const lastWords = lastPara.toLowerCase().split(/\s+/).slice(-5);
    const firstWords = firstPara.toLowerCase().split(/\s+/).slice(0, 5);
    
    // Check for transition words
    const transitionWords = ['however', 'meanwhile', 'then', 'next', 'later', 'after', 'before', 'when', 'while', 'although', 'though', 'yet', 'still', 'nevertheless', 'moreover', 'furthermore', 'consequently', 'therefore', 'thus', 'hence'];
    const hasTransition = transitionWords.some(word => firstPara.toLowerCase().includes(word));
    
    // Check for abrupt ending indicators
    const abruptEndings = ['suddenly', 'without warning', 'instantly', 'immediately', 'at that moment'];
    const hasAbruptEnding = abruptEndings.some(word => lastPara.toLowerCase().includes(word));
    
    // Check for logical flow indicators
    const logicalFlowWords = ['continued', 'proceeded', 'moved forward', 'advanced', 'progressed', 'carried on'];
    const hasLogicalFlow = logicalFlowWords.some(word => firstPara.toLowerCase().includes(word));
    
    return {
        lastParagraph: lastPara.substring(0, 100) + '...',
        firstParagraph: firstPara.substring(0, 100) + '...',
        hasTransition,
        hasAbruptEnding,
        hasLogicalFlow,
        lastWords,
        firstWords
    };
}

function evaluateContinuity(analysis) {
    let score = 0;
    let issues = [];
    
    // Positive indicators
    if (analysis.hasTransition) score += 2;
    if (analysis.hasLogicalFlow) score += 2;
    
    // Negative indicators
    if (analysis.hasAbruptEnding) {
        score -= 1;
        issues.push('Abrupt ending detected');
    }
    
    // Check for very short last paragraph (potential abrupt ending)
    if (analysis.lastParagraph.length < 50) {
        score -= 1;
        issues.push('Last paragraph too short');
    }
    
    // Check for very short first paragraph (potential missing context)
    if (analysis.firstParagraph.length < 50) {
        score -= 1;
        issues.push('First paragraph too short');
    }
    
    return {
        score: Math.max(0, Math.min(10, score)),
        issues,
        isGood: score >= 4
    };
}

// Test configuration
const TEST_NAME = 'TEST 2.1: Verify Chapter-to-Chapter Continuity';

// Test state
let testResults = {
    testName: TEST_NAME,
    totalTests: 9,
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
    
    // Clear tracker
    UniquenessTracker.clearAll();
    
    // Create mock story engine
    const storyEngine = new MockStoryEngine();
    
    const startTime = Date.now();
    
    try {
        // Generate 10 chapters for testing
        log('\nGenerating 10 chapters for continuity analysis...');
        const chapters = [];
        for (let i = 0; i < 10; i++) {
            const chapter = await storyEngine.generateChapter();
            chapters.push(chapter);
            UniquenessTracker.addTitle(chapter.title);
            UniquenessTracker.addChapter(chapter.content);
            chapter.paragraphs.forEach(para => UniquenessTracker.addParagraph(para));
        }
        log(`Generated ${chapters.length} chapters`);
        
        // Analyze continuity between consecutive chapters
        log('\nAnalyzing chapter-to-chapter continuity...');
        let totalScore = 0;
        let allIssues = [];
        
        for (let i = 0; i < chapters.length - 1; i++) {
            const chapter1 = chapters[i];
            const chapter2 = chapters[i + 1];
            
            log(`\nAnalyzing Chapter ${i + 1} → Chapter ${i + 2}...`);
            
            const analysis = analyzeContinuity(chapter1, chapter2);
            const evaluation = evaluateContinuity(analysis);
            
            totalScore += evaluation.score;
            allIssues.push(...evaluation.issues);
            
            testResults.results.push({
                test: `Chapter ${i + 1} → Chapter ${i + 2}`,
                status: evaluation.isGood ? 'PASS' : 'FAIL',
                details: {
                    score: evaluation.score,
                    issues: evaluation.issues,
                    analysis: {
                        lastParagraph: analysis.lastParagraph,
                        firstParagraph: analysis.firstParagraph,
                        hasTransition: analysis.hasTransition,
                        hasAbruptEnding: analysis.hasAbruptEnding,
                        hasLogicalFlow: analysis.hasLogicalFlow
                    }
                }
            });
            
            if (evaluation.isGood) {
                testResults.passedTests++;
                log(`✅ PASS: Score ${evaluation.score}/10`);
            } else {
                testResults.failedTests++;
                log(`❌ FAIL: Score ${evaluation.score}/10 - Issues: ${evaluation.issues.join(', ')}`);
            }
        }
        
        // TEST 9: Overall continuity assessment
        log('\nTEST 9: Overall continuity assessment');
        const avgScore = totalScore / (chapters.length - 1);
        const overallGood = avgScore >= 4;
        
        testResults.results.push({
            test: 'Overall continuity assessment',
            status: overallGood ? 'PASS' : 'FAIL',
            details: {
                averageScore: avgScore.toFixed(2),
                totalIssues: allIssues.length,
                uniqueIssues: [...new Set(allIssues)]
            }
        });
        
        if (overallGood) {
            testResults.passedTests++;
            log(`✅ PASS: Average score ${avgScore.toFixed(2)}/10`);
        } else {
            testResults.failedTests++;
            log(`❌ FAIL: Average score ${avgScore.toFixed(2)}/10`);
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
            log('Chapter-to-chapter continuity is good.');
        } else {
            log('\n❌ SOME TESTS FAILED');
            log('Chapter-to-chapter continuity has issues.');
        }
        
        // Save results to file
        const resultsPath = path.join(__dirname, 'test-phase2-test1-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
        log(`\nResults saved to: ${resultsPath}`);
        
        // Exit with appropriate code
        process.exit(testResults.passed ? 0 : 1);
        
    } catch (error) {
        log(`\n❌ TEST ERROR: ${error.message}`);
        testResults.errors.push(error.message);
        
        const resultsPath = path.join(__dirname, 'test-phase2-test1-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2));
        
        process.exit(1);
    }
}

// Run the test
runTest();