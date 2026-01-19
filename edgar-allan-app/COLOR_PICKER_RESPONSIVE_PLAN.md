# Color Picker Responsive Implementation Plan

## 📊 Figma Analysis Summary

### Design Variations Analyzed
1. **Mobile (390px)** - node-id: 236-31334
2. **Tablet (768px)** - node-id: 236-31468  
3. **Desktop (1000px+)** - node-id: 236-31602

---

## 🎯 Layout Patterns Identified

### Mobile Layout (< 768px)
```
┌─────────────────────┐
│   What color did    │
│     you get?        │
├─────────────────────┤
│                     │
│    Baddy Blue       │
│    (full width)     │
│                     │
├──────────┬──────────┤
│          │          │
│   Wine   │ Sunshine │
│          │          │
├──────────┼──────────┤
│          │          │
│   Rojo   │   Coal   │
│          │          │
└──────────┴──────────┘
```

**Key Characteristics:**
- Grid layout with mixed column structure
- Row 1: 1 column (Blue - featured/larger)
- Row 2: 2 columns (Wine, Sunshine)
- Row 3: 2 columns (Rojo, Coal)
- Gap: 12px between cards
- Padding: 20px inside cards
- Card height: ~192px for 2-column cards, taller for Blue

### Tablet Layout (768px - 1023px)
```
┌─────────────────────────────┐
│   What color did you get?   │
├──────────────┬──────────────┤
│              │              │
│  Baddy Blue  │     Wine     │
│              │              │
├──────────────┼──────────────┤
│              │              │
│   Sunshine   │     Rojo     │
│              │              │
├──────────────┴──────────────┤
│           Coal              │
│         (centered)          │
└─────────────────────────────┘
```

**Key Characteristics:**
- 2-column grid layout
- All cards equal size
- Last card (Coal) spans full width or centered
- Maintains 12px gap
- Similar card proportions to mobile

### Desktop Layout (1024px+)
```
┌────────────────────────────────────────────────────┐
│          What color did you get?                   │
├──────┬──────┬──────┬──────┬──────┐
│      │      │      │      │      │
│ Blue │ Wine │ Sun  │ Rojo │ Coal │
│      │      │      │      │      │
│      │      │      │      │      │
│      │      │      │      │      │
└──────┴──────┴──────┴──────┴──────┘
```

**Key Characteristics:**
- Horizontal flex layout (5 equal columns)
- All cards equal width
- Taller cards (~540px height)
- Cards fill available height
- Gap: 12px between cards

---

## 🎨 Design Specifications

### Colors & Backgrounds
| Color Name | Background Color | Border Color (selected) |
|------------|------------------|-------------------------|
| Baddy Blue | #CCE5FF | #5A9BD4 |
| Wine | #FED4E5 | #D98FA3 |
| Sunshine | #FFDE96 | #D4A84A |
| Rojo | #FFC1C1 | #D98A8A |
| Coal | #D9D9D9 | #9E9E9E |

### Typography
- **Title**: Epilogue SemiBold, 24px (mobile) → 36px (desktop)
- **Card Labels**: Epilogue Medium, 14px
- **Label Position**: Bottom right of card, 20px padding

### Spacing
- **Container Padding**: 20px
- **Card Gap**: 12px
- **Card Internal Padding**: 20px
- **Title to Grid Gap**: 24px

### Card Structure
Each card contains:
1. Background color (full card)
2. LEGO brick SVG (centered, ~121px size)
3. Color name label (bottom right)
4. Border on selection (2px solid)

---

## 🔧 Optimal Responsive Strategy

### Breakpoint Strategy
```
Mobile:    < 768px   - Custom grid (1 col + 2x2 grid)
Tablet:    768-1023px - 2-column grid
Desktop:   ≥ 1024px   - Horizontal flex (5 columns)
```

### Why This Approach?

**Mobile (< 768px): Custom Grid Layout**
- Use CSS Grid with `grid-template-areas` for precise control
- Featured card (Blue) gets more prominence (full width)
- Remaining cards in 2x2 grid below
- Maintains visual hierarchy from Figma
- Better use of vertical space on mobile

**Tablet (768-1023px): 2-Column Grid**
- Simple `grid-template-columns: repeat(2, 1fr)`
- All cards equal size for consistency
- Handles 5 cards gracefully (last card can span or center)
- Prevents cards from being too wide

