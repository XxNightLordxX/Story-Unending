/**
 * Social Sharing UI Module
 * Manages the social sharing interface
 * @module social-sharing-ui
 */

(function() {
  'use strict';

  /**
   * Opens the share modal
   */
  const openShareModal = () => {
    const modal = document.getElementById('share-modal');
    if (!modal) {
      createShareModal();
    }
    
    document.getElementById('share-modal').classList.add('active');
  }

  /**
   * Closes the share modal
   */
  const closeShareModal = () => {
    const modal = document.getElementById('share-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  /**
   * Creates the share modal HTML structure
   */
  const createShareModal = () => {
    const modalHTML = `
      <div id="share-modal" class="modal">
        <div class="modal-content share-content">
          <div class="modal-header">
            <h2>&#128274; Share</h2>
            <button class="close-btn" onclick="SocialSharingUI.closeModal()">&times;</button>
          </div>
          
          <div class="share-options">
            <div class="share-type-selector">
              <label>What would you like to share?</label>
              <select id="share-type" onchange="SocialSharingUI.updateShareOptions()">
                <option value="chapter">Current Chapter</option>
                <option value="achievement">Achievement</option>
                <option value="save">Save State</option>
                <option value="custom">Custom Message</option>
              </select>
            </div>
            
            <div class="share-content-input" id="share-content-input">
              <label>Share Content</label>
              <textarea id="share-text" rows="4" placeholder="Enter your message..."></textarea>
            </div>
            
            <div class="share-url-input" id="share-url-input" style="display:none;">
              <label>URL (optional)</label>
              <input type="text" id="share-url" placeholder="https://example.com">
            </div>
          </div>
          
          <div class="share-platforms">
            <h3>Share via</h3>
            <div class="platform-buttons">
              ${SocialSharing.isSupported() ? `
                <button class="platform-btn native-btn" onclick="SocialSharingUI.shareNative()">
                  <span class="platform-icon">&#128247;</span>
                  <span class="platform-name">Native Share</span>
                </button>
              ` : ''}
              
              <button class="platform-btn twitter-btn" onclick="SocialSharingUI.shareToPlatform('twitter')">
                <span class="platform-icon">&#128038;</span>
                <span class="platform-name">Twitter/X</span>
              </button>
              
              <button class="platform-btn facebook-btn" onclick="SocialSharingUI.shareToPlatform('facebook')">
                <span class="platform-icon">&#128242;</span>
                <span class="platform-name">Facebook</span>
              </button>
              
              <button class="platform-btn linkedin-btn" onclick="SocialSharingUI.shareToPlatform('linkedin')">
                <span class="platform-icon">&#128187;</span>
                <span class="platform-name">LinkedIn</span>
              </button>
              
              <button class="platform-btn whatsapp-btn" onclick="SocialSharingUI.shareToPlatform('whatsapp')">
                <span class="platform-icon">&#128241;</span>
                <span class="platform-name">WhatsApp</span>
              </button>
              
              <button class="platform-btn reddit-btn" onclick="SocialSharingUI.shareToPlatform('reddit')">
                <span class="platform-icon">&#128200;</span>
                <span class="platform-name">Reddit</span>
              </button>
              
              <button class="platform-btn email-btn" onclick="SocialSharingUI.shareToPlatform('email')">
                <span class="platform-icon">&#128231;</span>
                <span class="platform-name">Email</span>
              </button>
              
              <button class="platform-btn copy-btn" onclick="SocialSharingUI.copyLink()">
                <span class="platform-icon">&#128203;</span>
                <span class="platform-name">Copy Link</span>
              </button>
            </div>
          </div>
          
          <div class="share-history" id="share-history">
            <h3>Recent Shares</h3>
            <div class="history-list" id="share-history-list">
              <!-- Share history will be rendered here -->
            </div>
          </div>
          
          <div class="share-stats" id="share-stats">
            <h3>Share Statistics</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">Total Shares:</span>
                <span class="stat-value" id="total-shares">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    updateShareOptions();
    loadShareHistory();
    updateStats();
  }

  /**
   * Updates share options based on selected type
   */
  const updateShareOptions = () => {
    const shareType = document.getElementById('share-type').value;
    const shareTextInput = document.getElementById('share-content-input');
    const shareUrlInput = document.getElementById('share-url-input');
    const shareText = document.getElementById('share-text');

    switch (shareType) {
      case 'chapter':
        shareTextInput.style.display = 'block';
        shareUrlInput.style.display = 'none';
        shareText.value = SocialSharing.generateChapterShareText();
        shareText.readOnly = true;
        break;
      case 'achievement':
        shareTextInput.style.display = 'block';
        shareUrlInput.style.display = 'none';
        shareText.value = SocialSharing.generateAchievementShareText('Achievement');
        shareText.readOnly = false;
        break;
      case 'save':
        shareTextInput.style.display = 'block';
        shareUrlInput.style.display = 'none';
        shareText.value = SocialSharing.generateChapterShareText();
        shareText.readOnly = false;
        break;
      case 'custom':
        shareTextInput.style.display = 'block';
        shareUrlInput.style.display = 'block';
        shareText.value = '';
        shareText.readOnly = false;
        break;
    }
  }

  /**
   * Shares using native Web Share API
   */
  const shareNative = async () => {
    const shareType = document.getElementById('share-type').value;
    const shareText = document.getElementById('share-text').value;
    const shareUrl = document.getElementById('share-url').value;

    try {
      let result;
      switch (shareType) {
        case 'chapter':
          const chapterNum = AppStateModule.AppState.currentChapter || 1;
          result = await SocialSharing.shareChapter(chapterNum);
          break;
        case 'achievement':
          result = await SocialSharing.shareAchievement('Achievement', shareText);
          break;
        case 'save':
          result = await SocialSharing.shareSave('My Save', AppStateModule.AppState.currentChapter || 1);
          break;
        case 'custom':
          result = await SocialSharing.shareCustom({
            title: 'Story-Unending',
            text: shareText,
            url: shareUrl
          });
          break;
      }

      if (result) {
        UINotifications.showNotification('Shared successfully!', 'success');
        closeShareModal();
        loadShareHistory();
        updateStats();
      }
    } catch (error) {
      // Error handled silently: console.error('Error sharing:', error);
      UINotifications.showNotification('Failed to share: ' + error.message, 'error');
    }
  }

  /**
   * Shares to a specific platform
   * @param {string} platform - Platform name
   */
  const shareToPlatform = (platform) => {
    const shareText = document.getElementById('share-text').value;
    const shareUrl = document.getElementById('share-url').value || window.location.href;

    try {
      SocialSharing.shareToPlatform(platform, {
        title: 'Story-Unending',
        text: shareText,
        url: shareUrl
      });

      UINotifications.showNotification(`Opening ${platform}...`, 'info');
      closeShareModal();
      loadShareHistory();
      updateStats();
    } catch (error) {
      // Error handled silently: console.error('Error sharing to platform:', error);
      UINotifications.showNotification('Failed to share', 'error');
    }
  }

  /**
   * Copies link to clipboard
   */
  const copyLink = async () => {
    const shareUrl = document.getElementById('share-url').value || window.location.href;

    try {
      await SocialSharing.copyLink(shareUrl);
      UINotifications.showNotification('Link copied to clipboard!', 'success');
    } catch (error) {
      // Error handled silently: console.error('Error copying link:', error);
      UINotifications.showNotification('Failed to copy link', 'error');
    }
  }

  /**
   * Loads share history
   */
  const loadShareHistory = () => {
    const history = SocialSharing.getHistory(5);
    const historyList = document.getElementById('share-history-list');
    
    if (!historyList) return;

    if (history.length === 0) {
      historyList.innerHTML = '<p class="no-history">No recent shares</p>';
      return;
    }

    let html = '';
    history.forEach(share => {
      const date = new Date(share.timestamp).toLocaleDateString();
      const icon = getShareTypeIcon(share.type);
      
      html += `
        <div class="history-item">
          <span class="history-icon">${icon}</span>
          <span class="history-type">${capitalizeFirst(share.type)}</span>
          <span class="history-date">${date}</span>
        </div>
      `;
    });

    historyList.innerHTML = html;
  }

  /**
   * Updates share statistics
   */
  const updateStats = () => {
    const stats = SocialSharing.getShareStats();
    const totalSharesElement = document.getElementById('total-shares');
    
    if (totalSharesElement) {
      totalSharesElement.textContent = stats.totalShares;
    }
  }

  /**
   * Gets icon for share type
   * @param {string} type - Share type
   * @returns {string} Icon emoji
   */
  const getShareTypeIcon = (type) => {
    const icons = {
      'text': '&#128483;',
      'link': '&#128279;',
      'chapter': '&#128214;',
      'achievement': '&#127942;',
      'save': '&#128190;',
      'custom': '&#9998;',
      'platform': '&#128247;'
    };
    return icons[type] || '&#128274;';
  }

  /**
   * Capitalizes first letter
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Quick share current chapter
   */
  const quickShareChapter = async () => {
    try {
      const chapterNum = AppStateModule.AppState.currentChapter || 1;
      const result = await SocialSharing.shareChapter(chapterNum);
      
      if (result) {
        UINotifications.showNotification('Chapter shared successfully!', 'success');
      }
    } catch (error) {
      // Error handled silently: console.error('Error sharing chapter:', error);
      UINotifications.showNotification('Failed to share chapter', 'error');
    }
  }

  // Create namespace object
  const SocialSharingUI = {
    openModal: openModal,
    closeModal: closeModal,
    updateShareOptions: updateShareOptions,
    shareNative: shareNative,
    shareToPlatform: shareToPlatform,
    copyLink: copyLink,
    loadShareHistory: loadShareHistory,
    updateStats: updateStats,
    quickShareChapter: quickShareChapter
  };

  // Export to global scope
  if (typeof window !== 'undefined') {
    window.SocialSharingUI = SocialSharingUI;
  }

  // Export for Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialSharingUI;
  }

})();