import re
import os

html_file = r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\graphrag-vs-vector-rag.html'
out_dir = r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\krishil-portfolio\components\blogs'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

svgs = re.findall(r'(<svg.*?</svg>)', html, re.DOTALL)

def react_svg(idx, svg_str):
    # Convert attributes to camelCase
    svg_str = svg_str.replace('stroke-width', 'strokeWidth')
    svg_str = svg_str.replace('stroke-dasharray', 'strokeDasharray')
    svg_str = svg_str.replace('text-anchor', 'textAnchor')
    svg_str = svg_str.replace('marker-end', 'markerEnd')
    svg_str = svg_str.replace('font-family', 'fontFamily')
    svg_str = svg_str.replace('font-size', 'fontSize')
    svg_str = svg_str.replace('font-weight', 'fontWeight')
    svg_str = svg_str.replace('letter-spacing', 'letterSpacing')
    svg_str = svg_str.replace('class="', 'className="')
    # Use re to replace HTML comments with JSX comments
    svg_str = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', svg_str, flags=re.DOTALL)
    # Change fonts
    svg_str = svg_str.replace('Syne,sans-serif', "'Outfit', sans-serif")
    
    # We should also replace standard HTML style strings if any (e.g. style="width:100%;max-width:780px;...")
    # Actually for React SVGs, it's easier to just handle the style object
    svg_str = svg_str.replace('style="width:100%;max-width:780px;display:block;margin:0 auto;"', 'style={{width:"100%", maxWidth:"780px", display:"block", margin:"0 auto"}}')
    svg_str = svg_str.replace('style="width:100%;max-width:700px;display:block;margin:0 auto;"', 'style={{width:"100%", maxWidth:"700px", display:"block", margin:"0 auto"}}')

    title = ""
    if idx == 1:
        title = "Figure 1 — Retrieval Architecture: Vector RAG vs GraphRAG"
    elif idx == 2:
        title = 'Figure 2 — Multi-Hop Query: "Find all companies connected to Person X within 2 hops"'
    elif idx == 3:
        title = "Figure 3 — Hybrid RAG: Query Router Architecture"

    comp = f'''import React from "react";

export const GraphRagDiagram{idx} = () => (
  <div className="bg-[#13161e] border border-[#252a38] rounded-xl p-6 md:p-10 my-10 shadow-sm overflow-x-auto">
    <div className="font-outfit text-xs font-bold tracking-[0.15em] text-[#7a8099] uppercase mb-8 text-center">{title}</div>
    <div className="min-w-[700px] flex justify-center">
        {svg_str}
    </div>
  </div>
);
'''
    return comp

os.makedirs(out_dir, exist_ok=True)

for i, svg in enumerate(svgs):
    comp = react_svg(i+1, svg)
    with open(os.path.join(out_dir, f'GraphRagDiagram{i+1}.tsx'), 'w', encoding='utf-8') as f:
        f.write(comp)

print(f'Extracted {len(svgs)} SVGs.')
