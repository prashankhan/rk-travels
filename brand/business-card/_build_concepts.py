import pathlib
H=open('_head.txt').read(); T=open('_tail.txt').read()
PHONE='<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
WA='<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>'
PIN='<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
LOGO='../shared/rk-travels-logo-full-colour.png'
ISLAND='M22 2 C26 1 30 4 31 8 C33 14 38 20 44 28 C50 36 56 44 58 54 C60 64 58 74 52 84 C46 92 38 98 30 99 C24 100 18 96 15 90 C11 82 9 74 8 66 C7 58 6 50 5 42 C4 34 6 26 9 18 C12 10 17 3 22 2 Z'
CONTACT=f'''<ul class="contact">
      <li>{PHONE}<span><strong>+94 74 363 8418</strong></span></li>
      <li>{WA}<span>WhatsApp on the same number</span></li>
      <li>{PIN}<span>Negombo, Sri Lanka</span></li>
    </ul>'''
CONTACT_CSS='''
  .contact { list-style: none; display: flex; flex-direction: column; gap: 1.5mm; }
  .contact li { display: flex; align-items: center; gap: 2mm; font: 500 6.6pt/1.1 var(--font-body); color: var(--charcoal); }
  .contact strong { font: 600 7.8pt/1 var(--font-heading); color: var(--navy); letter-spacing: .01em; }
  .person .name { font: 700 12pt/1 var(--font-heading); color: var(--navy); letter-spacing: -.01em; }
  .person .role { margin-top: 1.2mm; font: 500 6.4pt/1 var(--font-body); color: var(--charcoal); }
'''
def page(title, note, css, front, back):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>R.K Travels — business card, {title}</title>
<!--
  EDITABLE SOURCE — {title}. {note}
  Trim 90 × 50 mm, bleed 3 mm each side (artboard 96 × 56 mm), safe area 4 mm inside trim.
  Open with ?side=front or ?side=back (&guides=1 shows trim and safe lines).
  Edit text only. Do not alter the logo.
-->
{H}{CONTACT_CSS}{css}
</style>
</head>
<body>
<section class="art front" id="front">
{front}
  <div class="guide trim"></div><div class="guide safe"></div>
</section>
<section class="art back" id="back">
{back}
  <div class="guide trim"></div><div class="guide safe"></div>
</section>
{T}'''

# ---------------- v4: Island route ----------------
route_pts=[(9,62),(33,40),(31,60),(43,72),(19,93)]
names=['Negombo','Sigiriya','Kandy','Ella','Galle']
route='M'+' L'.join(f'{x} {y}' for x,y in route_pts)
dots=''.join(f'<circle cx="{x}" cy="{y}" r="1.6" class="stop"/>' for x,y in route_pts[1:])
v4css='''
  .front .logo { position: absolute; left: 7mm; top: 7.5mm; width: 38mm; display: block; }
  .front .tagline { position: absolute; left: 7mm; bottom: 7mm; font-size: 14.5pt; line-height: 1.02; }
  .front .tagline .rule { display: block; width: 9mm; height: 0.6mm; background: var(--golden-yellow); margin-bottom: 2.6mm; }
  .front .island { position: absolute; right: 6.5mm; top: 4.5mm; height: 47mm; width: auto; overflow: visible; }
  .island .land { fill: var(--navy); }
  .island .route { fill: none; stroke: var(--golden-yellow); stroke-width: 0.9; stroke-dasharray: 2.2 1.6; stroke-linecap: round; }
  .island .stop { fill: var(--white); }
  .island .home { fill: var(--golden-yellow); }
  .island .ring { fill: none; stroke: var(--golden-yellow); stroke-width: 0.6; }
  .front .here { position: absolute; right: 37mm; top: 33.6mm; font: 600 4.4pt/1 var(--font-heading); letter-spacing: .14em; text-transform: uppercase; color: var(--navy); }
  .back { background: var(--warm-white); }
  .back .person { position: absolute; left: 7mm; top: 7.5mm; }
  .back .rule { position: absolute; left: 7mm; top: 21mm; width: 9mm; height: 0.5mm; background: var(--golden-yellow); }
  .back .contact { position: absolute; left: 7mm; bottom: 7mm; }
  .back .logo { position: absolute; right: 7mm; bottom: 7mm; width: 26mm; display: block; }
  .back .mini { position: absolute; right: 9mm; top: 7mm; height: 15mm; width: auto; overflow: visible; }
  .mini .land { fill: none; stroke: var(--navy); stroke-width: 1.4; }
  .mini .home { fill: var(--golden-yellow); stroke: var(--navy); stroke-width: 0.8; }
  .back .based { position: absolute; right: 18.5mm; top: 15.4mm; text-align: right; }
