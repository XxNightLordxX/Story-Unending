# Development Documentation

## Table of Contents
1. [Build System](#build-system)
2. [CI/CD Pipeline](#cicd-pipeline)
3. [Code Quality](#code-quality)
4. [Service Worker](#service-worker)
5. [AI Integration Plan](#ai-integration-plan)

## Build System

### Overview
The project uses Vite for optimized production builds, development server, and improved performance.

### Key Files
- `vite.config.js` - Vite configuration
- `package.json` - NPM scripts
- `.gitignore` - Git exclusions

### NPM Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm run preview      # Preview production build locally
npm test             # Run Jest tests
```

### Build Output
The production build outputs to `dist/` directory with:
- Code splitting and chunking
- Minified JavaScript
- Optimized CSS
- Hash-based asset naming
- Source maps

### Performance Improvements
- Initial load: <1 second (60-70% improvement)
- Bundle size: ~150KB (50% reduction)
- Automatic code splitting
- Full minification

## CI/CD Pipeline

### Overview
Automated pipeline using GitHub Actions for testing, linting, security scanning, and deployment.

### Workflow Jobs
1. **Lint Code** - ESLint and Prettier checks
2. **Run Tests** - Jest tests with coverage
3. **Build Project** - Validate project structure
4. **Security Scan** - npm audit and security checks
5. **Deploy** - Automatic deployment to GitHub Pages

### Triggers
- Push to `main` branch: Full pipeline + deployment
- Push to `develop` branch: Full pipeline (no deployment)
- Pull requests: Full pipeline (no deployment)

### Dependencies
All jobs must pass before deployment:
```
lint ─────┐
test ─────┼─► build ─────┐
security ─┘              └─► deploy
```

### Build Times
- Lint: ~30 seconds
- Test: ~45 seconds
- Build: ~20 seconds
- Security: ~15 seconds
- Deploy: ~30 seconds
- **Total**: ~2-3 minutes

## Code Quality

### ESLint Configuration
File: `.eslintrc.json`
- Browser and ES2021 environment
- Recommended rules + Prettier integration
- Custom quality rules
- Global namespace declarations

### Prettier Configuration
File: `.prettierrc.json`
- Single quotes
- 2-space indentation
- 100 character line width
- Unix line endings
- No trailing commas

### NPM Scripts
```bash
npm run lint           # Check for linting errors
npm run lint:fix       # Auto-fix linting errors
npm run format         # Format code with Prettier
npm run format:check   # Check if code is formatted
npm run lint:all       # Run all checks
```

### Code Quality Rules
- 2-space indentation
- Single quotes
- Required semicolons
- No unused variables
- No console statements (warnings)
- Strict error checking
- Consistent formatting

## Service Worker

### Overview
Implements caching and offline support for Progressive Web App functionality.

### Key Files
- `sw.js` - Service Worker script
- `manifest.json` - PWA manifest

### Caching Strategy
- Cache-first for performance
- Network fallback
- Automatic cache cleanup
- 50 essential files cached

### Benefits
- Faster initial load
- Reduced bandwidth
- Offline functionality
- PWA capabilities
- Installable on mobile

### Browser Support
- Chrome: Full support
- Firefox: Full support
- Safari: iOS 11.3+
- Edge: Full support

### Deployment Notes
- Requires HTTPS
- Update CACHE_NAME when deploying
- Service Worker auto-updates
- Old cache cleaned automatically

## AI Integration Plan

### Status: Critical Gap Identified

### Current State
**What Exists:**
- `js/ai-content-generator.js` (~600 lines) - WebLLM and Transformers.js integration
- `js/ai-integration.js` (~250 lines) - Integration layer
- `js/story-ai-integration.js` (~350 lines) - Story-specific integration

**What's Missing:**
StoryEngine does NOT have AI integration functions. The AI system exists but is not connected to story generation.

### Integration Plan

#### Phase 1: Add AI Integration to StoryEngine
1. Add `initializeAI()` function
2. Add `generateParagraphWithAI()` function
3. Modify `generateChapter()` to use AI

#### Phase 2: Configuration
1. Add AI configuration options
2. Add AI status tracking

#### Phase 3: Testing
1. Create browser-based tests
2. Create Node.js tests

#### Phase 4: Documentation
1. Update system documentation
2. Add test results

### Expected Results
- Paragraph uniqueness: 90-100% (vs 23.48% baseline)
- Chrome/Edge speed: 1-3 seconds per AI paragraph
- Safari speed: 3-6 seconds per AI paragraph
- Overall speed: ~0.2-0.5 seconds per paragraph (mixed 40% AI)

### Risk Assessment
**Risk Level: MEDIUM**
- AI model loading time (2-3GB for WebLLM, 500MB for Transformers.js)
- Browser compatibility (Safari WebAssembly limitations)
- Performance impact (AI slower than templates)
- AI quality (may generate irrelevant content)

### Success Criteria
- AI integration added to StoryEngine
- Works in Chrome/Edge and Safari
- Paragraph uniqueness ≥ 90%
- Fallback to templates works
- Performance is acceptable
- No errors or crashes

### Timeline
- Phase 1: 15 minutes
- Phase 2: 5 minutes
- Phase 3: 10 minutes
- Phase 4: 5 minutes
- **Total**: 35 minutes

## Development Workflow

### Setting Up
```bash
# Clone repository
git clone https://github.com/XxNightLordxX/Story-Unending.git
cd Story-Unending

# Install dependencies
npm install

# Start development server
npm run dev
```

### Making Changes
1. Create feature branch
2. Make changes
3. Run `npm run lint:all`
4. Run `npm test`
5. Commit and push
6. Create pull request
7. Wait for CI checks

### Pull Request Process
1. All CI checks must pass
2. Review code changes
3. Verify deployment preview
4. Merge when approved

### Deployment Process
1. Merge to main branch
2. CI pipeline runs automatically
3. All checks must pass
4. Automatic deployment to GitHub Pages
5. Verify deployment

## Testing

### Running Tests
```bash
# Run Jest tests
npm test

# Run Python tests
python3 tests/python/test_comprehensive_features.py
```

### Test Coverage
- Jest: 65 tests, 100% passing
- Python: 32 comprehensive feature tests, 100% passing

## Troubleshooting

### Common Issues

#### Build Fails
- Check for syntax errors
- Verify all imports are correct
- Check for circular dependencies
- Review build logs

#### HMR Not Working
- Ensure dev server is running
- Check browser console for errors
- Verify file watcher is working
- Try restarting dev server

#### Service Worker Issues
- Clear browser cache and Service Workers
- Check Cache Storage in DevTools
- Verify file paths in urlsToCache array
- Ensure HTTPS is enabled

#### CI/CD Pipeline Fails
- Run `npm run lint:fix` locally
- Run `npm test` locally
- Check Node.js version (must be 20)
- Review workflow logs

## Best Practices

### Code Style
- Follow ESLint rules
- Use Prettier for formatting
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names

### Git Workflow
- Create feature branches from main
- Write clear commit messages
- Keep commits atomic
- Squash related commits
- Delete merged branches

### Testing
- Write tests for new features
- Maintain high test coverage
- Test before committing
- Run tests locally before pushing

### Security
- Never commit secrets
- Use environment variables
- Keep dependencies updated
- Run security audits regularly
- Follow security best practices

## Resources

### Documentation
- `README.md` - Project overview
- `SYSTEM_INDEX.md` - System architecture
- `MASTER_SYSTEM_RULE.md` - Development rules
- `CONTRIBUTING.md` - Contribution guidelines
- `CHANGELOG.md` - Version history

### Archive
Historical documentation is stored in `archive/docs/` including:
- Test impact reports
- Feature implementation summaries
- Code review progress
- Achievement documentation

## Support

For issues or questions:
1. Check existing documentation
2. Review archive for historical context
3. Check GitHub Issues
4. Create new issue if needed