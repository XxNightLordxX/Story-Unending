/**
 * Modal management
 * Extracted from index.html
 * @module modals
 */


(function() {
  
/**
 * Opens a modal by ID
 * @param {string} id - Modal element ID
 * @example
 * openModal('loginOverlay'); // Opens login modal
 */
const openModal = (id) => { 
  document.getElementById(id).classList.add('active'); 
}

/**
 * Closes a modal by ID
 * @param {string} id - Modal element ID
 * @example
 * closeModal('loginOverlay'); // Closes login modal
 */
const closeModal = (id) => { 
  document.getElementById(id).classList.remove('active'); 
}

/**
 * Closes all open modals
 * @example
 * closeAllModals(); // Closes all modals
 */
const closeAllModals = () => {
  document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
}

  // Create namespace object
  const UIModals = {
    openModal: openModal,
    closeModal: closeModal,
    closeAllModals: closeAllModals
  };
  
  // Export to global scope
  if (typeof window !== 'undefined') {
    window.UIModals = UIModals;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.closeAllModals = closeAllModals;
  }
  
  // Export for Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIModals;
  }
})();