'''
v4front=f'''  <img class="logo" src="{LOGO}" alt="R.K Travels">
  <p class="tagline"><span class="rule"></span>Dream &amp; discover<br><em>Sri Lanka.</em></p>
  <svg class="island" viewBox="0 0 60 100" aria-hidden="true">
    <path class="land" d="{ISLAND}"/>
    <path class="route" d="{route}"/>
    {dots}
    <circle class="ring" cx="9" cy="62" r="3.6"/><circle class="home" cx="9" cy="62" r="2"/>
  </svg>
  <p class="here">Negombo</p>'''
v4back=f'''  <div class="person"><p class="name">Shri</p><p class="role">Founder, R.K Travels</p></div>
  <div class="rule"></div>
  {CONTACT}
  <svg class="mini" viewBox="0 0 60 100" aria-hidden="true"><path class="land" d="{ISLAND}"/><circle class="home" cx="9" cy="62" r="5"/></svg>
  <p class="eyebrow based">Based in<br>Negombo</p>
  <img class="logo" src="{LOGO}" alt="R.K Travels">'''
open('card-v4.html','w').write(page('version 4 (island route)','A dashed travel route across a stylised Sri Lanka, starting from Negombo.',v4css,v4front,v4back))

# ---------------- v5: Postcard ----------------
v5css='''
  .airmail { position: absolute; inset: 0; background: repeating-linear-gradient(-45deg, var(--navy) 0 2.4mm, var(--white) 2.4mm 4.2mm, var(--golden-yellow) 4.2mm 6.6mm, var(--white) 6.6mm 8.4mm); }
  .sheet { position: absolute; inset: 5mm; background: var(--white); }
  .front .sheet { background: var(--warm-white); }
  .front .logo { position: absolute; left: 50%; top: 9.5mm; transform: translateX(-50%); width: 48mm; display: block; }
  .front .tagline { position: absolute; left: 0; right: 0; bottom: 9.5mm; text-align: center; font-size: 11.5pt; line-height: 1; }
  .front .tagline::before { content: ""; display: block; width: 8mm; height: 0.5mm; background: var(--golden-yellow); margin: 0 auto 2.4mm; }
  .back .left { position: absolute; left: 8.5mm; top: 9mm; bottom: 9mm; width: 33mm; display: flex; flex-direction: column; justify-content: space-between; }
  .back .greet { font-size: 15pt; line-height: 1.02; }
  .back .divide { position: absolute; left: 45mm; top: 10mm; bottom: 10mm; border-left: 0.25mm solid #cfd5dc; }
  .back .stamp { position: absolute; right: 9mm; top: 8.5mm; width: 13mm; height: 15.5mm; padding: 0.9mm;
    background: var(--white); border: 0.55mm dotted #b9c1cb; }
  .back .stamp svg { width: 100%; height: 100%; display: block; }
  .back .postmark { position: absolute; right: 18.5mm; top: 15mm; width: 11mm; height: 11mm; }
  .back .lines { position: absolute; left: 49mm; right: 9mm; bottom: 9mm; display: flex; flex-direction: column; }
  .back .lines p { border-bottom: 0.2mm solid #cfd5dc; padding: 1.15mm 0 0.9mm; font: 500 6.5pt/1.15 var(--font-body); color: var(--charcoal); white-space: nowrap; }
  .back .lines p.n { font: 700 9pt/1 var(--font-heading); color: var(--navy); }
  .back .lines p.n span { font: 500 6pt/1 var(--font-body); color: var(--muted); margin-left: 1.5mm; }
  .back .lines strong { font: 600 7pt/1 var(--font-heading); color: var(--navy); }
  .back .lines small { color: var(--muted); font-size: 5.6pt; }
  .back .logo { width: 25mm; display: block; }
'''
stamp='''<svg viewBox="0 0 26 31" aria-hidden="true">
      <rect width="26" height="31" fill="#FFF4D1"/>
      <circle cx="13" cy="15" r="7.5" fill="#FFC107"/>
      <rect x="0" y="17" width="26" height="14" fill="#FFF4D1"/>
      <path d="M0 18.5 q3.25 -1.6 6.5 0 t6.5 0 t6.5 0 t6.5 0" fill="none" stroke="#008FD3" stroke-width="1.1"/>
      <path d="M0 21.5 q3.25 -1.6 6.5 0 t6.5 0 t6.5 0 t6.5 0" fill="none" stroke="#008FD3" stroke-width="1.1"/>
      <text x="13" y="28.2" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="3.1" letter-spacing=".5" fill="#06274D">SRI LANKA</text>
    </svg>'''
postmark='''<svg class="postmark" viewBox="0 0 40 40" aria-hidden="true">
    <defs><path id="pm" d="M20 20 m-13.5 0 a13.5 13.5 0 1 1 27 0 a13.5 13.5 0 1 1 -27 0"/></defs>
    <circle cx="20" cy="20" r="18" fill="none" stroke="#06274D" stroke-width="0.9" opacity=".55"/>
    <circle cx="20" cy="20" r="10" fill="none" stroke="#06274D" stroke-width="0.6" opacity=".55"/>
    <text font-family="Montserrat" font-weight="600" font-size="4.2" letter-spacing="1.6" fill="#06274D" opacity=".7"><textPath href="#pm">NEGOMBO · SRI LANKA ·</textPath></text>
    <text x="20" y="21.6" text-anchor="middle" font-family="Montserrat" font-weight="700" font-size="4.6" fill="#06274D" opacity=".7">R.K</text>
  </svg>'''
v5front=f'''  <div class="airmail"></div>
  <div class="sheet">
    <img class="logo" src="{LOGO}" alt="R.K Travels" style="top: 4.5mm">
    <p class="tagline" style="bottom: 4.5mm">Dream &amp; discover <em>Sri Lanka</em></p>
  </div>'''
v5back=f'''  <div class="airmail"></div>
  <div class="sheet"></div>
  <div class="left">
    <div><p class="eyebrow">Greetings from</p><p class="tagline greet" style="margin-top:2.2mm">Dream &amp;<br>discover<br><em>Sri Lanka.</em></p></div>
    <img class="logo" src="{LOGO}" alt="R.K Travels">
  </div>
  <div class="divide"></div>
  <div class="stamp">{stamp}</div>
  {postmark}
  <div class="lines">
    <p class="n">Shri<span>Founder</span></p>
    <p><strong>+94 74 363 8418</strong></p>
    <p><small>Phone &amp; WhatsApp</small></p>
    <p>Negombo, Sri Lanka</p>
  </div>'''
open('card-v5.html','w').write(page('version 5 (postcard)','An airmail postcard: the front carries the logo and tagline, the back is addressed like a postcard home.',v5css,v5front,v5back))

# ---------------- v6: Sunrise ----------------
v6css='''
  .front .tagline { position: absolute; left: 7mm; top: 9mm; font-size: 19pt; line-height: 0.98; letter-spacing: -.01em; }
  .front .eyebrow { position: absolute; left: 7.2mm; bottom: 7mm; color: var(--navy); }
  .front .logo { position: absolute; left: 7mm; bottom: 11mm; width: 30mm; display: block; }
  .rings { position: absolute; right: -0.5mm; bottom: -0.5mm; width: 46mm; height: 46mm; overflow: visible; }
  .rings circle.band { fill: none; }
  .back .logo { position: absolute; left: 7mm; top: 7mm; width: 34mm; display: block; }
  .back .person { position: absolute; left: 7mm; bottom: 20.5mm; }
  .back .contact { position: absolute; left: 7mm; bottom: 7mm; }
  .back .rings { width: 26mm; height: 26mm; }
  .back .tag-sm { position: absolute; right: 7mm; top: 8mm; text-align: right; font-size: 8.5pt; line-height: 1.05; }
'''
def rings(size_note=''):
    # quarter rings from the bottom-right corner: sun core + bands
    return '''<svg class="rings" viewBox="0 0 100 100" aria-hidden="true">
    <circle class="band" cx="100" cy="100" r="92" stroke="#008FD3" stroke-width="5"/>
    <circle class="band" cx="100" cy="100" r="76" stroke="#06274D" stroke-width="9"/>
    <circle class="band" cx="100" cy="100" r="60" stroke="#FF8A00" stroke-width="9"/>
    <circle cx="100" cy="100" r="40" fill="#FFC107"/>
  </svg>'''
v6front=f'''  <p class="tagline">Dream &amp;<br>discover<br><em>Sri Lanka.</em></p>
  <img class="logo" src="{LOGO}" alt="R.K Travels">
  <p class="eyebrow">Transfers · Rentals · Tours</p>
  {rings()}'''
v6back=f'''  <img class="logo" src="{LOGO}" alt="R.K Travels">
  <p class="tagline tag-sm">Dream &amp; discover<br><em>Sri Lanka</em></p>
  <div class="person"><p class="name">Shri</p><p class="role">Founder</p></div>
  {CONTACT}
  {rings()}'''
open('card-v6.html','w').write(page('version 6 (sunrise)','A rising sun in the brand colours, built from concentric rings in the corner.',v6css,v6front,v6back))
print('ok')
