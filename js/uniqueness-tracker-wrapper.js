/**
 * UniquenessTracker Wrapper for StoryEngine
 * Intercepts generateChapter calls to track content
 */

(function() {
    'use strict';
    
    // Wait for StoryEngine to be available
    function initializeWrapper() {
        if (typeof window.StoryEngine === 'undefined') {
            // Retry after a delay
            setTimeout(initializeWrapper, 100);
            return;
        }
        
        // Store original generateChapter function
        const originalGenerateChapter = window.StoryEngine.generateChapter;
        
        // Override generateChapter to add tracking
        window.StoryEngine.generateChapter = function(directive) {
            // Generate the chapter
            const chapter = originalGenerateChapter.call(this, directive);
            
            // Track content with UniquenessTracker
            if (typeof window.UniquenessTracker !== 'undefined') {
                // Track title
                if (chapter.title) {
                    window.UniquenessTracker.addTitle(chapter.title);
                }
                
                // Track all paragraphs
                if (chapter.paragraphs && Array.isArray(chapter.paragraphs)) {
                    chapter.paragraphs.forEach(paragraph => {
                        if (paragraph && typeof paragraph === 'string') {
                            window.UniquenessTracker.addParagraph(paragraph);
                        }
                    });
                }
                
                // Track entire chapter content
                const chapterContent = chapter.paragraphs ? chapter.paragraphs.join(' ') : '';
                window.UniquenessTracker.addChapter(chapterContent);
            }
            
            return chapter;
        };
        
        console.log('UniquenessTracker wrapper initialized');
    }
    
    // Start initialization
    initializeWrapper();
})();