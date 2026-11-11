from PIL import Image,ImageDraw,ImageFont,ImageFilter
import cairosvg,io,random,math
from pathlib import Path
base=Path(__file__).resolve().parent
W,H=1200,630
im=Image.new('RGB',(W,H))
p=im.load()
for y in range(H):
 for x in range(W):
  glow=0.16*math.exp(-((x-930)**2+(y-300)**2)/(2*300*300))
  gr=0.07*math.exp(-((x-200)**2+(y-180)**2)/(2*320*320))
  p[x,y]=(round(12+55*glow+26*gr),round(13+38*glow+16*gr),round(19+12*glow+13*gr))
d=ImageDraw.Draw(im)
gold=(212,174,109)
for j in range(27):
 x=87+j*34
 d.line((x,80,x,93),fill=(75,62,49),width=1)
d.rectangle((29,29,W-29,H-29),outline=(92,75,53),width=2)
d.line((85,116,680,116),fill=(117,90,58),width=2)
fontroot='/usr/share/fonts/truetype/dejavu'
serif=fontroot+'/DejaVuSerif.ttf';sans=fontroot+'/DejaVuSans.ttf';bold=fontroot+'/DejaVuSans-Bold.ttf'
fsmall=ImageFont.truetype(bold,18);fsub=ImageFont.truetype(bold,23)
fhead=ImageFont.truetype(serif,64)
fintro=ImageFont.truetype(sans,29)
d.text((88,81),'AFINIDADE / O OUTRO LADO',font=fsmall,fill=(224,190,133))
d.text((83,185),'QUAL ELEMENTO',font=fhead,fill=(252,244,228))
d.text((83,265),'RECONHECE',font=fhead,fill=(252,244,228))
d.text((83,345),'VOCÊ?',font=fhead,fill=(252,244,228))
d.text((87,468),'Quatro elementos. Um espectro.',font=fintro,fill=(197,186,177))
d.text((87,515),'Descubra seu arquétipo.',font=fintro,fill=(197,186,177))
try:
 png=cairosvg.svg2png(url=str(base/'assets/sigil-conhecimento.svg'),output_width=420,output_height=420)
 sig=Image.open(io.BytesIO(png)).convert('RGBA')
 glow=Image.new('RGBA',(W,H),(0,0,0,0));gl=ImageDraw.Draw(glow);gl.ellipse((695,60,1135,500),fill=(226,168,65,45));glow=glow.filter(ImageFilter.GaussianBlur(64));im=Image.alpha_composite(im.convert('RGBA'),glow)
 im.alpha_composite(sig,(730,85))
except Exception as e:print('SVG conversion skipped',e)
im.convert('RGB').save(base/'assets/og-cover.png',optimize=True)
print('OG preview', (base/'assets/og-cover.png').stat().st_size)
