# Story-Unending System Index

## Project Overview
Story-Unending is an endless story generation engine built with vanilla JavaScript. It features dynamic content generation, AI-powered narrative expansion, and a comprehensive admin panel for content management.

## Core Architecture

### Main Files
| File | Purpose | Lines |
|------|---------|-------|
| `index.html` | Main application entry point | ~1,100 |
| `story-engine.js` | Core story generation logic | ~4,800 |
| `backstory-engine.js` | Character backstory generation | ~2,700 |
| `styles.css` | Application styling | ~1,800 |

### JavaScript Modules (`js/modules/`)
| Module | Purpose |
|--------|---------|
| `initialization.js` | System startup and configuration |
| `auth.js` | User authentication |
| `navigation.js` | Chapter and story navigation |
| `generation.js` | Content generation orchestration |
| `story-generation-control.js` | Speed and mode controls |
| `notifications.js` | User notifications |
| `search.js` | Content search functionality |
| `api.js` | API client for external services |
| `admin.js` | Admin panel functionality |
| `analytics.js` | Usage analytics |
| `backup.js` | System backup functionality |
| `ab-testing.js` | A/B testing framework |
| `branching-narrative.js` | Branching story logic |
| `dynamic-content.js` | Dynamic content injection |
| `fuzzy-search.js` | Fuzzy search implementation |
| `screenshot-capture.js` | Screenshot functionality |
| `performance.js` | Performance optimization |
| `performance-advanced.js` | Advanced performance features |
| `user-preferences.js` | User settings management |
| `user-profiles.js` | User profile management |
| `achievements.js` | Achievement system |
| `messaging.js` | User messaging system |

### UI Components (`js/ui/`)
| Component | Purpose |
|-----------|---------|
| `modals.js` | Modal dialog management |
| `sidebar.js` | Sidebar navigation |
| `notifications-ui.js` | Notification UI |
| `search-ui.js` | Search interface |
| `analytics-ui.js` | Analytics dashboard |
| `backup-ui.js` | Backup interface |
| `ab-testing-ui.js` | A/B testing dashboard |
| `content-management-ui.js` | CMS interface |
| `reading-history-ui.js` | Reading history display |
| `keyboard-shortcuts.js` | Keyboard navigation |
| `performance-ui.js` | Performance dashboard |

### Utilities (`js/utils/`)
| Utility | Purpose |
|---------|---------|
| `security.js` | Security functions (XSS prevention, sanitization) |
| `storage.js` | LocalStorage abstraction |
| `content-fetcher.js` | External content fetching |
| `lazy-loader.js` | Lazy loading implementation |

### CSS Files (`css/`)
| File | Purpose |
|------|---------|
| `backup.css` | Backup UI styles |
| `fuzzy-search.css` | Search styles |
| `screenshot.css` | Screenshot styles |
| `performance-advanced.css` | Performance UI styles |
| `ab-testing.css` | A/B testing styles |

## Key Features

### Story Generation
- **Unlimited Chapters**: Generate endless story content
- **Branching Narratives**: Multiple story paths
- **Dynamic Content**: Context-aware content injection
- **Character Development**: Automatic character evolution
- **World Building**: Persistent world state

### Admin Features
- **Content Management**: Add, edit, remove content
- **Analytics Dashboard**: Track usage and performance
- **A/B Testing**: Test different content variations
- **Backup System**: Automatic and manual backups
- **Performance Monitoring**: Real-time performance tracking

### User Features
- **Reading History**: Track reading progress
- **Achievements**: Unlock achievements while reading
- **Keyboard Navigation**: Full keyboard support
- **Responsive Design**: Works on all devices
- **Offline Support**: PWA with service worker

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Node.js dependencies |
| `vite.config.js` | Vite bundler configuration |
| `sw.js` | Service worker configuration |
| `manifest.json` | PWA manifest |

## Testing

### Test Structure (`tests/`)
- `tests/python/` - Python test suites
- `tests/*.test.js` - Jest unit tests

### Running Tests
```bash
npm test                    # Run Jest tests
python3 tests/python/test_comprehensive_features.py
```

## Documentation

| File | Purpose |
|------|---------|
| `README.md` | Project overview and getting started |
| `MASTER_SYSTEM_RULE.md` | Development rules and conventions |
| `CHANGELOG.md` | Version history |
| `CONTRIBUTING.md` | Contribution guidelines |

## Archive
Historical documentation is stored in `archive/docs/` and includes:
- Test impact reports
- Feature implementation summaries
- Code review progress
- Achievement documentation

## Removed Features
The following features have been removed as per project requirements:
- Save/Load System
- Bookmark System
- Social Sharing
- Leaderboards
- Donation System
- Subscription System
- Screenshot functionality (reduced scope)

## Dependencies
- **Runtime**: Vanilla JavaScript (ES6+)
- **Build**: Vite
- **Testing**: Jest, Python 3
- **PWA**: Service Worker, Web App Manifest

## File Statistics
- **Total JavaScript Files**: ~50
- **Total CSS Files**: ~10
- **Total Documentation Files**: ~15
- **Test Files**: ~10