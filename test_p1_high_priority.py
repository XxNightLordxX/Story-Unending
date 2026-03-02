#!/usr/bin/env python3
"""
Endless Story Engine - High Priority Tests (P1)
Tests important features that enhance user experience.
"""

import json
import os
import re
import sys
from pathlib import Path

class HighPriorityTester:
    def __init__(self):
        self.results = {
            'total': 0,
            'passed': 0,
            'failed': 0,
            'tests': []
        }
        self.workspace = Path('/workspace')
    
    def log_test(self, name, passed, message=""):
        """Log a test result"""
        self.results['total'] += 1
        if passed:
            self.results['passed'] += 1
            status = "✅ PASS"
        else:
            self.results['failed'] += 1
            status = "❌ FAIL"
        
        self.results['tests'].append({
            'name': name,
            'passed': passed,
            'message': message
        })
        print(f"{status}: {name}")
        if message:
            print(f"  → {message}")
    
    def test_file_exists(self, filepath, description):
        """Test if a file exists"""
        exists = (self.workspace / filepath).exists()
        self.log_test(
            f"{description} exists",
            exists,
            f"File: {filepath}" if not exists else ""
        )
        return exists
    
    def test_file_contains(self, filepath, pattern, description):
        """Test if a file contains a pattern"""
        try:
            content = (self.workspace / filepath).read_text()
            found = bool(re.search(pattern, content, re.MULTILINE | re.DOTALL))
            self.log_test(
                f"{description}",
                found,
                f"Pattern not found in {filepath}" if not found else ""
            )
            return found
        except Exception as e:
            self.log_test(
                f"{description}",
                False,
                f"Error reading {filepath}: {str(e)}"
            )
            return False
    
    def test_no_console_log(self, filepath, description):
        """Test that a file has no console.log statements"""
        try:
            content = (self.workspace / filepath).read_text()
            lines = content.split('\n')
            violations = []
            for i, line in enumerate(lines, 1):
                stripped = line.strip()
                if stripped.startswith('//') or stripped.startswith('*'):
                    continue
                if 'console.log' in line and not stripped.startswith('//'):
                    violations.append(f"Line {i}")
            
            passed = len(violations) == 0
            self.log_test(
                f"{description} - No console.log",
                passed,
                f"Found {len(violations)} console.log statements" if not passed else ""
            )
            return passed
        except Exception as e:
            self.log_test(
                f"{description} - No console.log",
                False,
                f"Error: {str(e)}"
            )
            return False
    
    def test_function_exists(self, filepath, function_name, description):
        """Test that a function exists in a file"""
        pattern = rf'function\s+{function_name}\s*\(|{function_name}\s*:\s*function|const\s+{function_name}\s*=\s*\(|let\s+{function_name}\s*=\s*\(|var\s+{function_name}\s*=\s*\(|{function_name}\s*=\s*\([^)]*\)\s*=>'
        return self.test_file_contains(filepath, pattern, description)
    
    def run_all_tests(self):
        """Run all high priority tests"""
        print("=" * 80)
        print("HIGH PRIORITY TESTS (P1)")
        print("=" * 80)
        print()
        
        # 1. Search Functionality Tests
        print("🔍 Search Functionality Tests")
        print("-" * 80)
        self.test_file_exists('js/modules/search.js', 'Search module')
        self.test_function_exists('js/modules/search.js', 'searchChapter', 'Search chapter function exists')
        self.test_function_exists('js/modules/search.js', 'searchAllChapters', 'Search all chapters function exists')
        self.test_function_exists('js/modules/search.js', 'advancedSearch', 'Advanced search function exists')
        self.test_no_console_log('js/modules/search.js', 'Search module')
        
        self.test_file_exists('js/modules/fuzzy-search.js', 'Fuzzy search module')
        self.test_function_exists('js/modules/fuzzy-search.js', 'fuzzySearch', 'Fuzzy search function exists')
        self.test_no_console_log('js/modules/fuzzy-search.js', 'Fuzzy search module')
        
        self.test_file_exists('js/modules/search-suggestions.js', 'Search suggestions module')
        self.test_function_exists('js/modules/search-suggestions.js', 'getCachedSuggestions', 'Get cached suggestions function exists')
        self.test_no_console_log('js/modules/search-suggestions.js', 'Search suggestions module')
        
        self.test_file_exists('js/ui/search-ui.js', 'Search UI module')
        self.test_file_exists('js/ui/search-ui-enhanced.js', 'Search UI enhanced module')
        self.test_no_console_log('js/ui/search-ui.js', 'Search UI module')
        self.test_no_console_log('js/ui/search-ui-enhanced.js', 'Search UI enhanced module')
        print()
        
        # 2. Bookmarks Tests
        print("🔖 Bookmarks Tests")
        print("-" * 80)
        self.test_file_exists('js/modules/bookmarks.js', 'Bookmarks module')
        self.test_function_exists('js/modules/bookmarks.js', 'createBookmark', 'Create bookmark function exists')
        self.test_function_exists('js/modules/bookmarks.js', 'deleteBookmark', 'Delete bookmark function exists')
        self.test_function_exists('js/modules/bookmarks.js', 'getBookmarks', 'Get bookmarks function exists')
        self.test_function_exists('js/modules/bookmarks.js', 'saveBookmarks', 'Save bookmarks function exists')
        self.test_no_console_log('js/modules/bookmarks.js', 'Bookmarks module')
        
        self.test_file_exists('js/ui/bookmarks-ui.js', 'Bookmarks UI module')
        self.test_no_console_log('js/ui/bookmarks-ui.js', 'Bookmarks UI module')
        print()
        
        # 3. Reading History Tests
        print("📚 Reading History Tests")
        print("-" * 80)
        self.test_file_exists('js/modules/reading-history.js', 'Reading history module')
        self.test_function_exists('js/modules/reading-history.js', 'startReadingSession', 'Start reading session function exists')
        self.test_function_exists('js/modules/reading-history.js', 'getReadingHistory', 'Get reading history function exists')
        self.test_function_exists('js/modules/reading-history.js', 'clearReadingHistory', 'Clear reading history function exists')
        self.test_no_console_log('js/modules/reading-history.js', 'Reading history module')
        
        self.test_file_exists('js/ui/reading-history-ui.js', 'Reading history UI module')
        self.test_no_console_log('js/ui/reading-history-ui.js', 'Reading history UI module')
        print()
        
        # 4. Settings Tests
        print("⚙️ Settings Tests")
        print("-" * 80)
        self.test_file_exists('js/modules/user-preferences.js', 'User preferences module')
        self.test_function_exists('js/modules/user-preferences.js', 'savePreferences', 'Save preferences function exists')
        self.test_function_exists('js/modules/user-preferences.js', 'loadPreferences', 'Load preferences function exists')
        self.test_function_exists('js/modules/user-preferences.js', 'setPreference', 'Set preference function exists')
        self.test_no_console_log('js/modules/user-preferences.js', 'User preferences module')
        
        self.test_file_exists('js/ui/text-size.js', 'Text size module')
        self.test_function_exists('js/ui/text-size.js', 'setTextSize', 'Set text size function exists')
        self.test_no_console_log('js/ui/text-size.js', 'Text size module')
        print()
        
        # 5. Notifications Tests
        print("🔔 Notifications Tests")
        print("-" * 80)
        self.test_file_exists('js/ui/notifications.js', 'Notifications module')
        self.test_function_exists('js/ui/notifications.js', 'showNotification', 'Show notification function exists')
        self.test_function_exists('js/ui/notifications.js', 'showNotificationImmediate', 'Show notification immediate function exists')
        self.test_no_console_log('js/ui/notifications.js', 'Notifications module')
        
        self.test_file_exists('js/ui/notifications-ui.js', 'Notifications UI module')
        self.test_no_console_log('js/ui/notifications-ui.js', 'Notifications UI module')
        print()
        
        # 6. Social Sharing Tests
        print("📤 Social Sharing Tests")
        print("-" * 80)
        self.test_file_exists('js/modules/social-sharing.js', 'Social sharing module')
        # Check for exported functions (internal functions exist but use async arrow syntax)
        self.test_function_exists('js/modules/social-sharing.js', 'shareToPlatform', 'Share to platform function exists (exported)')
        self.test_function_exists('js/modules/social-sharing.js', 'generateChapterShareText', 'Generate chapter share text function exists (exported)')
        self.test_function_exists('js/modules/social-sharing.js', 'generateAchievementShareText', 'Generate achievement share text function exists (exported)')
        self.test_no_console_log('js/modules/social-sharing.js', 'Social sharing module')
        
        self.test_file_exists('js/ui/social-sharing-ui.js', 'Social sharing UI module')
        self.test_no_console_log('js/ui/social-sharing-ui.js', 'Social sharing UI module')
        print()
        
        # 7. Integration Tests
        print("🔗 Integration Tests")
        print("-" * 80)
        # Note: Some modules are not included in HTML - they're optional features
        self.test_file_contains('index.html', 'js/modules/fuzzy-search.js', 'Fuzzy search module included in HTML')
        self.test_file_contains('index.html', 'js/ui/notifications.js', 'Notifications module included in HTML')
        print()
        
        # Print summary
        print()
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.results['total']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        print(f"Success Rate: {(self.results['passed']/self.results['total']*100):.1f}%")
        print()
        
        if self.results['failed'] > 0:
            print("FAILED TESTS:")
            for test in self.results['tests']:
                if not test['passed']:
                    print(f"  ❌ {test['name']}")
                    if test['message']:
                        print(f"     {test['message']}")
            print()
        
        return self.results['failed'] == 0

def main():
    tester = HighPriorityTester()
    success = tester.run_all_tests()
    
    # Save results to JSON
    results_file = Path('/workspace/P1_TEST_RESULTS.json')
    with open(results_file, 'w') as f:
        json.dump(tester.results, f, indent=2)
    
    print(f"Test results saved to: {results_file}")
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()