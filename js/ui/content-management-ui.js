/**
 * Content Management UI Module
 * Provides user interface for content management system
 * 
 * @namespace ContentManagementUI
 */
(function() {
    'use strict';

    // Private variables
    let cmsModal = null;
    let currentChapter = null;
    let currentVersionId = null;
    let editor = null;

    /**
     * Initialize CMS UI
     */
    const init = () => {
        createCMSModal();
        setupEventListeners();
    }

    /**
     * Create CMS modal
     */
    const createCMSModal = () => {
        const modalHTML = `
  <div id="cms-modal" class="modal">
      <div class="modal-content cms-modal">
          <div class="modal-header">
              <h2>📝 Content Management System</h2>
              <button class="close-btn" onclick="ContentManagementUI.closeModal()">&times;</button>
          </div>

          <div class="modal-body">
              <!-- Tab Navigation -->
              <div class="cms-tabs">
                  <button class="tab-btn active" data-tab="editor" onclick="ContentManagementUI.switchTab('editor')">
                      ✏️ Editor
                  </button>
                  <button class="tab-btn" data-tab="versions" onclick="ContentManagementUI.switchTab('versions')">
                      📚 Versions
                  </button>
                  <button class="tab-btn" data-tab="approval" onclick="ContentManagementUI.switchTab('approval')">
                      ✅ Approval Queue
                  </button>
                  <button class="tab-btn" data-tab="search" onclick="ContentManagementUI.switchTab('search')">
                      🔍 Search
                  </button>
                  <button class="tab-btn" data-tab="stats" onclick="ContentManagementUI.switchTab('stats')">
                      📊 Statistics
                  </button>
              </div>

              <!-- Tab Content -->
              <div class="cms-content">
                  <div id="tab-editor" class="tab-content active">
                      ${createEditorContent()}
                  </div>
                  <div id="tab-versions" class="tab-content">
                      ${createVersionsContent()}
                  </div>
                  <div id="tab-approval" class="tab-content">
                      ${createApprovalContent()}
                  </div>
                  <div id="tab-search" class="tab-content">
                      ${createSearchContent()}
                  </div>
                  <div id="tab-stats" class="tab-content">
                      ${createStatsContent()}
                  </div>
              </div>
          </div>

          <div class="modal-footer">
              <button class="btn btn-secondary" onclick="ContentManagementUI.exportContent('json')">
                  📥 Export JSON
              </button>
              <button class="btn btn-secondary" onclick="ContentManagementUI.exportContent('markdown')">
                  📥 Export Markdown
              </button>
              <button class="btn btn-secondary" onclick="ContentManagementUI.importContent()">
                  📤 Import
              </button>
          </div>
      </div>
  </div>
`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        cmsModal = document.getElementById('cms-modal');
    }

    /**
     * Create editor tab content
     */
    const createEditorContent = () => {
        return `
      <div class="cms-editor">
          <div class="editor-controls">
              <div class="control-group">
                  <label for="chapter-select">Chapter:</label>
                  <select id="chapter-select" onchange="ContentManagementUI.loadChapter()">
                      <option value="">Select a chapter...</option>
                  </select>
              </div>
              <div class="control-group">
                  <label for="version-select">Version:</label>
                  <select id="version-select" onchange="ContentManagementUI.loadVersion()">
                      <option value="">Current</option>
                  </select>
              </div>
          </div>

          <div class="editor-main">
              <div class="editor-title">
                  <label for="chapter-title">Chapter Title:</label>
                  <input type="text" id="chapter-title" placeholder="Enter chapter title...">
              </div>

              <div class="editor-content">
                  <label for="chapter-content">Chapter Content:</label>
                  <textarea id="chapter-content" rows="20" placeholder="Enter chapter content..."></textarea>
              </div>

              <div class="editor-meta">
                  <label for="change-description">Change Description:</label>
                  <input type="text" id="change-description" placeholder="Describe your changes...">
              </div>
          </div>

          <div class="editor-actions">
              <button class="btn btn-primary" onclick="ContentManagementUI.saveDraft()">
                  💾 Save Draft
              </button>
              <button class="btn btn-success" onclick="ContentManagementUI.createVersion()">
                  📝 Create Version
              </button>
              <button class="btn btn-info" onclick="ContentManagementUI.submitForApproval()">
                  ✅ Submit for Approval
              </button>
              <button class="btn btn-secondary" onclick="ContentManagementUI.previewContent()">
                  👁️ Preview
              </button>
              <button class="btn btn-danger" onclick="ContentManagementUI.deleteDraft()">
                  🗑️ Delete Draft
              </button>
          </div>
      </div>
  `;
    }

    /**
     * Create versions tab content
     */
    const createVersionsContent = () => {
        return `
      <div class="cms-versions">
          <div class="versions-controls">
              <div class="control-group">
                  <label for="versions-chapter-select">Chapter:</label>
                  <select id="versions-chapter-select" onchange="ContentManagementUI.loadVersions()">
                      <option value="">Select a chapter...</option>
                  </select>
              </div>
          </div>

          <div class="versions-list" id="versions-list">
              <p class="no-data">Select a chapter to view versions</p>
          </div>
      </div>
  `;
    }

    /**
     * Create approval tab content
     */
    const createApprovalContent = () => {
        return `
            <div class="cms-approval">
                <div class="approval-list" id="approval-list">
                    <p class="no-data">No pending approvals</p>
                </div>
            </div>
        `;
    }

    /**
     * Create search tab content
     */
    const createSearchContent = () => {
        return `
      <div class="cms-search">
          <div class="search-controls">
              <input type="text" id="search-input" placeholder="Search content..."
                     onkeypress="if(event.key === 'Enter') ContentManagementUI.searchContent()">
              <button class="btn btn-primary" onclick="ContentManagementUI.searchContent()">
                  🔍 Search
              </button>
          </div>

          <div class="search-results" id="search-results">
              <p class="no-data">Enter a search query to find content</p>
          </div>
      </div>
  `;
    }

    /**
     * Create statistics tab content
     */
    const createStatsContent = () => {
        return `
      <div class="cms-stats">
          <div class="stats-grid">
              <div class="stat-card">
                  <div class="stat-icon">📚</div>
                  <div class="stat-value" id="stat-total-versions">0</div>
                  <div class="stat-label">Total Versions</div>
              </div>
              <div class="stat-card">
                  <div class="stat-icon">✅</div>
                  <div class="stat-value" id="stat-published-versions">0</div>
                  <div class="stat-label">Published</div>
              </div>
              <div class="stat-card">
                  <div class="stat-icon">📝</div>
                  <div class="stat-value" id="stat-draft-versions">0</div>
                  <div class="stat-label">Drafts</div>
              </div>
              <div class="stat-card">
                  <div class="stat-icon">⏳</div>
                  <div class="stat-value" id="stat-pending-approvals">0</div>
                  <div class="stat-label">Pending Approvals</div>
              </div>
          </div>

          <div class="stats-details">
              <h3>📊 Detailed Statistics</h3>
              <div class="stats-table">
                  <div class="stat-row">
                      <span class="stat-label">Chapters with Versions:</span>
                      <span class="stat-value" id="stat-chapters-with-versions">0</span>
                  </div>
                  <div class="stat-row">
                      <span class="stat-label">Total Drafts:</span>
                      <span class="stat-value" id="stat-total-drafts">0</span>
                  </div>
              </div>
          </div>
      </div>
  `;
    }

    /**
     * Open CMS modal
     */
    const openModal = () => {
        if (cmsModal) {
            cmsModal.style.display = 'block';
            populateChapterSelect();
            updateStatistics();
            loadApprovalQueue();
        }
    }

    /**
     * Close CMS modal
     */
    const closeModal = () => {
        if (cmsModal) {
            cmsModal.style.display = 'none';
        }
    }

    /**
     * Switch between tabs
     * @param {string} tabName - Tab name
     */
    const switchTab = (tabName) => {
        // Update tab buttons
        document.querySelectorAll('.cms-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update tab content
        document.querySelectorAll('.cms-content .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById('tab-' + tabName).classList.add('active');

        // Update content for specific tabs
        if (tabName === 'stats') {
            updateStatistics();
        } else if (tabName === 'approval') {
            loadApprovalQueue();
        }
    }

    /**
     * Populate chapter select dropdown
     */
    const populateChapterSelect = () => {
        const chapterSelect = document.getElementById('chapter-select');
        const versionsChapterSelect = document.getElementById('versions-chapter-select');
        
        if (!chapterSelect || !versionsChapterSelect) return;

        // Get chapters from AppState or generate list
        const chapters = [];
        for (let i = 1; i <= 100; i++) {
            chapters.push(i);
        }

        const options = '<option value="">Select a chapter...</option>' + 
            chapters.map(ch => `<option value="${ch}">Chapter ${ch}</option>`).join('');

        chapterSelect.innerHTML = options;
        versionsChapterSelect.innerHTML = options;
    }

    /**
     * Load chapter content into editor
     */
    const loadChapter = () => {
        const chapterSelect = document.getElementById('chapter-select');
        currentChapter = parseInt(chapterSelect.value);

        if (!currentChapter) {
            clearEditor();
            return;
        }

        try {
            // Check for draft first
            const draft = ContentManagement.getDraft(currentChapter);
            if (draft) {
                loadDraftIntoEditor(draft);
                return;
            }

            // Load current content
            const content = ContentManagement.getChapterContent(currentChapter);
            loadContentIntoEditor(content);

            // Update version select
            updateVersionSelect();

        } catch (error) {
            ErrorHandler.handleError('Failed to load chapter', error);
            UINotifications.showNotification('Failed to load chapter', 'error');
        }
    }

    /**
     * Load draft into editor
     * @param {object} draft - Draft content
     */
    const loadDraftIntoEditor = (draft) => {
        document.getElementById('chapter-title').value = draft.content.title || '';
        document.getElementById('chapter-content').value = draft.content.content || '';
        document.getElementById('change-description').value = '';
        
        UINotifications.showNotification('Draft loaded', 'info');
    }

    /**
     * Load content into editor
     * @param {object} content - Chapter content
     */
    const loadContentIntoEditor = (content) => {
        document.getElementById('chapter-title').value = content.title || '';
        document.getElementById('chapter-content').value = content.content || '';
        document.getElementById('change-description').value = '';
    }

    /**
     * Clear editor
     */
    const clearEditor = () => {
        document.getElementById('chapter-title').value = '';
        document.getElementById('chapter-content').value = '';
        document.getElementById('change-description').value = '';
        document.getElementById('version-select').innerHTML = '<option value="">Current</option>';
    }

    /**
     * Update version select dropdown
     */
    const updateVersionSelect = () => {
        const versionSelect = document.getElementById('version-select');
        if (!versionSelect || !currentChapter) return;

        const versions = ContentManagement.getVersions(currentChapter);
        const options = '<option value="">Current</option>' + 
            versions.map(v => `<option value="${v.id}">${v.id} (${v.status})</option>`).join('');

        versionSelect.innerHTML = options;
    }

    /**
     * Load version into editor
     */
    const loadVersion = () => {
        const versionSelect = document.getElementById('version-select');
        currentVersionId = versionSelect.value;

        if (!currentVersionId || !currentChapter) {
            return;
        }

        try {
            const version = ContentManagement.getVersion(currentChapter, currentVersionId);
            if (version) {
                loadContentIntoEditor(version.content);
                document.getElementById('change-description').value = version.changeDescription;
                UINotifications.showNotification('Version loaded', 'info');
            }
        } catch (error) {
            ErrorHandler.handleError('Failed to load version', error);
            UINotifications.showNotification('Failed to load version', 'error');
        }
    }

    /**
     * Save draft
     */
    const saveDraft = () => {
        if (!currentChapter) {
            UINotifications.showNotification('Please select a chapter first', 'warning');
            return;
        }

        try {
            const content = {
                title: document.getElementById('chapter-title').value,
                content: document.getElementById('chapter-content').value
            };

            ContentManagement.saveDraft(currentChapter, content);
            UINotifications.showNotification('Draft saved successfully', 'success');
        } catch (error) {
            ErrorHandler.handleError('Failed to save draft', error);
            UINotifications.showNotification('Failed to save draft', 'error');
        }
    }

    /**
     * Create version
     */
    const createVersion = () => {
        if (!currentChapter) {
            UINotifications.showNotification('Please select a chapter first', 'warning');
            return;
        }

        try {
            const content = {
                title: document.getElementById('chapter-title').value,
                content: document.getElementById('chapter-content').value
            };

            const changeDescription = document.getElementById('change-description').value || 'No description';
            const versionId = ContentManagement.createVersion(currentChapter, content, changeDescription);

            UINotifications.showNotification(`Version ${versionId} created`, 'success');
            updateVersionSelect();

            // Clear draft
            ContentManagement.deleteDraft(currentChapter);

        } catch (error) {
            ErrorHandler.handleError('Failed to create version', error);
            UINotifications.showNotification('Failed to create version', 'error');
        }
    }

    /**
     * Submit for approval
     */
    const submitForApproval = () => {
        if (!currentChapter) {
            UINotifications.showNotification('Please select a chapter first', 'warning');
            return;
        }

        if (!currentVersionId) {
            UINotifications.showNotification('Please create a version first', 'warning');
            return;
        }

        try {
            const notes = document.getElementById('change-description').value || 'No notes';
            const approvalId = ContentManagement.submitForApproval(currentChapter, currentVersionId, notes);

            UINotifications.showNotification(`Submitted for approval (${approvalId})`, 'success');

        } catch (error) {
            ErrorHandler.handleError('Failed to submit for approval', error);
            UINotifications.showNotification('Failed to submit for approval', 'error');
        }
    }

    /**
     * Preview content
     */
    const previewContent = () => {
        const title = document.getElementById('chapter-title').value;
        const content = document.getElementById('chapter-content').value;

        const previewWindow = window.open('', '_blank');
        
        // Use proper DOM manipulation instead of document.write
        const doc = previewWindow.document;
        doc.open();
        
        // Create HTML structure
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Preview: ${sanitizeHTML(title)}</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
                    h1 { color: #333; }
                    p { line-height: 1.6; }
                </style>
            </head>
            <body>
                <h1>${sanitizeHTML(title)}</h1>
                <div>${sanitizeHTML(content).replace(/\n/g, '<br>')}</div>
            </body>
            </html>
        `;
        
        doc.write(html);
        doc.close();
    }

    /**
     * Delete draft
     */
    const deleteDraft = () => {
        if (!currentChapter) {
            UINotifications.showNotification('Please select a chapter first', 'warning');
            return;
        }

        if (confirm('Are you sure you want to delete this draft?')) {
            try {
                ContentManagement.deleteDraft(currentChapter);
                UINotifications.showNotification('Draft deleted', 'success');
                clearEditor();
            } catch (error) {
                ErrorHandler.handleError('Failed to delete draft', error);
                UINotifications.showNotification('Failed to delete draft', 'error');
            }
        }
    }

    /**
     * Load versions list
     */
    const loadVersions = () => {
        const chapterSelect = document.getElementById('versions-chapter-select');
        const chapterNumber = parseInt(chapterSelect.value);
        const versionsList = document.getElementById('versions-list');

        if (!chapterNumber) {
            versionsList.innerHTML = '<p class="no-data">Select a chapter to view versions</p>';
            return;
        }

        try {
            const versions = ContentManagement.getVersions(chapterNumber);

            if (versions.length === 0) {
                versionsList.innerHTML = '<p class="no-data">No versions found for this chapter</p>';
                return;
            }

            versionsList.innerHTML = versions.map(version => `
          <div class="version-item">
              <div class="version-header">
                  <span class="version-id">${version.id}</span>
                  <span class="version-status status-${version.status}">${version.status}</span>
              </div>
              <div class="version-description">${sanitizeHTML(version.changeDescription)}</div>
              <div class="version-meta">
                  <span>Created: ${formatDateTime(version.createdAt)}</span>
                  <span>By: ${version.createdBy}</span>
              </div>
              <div class="version-actions">
                  <button class="btn btn-sm btn-secondary" onclick="ContentManagementUI.loadVersionIntoEditor(${chapterNumber}, '${version.id}')">
                      Load
                  </button>
              </div>
          </div>
      `).join('');

        } catch (error) {
            ErrorHandler.handleError('Failed to load versions', error);
            versionsList.innerHTML = '<p class="no-data">Failed to load versions</p>';
        }
    }

    /**
     * Load version into editor from versions tab
     * @param {number} chapterNumber - Chapter number
     * @param {string} versionId - Version ID
     */
    const loadVersionIntoEditor = (chapterNumber, versionId) => {
        currentChapter = chapterNumber;
        currentVersionId = versionId;

        // Switch to editor tab
        switchTab('editor');

        // Update selects
        document.getElementById('chapter-select').value = chapterNumber;
        updateVersionSelect();
        document.getElementById('version-select').value = versionId;

        // Load version
        loadVersion();
    }

    /**
     * Load approval queue
     */
    const loadApprovalQueue = () => {
        const approvalList = document.getElementById('approval-list');
        if (!approvalList) return;

        try {
            const queue = ContentManagement.getApprovalQueue();
            const pending = queue.filter(r => r.status === 'pending');

            if (pending.length === 0) {
                approvalList.innerHTML = '<p class="no-data">No pending approvals</p>';
                return;
            }

            approvalList.innerHTML = pending.map(request => `
          <div class="approval-item">
              <div class="approval-header">
                  <span class="approval-chapter">Chapter ${request.chapterNumber}</span>
                  <span class="approval-id">${request.id}</span>
              </div>
              <div class="approval-description">${sanitizeHTML(request.notes)}</div>
              <div class="approval-meta">
                  <span>Submitted: ${formatDateTime(request.submittedAt)}</span>
                  <span>By: ${request.submittedBy}</span>
              </div>
              <div class="approval-actions">
                  <button class="btn btn-sm btn-success" onclick="ContentManagementUI.approveContent('${request.id}')">
                      ✅ Approve
                  </button>
                  <button class="btn btn-sm btn-danger" onclick="ContentManagementUI.rejectContent('${request.id}')">
                      ❌ Reject
                  </button>
                  <button class="btn btn-sm btn-secondary" onclick="ContentManagementUI.viewApproval('${request.id}')">
                      👁️ View
                  </button>
              </div>
          </div>
      `).join('');

        } catch (error) {
            ErrorHandler.handleError('Failed to load approval queue', error);
            approvalList.innerHTML = '<p class="no-data">Failed to load approval queue</p>';
        }
    }

    /**
     * Approve content
     * @param {string} approvalId - Approval ID
     */
    const approveContent = async (approvalId) => {
        const notes = await PromptModal.show('Enter approval notes (optional):', '', 'Input');
        
        try {
            ContentManagement.approveContent(approvalId, notes || '');
            UINotifications.showNotification('Content approved', 'success');
            loadApprovalQueue();
            updateStatistics();
        } catch (error) {
            ErrorHandler.handleError('Failed to approve content', error);
            UINotifications.showNotification('Failed to approve content', 'error');
        }
    }

    /**
     * Reject content
     * @param {string} approvalId - Approval ID
     */
    const rejectContent = async (approvalId) => {
        const notes = await PromptModal.show('Enter rejection reason (required):', '', 'Input');
        
        if (!notes) {
            UINotifications.showNotification('Rejection reason is required', 'warning');
            return;
        }

        try {
            ContentManagement.rejectContent(approvalId, notes);
            UINotifications.showNotification('Content rejected', 'success');
            loadApprovalQueue();
            updateStatistics();
        } catch (error) {
            ErrorHandler.handleError('Failed to reject content', error);
            UINotifications.showNotification('Failed to reject content', 'error');
        }
    }

    /**
     * View approval details
     * @param {string} approvalId - Approval ID
     */
    const viewApproval = (approvalId) => {
        const queue = ContentManagement.getApprovalQueue();
        const request = queue.find(r => r.id === approvalId);

        if (!request) {
            UINotifications.showNotification('Approval request not found', 'error');
            return;
        }

        // Load version into editor
        loadVersionIntoEditor(request.chapterNumber, request.versionId);
    }

    /**
     * Search content
     */
    const searchContent = () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const query = searchInput.value.trim();

        if (!query) {
            searchResults.innerHTML = '<p class="no-data">Enter a search query to find content</p>';
            return;
        }

        try {
            const results = ContentManagement.searchContent(query);

            if (results.length === 0) {
                searchResults.innerHTML = '<p class="no-data">No results found</p>';
                return;
            }

            searchResults.innerHTML = results.map(result => `
              <div class="search-result-item">
                  <div class="result-header">
                      <span class="result-type">${result.type}</span>
                      <span class="result-chapter">Chapter ${result.chapterNumber}</span>
                  </div>
                  <div class="result-title">${sanitizeHTML(result.title)}</div>
                  <div class="result-description">${sanitizeHTML(result.description || '')}</div>
                  <div class="result-meta">
                      <span>${formatDateTime(result.createdAt || result.savedAt)}</span>
                  </div>
              </div>
          `).join('');

        } catch (error) {
            ErrorHandler.handleError('Failed to search content', error);
            searchResults.innerHTML = '<p class="no-data">Failed to search content</p>';
        }
    }

    /**
     * Update statistics
     */
    const updateStatistics = () => {
        try {
            const stats = ContentManagement.getStatistics();

            document.getElementById('stat-total-versions').textContent = stats.totalVersions;
            document.getElementById('stat-published-versions').textContent = stats.publishedVersions;
            document.getElementById('stat-draft-versions').textContent = stats.draftVersions;
            document.getElementById('stat-pending-approvals').textContent = stats.pendingApprovals;
            document.getElementById('stat-chapters-with-versions').textContent = stats.chaptersWithVersions;
            document.getElementById('stat-total-drafts').textContent = stats.totalDrafts;

        } catch (error) {
            ErrorHandler.handleError('Failed to update statistics', error);
        }
    }

    /**
     * Export content
     * @param {string} format - Export format
     */
    const exportContent = (format) => {
        try {
            const data = ContentManagement.exportContent(format);
            const blob = new Blob([data], { 
                type: format === 'json' ? 'application/json' : 'text/markdown' 
            });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `cms_export_${new Date().toISOString().split('T')[0]}.${format === 'json' ? 'json' : 'md'}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            UINotifications.showNotification(`Content exported as ${format.toUpperCase()}`, 'success');
        } catch (error) {
            ErrorHandler.handleError('Failed to export content', error);
            UINotifications.showNotification('Failed to export content', 'error');
        }
    }

    /**
     * Import content
     */
    const importContent = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    ContentManagement.importContent(e.target.result, 'json');
                    UINotifications.showNotification('Content imported successfully', 'success');
                    updateStatistics();
                    loadApprovalQueue();
                } catch (error) {
                    ErrorHandler.handleError('Failed to import content', error);
                    UINotifications.showNotification('Failed to import content', 'error');
                }
            };
            reader.readAsText(file);
        };

        input.click();
    }

    /**
     * Format date and time for display
     * @param {string} dateString - Date string
     * @returns {string} Formatted date and time
     */
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    /**
     * Setup event listeners
     */
    const setupEventListeners = () => {
        // Close modal on outside click
        if (cmsModal) {
            cmsModal.addEventListener('click', function(e) {
                if (e.target === cmsModal) {
                    closeModal();
                }
            });
        }
    }

    // Export public API
    window.ContentManagementUI = {
        init: init,
        openModal: openModal,
        closeModal: closeModal,
        switchTab: switchTab,
        loadChapter: loadChapter,
        loadVersion: loadVersion,
        saveDraft: saveDraft,
        createVersion: createVersion,
        submitForApproval: submitForApproval,
        previewContent: previewContent,
        deleteDraft: deleteDraft,
        loadVersions: loadVersions,
        loadVersionIntoEditor: loadVersionIntoEditor,
        approveContent: approveContent,
        rejectContent: rejectContent,
        viewApproval: viewApproval,
        searchContent: searchContent,
        updateStatistics: updateStatistics,
        exportContent: exportContent,
        importContent: importContent
    };

})();