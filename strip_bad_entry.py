import sys

ts_path = r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\krishil-portfolio\data\blogs.ts'

# Read current file
with open(ts_path, 'r', encoding='utf-8') as f:
    data = f.read()

# Strip the bad entry that was appended (everything from the ,\n  {\n    id: "claude-mythos-paradox" onwards)
CUT_MARKER = '  ,\n  {\n    id: "claude-mythos-paradox"'
if CUT_MARKER in data:
    data = data[:data.index(CUT_MARKER)]
    # Make sure it ends cleanly
    data = data.rstrip()
    # It should now end with: ...heavy lifting.`\n  }
    print("Stripped old entry. Tail:", repr(data[-80:]))
else:
    print("Marker not found, will append fresh")

# Restore clean ending
data = data + '\n];\n'

# Write the clean base back
with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(data)

print("Base restored. Lines:", len(data.splitlines()))
