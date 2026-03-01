/**
 * Enhanced Search UI Module
 * Manages the search interface with fuzzy search support
 * @module search-ui-enhanced
 */

(function() {
  'use strict';

  let suggestionTimeout = null;

  /**
   * Opens the search modal
   */
  const openSearchModal = () => {
    const modal = document.getElementById('search-modal');
    if (!modal) {
      createSearchModal();
    }
    
    loadSearchHistory();
    document.getElementById('search-modal').classList.add('active');
    
    // Focus on search input
    setTimeout(() => {
      document.getElementById('search-input').focus();
    }, 100);
  }

  /**
   * Closes the search modal
   */
  const closeSearchModal = () => {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    
    // Clear suggestions
    hideSuggestions();
  }

  /**
   * Creates the search modal HTML structure
   */
  const createSearchModal = () => {
    const modalHTML = `
  <div id="search-modal" class="modal">
    <div class="modal-content search-content">
      <div class="modal-header">
        <h2>&#128269; Search</h2>
        <button class="close-btn" onclick="SearchUIEnhanced.closeModal()">&times;</button>
      </div>
          
      <div class="search-input-section">
        <div class="search-input-wrapper">
          <input type="text" id="search-input" placeholder="Search chapters..."
                 onkeypress="SearchUIEnhanced.handleKeyPress(event)"
                 oninput="SearchUIEnhanced.handleInput(event)">
          <button class="search-btn" onclick="SearchUIEnhanced.performSearch()">Search</button>
        </div>
            
        <div class="search-suggestions" id="search-suggestions" style="display:none;">
          <!-- Search suggestions will be rendered here -->
        </div>
            
        <div class="search-options-toggle" onclick="SearchUIEnhanced.toggleAdvancedOptions()">
          <span>Advanced Options</span>
          <span class="toggle-icon">&#9660;</span>
        </div>
            
        <div class="search-advanced-options" id="search-advanced-options" style="display:none;">
          <div class="option-row">
            <label class="checkbox-label">
              <input type="checkbox" id="fuzzy-mode" checked>
              <span>Fuzzy Search</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="case-sensitive">
              <span>Case Sensitive</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="whole-word">
              <span>Whole Word Only</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="regex-mode">
              <span>Regex Mode</span>
            </label>
          </div>
          <div class="option-row">
            <label>
              <span>Fuzzy Threshold:</span>
              <input type="range" id="fuzzy-threshold" min="0" max="100" value="40"
                     oninput="SearchUIEnhanced.updateThresholdLabel()">
              <span id="threshold-label">0.4</span>
            </label>
          </div>
          <div class="option-row">
            <label>
              <span>Min Matches:</span>
              <input type="number" id="min-matches" value="1" min="1" max="100">
            </label>
          </div>
        </div>
      </div>
          
      <div class="search-history-section" id="search-history-section">
        <div class="history-header">
          <span>Recent Searches</span>
          <button class="clear-history-btn" onclick="SearchUIEnhanced.clearHistory()">Clear</button>
        </div>
        <div class="search-history-list" id="search-history-list">
          <!-- Search history will be rendered here -->
        </div>
      </div>
          
      <div class="search-results-section" id="search-results-section" style="display:none;">
        <div class="results-header">
          <span id="results-count">0 results found</span>
          <button class="clear-results-btn" onclick="SearchUIEnhanced.clearResults()">Clear</button>
        </div>
        <div class="search-results-list" id="search-results-list">
          <!-- Search results will be rendered here -->
        </div>
      </div>
          
      <div class="search-empty" id="search-empty" style="display:none;">
        <div class="empty-icon">&#128269;</div>
        <p>No results found</p>
        <p class="empty-hint">Try different keywords or adjust search options</p>
      </div>
    </div>
  </div>
`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  /**
   * Toggles advanced options visibility
   */
  const toggleAdvancedOptions = () => {
    const options = document.getElementById('search-advanced-options');
    const toggle = document.querySelector('.search-options-toggle .toggle-icon');
    
    if (options.style.display === 'none') {
      options.style.display = 'block';
      toggle.textContent = '&#9652;';
    } else {
      options.style.display = 'none';
      toggle.textContent = '&#9660;';
    }
  }

  /**
   * Updates the threshold label
   */
  const updateThresholdLabel = () => {
    const threshold = document.getElementById('fuzzy-threshold').value;
    document.getElementById('threshold-label').textContent = (threshold / 100).toFixed(2);
  }

  /**
   * Handles key press in search input
   * @param {KeyboardEvent} event - Keyboard event
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  }

  /**
   * Handles input in search field (for suggestions)
   * @param {InputEvent} event - Input event
   */
  const handleInput = (event) => {
    const query = event.target.value.trim();
    
    // Clear previous timeout
    if (suggestionTimeout) {
      clearTimeout(suggestionTimeout);
    }
    
    // Show suggestions after 300ms delay
    if (query.length >= 2) {
      suggestionTimeout = setTimeout(() => {
        showSuggestions(query);
      }, 300);
    } else {
      hideSuggestions();
    }
  }

  /**
   * Shows search suggestions
   * @param {string} query - Search query
   */
  const showSuggestions = (query) => {
    const suggestions = SearchSuggestions.getEnhancedSuggestions(query, {
      maxSuggestions: 5,
      useCache: true,
      useHistory: true,
      useContext: true
    });
    
    const suggestionsDiv = document.getElementById('search-suggestions');
    
    if (!suggestionsDiv || suggestions.length === 0) {
      hideSuggestions();
      return;
    }
    
    let html = '<div class="suggestions-list">';
    suggestions.forEach(suggestion => {
      const isHistory = SearchSuggestions.getHistory().includes(suggestion.toLowerCase());
      const icon = isHistory ? '&#128197;' : '&#128269;';
      const label = isHistory ? 'Recent' : 'Suggestion';
      
      html += `
        <div class="suggestion-item" onclick="SearchUIEnhanced.applySuggestion('${sanitizeHTML(suggestion)}')">
          <span class="suggestion-text">${sanitizeHTML(suggestion)}</span>
          <span class="suggestion-icon" title="${label}">${icon}</span>
        </div>
      `;
    });
    html += '</div>';
    
    suggestionsDiv.innerHTML = html;
    suggestionsDiv.style.display = 'block';
  }

  /**
   * Hides search suggestions
   */
  const hideSuggestions = () => {
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (suggestionsDiv) {
      suggestionsDiv.style.display = 'none';
    }
  }

  /**
   * Applies a suggestion to the search input
   * @param {string} suggestion - Suggestion text
   */
  const applySuggestion = (suggestion) => {
    document.getElementById('search-input').value = suggestion;
    hideSuggestions();
    performSearch();
  }

  /**
   * Performs the search
   */
  const performSearch = () => {
    const query = document.getElementById('search-input').value.trim();
    
    if (!query) {
      UINotifications.showNotification('Please enter a search query', 'warning');
      return;
    }

    // Hide suggestions
    hideSuggestions();

    // Save to history
    Search.saveSearchHistory(query);
    SearchSuggestions.addToHistory(query);

    // Get search options
    const fuzzyMode = document.getElementById('fuzzy-mode').checked;
    const caseSensitive = document.getElementById('case-sensitive').checked;
    const wholeWord = document.getElementById('whole-word').checked;
    const regexMode = document.getElementById('regex-mode').checked;
    const fuzzyThreshold = parseInt(document.getElementById('fuzzy-threshold').value) / 100;
    const minMatches = parseInt(document.getElementById('min-matches').value) || 1;

    // Perform search
    let results;
    
    if (regexMode) {
      // Regex search (use existing Search module)
      results = Search.advancedSearch(query, {
        caseSensitive,
        wholeWord,
        regex: true,
        minMatches
      });
    } else if (fuzzyMode) {
      // Fuzzy search
      results = FuzzySearch.fuzzySearch(query, {
        threshold: fuzzyThreshold,
        caseSensitive: caseSensitive,
        maxResults: 50
      });
    } else {
      // Exact search
      results = Search.searchAllChapters(query, {
        caseSensitive,
        maxResults: 50
      });
    }

    // Display results
    displaySearchResults(results, query, caseSensitive, fuzzyMode);
  }

  /**
   * Displays search results
   * @param {Array} results - Search results
   * @param {string} query - Search query
   * @param {boolean} caseSensitive - Whether search was case sensitive
   * @param {boolean} fuzzyMode - Whether fuzzy search was used
   */
  const displaySearchResults = (results, query, caseSensitive, fuzzyMode) => {
    const historySection = document.getElementById('search-history-section');
    const resultsSection = document.getElementById('search-results-section');
    const emptySection = document.getElementById('search-empty');
    const resultsList = document.getElementById('search-results-list');
    const resultsCount = document.getElementById('results-count');

    // Hide history section
    historySection.style.display = 'none';

    if (results.length === 0) {
      // Show empty state
      resultsSection.style.display = 'none';
      emptySection.style.display = 'block';
      return;
    }

    // Show results
    emptySection.style.display = 'none';
    resultsSection.style.display = 'block';

    // Update count
    const totalMatches = results.reduce((sum, r) => sum + r.matchCount, 0);
    const fuzzyLabel = fuzzyMode ? ' (fuzzy)' : '';
    resultsCount.textContent = `${results.length} chapters, ${totalMatches} matches${fuzzyLabel}`;

    // Render results
    let html = '';
    results.forEach(result => {
      html += renderSearchResult(result, query, caseSensitive, fuzzyMode);
    });

    resultsList.innerHTML = html;
  }

  /**
   * Renders a single search result
   * @param {Object} result - Search result
   * @param {string} query - Search query
   * @param {boolean} caseSensitive - Whether search was case sensitive
   * @param {boolean} fuzzyMode - Whether fuzzy search was used
   * @returns {string} HTML string
   */
  const renderSearchResult = (result, query, caseSensitive, fuzzyMode) => {
    let highlightedContent;
    
    if (fuzzyMode && result.fuzzyMatch) {
      highlightedContent = FuzzySearch.highlightFuzzyMatches(result.content, query, result.matches || []);
    } else {
      highlightedContent = Search.highlightMatches(result.content, query, caseSensitive);
    }
    
    // Calculate relevance score
    const relevanceScore = FuzzySearch.calculateRelevanceScore(result, query);
    
    return `
      <div class="search-result-item" data-chapter="${result.chapterNum}">
        <div class="result-header">
          <div class="result-chapter">
            <span class="chapter-number">Chapter ${result.chapterNum}</span>
            <span class="chapter-title">${sanitizeHTML(result.chapterTitle)}</span>
          </div>
          <div class="result-matches">
            ${result.matchCount} match${result.matchCount > 1 ? 'es' : ''}
            ${result.score !== undefined ? `<span class="relevance-score" title="Relevance: ${relevanceScore}%">${relevanceScore}%</span>` : ''}
          </div>
        </div>
        <div class="result-content">
          ${highlightedContent}...
        </div>
        <div class="result-actions">
          <button class="btn btn-primary btn-sm" onclick="SearchUIEnhanced.goToChapter(${result.chapterNum})">
            &#128214; Read Chapter
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Loads and displays search history
   */
  const loadSearchHistory = () => {
    const history = Search.getSearchHistory();
    const historyList = document.getElementById('search-history-list');
    
    if (!historyList) return;

    if (history.length === 0) {
      historyList.innerHTML = '<p class="no-history">No recent searches</p>';
      return;
    }

    let html = '';
    history.forEach(query => {
      html += `
        <div class="history-item" onclick="SearchUIEnhanced.searchFromHistory('${sanitizeHTML(query)}')">
          <span class="history-query">${sanitizeHTML(query)}</span>
          <span class="history-icon">&#128269;</span>
        </div>
      `;
    });

    historyList.innerHTML = html;
  }

  /**
   * Searches from history
   * @param {string} query - Search query from history
   */
  const searchFromHistory = (query) => {
    document.getElementById('search-input').value = query;
    performSearch();
  }

  /**
   * Clears search history
   */
  const clearHistory = () => {
    if (confirm('Are you sure you want to clear search history?')) {
      Search.clearSearchHistory();
      loadSearchHistory();
      UINotifications.showNotification('Search history cleared', 'success');
    }
  }

  /**
   * Clears search results
   */
  const clearResults = () => {
    const historySection = document.getElementById('search-history-section');
    const resultsSection = document.getElementById('search-results-section');
    const emptySection = document.getElementById('search-empty');
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    historySection.style.display = 'block';
    resultsSection.style.display = 'none';
    emptySection.style.display = 'none';
    
    hideSuggestions();
    loadSearchHistory();
  }

  /**
   * Goes to a specific chapter
   * @param {number} chapterNum - Chapter number
   */
  const goToChapter = (chapterNum) => {
    closeSearchModal();
    Navigation.goToChapter(chapterNum);
  }

  // Create namespace object
  const SearchUIEnhanced = {
    openModal: openSearchModal,
    closeModal: closeModal,
    toggleAdvancedOptions: toggleAdvancedOptions,
    updateThresholdLabel: updateThresholdLabel,
    handleKeyPress: handleKeyPress,
    handleInput: handleInput,
    showSuggestions: showSuggestions,
    hideSuggestions: hideSuggestions,
    applySuggestion: applySuggestion,
    performSearch: performSearch,
    displaySearchResults: displaySearchResults,
    loadSearchHistory: loadSearchHistory,
    searchFromHistory: searchFromHistory,
    clearHistory: clearHistory,
    clearResults: clearResults,
    goToChapter: goToChapter
  };

  // Export to global scope
  if (typeof window !== 'undefined') {
    window.SearchUIEnhanced = SearchUIEnhanced;
  }

  // Export for Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchUIEnhanced;
  }

})();