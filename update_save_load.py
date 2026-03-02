#!/usr/bin/env python3
import re

# Read the file
with open('js/modules/save-load.js', 'r') as f:
    content = f.read()

# Replace document.getElementById calls with DOMHelpers
replacements = [
    (r"document\.getElementById\('chapter-content'\)\.innerHTML = chapterContent\.content;",
     "DOMHelpers.safeSetText('chapter-content', chapterContent.content);"),
    (r"document\.getElementById\('chapter-title'\)\.textContent = chapterContent\.title;",
     "DOMHelpers.safeSetText('chapter-title', chapterContent.title);"),
    (r"document\.getElementById\('sidebar'\)\.classList\.add\('open'\);",
     "DOMHelpers.safeToggleClass('sidebar', 'open', true);"),
    (r"document\.getElementById\('sidebar'\)\.classList\.remove\('open'\);",
     "DOMHelpers.safeToggleClass('sidebar', 'open', false);"),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Write the file
with open('js/modules/save-load.js', 'w') as f:
    f.write(content)

print("Updated js/modules/save-load.js with DOM Helpers")