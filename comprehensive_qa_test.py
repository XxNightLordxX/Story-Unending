#!/usr/bin/env python3
"""
Comprehensive QA Testing Script - Endless Story Engine
Tests all components, workflows, functions, and edge cases
"""

import os
import re
import json
import subprocess
from pathlib import Path
from typing import List, Dict, Any, Tuple
from dataclasses import dataclass
from enum import Enum

class Severity(Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"
    INFO = "INFO"

class IssueType(Enum):
    BUG = "BUG"
    SECURITY = "SECURITY"
    PERFORMANCE = "PERFORMANCE"
    CODE_QUALITY = "CODE_QUALITY"
    MISSING_FEATURE = "MISSING_FEATURE"
    INCONSISTENCY = "INCONSISTENCY"

@dataclass
class Issue:
    file: str
    line: int
    severity: Severity
    issue_type: IssueType
    description: str
    code_snippet: str
    suggested_fix: str

class ComprehensiveQATester:
    def __init__(self, workspace: str = "/workspace"):
        self.workspace = workspace
        self.issues: List[Issue] = []
        self.test_results: Dict[str, Any] = {}
        
    def run_all_tests(self) -> Dict[str, Any]:
        """Run all comprehensive tests"""
        print("=" * 80)
        print("COMPREHENSIVE QA TESTING - Endless Story Engine")
        print("=" * 80)
        
        # Phase 1: Static Analysis
        print("\n[Phase 1] Static Analysis...")
        self.test_null_safety()
        self.test_console_logs()
        self.test_alerts()
        self.test_todo_fixme()
        self.test_debugger_statements()
        self.test_unused_variables()
        self.test_duplicate_code()
        
        # Phase 2: Security Testing
        print("\n[Phase 2] Security Testing...")
        self.test_xss_vulnerabilities()
        self.test_injection_attacks()
        self.test_authentication_issues()
        self.test_data_exposure()
        self.test_insecure_storage()
        
        # Phase 3: Code Quality Testing
        print("\n[Phase 3] Code Quality Testing...")
        self.test_error_handling()
        self.test_input_validation()
        self.test_type_safety()
        self.test_function_complexity()
        self.test_naming_conventions()
        
        # Phase 4: Performance Testing
        print("\n[Phase 4] Performance Testing...")
        self.test_dom_operations()
        self.test_memory_leaks()
        self.test_inefficient_loops()
        self.test_blocking_operations()
        
        # Phase 5: Integration Testing
        print("\n[Phase 5] Integration Testing...")
        self.test_module_dependencies()
        self.test_event_handlers()
        self.test_state_management()
        self.test_data_persistence()
        
        # Phase 6: Edge Case Testing
        print("\n[Phase 6] Edge Case Testing...")
        self.test_null_undefined_values()
        self.test_empty_data()
        self.test_extreme_values()
        self.test_concurrent_operations()
        
        # Generate Report
        print("\n[Phase 7] Generating Report...")
        return self.generate_report()
    
    def test_null_safety(self):
        """Test for null pointer exceptions"""
        print("  Testing null safety...")
        
        # Check for unsafe property access
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for unsafe property access without null checks
                if re.search(r'\w+\.\w+\.\w+', line) and 'DOMHelpers' not in line:
                    # Check if there's a null check before
                    if i > 1 and 'if' not in lines[i-2] and '?' not in line:
                        self.issues.append(Issue(
                            file=str(js_file.relative_to(self.workspace)),
                            line=i,
                            severity=Severity.HIGH,
                            issue_type=IssueType.BUG,
                            description="Potential null pointer exception - unsafe property access",
                            code_snippet=line.strip(),
                            suggested_fix="Add null check or use optional chaining (?.)"
                        ))
    
    def test_console_logs(self):
        """Test for console.log statements in production code"""
        print("  Testing for console.log statements...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file) or "js/system" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                if 'console.log' in line and not line.strip().startswith('//'):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.LOW,
                        issue_type=IssueType.CODE_QUALITY,
                        description="console.log statement in production code",
                        code_snippet=line.strip(),
                        suggested_fix="Remove console.log or replace with proper logging"
                    ))
    
    def test_alerts(self):
        """Test for alert() calls"""
        print("  Testing for alert() calls...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                if re.search(r'\balert\s*\(', line) and not line.strip().startswith('//'):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.MEDIUM,
                        issue_type=IssueType.CODE_QUALITY,
                        description="alert() call should be replaced with showNotification()",
                        code_snippet=line.strip(),
                        suggested_fix="Replace alert() with showNotification()"
                    ))
    
    def test_todo_fixme(self):
        """Test for TODO/FIXME comments"""
        print("  Testing for TODO/FIXME comments...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                if re.search(r'\b(TODO|FIXME|XXX|HACK)\b', line):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.LOW,
                        issue_type=IssueType.CODE_QUALITY,
                        description="TODO/FIXME comment found - incomplete work",
                        code_snippet=line.strip(),
                        suggested_fix="Complete the task or remove the comment"
                    ))
    
    def test_debugger_statements(self):
        """Test for debugger statements"""
        print("  Testing for debugger statements...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                if 'debugger' in line and not line.strip().startswith('//'):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.HIGH,
                        issue_type=IssueType.CODE_QUALITY,
                        description="debugger statement in production code",
                        code_snippet=line.strip(),
                        suggested_fix="Remove debugger statement"
                    ))
    
    def test_xss_vulnerabilities(self):
        """Test for XSS vulnerabilities"""
        print("  Testing for XSS vulnerabilities...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for innerHTML with user input
                if re.search(r'\.innerHTML\s*=\s*\w+', line) and 'sanitize' not in line:
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.CRITICAL,
                        issue_type=IssueType.SECURITY,
                        description="Potential XSS vulnerability - innerHTML with unsanitized input",
                        code_snippet=line.strip(),
                        suggested_fix="Use textContent or sanitize HTML before setting innerHTML"
                    ))
    
    def test_input_validation(self):
        """Test for input validation"""
        print("  Testing for input validation...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                content = f.read()
                
            # Check for form submission without validation
            if re.search(r'onsubmit\s*=\s*"[^"]*"', content):
                # Check if there's validation logic
                if 'validate' not in content and 'check' not in content:
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=0,
                        severity=Severity.HIGH,
                        issue_type=IssueType.SECURITY,
                        description="Form submission without proper validation",
                        code_snippet="onsubmit handler found",
                        suggested_fix="Add input validation before form submission"
                    ))
    
    def test_error_handling(self):
        """Test for error handling"""
        print("  Testing for error handling...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            # Check for try-catch blocks
            has_try_catch = any('try' in line for line in lines)
            has_async = any('async' in line or 'await' in line for line in lines)
            
            if has_async and not has_try_catch:
                self.issues.append(Issue(
                    file=str(js_file.relative_to(self.workspace)),
                    line=0,
                    severity=Severity.MEDIUM,
                    issue_type=IssueType.CODE_QUALITY,
                    description="Async code without error handling",
                    code_snippet="async/await found without try-catch",
                    suggested_fix="Add try-catch blocks for async operations"
                ))
    
    def test_unused_variables(self):
        """Test for unused variables"""
        print("  Testing for unused variables...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                content = f.read()
                
            # Simple check for declared but unused variables
            # This is a basic check - a full analysis would require AST parsing
            var_declarations = re.findall(r'(?:const|let|var)\s+(\w+)\s*=', content)
            
            for var in var_declarations:
                # Count occurrences after declaration
                var_count = content.count(var)
                if var_count == 1:  # Only appears in declaration
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=0,
                        severity=Severity.LOW,
                        issue_type=IssueType.CODE_QUALITY,
                        description=f"Unused variable: {var}",
                        code_snippet=f"const/let/var {var}",
                        suggested_fix=f"Remove unused variable {var} or use it"
                    ))
    
    def test_duplicate_code(self):
        """Test for duplicate code"""
        print("  Testing for duplicate code...")
        
        # This is a simplified check - full duplicate detection requires more sophisticated analysis
        js_files = list(Path(self.workspace).rglob("*.js"))
        code_blocks = {}
        
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            # Check for repeated function definitions
            for i, line in enumerate(lines, 1):
                if re.search(r'function\s+\w+\s*\(|const\s+\w+\s*=\s*\(', line):
                    func_name = re.search(r'(?:function|const)\s+(\w+)', line)
                    if func_name:
                        name = func_name.group(1)
                        if name in code_blocks:
                            self.issues.append(Issue(
                                file=str(js_file.relative_to(self.workspace)),
                                line=i,
                                severity=Severity.MEDIUM,
                                issue_type=IssueType.CODE_QUALITY,
                                description=f"Duplicate function definition: {name}",
                                code_snippet=line.strip(),
                                suggested_fix=f"Remove duplicate function {name} or consolidate"
                            ))
                        code_blocks[name] = str(js_file)
    
    def test_dom_operations(self):
        """Test for inefficient DOM operations"""
        print("  Testing for DOM operations...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for DOM operations in loops
                if re.search(r'(for|while)\s*\([^)]*\)\s*{', line):
                    # Check next few lines for DOM operations
                    for j in range(i, min(i+10, len(lines))):
                        if re.search(r'\.innerHTML|\.appendChild|\.createElement', lines[j]):
                            self.issues.append(Issue(
                                file=str(js_file.relative_to(self.workspace)),
                                line=j,
                                severity=Severity.MEDIUM,
                                issue_type=IssueType.PERFORMANCE,
                                description="DOM operation inside loop - potential performance issue",
                                code_snippet=lines[j].strip(),
                                suggested_fix="Move DOM operations outside loop or use document fragment"
                            ))
                            break
    
    def test_memory_leaks(self):
        """Test for potential memory leaks"""
        print("  Testing for memory leaks...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for event listeners without cleanup
                if re.search(r'addEventListener\s*\(', line):
                    # Check if there's a corresponding removeEventListener
                    file_content = ''.join(lines)
                    if 'removeEventListener' not in file_content:
                        self.issues.append(Issue(
                            file=str(js_file.relative_to(self.workspace)),
                            line=i,
                            severity=Severity.MEDIUM,
                            issue_type=IssueType.PERFORMANCE,
                            description="Event listener added without cleanup - potential memory leak",
                            code_snippet=line.strip(),
                            suggested_fix="Add removeEventListener in cleanup function"
                        ))
    
    def test_authentication_issues(self):
        """Test for authentication issues"""
        print("  Testing for authentication issues...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                content = f.read()
                
            # Check for hardcoded credentials
            if re.search(r'(password|secret|token)\s*=\s*["\'][^"\']+["\']', content, re.IGNORECASE):
                self.issues.append(Issue(
                    file=str(js_file.relative_to(self.workspace)),
                    line=0,
                    severity=Severity.CRITICAL,
                    issue_type=IssueType.SECURITY,
                    description="Hardcoded credentials found",
                    code_snippet="password/secret/token assignment",
                    suggested_fix="Remove hardcoded credentials and use environment variables"
                ))
    
    def test_data_exposure(self):
        """Test for data exposure"""
        print("  Testing for data exposure...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for sensitive data in console
                if re.search(r'console\.(log|debug|info)\s*\([^)]*(password|token|secret)', line, re.IGNORECASE):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.HIGH,
                        issue_type=IssueType.SECURITY,
                        description="Sensitive data exposed in console",
                        code_snippet=line.strip(),
                        suggested_fix="Remove sensitive data from console output"
                    ))
    
    def test_insecure_storage(self):
        """Test for insecure storage"""
        print("  Testing for insecure storage...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                content = f.read()
                
            # Check for storing sensitive data in localStorage
            if re.search(r'localStorage\.(setItem|getItem)\s*\([^)]*(password|token)', content, re.IGNORECASE):
                self.issues.append(Issue(
                    file=str(js_file.relative_to(self.workspace)),
                    line=0,
                    severity=Severity.HIGH,
                    issue_type=IssueType.SECURITY,
                    description="Sensitive data stored in localStorage",
                    code_snippet="localStorage with password/token",
                    suggested_fix="Use secure storage or encrypt sensitive data"
                ))
    
    def test_type_safety(self):
        """Test for type safety issues"""
        print("  Testing for type safety...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for type coercion issues
                if re.search(r'==\s*[^=]', line) and '===' not in line:
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.LOW,
                        issue_type=IssueType.CODE_QUALITY,
                        description="Loose equality (==) used - consider strict equality (===)",
                        code_snippet=line.strip(),
                        suggested_fix="Replace == with === for type-safe comparison"
                    ))
    
    def test_function_complexity(self):
        """Test for complex functions"""
        print("  Testing for function complexity...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            # Check for deeply nested code
            for i, line in enumerate(lines, 1):
                indent = len(line) - len(line.lstrip())
                if indent > 24:  # More than 6 levels of nesting
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.MEDIUM,
                        issue_type=IssueType.CODE_QUALITY,
                        description=f"Deeply nested code ({indent//4} levels) - consider refactoring",
                        code_snippet=line.strip(),
                        suggested_fix="Extract nested logic into separate functions"
                    ))
    
    def test_naming_conventions(self):
        """Test for naming convention violations"""
        print("  Testing for naming conventions...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for single-letter variables (except loop counters)
                if re.search(r'\b(let|const|var)\s+[a-z]\s*=', line) and not re.search(r'\b(let|const|var)\s+[ijk]\s*=', line):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.LOW,
                        issue_type=IssueType.CODE_QUALITY,
                        description="Single-letter variable name - use descriptive names",
                        code_snippet=line.strip(),
                        suggested_fix="Use descriptive variable names"
                    ))
    
    def test_inefficient_loops(self):
        """Test for inefficient loops"""
        print("  Testing for inefficient loops...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for nested loops
                if re.search(r'for\s*\([^)]*\)\s*{', line):
                    # Check next few lines for another loop
                    for j in range(i+1, min(i+5, len(lines))):
                        if re.search(r'for\s*\([^)]*\)\s*{', lines[j]):
                            self.issues.append(Issue(
                                file=str(js_file.relative_to(self.workspace)),
                                line=j,
                                severity=Severity.MEDIUM,
                                issue_type=IssueType.PERFORMANCE,
                                description="Nested loop detected - potential O(n²) complexity",
                                code_snippet=lines[j].strip(),
                                suggested_fix="Consider optimizing algorithm or using data structures"
                            ))
                            break
    
    def test_blocking_operations(self):
        """Test for blocking operations"""
        print("  Testing for blocking operations...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for synchronous operations that should be async
                if re.search(r'\.forEach\s*\([^)]*\)\s*{', line):
                    # Check if there's async work inside
                    for j in range(i, min(i+10, len(lines))):
                        if re.search(r'(await|fetch|XMLHttpRequest)', lines[j]):
                            self.issues.append(Issue(
                                file=str(js_file.relative_to(self.workspace)),
                                line=i,
                                severity=Severity.MEDIUM,
                                issue_type=IssueType.PERFORMANCE,
                                description="Async operation inside forEach - use for...of or Promise.all",
                                code_snippet=line.strip(),
                                suggested_fix="Replace forEach with for...of or Promise.all for async operations"
                            ))
                            break
    
    def test_module_dependencies(self):
        """Test for module dependency issues"""
        print("  Testing for module dependencies...")
        
        # Check if DOMHelpers is loaded before dependent modules
        with open(f"{self.workspace}/index.html", 'r') as f:
            html_content = f.read()
            
        dom_helpers_pos = html_content.find('dom-helpers.js')
        
        if dom_helpers_pos == -1:
            self.issues.append(Issue(
                file="index.html",
                line=0,
                severity=Severity.CRITICAL,
                issue_type=IssueType.BUG,
                description="DOM Helpers module not loaded",
                code_snippet="index.html",
                suggested_fix="Add dom-helpers.js script tag before dependent modules"
            ))
        else:
            # Check if modules using DOMHelpers are loaded after it
            js_files = list(Path(self.workspace).rglob("js/modules/*.js"))
            for js_file in js_files:
                if ".backup" in str(js_file):
                    continue
                    
                with open(js_file, 'r') as f:
                    content = f.read()
                    
                if 'DOMHelpers' in content:
                    module_name = js_file.name
                    module_pos = html_content.find(module_name)
                    if module_pos != -1 and module_pos < dom_helpers_pos:
                        self.issues.append(Issue(
                            file="index.html",
                            line=0,
                            severity=Severity.HIGH,
                            issue_type=IssueType.BUG,
                            description=f"Module {module_name} loaded before DOM Helpers",
                            code_snippet=f"{module_name} script tag",
                            suggested_fix=f"Move {module_name} script tag after dom-helpers.js"
                        ))
    
    def test_event_handlers(self):
        """Test for event handler issues"""
        print("  Testing for event handlers...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for inline event handlers in HTML
                if re.search(r'onclick\s*=\s*"[^"]*"', line):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.LOW,
                        issue_type=IssueType.CODE_QUALITY,
                        description="Inline event handler - consider using addEventListener",
                        code_snippet=line.strip(),
                        suggested_fix="Use addEventListener for better separation of concerns"
                    ))
    
    def test_state_management(self):
        """Test for state management issues"""
        print("  Testing for state management...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                content = f.read()
                
            # Check for direct state mutations
            if re.search(r'AppState\.\w+\s*=\s*', content):
                self.issues.append(Issue(
                    file=str(js_file.relative_to(self.workspace)),
                    line=0,
                    severity=Severity.MEDIUM,
                    issue_type=IssueType.CODE_QUALITY,
                    description="Direct state mutation - use state update functions",
                    code_snippet="AppState direct assignment",
                    suggested_fix="Use state update functions to ensure reactivity"
                ))
    
    def test_data_persistence(self):
        """Test for data persistence issues"""
        print("  Testing for data persistence...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                content = f.read()
                
            # Check for localStorage operations without error handling
            if re.search(r'localStorage\.(setItem|getItem|removeItem)\s*\(', content):
                if 'try' not in content:
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=0,
                        severity=Severity.MEDIUM,
                        issue_type=IssueType.BUG,
                        description="localStorage operations without error handling",
                        code_snippet="localStorage operation",
                        suggested_fix="Add try-catch for localStorage operations (quota exceeded, etc.)"
                    ))
    
    def test_null_undefined_values(self):
        """Test for null/undefined value handling"""
        print("  Testing for null/undefined value handling...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for property access without null check
                if re.search(r'\w+\.\w+\.\w+', line) and 'DOMHelpers' not in line:
                    if 'if' not in lines[i-1] and '?' not in line and '||' not in line:
                        self.issues.append(Issue(
                            file=str(js_file.relative_to(self.workspace)),
                            line=i,
                            severity=Severity.HIGH,
                            issue_type=IssueType.BUG,
                            description="Property access without null check",
                            code_snippet=line.strip(),
                            suggested_fix="Add null check or use optional chaining"
                        ))
    
    def test_empty_data(self):
        """Test for empty data handling"""
        print("  Testing for empty data handling...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for array/object operations without empty check
                if re.search(r'\w+\.(forEach|map|filter|reduce)\s*\(', line):
                    if i > 1 and 'if' not in lines[i-1] and 'length' not in lines[i-1]:
                        self.issues.append(Issue(
                            file=str(js_file.relative_to(self.workspace)),
                            line=i,
                            severity=Severity.MEDIUM,
                            issue_type=IssueType.BUG,
                            description="Array operation without empty check",
                            code_snippet=line.strip(),
                            suggested_fix="Add empty array check before iteration"
                        ))
    
    def test_extreme_values(self):
        """Test for extreme value handling"""
        print("  Testing for extreme value handling...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for numeric operations without bounds checking
                if re.search(r'\w+\s*[\+\-\*\/]\s*\w+', line):
                    if 'Math.min' not in line and 'Math.max' not in line:
                        self.issues.append(Issue(
                            file=str(js_file.relative_to(self.workspace)),
                            line=i,
                            severity=Severity.LOW,
                            issue_type=IssueType.BUG,
                            description="Numeric operation without bounds checking",
                            code_snippet=line.strip(),
                            suggested_fix="Add bounds checking for numeric operations"
                        ))
    
    def test_concurrent_operations(self):
        """Test for concurrent operation issues"""
        print("  Testing for concurrent operations...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                content = f.read()
                
            # Check for race conditions with shared state
            if re.search(r'async\s+function\s+\w+', content):
                if 'mutex' not in content and 'lock' not in content and 'await' not in content:
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=0,
                        severity=Severity.MEDIUM,
                        issue_type=IssueType.BUG,
                        description="Async function without proper synchronization",
                        code_snippet="async function",
                        suggested_fix="Add proper synchronization for shared state"
                    ))
    
    def test_injection_attacks(self):
        """Test for injection attacks"""
        print("  Testing for injection attacks...")
        
        js_files = list(Path(self.workspace).rglob("*.js"))
        for js_file in js_files:
            if ".backup" in str(js_file) or "node_modules" in str(js_file):
                continue
                
            with open(js_file, 'r') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines, 1):
                # Check for eval usage
                if re.search(r'\beval\s*\(', line):
                    self.issues.append(Issue(
                        file=str(js_file.relative_to(self.workspace)),
                        line=i,
                        severity=Severity.CRITICAL,
                        issue_type=IssueType.SECURITY,
                        description="eval() usage - code injection vulnerability",
                        code_snippet=line.strip(),
                        suggested_fix="Remove eval() and use safer alternatives"
                    ))
    
    def generate_report(self) -> Dict[str, Any]:
        """Generate comprehensive test report"""
        # Group issues by severity
        issues_by_severity = {
            Severity.CRITICAL: [],
            Severity.HIGH: [],
            Severity.MEDIUM: [],
            Severity.LOW: [],
            Severity.INFO: []
        }
        
        for issue in self.issues:
            issues_by_severity[issue.severity].append(issue)
        
        # Generate report
        report = {
            "summary": {
                "total_issues": len(self.issues),
                "critical": len(issues_by_severity[Severity.CRITICAL]),
                "high": len(issues_by_severity[Severity.HIGH]),
                "medium": len(issues_by_severity[Severity.MEDIUM]),
                "low": len(issues_by_severity[Severity.LOW]),
                "info": len(issues_by_severity[Severity.INFO])
            },
            "issues_by_type": {},
            "issues_by_file": {},
            "all_issues": []
        }
        
        # Group by type
        for issue in self.issues:
            issue_type = issue.issue_type.value
            if issue_type not in report["issues_by_type"]:
                report["issues_by_type"][issue_type] = []
            report["issues_by_type"][issue_type].append({
                "file": issue.file,
                "line": issue.line,
                "severity": issue.severity.value,
                "description": issue.description,
                "code_snippet": issue.code_snippet,
                "suggested_fix": issue.suggested_fix
            })
        
        # Group by file
        for issue in self.issues:
            if issue.file not in report["issues_by_file"]:
                report["issues_by_file"][issue.file] = []
            report["issues_by_file"][issue.file].append({
                "line": issue.line,
                "severity": issue.severity.value,
                "issue_type": issue.issue_type.value,
                "description": issue.description,
                "code_snippet": issue.code_snippet,
                "suggested_fix": issue.suggested_fix
            })
        
        # Add all issues
        for issue in self.issues:
            report["all_issues"].append({
                "file": issue.file,
                "line": issue.line,
                "severity": issue.severity.value,
                "issue_type": issue.issue_type.value,
                "description": issue.description,
                "code_snippet": issue.code_snippet,
                "suggested_fix": issue.suggested_fix
            })
        
        return report

if __name__ == "__main__":
    tester = ComprehensiveQATester()
    report = tester.run_all_tests()
    
    # Save report
    with open("QA_TEST_REPORT.json", "w") as f:
        json.dump(report, f, indent=2)
    
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"Total Issues Found: {report['summary']['total_issues']}")
    print(f"  Critical: {report['summary']['critical']}")
    print(f"  High: {report['summary']['high']}")
    print(f"  Medium: {report['summary']['medium']}")
    print(f"  Low: {report['summary']['low']}")
    print(f"  Info: {report['summary']['info']}")
    print("\nReport saved to: QA_TEST_REPORT.json")