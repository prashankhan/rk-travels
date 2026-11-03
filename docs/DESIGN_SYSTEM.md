# R.K Travels design system

The published design system artifact is the reference; this file explains how it maps to the code. Tokens live in `src/app/globals.css` (`@theme`), so Tailwind utilities use the brand names directly: `bg-navy`, `text-muted`, `font-display`, `rounded-control`, `shadow-card`, `max-w-site`.

## Colour
| Token | Value | Use |
| --- | --- | --- |
| `navy` | #06274D | Headings, structure, secondary buttons, outline borders, focus ring |
| `golden-yellow` | #FFC107 | Primary buttons (navy label), accent rules, selected states. Never text on white |
| `sunset-orange` | #FF8A00 | Decorative only |
| `ocean-blue` | #008FD3 | Decorative only, or display text 24px+ |
| `warm-white` | #FAFAF7 | A few section bands, the footer, CTA panel, image slots |
| `charcoal` | #263445 | Body text |
| `white` | #FFFFFF | Page background |
| `muted` / `border` / `border-strong` | #5A6676 / #E4E7EB / #7C8794 | Secondary text / hairlines / control edges |
| `error`, `success` (+ `-tint`) | #B4232C, #1F6F43 | Form feedback, always with an icon and words |

The site is light. No large navy sections, no dark footer, no decorative gradients (the hero scrim is the only gradient).

## Typography
| Family | Classes | Use |
| --- | --- | --- |
| Instrument Serif | `type-display-hero`, `type-display-lg`, `type-display-md`, `type-display-sm` | Hero, page titles, a few statements, CTA titles, destination names. One display moment per screen. `<em>` for the italic phrase. |
| Montserrat | `type-heading-1`…`type-heading-4`, `type-eyebrow`, buttons | Section and card headings, eyebrows, **every button** (600, 15px / 14px compact) |
| Inter | body default, `type-lead`, `type-body-sm`, `type-caption` | Body, navigation, forms, captions |

Fonts are self-hosted with `next/font/local` (files in `src/fonts`, SIL OFL). Sentence case everywhere, except the approved hero headline "Your Journey, Our Priority." and short uppercase eyebrows.

## Spacing and layout
4px base (Tailwind's default scale). `.container-site` = 1240px max with 16px / 32px gutters. `.section-y` = 64px mobile / 112px desktop. Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

## Shape and depth
`rounded-control` (2px) on every button, input, select, textarea, checkbox and button-like action — a brand decision. `rounded-card` 12px for cards and photos, `rounded-menu` 8px for menus and banners. Shadows: `shadow-card`, `shadow-card-hover`, `shadow-menu`, `shadow-sm`, all navy-tinted.

## Motion
150ms colour changes, 200–240ms menus and card lift (2px), 500ms image scale (1.04), entrance `reveal` fade of 8px. Easing `ease-brand`. Everything collapses under `prefers-reduced-motion`.

## Icons
`lucide-react`, `strokeWidth={1.75}`, 18px in buttons, 20px elsewhere. WhatsApp uses `MessageCircle` with the word "WhatsApp" (no brand glyph).

## Components
| Component | File | Notes |
| --- | --- | --- |
| Button | `components/ui/button.tsx` | `variant`: primary, secondary, outline, outline-inverse (photos only). `size`: md (50px), sm (44px). `loading`, `asChild` for links. |
| Input, Textarea, NativeSelect, Label | `components/ui/*` | 50px controls, navy focus ring, `aria-invalid` turns them red. |
| Checkbox, RadioGroup, RadioTile | `components/ui/*` | Radix primitives. `RadioTile` for pickup / drop-off style switches. |
| Accordion | `components/ui/accordion.tsx` | FAQ rows; plus icon turns yellow when open. |
| Sheet | `components/ui/sheet.tsx` | Full-screen mobile menu (Radix Dialog). |
| Field, FormMessage, FormFooter | `components/forms/form-parts.tsx` | Labels, hints, errors, status banners, submit row. |
| SiteHeader, MobileNav, SiteFooter, WhatsAppFloat, Logo | `components/layout/*` | Navigation with Services dropdown (Radix NavigationMenu). |
| HomeHero, PageHero | `components/sections/*` | Locked home hero; text-led inner hero with photo or aside. |
| ServiceCard, DestinationCard, Photo | `components/sections/*` | Photo shows a "Photo pending" slot until `src` is set. |
| Steps, SectionHeading, FaqSection, CTABanner, ContactPanel, EnquirySection | `components/sections/*` | Page building blocks. |

## Content rules
Write concise, plain English. Never add prices, fleet details, itineraries, reviews, ratings, statistics, hours or 24/7 claims until confirmed (see `CONTENT_PENDING.md`).
