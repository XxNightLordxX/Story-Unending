/**
 * Application initialization
 * Extracted from index.html
 */


(function() {
  
  // INITIALIZATION
  // ============================================
  const runInitialization = () => {
    try {
      console.log('=== Initializing Application ===');
      
      // Verify critical systems are available
      if (typeof UnifiedPoolManager !== 'undefined') {
        console.log('✓ UnifiedPoolManager available');
      } else {
        console.warn('✗ UnifiedPoolManager not available');
      }
      
      if (typeof UnifiedAIGenerator !== 'undefined') {
        console.log('✓ UnifiedAIGenerator available');
      } else {
        console.warn('✗ UnifiedAIGenerator not available');
      }
      
      if (typeof AdminReadingTracker !== 'undefined') {
        console.log('✓ AdminReadingTracker available');
      } else {
        console.warn('✗ AdminReadingTracker not available');
      }
      
      if (typeof StrictDuplicatePrevention !== 'undefined') {
        console.log('✓ StrictDuplicatePrevention available');
      } else {
        console.warn('✗ StrictDuplicatePrevention not available');
      }
      
      if (typeof StoryEngine !== 'undefined') {
        console.log('✓ StoryEngine available');
      } else {
        console.warn('✗ StoryEngine not available');
      }
      
      // Generate initial chapter and start the story
      if (typeof StoryEngine !== 'undefined' && typeof generateNewChapter === 'function' && typeof catchUpAndStart === 'function') {
        console.log('Generating initial chapter...');
        try {
          // Generate first chapter if none exist
          if (!AppState.totalGenerated || AppState.totalGenerated === 0) {
            generateNewChapter();
            console.log('✓ Initial chapter generated');
          }
          // Start the story display and generation timer
          catchUpAndStart();
          console.log('✓ Story started');
        } catch (genError) {
          console.error('Failed to generate initial chapter:', genError.message);
          // If AdminReadingTracker is blocking, try without it
          if (genError.message.includes('Admin has only read up to chapter')) {
            console.log('Admin reading tracker is blocking generation. Updating admin progress...');
            if (typeof AdminReadingTracker !== 'undefined') {
              AdminReadingTracker.updateReadingProgress(1);
              try {
                generateNewChapter();
                catchUpAndStart();
                console.log('✓ Story started after updating admin progress');
              } catch (retryError) {
                console.error('Failed to start story after admin progress update:', retryError.message);
              }
            }
          }
        }
      } else {
        console.warn('Story generation functions not available yet. Waiting...');
        // Retry after a short delay to allow all scripts to load
        setTimeout(() => {
          if (typeof generateNewChapter === 'function' && typeof catchUpAndStart === 'function') {
            try {
              if (!AppState.totalGenerated || AppState.totalGenerated === 0) {
                generateNewChapter();
              }
              catchUpAndStart();
              console.log('✓ Story started (delayed)');
            } catch (delayError) {
              console.error('Failed to start story (delayed):', delayError.message);
            }
          }
        }, 500);
      }
      
      console.log('=== Initialization Complete ===');
      
    } catch (error) {
      console.error('=== Initialization failed ===');
      console.error('Error:', error);
      console.error('Stack:', error.stack);
    }
  };

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitialization);
  } else {
    // DOM is already loaded, run immediately
    runInitialization();
  }

  // Create namespace object
  const Initialization = {
    // Initialization module - runs on DOMContentLoaded
  };
  
  // Export to global scope
  if (typeof window !== 'undefined') {
    window.Initialization = Initialization;
  }
  
  // Export for Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Initialization;
  }
})();