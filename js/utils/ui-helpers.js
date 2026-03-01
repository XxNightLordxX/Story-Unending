/**
 * Common UI helper utilities
 * Consolidated from multiple UI modules to eliminate duplication
 */

const UIHelpers = (() => {
    
    /**
     * Switch to a specific tab in a tabbed interface
     * @param {string} tabName - The name of the tab to switch to
     * @param {string} [tabContainerClass] - Optional class for tab container
     */
    const switchTab = (tabName, tabContainerClass = '') => {
        const tabBtnSelector = tabContainerClass 
            ? `.${tabContainerClass} .tab-btn`
            : '.tab-btn';
        const tabContentSelector = tabContainerClass
            ? `.${tabContainerClass} .tab-content`
            : '.tab-content';
        
        // Update tab buttons
        document.querySelectorAll(tabBtnSelector).forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });
        
        // Update tab content
        document.querySelectorAll(tabContentSelector).forEach(content => {
            content.classList.remove('active');
        });
        const tabContent = document.getElementById('tab-' + tabName);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    }
    
    /**
     * Generate a unique session ID
     * @returns {string} Unique session ID
     */
    const generateSessionId = () => {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Get current user from storage
     * @returns {Object|null} Current user object or null
     */
    const getCurrentUser = () => {
        try {
            const users = Storage.getItem('story_users') || [];
            const currentUser = Storage.getItem('story_current_user');
            if (currentUser) {
                return users.find(u => u.username === currentUser) || null;
            }
            return null;
        } catch (error) {
            // Error handled silently: console.error('Error getting current user:', error);
            return null;
        }
    }
    
    /**
     * Get all users from storage
     * @returns {Array} Array of user objects
     */
    const getUsers = () => {
        try {
            return Storage.getItem('story_users') || [];
        } catch (error) {
            // Error handled silently: console.error('Error getting users:', error);
            return [];
        }
    }
    
    /**
     * Navigate to a specific chapter
     * @param {number} chapterNum - Chapter number to navigate to
     */
    const goToChapter = (chapterNum) => {
        if (typeof Navigation !== 'undefined' && Navigation.goToChapter) {
            Navigation.goToChapter(chapterNum);
        } else {
            // Error logged: console.error('Navigation module not available');
        }
    }
    
    // Export public API
    return {
        switchTab,
        generateSessionId,
        getCurrentUser,
        getUsers,
        goToChapter
    };
    
})();