# Design specification

Status: **three directions for Charlotte to choose from at Gate 1**. The full specification (wireframes, components, layouts) follows in Phase 4 once a direction is chosen.

All text colour pairs below were checked against WCAG 2.2 contrast ratios. Colours marked "decorative" must not be used for text.

## Direction A: Strathearn

Calm, editorial and grounded. Feels like a well-made local business, not a tech company.

| Role | Colour | Contrast |
|---|---|---|
| Background (lichen white) | `#F2F3EE` | |
| Text (peat) | `#1E2B26` | 13.2:1 on background |
| Primary (loch green) | `#2F5D50` | 6.7:1 on background; white text on it 7.5:1 |
| Accent (heather) | `#7B4B6A` | 6.2:1 on background |
| Line and detail (bracken) | `#C9B79C` | decorative only |

- **Type:** Young Serif for headings, Figtree for body text
- **Scottish detail:** a fine two-colour stripe in heather and green used as a section divider, inspired by estate tweed rather than tartan
- **Imagery:** natural light, Strathearn landscapes, Charlotte at work, hands on laptop in a real setting
- **Suits:** trades, hospitality and tourism clients who want a trusted local person
- **Risk:** can feel quiet; needs strong photography to avoid looking plain

## Direction B: Slate and Copper

Confident and modern. Clear structure, a little more "consultant".

| Role | Colour | Contrast |
|---|---|---|
| Background (cool stone) | `#EEF0F2` | |
| Text and dark bands (slate) | `#222C36` | 12.4:1 |
| Accent (copper) | `#A0522D` | 4.9:1 on background; white text on it 5.6:1 |
| Accent on dark (light copper) | `#E8A77F` | 6.9:1 on slate |
| Support (mist) | `#C9D3DC` | decorative only |

- **Type:** Bricolage Grotesque for headings, IBM Plex Sans for body
- **Scottish detail:** a faint survey-map grid and coordinates (Crieff, 56.37° N) as a quiet graphic motif, nodding to Ordnance Survey maps
- **Imagery:** stone, slate roofs, workspace detail, clean portraits
- **Suits:** coaches, consultants, professional services; strongest for the AI and automation side
- **Risk:** closer to corporate than the brief prefers unless the copy stays warm

## Direction C: Highland Morning

Bright, friendly and approachable. Plenty of white space and a warm yellow.

| Role | Colour | Contrast |
|---|---|---|
| Background | `#FFFFFF` | |
| Band background (mist blue) | `#E6EEF2` | |
| Text (ink navy) | `#1B2A41` | 14.4:1 on white; 12.3:1 on mist |
| Accent fill (gorse yellow) | `#E0A526` | navy text on it 6.6:1; decorative only on white |
| Links and secondary (loch teal) | `#1F6F78` | 5.8:1 on white |

- **Type:** Sora for headings, Source Serif 4 for body
- **Scottish detail:** soft contour lines behind the hero, like hills on a walking map
- **Imagery:** morning light, open landscapes, people in real small businesses
- **Suits:** start-ups, beauty, retail, cafés; the most approachable for nervous first-timers
- **Risk:** yellow buttons need navy text, never white; can look less premium if spacing is not disciplined

## Recommendation

**Direction A (Strathearn)**, with Direction C's contour-line idea available for the AI and automation page if more brightness is wanted. A is warm without being twee, reads as local and trustworthy, and gives the demonstration sites room to look different from the main brand.

## Common to all directions

- Mobile-first, single-column below 720px, generous spacing
- Buttons at least 44px tall, visible 3px focus ring
- Maximum line length about 65 characters
- No robots, glowing brains or circuit imagery
- Self-hosted fonts
