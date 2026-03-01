/**
 * Dropdown menu functionality
 * Extracted from index.html
 * @module dropdown
 */


(function() {
  
// ============================================
// DROPDOWN
// ============================================

/**
 * Toggles the dropdown menu open/closed
 * @example
 * toggleDropdown(); // Opens or closes dropdown
 */
const toggleDropdown = () => {
  AppState.dropdownOpen = !AppState.dropdownOpen;
  document.getElementById('dropdownMenu').classList.toggle('open', AppState.dropdownOpen);
}

/**
 * Closes the dropdown menu
 * @example
 * closeDropdown(); // Closes dropdown
 */
const closeDropdown = () => {
  AppState.dropdownOpen = false;
  document.getElementById('dropdownMenu').classList.remove('open');
}

/**
 * Initializes click-outside-to-close functionality for dropdown
 * @example
 * initDropdownClose(); // Setup click-outside listener
 */
const initDropdownClose = () => {
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target)) closeDropdown();
  });
}

  // Create namespace object
  const UIDropdown = {
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown,
    initDropdownClose: initDropdownClose
  };
  
  // Export to global scope
  if (typeof window !== 'undefined') {
    window.UIDropdown = UIDropdown;
    window.toggleDropdown = toggleDropdown;
    window.closeDropdown = closeDropdown;
    window.initDropdownClose = initDropdownClose;
  }
  
  // Export for Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIDropdown;
  }
})();