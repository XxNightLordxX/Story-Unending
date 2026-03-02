/**
    * Authentication and user management
    * Extracted from index.html
    * Updated to use DOM Helpers for null safety (UZF-MSR v1.0 Rule 18)
    */
   

   (function() {
     
     const register = () => {
       const regUsernameEl = DOMHelpers.safeGetElement('regUsername');
       const regEmailEl = DOMHelpers.safeGetElement('regEmail');
       const regPasswordEl = DOMHelpers.safeGetElement('regPassword');
       
       if (!regUsernameEl || !regEmailEl || !regPasswordEl) {
         showNotification('combat-notif', '\u274c Error', 'Registration form elements not found!');
         return;
       }
       
       const username = regUsernameEl.value.trim();
       const email = regEmailEl.value.trim();
       const password = regPasswordEl.value;
       
       if (!username || !password) { showNotification('combat-notif', '\u274c Error', 'Username and password required!'); return; }
       const users = getUsers();
       if (users.find(u => u.username === username)) { showNotification('combat-notif', '\u274c Error', 'Username exists!'); return; }
       users.push({ username, email, password, isAdmin: false, progress: null, subscribed: false });
       saveUsers(users);
       showNotification('quest-notif', '\u2705 Registered!', `Welcome, ${username}!`);
       closeModal('registerOverlay');
       loginUser({ username, email, password, isAdmin: false, progress: null, subscribed: false });
     }
   
     const login = () => {
       const loginUsernameEl = DOMHelpers.safeGetElement('loginUsername');
       const loginPasswordEl = DOMHelpers.safeGetElement('loginPassword');
       
       if (!loginUsernameEl || !loginPasswordEl) {
         showNotification('combat-notif', '\u274c Error', 'Login form elements not found!');
         return;
       }
       
       const username = loginUsernameEl.value.trim();
       const rateLimitKey = `login_${username}`;
   
       // Check rate limit
       if (!RateLimiter.check(rateLimitKey)) {
         const remaining = RateLimiter.getResetTime(rateLimitKey);
         const minutesLeft = Math.ceil((remaining - Date.now()) / 60000);
         showNotification('combat-notif', '\ud83d\udee1\ufe0f Too Many Attempts', `Account locked. Try again in ${minutesLeft} minutes.`);
         return;
       }
   
       const attemptsLeft = RateLimiter.getRemainingAttempts(rateLimitKey);
       const password = loginPasswordEl.value;
   
       // Check if it's admin login
       if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
         RateLimiter.reset(rateLimitKey);
         loginUser(ADMIN_USER);
         closeModal('loginOverlay');
         return;
       }
   
       const users = getUsers();
       const user = users.find(u => u.username === username && u.password === password);
       if (!user) { showNotification('combat-notif', '\u274c Error', `Invalid credentials. ${attemptsLeft - 1} attempts remaining.`); return; }
       loginUser(user);
       closeModal('loginOverlay');
     }
   
     const loginUser = (user) => {
       AppState.currentUser = user;
       AppState.isAdmin = user.isAdmin || false;
       
       DOMHelpers.safeSetDisplay('dropdownAuthSection', 'none');
       DOMHelpers.safeSetDisplay('dropdownUserSection', 'block');
       DOMHelpers.safeSetText('dropdownUserName', user.username);
   
       // Show/hide "Add Email" button based on whether user has email
       const addEmailBtn = DOMHelpers.safeGetElement('addEmailBtn');
       if (addEmailBtn) {
         addEmailBtn.style.display = (!user.email || user.email.trim() === '') ? 'flex' : 'none';
       }
   
       if (AppState.isAdmin) {
         DOMHelpers.safeSetText('dropdownUserIcon', '\ud83d\udc51');
         DOMHelpers.safeSetText('dropdownUserRole', 'Admin \u2014 Story Director');
         DOMHelpers.safeToggleClass('dropdownUserInfo', 'admin-info', true);
         DOMHelpers.safeSetDisplay('dropdownDirectorSection', 'block');
         showDirectorModeToggle();
         updateSpeedDisplay();
         highlightActiveSpeed();
         updateAdminCredsDisplay();
         loadUserList();
         showNotification('level-notif', '\ud83d\udc51 Admin Mode', 'Story Director Panel activated!');
       } else {
         DOMHelpers.safeSetText('dropdownUserIcon', user.subscribed ? '\u2b50' : '\ud83d\udc64');
         DOMHelpers.safeSetText('dropdownUserRole', user.subscribed ? 'Premium Reader' : 'Reader');
         DOMHelpers.safeToggleClass('dropdownUserInfo', 'admin-info', false);
         DOMHelpers.safeSetDisplay('dropdownDirectorSection', 'none');
         hideDirectorModeToggle();
       }
       Storage.setItem('ese_currentUser', user);
       if (user.progress && user.progress.lastChapter && AppState.totalGenerated > 0) {
         showChapter(Math.min(user.progress.lastChapter, AppState.totalGenerated));
         showNotification('quest-notif', '\ud83d\udcdd Position Restored', `Chapter ${user.progress.lastChapter}`);
       }
       showNotification('quest-notif', '\ud83d\udd11 Logged In', `Welcome back, ${user.username}!`);
       updateDirectiveList();
     }
   
     // Create namespace object
     const Auth = {
       register: register,
       login: login,
       loginUser: loginUser
     };
     
     // Export to global scope
     if (typeof window !== 'undefined') {
       window.Auth = Auth;
       window.register = register;
       window.login = login;
       window.loginUser = loginUser;
     }
     
     // Export for Node.js
     if (typeof module !== 'undefined' && module.exports) {
       module.exports = Auth;
     }
   })();