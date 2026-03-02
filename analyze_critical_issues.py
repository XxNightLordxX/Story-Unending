#!/usr/bin/env python3
"""
Analyze Critical Issues from QA Test Report
Focus on real bugs, security vulnerabilities, and performance issues
"""

import json
import re
from pathlib import Path

def analyze_critical_issues():
    """Analyze the QA test report and identify real critical issues"""
    
    # Load the report
    with open("QA_TEST_REPORT.json", "r") as f:
        report = json.load(f)
    
    print("=" * 80)
    print("CRITICAL ISSUES ANALYSIS")
    print("=" * 80)
    
    # Filter for real critical issues
    real_critical_issues = []
    real_high_issues = []
    
    for issue in report["all_issues"]:
        if issue["severity"] == "CRITICAL":
            # Filter out false positives
            if is_real_critical_issue(issue):
                real_critical_issues.append(issue)
        elif issue["severity"] == "HIGH":
            if is_real_high_issue(issue):
                real_high_issues.append(issue)
    
    print(f"\nReal Critical Issues: {len(real_critical_issues)}")
    print(f"Real High Issues: {len(real_high_issues)}")
    
    # Display critical issues
    if real_critical_issues:
        print("\n" + "=" * 80)
        print("CRITICAL ISSUES (Must Fix)")
        print("=" * 80)
        for i, issue in enumerate(real_critical_issues, 1):
            print(f"\n{i}. {issue['file']}:{issue['line']}")
            print(f"   Type: {issue['issue_type']}")
            print(f"   Description: {issue['description']}")
            print(f"   Code: {issue['code_snippet']}")
            print(f"   Fix: {issue['suggested_fix']}")
    
    # Display high issues
    if real_high_issues:
        print("\n" + "=" * 80)
        print("HIGH PRIORITY ISSUES (Should Fix)")
        print("=" * 80)
        for i, issue in enumerate(real_high_issues[:20], 1):  # Show first 20
            print(f"\n{i}. {issue['file']}:{issue['line']}")
            print(f"   Type: {issue['issue_type']}")
            print(f"   Description: {issue['description']}")
            print(f"   Code: {issue['code_snippet']}")
            print(f"   Fix: {issue['suggested_fix']}")
        
        if len(real_high_issues) > 20:
            print(f"\n... and {len(real_high_issues) - 20} more high priority issues")
    
    return real_critical_issues, real_high_issues

def is_real_critical_issue(issue):
    """Determine if a critical issue is real or a false positive"""
    
    # Real critical issues
    real_patterns = [
        r'eval\s*\(',  # eval() usage
        r'innerHTML.*user',  # XSS with user input
        r'password.*=.*["\']',  # Hardcoded password
        r'secret.*=.*["\']',  # Hardcoded secret
        r'token.*=.*["\']',  # Hardcoded token
    ]
    
    # False positives to ignore
    false_positive_patterns = [
        r'gameVersion',  # Version string
        r'const\s+\w+\s*=\s*["\']',  # String assignment
        r'//.*',  # Comments
        r'console\.(log|debug)',  # Console logs (not critical)
    ]
    
    code = issue['code_snippet']
    
    # Check if it matches real critical patterns
    for pattern in real_patterns:
        if re.search(pattern, code, re.IGNORECASE):
            return True
    
    # Check if it's a false positive
    for pattern in false_positive_patterns:
        if re.search(pattern, code):
            return False
    
    # Default to false positive for critical issues
    return False

def is_real_high_issue(issue):
    """Determine if a high issue is real or a false positive"""
    
    # Real high issues
    real_patterns = [
        r'addEventListener.*removeEventListener',  # Memory leak
        r'localStorage.*password',  # Insecure storage
        r'localStorage.*token',  # Insecure storage
        r'console\.(log|debug|info).*password',  # Data exposure
        r'console\.(log|debug|info).*token',  # Data exposure
        r'innerHTML.*sanitize',  # XSS (if not sanitized)
    ]
    
    # False positives to ignore
    false_positive_patterns = [
        r'storyTracker\.',  # Normal object access
        r'window\.',  # Window object access
        r'chapter\.',  # Chapter object access
        r'const\s+\w+\s*=\s*\w+\.',  # Normal property access
        r'if\s*\(',  # Normal if statement
        r'for\s*\(',  # Normal for loop
    ]
    
    code = issue['code_snippet']
    
    # Check if it matches real high patterns
    for pattern in real_patterns:
        if re.search(pattern, code, re.IGNORECASE):
            return True
    
    # Check if it's a false positive
    for pattern in false_positive_patterns:
        if re.search(pattern, code):
            return False
    
    # Default to false positive for high issues
    return False

if __name__ == "__main__":
    critical, high = analyze_critical_issues()
    
    # Save filtered issues
    filtered_report = {
        "real_critical_issues": critical,
        "real_high_issues": high,
        "summary": {
            "real_critical_count": len(critical),
            "real_high_count": len(high)
        }
    }
    
    with open("REAL_ISSUES.json", "w") as f:
        json.dump(filtered_report, f, indent=2)
    
    print(f"\nFiltered issues saved to: REAL_ISSUES.json")