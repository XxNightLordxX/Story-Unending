#!/usr/bin/env python3
import os
import re

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        lines = content.split('\n')
    
    file_issues = {}
    
    # Check for console.log
    for i, line in enumerate(lines, 1):
        if 'console.log' in line and not line.strip().startswith('//'):
            if 'console.log' not in file_issues:
                file_issues['console.log'] = []
            file_issues['console.log'].append((i, line.strip()))
    
    # Check for debugger
    for i, line in enumerate(lines, 1):
        if re.search(r'\bdebugger\b', line) and not line.strip().startswith('//'):
            if 'debugger' not in file_issues:
                file_issues['debugger'] = []
            file_issues['debugger'].append((i, line.strip()))
    
    # Check for alert
    for i, line in enumerate(lines, 1):
        if re.search(r'\balert\s*\(', line) and not line.strip().startswith('//'):
            if 'alert' not in file_issues:
                file_issues['alert'] = []
            file_issues['alert'].append((i, line.strip()))
    
    return file_issues

def main():
    js_files = []
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.js'):
                js_files.append(os.path.join(root, file))
    
    print(f"Found {len(js_files)} JavaScript files to review\n")
    
    total_issues = 0
    for filepath in sorted(js_files):
        file_issues = check_file(filepath)
        if file_issues:
            print(f"\n{'='*80}")
            print(f"File: {filepath}")
            print('='*80)
            for issue_type, occurrences in file_issues.items():
                print(f"\n{issue_type}:")
                for line_num, line in occurrences:
                    print(f"  Line {line_num}: {line[:100]}")
                    total_issues += 1
    
    print(f"\n{'='*80}")
    print(f"Total issues found: {total_issues}")
    print('='*80)

if __name__ == '__main__':
    main()
