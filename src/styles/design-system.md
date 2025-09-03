# The School of Options - Design System

## Color Palette

### Primary Colors
- **Navy**: `#003566` (Primary brand color)
- **Navy Light**: `#001d3d` (Hover states)
- **Navy Dark**: `#000814` (Text, backgrounds)

### Accent Colors
- **Accent**: `#ffc300` (Golden yellow - CTAs, highlights)
- **Accent Light**: `#ffd60a` (Hover states)
- **Accent Dark**: `#e6af00` (Active states)

### Neutral Colors
- **White**: `#ffffff` (Backgrounds, cards)
- **Gray 50**: `#f9fafb` (Light backgrounds)
- **Gray 100**: `#f3f4f6` (Borders, subtle backgrounds)
- **Gray 600**: `#4b5563` (Secondary text)

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Headings
- **H1**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy`
- **H2**: `text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-navy`
- **H3**: `text-lg sm:text-xl lg:text-2xl font-bold text-navy`

### Body Text
- **Primary**: `text-sm sm:text-base text-gray-600`
- **Secondary**: `text-xs sm:text-sm text-gray-500`

## Components

### Cards
**Standard Card Pattern:**
```css
bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20 group
```

**Card Hover Effects:**
- Shadow elevation: `hover:shadow-xl`
- Border highlight: `hover:border-accent/20`
- Title color change: `group-hover:text-accent transition-colors`

### Buttons

**Primary Button:**
```css
.btn-primary {
  @apply bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-colors;
}
```

**Secondary Button:**
```css
.btn-secondary {
  @apply bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition-colors;
}
```

### Icons
**Icon Circles:**
```css
w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent rounded-full flex items-center justify-center
```

**Icon Sizes:**
- Small: `h-4 w-4`
- Medium: `h-5 w-5 sm:h-6 sm:w-6`
- Large: `h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8`

## Layout Patterns

### Section Spacing
```css
py-12 sm:py-16 lg:py-24
```

### Container
```css
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Grid Layouts
- **3 Column**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8`
- **2 Column**: `grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12`

### Responsive Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## Animation & Transitions

### Standard Transitions
```css
transition-all duration-300
```

### Hover Effects
- **Scale**: `group-hover:scale-105`
- **Translate**: `group-hover:translate-x-1`
- **Color**: `group-hover:text-accent`

## Blog Card Variants

### Image Cards (Minimal)
- Compact metadata
- 2-line excerpt
- Simple footer

### Text Cards (Expanded)
- Rich metadata panel
- 6-line excerpt
- Enhanced CTA button

## Accessibility

### Focus States
```css
outline: 2px solid var(--accent);
outline-offset: 2px;
```

### Color Contrast
- Navy on white: AAA compliant
- Accent on navy: AA compliant
- Gray text: AA compliant

## Usage Guidelines

1. **Always use the accent color** instead of legacy green references
2. **Maintain consistent card styling** across all components
3. **Use standard button classes** (.btn-primary, .btn-secondary)
4. **Apply hover effects consistently** with group classes
5. **Follow responsive patterns** for all layouts
6. **Use semantic HTML** with proper heading hierarchy
