from pathlib import Path
import math
A=Path(__file__).parent/'assets'; A.mkdir(exist_ok=True)
PALETTE={'conhecimento':'#e3bf78','energia':'#bf98fc','sangue':'#e97a80','morte':'#ccd1ce'}
def ring(n, R, r, width, col):
    arr=[]
    for i in range(n):
        theta=2*math.pi*i/n-math.pi/2
        x1,y1=120+R*math.cos(theta),120+R*math.sin(theta)
        x2,y2=120+(R+r)*math.cos(theta),120+(R+r)*math.sin(theta)
        arr.append(f'<path d="M{x1:.2f} {y1:.2f} L{x2:.2f} {y2:.2f}" stroke="{col}" stroke-width="{width}" opacity=".48"/>')
    return '\n'.join(arr)
def save(name, s):
    (A/name).write_text(s,encoding='utf-8')
def wrap(inner,color, bg=False):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none" role="img" aria-hidden="true">
    <circle cx="120" cy="120" r="109" stroke="{color}" stroke-opacity=".44" stroke-width="1.4"/>
    <circle cx="120" cy="120" r="100" stroke="{color}" stroke-opacity=".19" stroke-dasharray="2 9" stroke-width="1.3"/>
    <circle cx="120" cy="120" r="81" stroke="{color}" stroke-opacity=".62" stroke-width="1"/>
    {ring(12,85,7,1.7,color)}
    <g stroke="{color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">{inner}</g>
    <g fill="{color}"><circle cx="120" cy="11" r="3.2"/><circle cx="229" cy="120" r="3.2"/><circle cx="120" cy="229" r="3.2"/><circle cx="11" cy="120" r="3.2"/></g>
    </svg>'''
shapes={
'conhecimento':'''<path d="M56 120 Q120 44 184 120 Q120 196 56 120Z"/><circle cx="120" cy="120" r="24"/><circle cx="120" cy="120" r="8" fill="#e3bf78" stroke="none"/><path d="M120 40V73 M120 167V200 M42 120H67 M173 120H198"/><path d="M79 79L88 89 M152 151L161 161 M79 161L88 151 M152 89L161 79"/><path d="M108 63L120 50L132 63 M108 177L120 190L132 177"/>''',
'energia':'''<path d="M135 48L84 131H120L105 192L164 106H126L135 48Z" fill="#bf98fc" fill-opacity=".16"/><path d="M57 65Q28 126 74 170 M173 71Q214 118 171 178"/><path d="M65 98L75 105L64 116 M171 142L161 149L172 160"/><circle cx="65" cy="65" r="5"/><circle cx="174" cy="178" r="5"/><path d="M79 189L84 200L89 189L100 184L89 179L84 168L79 179L68 184Z" stroke-width="2"/>''',
'sangue':'''<path d="M120 42C102 72 73 95 73 132A47 47 0 0 0 167 132C167 96 137 72 120 42Z"/><path d="M89 135L105 118L120 132L137 115L153 134"/><path d="M102 158Q120 169 138 157"/><path d="M52 94L65 88 M188 94L175 88 M50 150L64 154 M190 150L176 154"/><path d="M115 50L120 32L125 50"/>''',
'morte':'''<path d="M78 58H162 M78 182H162 M89 58C89 93 114 97 120 120C126 97 151 93 151 58 M89 182C89 147 114 143 120 120C126 143 151 147 151 182"/><path d="M95 69H145 M109 85H131 M106 169H134 M98 177H142"/><circle cx="120" cy="120" r="8"/><path d="M120 93A27 27 0 1 1 93 120" stroke-width="3"/><path d="M120 93L130 93L121 84" stroke-width="3"/>'''
}
for key,col in PALETTE.items():save('sigil-'+key+'.svg',wrap(shapes[key],col))
lines=[]
for rad,alpha in [(265,.4),(246,.14),(225,.27),(204,.2),(184,.5),(175,.1)]:
    lines.append(f'<circle cx="320" cy="320" r="{rad}" fill="none" stroke="#d9bd87" stroke-opacity="{alpha}" stroke-width="1.3"/>')
for i in range(96):
    theta=2*math.pi*i/96; thick= i%8==0
    r1=246 if thick else 255; r2=265
    x1,y1=320+r1*math.cos(theta),320+r1*math.sin(theta)
    x2,y2=320+r2*math.cos(theta),320+r2*math.sin(theta)
    lines.append(f'<path d="M{x1:.2f} {y1:.2f}L{x2:.2f} {y2:.2f}" stroke="#e9c58a" stroke-opacity="{.6 if thick else .27}" stroke-width="{2.1 if thick else 1}"/>')
for i in range(16):
    t=2*math.pi*i/16; x=320+213*math.cos(t);y=320+213*math.sin(t)
    if i%2:lines.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="3" fill="#ddb87b" fill-opacity=".62"/>')
    else:
        a=math.degrees(t)
        lines.append(f'<rect x="{x-6:.2f}" y="{y-6:.2f}" width="12" height="12" transform="rotate({a:.1f} {x:.2f} {y:.2f})" stroke="#e6c38d" stroke-opacity=".47" fill="none"/>')
lines.append('<path d="M320 90L550 320L320 550L90 320Z" fill="none" stroke="#bfa274" stroke-opacity=".17" stroke-width="2"/>')
lines.append('<path d="M320 157L483 320L320 483L157 320Z" fill="none" stroke="#bfa274" stroke-opacity=".12" stroke-width="1"/>')
lines.append('<circle cx="320" cy="320" r="150" fill="url(#fade)" opacity=".18"/>')
save('orbe.svg',f'''<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><defs><radialGradient id="fade"><stop stop-color="#dcbf8b"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>{''.join(lines)}</svg>''')
save('favicon.svg','''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#12131b"/><path d="M10 32Q32 9 54 32Q32 55 10 32Z" fill="none" stroke="#d8b67d" stroke-width="3"/><circle cx="32" cy="32" r="9" fill="none" stroke="#d8b67d" stroke-width="3"/><circle cx="32" cy="32" r="3" fill="#d8b67d"/></svg>''')
