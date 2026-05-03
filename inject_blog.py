import os

# Read the blog content
with open(r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\krishil-portfolio\mythos_content_tmp.txt', 'r', encoding='utf-8') as f:
    blog_content = f.read().strip()

# Read the blogs.ts file
ts_path = r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\krishil-portfolio\data\blogs.ts'
with open(ts_path, 'r', encoding='utf-8') as f:
    data = f.read()

# Build the new blog entry
lines = [
    '  ,',
    '  {',
    '    id: "claude-mythos-paradox",',
    '    title: "The Claude Mythos Paradox: When the Safest AI Becomes the Most Dangerous",',
    '    description: "What if the AI that passes every safety test is also the most dangerous AI ever built? Claude Mythos taught us that aligned and safe are not the same thing.",',
    '    tags: ["AI Safety", "Cybersecurity", "Deep Dive"],',
    '    readTime: "18 min read",',
    '    publishedAt: "May 2026",',
    '    popularityScore: 99,',
    '    isFeatured: true,',
]

# The content field uses backtick template literal — build with chr(96)
bt = chr(96)
content_field = '    content: ' + bt + blog_content + bt
lines.append(content_field)
lines.append('  }')
lines.append('];')

new_block = '\n'.join(lines)

# Replace the old closing ];\n
old_ending = '  }\n];'
if old_ending in data:
    new_data = data[:data.rfind(old_ending)] + new_block + '\n'
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(new_data)
    total_lines = len(new_data.splitlines())
    print(f'SUCCESS: Blog entry appended. New file length: {total_lines} lines')
else:
    print('ERROR: Could not find closing pattern')
    print('Last 150 chars:', repr(data[-150:]))
