ts_path = r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\krishil-portfolio\data\blogs.ts'
with open(ts_path, 'r', encoding='utf-8') as f:
    data = f.read()

old_tags = '    tags: ["AI Safety", "Cybersecurity", "Deep Dive"],'
new_tags = '    tags: ["Security", "GenAI / LLMs", "Deep Dive"],'

if old_tags in data:
    data = data.replace(old_tags, new_tags, 1)
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(data)
    print('Tags fixed.')
else:
    # Find what's around the tags line
    idx = data.find('claude-mythos-paradox')
    print('Context around entry:')
    print(repr(data[idx:idx+300]))
