import re
import os

html_file = r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\llm-memory-explainer.html'
out_dir = r'c:\Users\Krishil Agrawal\Desktop\Projects\my-portfolio\krishil-portfolio\components\blogs'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

svgs = re.findall(r'(<svg.*?</svg>)', html, re.DOTALL)

def react_svg(idx, svg_str):
    svg_str = svg_str.replace('stroke-width', 'strokeWidth')
    svg_str = svg_str.replace('stroke-linecap', 'strokeLinecap')
    svg_str = svg_str.replace('stroke-linejoin', 'strokeLinejoin')
    svg_str = svg_str.replace('text-anchor', 'textAnchor')
    svg_str = svg_str.replace('marker-end', 'markerEnd')
    svg_str = svg_str.replace('font-family', 'fontFamily')
    svg_str = svg_str.replace('font-size', 'fontSize')
    svg_str = svg_str.replace('font-weight', 'fontWeight')
    svg_str = svg_str.replace('letter-spacing', 'letterSpacing')
    svg_str = svg_str.replace('class="', 'className="')
    svg_str = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', svg_str, flags=re.DOTALL)
    svg_str = svg_str.replace("'JetBrains Mono',monospace", "'Outfit', monospace")
    
    comp = f'''import React from "react";

export const LlmMemoryDiagram = () => (
  <div className="bg-[#f2f0ec] border border-[#d4d4d8] rounded-xl p-7 md:p-8 my-8 shadow-sm overflow-x-auto">
    <div className="font-outfit text-[11px] text-[#71717a] tracking-[0.08em] uppercase mb-5">Anatomy of a context window — what actually reaches the model</div>
    <div className="min-w-[700px] flex justify-center">
        {svg_str}
    </div>
  </div>
);
'''
    return comp

os.makedirs(out_dir, exist_ok=True)

if svgs:
    comp = react_svg(1, svgs[0])
    with open(os.path.join(out_dir, f'LlmMemoryDiagram.tsx'), 'w', encoding='utf-8') as f:
        f.write(comp)
    print("Extracted SVG.")
else:
    print("No SVG found.")