**Desktop (≥ 1024px): Horizontal Flex**
- `display: flex` with 5 equal columns
- Cards fill available height
- Clean, linear layout matching Figma
- Optimal for wide screens

---

## 📐 Implementation Details

### Container Structure
```tsx
<div className="color-picker-container">
  <h1 className="title">What color did you get?</h1>
  <div className="color-grid">
    {/* 5 color cards */}
  </div>
</div>
```

### Mobile Grid Template (< 768px)
```css
.color-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 12px;
  grid-template-areas:
    "blue blue"
    "wine sunshine"
    "rojo coal";
}

.card-blue { grid-area: blue; }
.card-wine { grid-area: wine; }
.card-sunshine { grid-area: sunshine; }
.card-rojo { grid-area: rojo; }
.card-coal { grid-area: coal; }
```

### Tablet Grid (768-1023px)
```css
@media (min-width: 768px) and (max-width: 1023px) {
  .color-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 12px;
    grid-template-areas:
      "blue wine"
      "sunshine rojo"
      "coal coal";
  }
  
  .card-coal {
    grid-area: coal;
    max-width: 50%;
    margin: 0 auto;
  }
}
```

### Desktop Flex (≥ 1024px)
```css
@media (min-width: 1024px) {
  .color-grid {
    display: flex;
    flex-direction: row;
    gap: 12px;
    height: 100%;
  }
  
  .color-card {
    flex: 1;
    min-width: 0;
  }
  
  /* Reset grid areas */
  .card-blue,
  .card-wine,
  .card-sunshine,
  .card-rojo,
  .card-coal {
    grid-area: unset;
  }
}
```

### Card Styling
```css
.color-card {
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.color-card.selected {
  border-color: var(--border-color);
}

.color-card:hover {
  transform: scale(1.02);
}

/* Mobile card heights */
@media (max-width: 767px) {
  .card-blue {
    min-height: 256px; /* Taller featured card */
  }
  
  .card-wine,
  .card-sunshine,
  .card-rojo,
  .card-coal {
    min-height: 192px;
  }
}

/* Tablet card heights */
@media (min-width: 768px) and (max-width: 1023px) {
  .color-card {
    min-height: 240px;
  }
}

/* Desktop card heights */
@media (min-width: 1024px) {
  .color-card {
    height: 100%;
    min-height: 400px;
  }
}
```

### LEGO Brick Sizing
```css
.brick-image {
  width: 121px;
  height: 121px;
  object-fit: contain;
}

/* Scale down on smaller mobile */
@media (max-width: 390px) {
  .brick-image {
    width: 100px;
    height: 100px;
  }
}

/* Scale up on desktop */
@media (min-width: 1024px) {
  .brick-image {
    width: 140px;
    height: 140px;
  }
}
```

---

## 🎯 Responsive Behavior Summary

### Mobile (< 768px)
- ✅ Custom grid with featured Blue card
- ✅ Blue card full width at top
- ✅ Remaining 4 cards in 2x2 grid
- ✅ Card heights: 256px (Blue), 192px (others)
- ✅ 12px gap between cards
- ✅ Vertical scrolling if needed

### Tablet (768-1023px)
- ✅ 2-column grid layout
- ✅ 5 cards arranged in 3 rows
- ✅ Last card (Coal) centered or spans full width
- ✅ All cards equal height (~240px)
- ✅ 12px gap maintained

### Desktop (≥ 1024px)
- ✅ Horizontal flex layout
- ✅ 5 equal-width columns
- ✅ Cards fill container height
- ✅ Minimum height: 400px
- ✅ 12px gap between cards
- ✅ No scrolling needed

---

## 🔄 Current Implementation Issues

Looking at the current `BuildStep.tsx`:

### Problems:
1. ❌ Uses `auto-fit` grid which doesn't match Figma's specific layouts
2. ❌ No featured card (Blue should be larger on mobile)
3. ❌ Cards wrap unpredictably at different breakpoints
4. ❌ Doesn't switch to horizontal flex on desktop
5. ❌ Card heights use viewport units (`30vh`) instead of fixed heights
6. ❌ Too many media query breakpoints (5 different ranges)
7. ❌ Doesn't follow mobile-first Figma design

### What Works:
1. ✅ Color selection logic
2. ✅ Border highlighting on selection
3. ✅ Continue button appears when color selected
4. ✅ Card structure (background, brick, label)
5. ✅ Back button and title layout

---

