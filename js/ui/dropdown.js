// UI Dropdown Management System
// Part of UZF-MSR v1.0 - UI/UI-01: User Interface Components

const UIDropdown = (() => {
  // Dropdown state
  let dropdownOpen = false;

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    dropdownOpen = !dropdownOpen;
    const menu = DOMHelpers.safeGetElement('dropdownMenu');
    if (menu) {
      DOMHelpers.safeToggleClass('dropdownMenu', 'open', dropdownOpen);
      
      // Update button icon
      const btn = document.querySelector('.user-menu-btn');
      if (btn) {
        const icon = btn.querySelector('.user-icon');
        if (icon) {
          icon.textContent = dropdownOpen ? '✕' : '👤';
        }
      }
    }
  };

  // Close dropdown
  const closeDropdown = () => {
    dropdownOpen = false;
    const menu = DOMHelpers.safeGetElement('dropdownMenu');
    if (menu) {
      DOMHelpers.safeToggleClass('dropdownMenu', 'open', false);
      
      // Reset button icon
      const btn = document.querySelector('.user-menu-btn');
      if (btn) {
        const icon = btn.querySelector('.user-icon');
        if (icon) {
          icon.textContent = '👤';
        }
      }
    }
  };

  // Initialize click-outside-to-close functionality
  const initDropdownClose = () => {
    // Handle click outside
    const handleOutsideClick = (e) => {
      const wrapper = document.querySelector('.dropdown-wrapper');
      const menu = DOMHelpers.safeGetElement('dropdownMenu');
      
      // Close if click is outside dropdown wrapper and menu
      if (wrapper && menu && !wrapper.contains(e.target) && !menu.contains(e.target)) {
        closeDropdown();
      }
    };
    
    // Add both click and touch event listeners
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);
    
    // Also close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    });
  };

  // Handle dropdown button clicks with enhanced touch support
  const handleDropdownButtonClick = (button, action) => {
    if (!button) return;
    
    // Add multiple event listeners for better mobile support
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      action();
      closeDropdown();
    });
    
    // Add touchend event for mobile devices
    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      action();
      closeDropdown();
    });
  };

  // Initialize dropdown buttons with enhanced event handling
  const initDropdownButtons = () => {
    // Login button
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
      handleDropdownButtonClick(loginBtn, () => {
        UIModals.openModal('loginOverlay');
      });
    }
    
    // Register button
    const registerBtn = document.querySelector('.register-btn');
    if (registerBtn) {
      handleDropdownButtonClick(registerBtn, () => {
        UIModals.openModal('registerOverlay');
      });
    }
    
    // Close button in dropdown header
    const closeBtn = document.querySelector('.dropdown-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDropdown();
      });
      
      closeBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDropdown();
      });
    }
  };

  // Initialize all dropdown functionality
  const init = () => {
    initDropdownClose();
    initDropdownButtons();
  };

  return {
    toggleDropdown,
    closeDropdown,
    init
  };
})();

// Initialize dropdown when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', UIDropdown.init);
} else {
  UIDropdown.init();
}