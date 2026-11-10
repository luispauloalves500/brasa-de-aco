"""Fonte original local a partir dos desenhos 5x7; fontTools só para regeneração."""
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from pathlib import Path
import json, unicodedata
root=Path(__file__).resolve().parents[1]
patterns=json.loads((root/'assets/glyphs.json').read_text())
chars=list(dict.fromkeys([chr(i) for i in range(32,256)]+['→','←','↑','◆','◇','×','∞']))
fb=FontBuilder(1000,isTTF=True)
order=['.notdef']+[f'uni{ord(ch):04X}' for ch in chars]
fb.setupGlyphOrder(order);fb.setupCharacterMap({ord(c):order[i+1] for i,c in enumerate(chars)})
glyphs={};metrics={}
for name,ch in [('.notdef','?')]+list(zip(order[1:],chars)):
    p=TTGlyphPen(None)
    base=unicodedata.normalize('NFD',ch.upper())[0] if ch.strip() else ' '
    a=patterns.get(ch,patterns.get(base,patterns['?']))
    def block(x,y,w=80,h=80):
        p.moveTo((x,y));p.lineTo((x+w,y));p.lineTo((x+w,y+h));p.lineTo((x,y+h));p.closePath()
    off=(5-len(a[0]))*50
    for y,row in enumerate(a):
        for x,v in enumerate(row):
            if v=='1':block(50+x*100+off,(6-y)*100)
    marks=unicodedata.normalize('NFD',ch)
    if '\u0301' in marks:block(300,760);block(390,850)
    if '\u0300' in marks:block(200,850);block(290,760)
    if '\u0303' in marks:
        for x,y in [(150,780),(230,820),(310,780),(390,820)]:block(x,y,70,50)
    if '\u0302' in marks:
        for x,y in [(180,760),(260,840),(340,760)]:block(x,y)
    if '\u0327' in marks:block(290,-100);block(210,-180)
    glyphs[name]=p.glyph();metrics[name]=(600,0)
fb.setupGlyf(glyphs);fb.setupHorizontalMetrics(metrics);fb.setupHorizontalHeader(ascent=950,descent=-200)
fb.setupNameTable({'familyName':'Brasa Circuit','styleName':'Regular','uniqueFontIdentifier':'BrasaCircuitOriginal2026','fullName':'Brasa Circuit','psName':'BrasaCircuit-Regular','version':'Version 1.0'})
fb.setupOS2(sTypoAscender=950,sTypoDescender=-200,usWinAscent=950,usWinDescent=200)
fb.setupPost();fb.setupMaxp();fb.save(root/'assets/brasa-circuit.ttf')
print('Fonte original gerada: assets/brasa-circuit.ttf')