## 📝 Implementation Checklist

### Phase 1: Structure
- [ ] Remove `auto-fit` grid
- [ ] Add grid-template-areas for mobile layout
- [ ] Add data attributes or classes to identify each card
- [ ] Set up proper breakpoints (768px, 1024px)

### Phase 2: Mobile Layout (< 768px)
- [ ] Implement custom grid with template areas
- [ ] Blue card spans full width (grid-area: blue)
- [ ] 2x2 grid for remaining cards
- [ ] Set card heights: 256px (Blue), 192px (others)
- [ ] 12px gap between cards

### Phase 3: Tablet Layout (768-1023px)
- [ ] Switch to 2-column grid
- [ ] 3 rows for 5 cards
- [ ] Center or span last card (Coal)
- [ ] Equal card heights (~240px)
- [ ] Maintain 12px gap

### Phase 4: Desktop Layout (≥ 1024px)
- [ ] Switch from grid to flex
- [ ] Horizontal row with 5 columns
- [ ] Equal width cards (flex: 1)
- [ ] Cards fill container height
- [ ] Minimum height: 400px
- [ ] Reset grid-area properties

### Phase 5: Polish
- [ ] Adjust LEGO brick sizes per breakpoint
- [ ] Ensure labels stay at bottom
- [ ] Test hover states
- [ ] Test selection borders
- [ ] Verify spacing matches Figma
- [ ] Test on actual devices

---

## 🎨 Tailwind CSS Implementation

Since the project uses Tailwind, here's the class-based approach:

### Container
```tsx
<div className="flex flex-col items-center gap-6 p-5 w-full h-full">
```

### Title
```tsx
<h1 className="font-['Epilogue'] font-semibold text-2xl lg:text-4xl text-black text-center">
  What color did you get?
</h1>
```

### Grid Container - Mobile
```tsx
<div className="grid grid-cols-2 gap-3 w-full max-w-[1440px] lg:flex lg:flex-row">
```

### Individual Cards with Grid Areas
```tsx
<button 
  className={`
    relative cursor-pointer border-2 transition-all overflow-hidden
    flex flex-col items-center justify-between p-5
    min-h-[192px]
    ${colorName === 'Baddy Blue' ? 'col-span-2 min-h-[256px]' : ''}
    lg:flex-1 lg:min-h-[400px] lg:col-span-1
    ${selected ? 'border-[color]' : 'border-transparent'}
  `}
>
```

---

## 🚀 Recommended Implementation Order

1. **Start with Mobile** (< 768px)
   - Get the custom grid working with template areas
   - Ensure Blue card is featured
   - Verify 2x2 grid for other cards

2. **Add Tablet** (768-1023px)
   - Implement 2-column grid
   - Handle 5th card centering

3. **Add Desktop** (≥ 1024px)
   - Switch to flex layout
   - Ensure equal widths
   - Test height filling

4. **Polish & Test**
   - Fine-tune spacing
   - Test all interactions
   - Verify on real devices

---

## 📱 Testing Viewports

| Device | Width | Expected Layout |
|--------|-------|-----------------|
| iPhone SE | 375px | Custom grid (1 + 2x2) |
| iPhone 13 | 390px | Custom grid (1 + 2x2) |
| iPad Mini | 768px | 2-column grid |
| iPad Pro | 1024px | Horizontal flex (5 cols) |
| Desktop | 1440px | Horizontal flex (5 cols) |

---

## 💡 Key Insights

1. **Don't use auto-fit** - It doesn't give us the control needed for Figma's specific layouts
2. **Grid template areas** - Perfect for mobile's asymmetric layout
3. **Switch layout methods** - Grid for mobile/tablet, Flex for desktop
4. **Featured card** - Blue gets special treatment on mobile
5. **Fixed heights** - Better than viewport units for consistency
6. **Mobile-first** - Start with mobile, enhance for larger screens

---

## 🔗 Related Files

- Implementation: `/src/pages/build/BuildStep.tsx`
- Store: `/src/store/buildStore.ts`
- Assets: `/src/assets/images/brick-*.svg`
- Backgrounds: `/src/assets/images/color-*-bg.png`

---

## 📚 References

- Figma Mobile: node-id=236-31334
- Figma Tablet: node-id=236-31468
- Figma Desktop: node-id=236-31602
- Responsive Layout Guide: `RESPONSIVE_LAYOUT_GUIDE.md`
