# RibTrg - Slovenian Fish Marketplace Specification

## Project Overview

**Project Name:** RibTrg (Rib Trg = Fish Market in Slovenian)
**Project Type:** B2B Marketplace Web Application
**Core Functionality:** A premium digital marketplace connecting Slovenian fish farmers, aquaculture producers, restaurants, distributors, and retail buyers for fresh fish trading.
**Target Users:** Slovenian fish farmers (prodajalci), restaurants/hoReCa (kupec), distributors, retail buyers

---

## UI/UX Specification

### Layout Structure

**Global Layout:**
- Sticky header (height: 72px desktop, 64px mobile)
- Main content area with max-width 1440px centered
- Footer with Links, contact info, legal

**Page Sections:**
1. **Header:** Logo, navigation, search, user menu/account, cart icon
2. **Main:** Dynamic per page
3. **Footer:** Company info, links, social, newsletter

**Responsive Breakpoints:**
- Mobile: 0-639px
- Tablet: 640-1023px
- Desktop: 1024px+

### Visual Design

**Color Palette:**
```
Deep Ocean Blue #0F3D56 — primary brand anchor, trust
Adriatic Teal #117A8B — secondary actions, filters
Seafoam Mist #DFF4F2 — soft backgrounds
Fresh Ice #F5FBFC — main page background
Slate Ink #1F2A37 — text and headings
Soft Silver #C9D6DF — borders and dividers
Coral Accent #FF7A59 — CTA, price emphasis
Fresh Green #2E9E6F — in stock/verified indicators
```

**Typography:**
- Headings: Manrope (Google Fonts) - weights 500, 600, 700
- Body: Inter (Google Fonts) - weights 400, 500, 600
- Font sizes:
  - h1: 48px / 56px line-height
  - h2: 36px / 44px line-height
  - h3: 28px / 36px line-height
  - h4: 22px / 28px line-height
  - body-lg: 18px / 28px line-height
  - body: 16px / 24px line-height
  - body-sm: 14px / 20px line-height
  - caption: 12px / 16px line-height

**Spacing System (8px base):**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

**Visual Effects:**
- Card shadows: 0 1px 3px rgba(15,61,86,0.08), 0 4px 12px rgba(15,61,86,0.04)
- Hover shadows: 0 4px 16px rgba(15,61,86,0.12)
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Transitions: 200ms ease-out

### Components

**1. Header:**
- Logo (RibTrg wordmark with fish icon)
- Navigation: Katalog | Prodajalci | Kako deluje
- Search bar (expandable on mobile)
- User dropdown (Login/Register or Account/Cart)
- Cart button with item count badge

**2. Product Card:**
- Image container (4:3 ratio)
- Freshness badge (top-right)
- Species name (h4)
- Farm name (caption, secondary)
- Price per kg (h4, coral accent)
- Delivery availability (icon + text)
- Add to cart button

**3. Filter Sidebar:**
- Collapsible sections
- Checkbox filters with counts
- Price range slider
- Clear all button
- Mobile: slide-out drawer

**4. Seller Card:**
- Logo/avatar
- Farm name (h4)
- Location
- Verified badge
- Rating stars
- Products count

**5. Dashboard Sidebar:**
- Icon + label navigation
- Active state indicator
- Collapse for mobile

**6. Data Tables:**
- Striped rows
- Sortable headers
- Pagination
- Actions column

**7. Form Elements:**
- Input fields (primary style)
- Select dropdowns
- File upload with drag-drop
- Toggle switches
- Primary/Secondary buttons

**8. Badges:**
- In Stock (green)
- Low Stock (coral)
- Verified (teal)
- Fresh (green with leaf icon)
- Frozen (blue)

---

## Functionality Specification

### Core Features

**1. Homepage:**
- Hero section with animated gradient background
- Global search bar
- Featured categories (freshwater, saltwater, smoked, frozen, live)
- Featured suppliers grid
- "How it works" section (3 steps for buyers, 3 for sellers)
- Trust indicators (freshness guarantee, verified farms, delivery tracking)
- CTA banners

**2. Marketplace Catalog:**
- Sticky filter sidebar (desktop)
- Filter drawer (mobile)
- Search input
- Sort dropdown (newest, price low-high, price high-low, availability)
- Product grid (3 columns desktop, 2 tablet, 1 mobile)
- Pagination
- Results count

**3. Filters:**
- Species/Product type
- Category (fresh, frozen, smoked, live, fillet)
- Freshwater/Saltwater
- Delivery region
- Price range
- Verified seller
- In stock only

**4. Product Detail:**
- Image gallery with thumbnails
- Product info section
- Seller card
- Freshness indicator
- Price display
- Quantity selector
- Delivery info
- Tabs: Description, Farming Method, Delivery, Reviews
- Add to cart CTA
- Contact seller button

**5. Seller Dashboard:**
- Overview: stats cards, recent orders, low stock alerts
- Products: table with edit/delete
- Orders: table with status
- Customers: buyer list
- Analytics: simple charts
- Profile: farm details edit

**6. Add/Edit Product:**
- Multi-step form
- Image upload
- Product details
- Pricing
- Inventory
- Delivery settings
- Review & publish

**7. Buyer Account:**
- Saved suppliers
- Order history
- Saved products
- Addresses
- Invoices

**8. Cart:**
- Grouped by supplier
- Quantity adjust
- Remove item
- Subtotal per supplier
- Total

**9. Checkout:**
- Address input
- Delivery selection
- Order summary
- Payment (mock)
- Confirmation

**10. Authentication:**
- Login with email/password
- Register (buyer/seller choice)
- Role selection

### User Interactions

- Search with debounce (300ms)
- Filter changes trigger URL update
- Add to cart shows mini-cart drawer
- Dashboard tabs with smooth transition
- Form validation with inline errors

### Data Handling

- Firebase Auth for authentication
- Cloud Firestore for data
- Firebase Storage for images
- Local state for cart (persisted to localStorage)

---

## Page Structure

### Public Pages
1. `/` - Homepage
2. `/catalog` - Product catalog
3. `/product/[id]` - Product detail
4. `/supplier/[id]` - Supplier profile
5. `/login` - Login page
6. `/register` - Registration page

### Protected Pages (Buyer)
7. `/cart` - Shopping cart
8. `/checkout` - Checkout
9. `/account` - Buyer account
10. `/orders` - Order history

### Protected Pages (Seller)
11. `/dashboard` - Seller dashboard home
12. `/dashboard/products` - Product management
13. `/dashboard/products/add` - Add product
14. `/dashboard/products/[id]/edit` - Edit product
15. `/dashboard/orders` - Order management
16. `/dashboard/customers` - Customer list
17. `/dashboard/analytics` - Analytics
18. `/dashboard/profile` - Farm profile

---

## Acceptance Criteria

### Homepage
- [ ] Hero loads with clean marine gradient
- [ ] Search bar is functional
- [ ] Featured suppliers display correctly
- [ ] CTAs navigate to appropriate pages

### Catalog
- [ ] Products display in grid
- [ ] Filters work correctly
- [ ] Sort changes order
- [ ] Pagination works
- [ ] Mobile drawer opens/closes

### Product Detail
- [ ] All product info displays
- [ ] Add to cart works
- [ ] Tabs switch content
- [ ] Seller info shows

### Seller Dashboard
- [ ] All sections navigate correctly
- [ ] Products table shows data
- [ ] Add product form works
- [ ] Orders show with status

### Cart/Checkout
- [ ] Cart items display
- [ ] Quantity updates work
- [ ] Checkout form submits

### Authentication
- [ ] Login works with email
- [ ] Register creates account
- [ ] Role assignment works

---

## Technical Implementation

### Stack
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Firebase SDK (Mock data for demo)
- Lucide React icons

### File Structure
```
/app
  /layout.tsx
  /page.tsx
  /catalog/page.tsx
  /product/[id]/page.tsx
  /supplier/[id]/page.tsx
  /login/page.tsx
  /register/page.tsx
  /cart/page.tsx
  /checkout/page.tsx
  /account/page.tsx
  /dashboard
    /layout.tsx
    /page.tsx
    /products/page.tsx
    /products/add/page.tsx
    /products/[id]/edit/page.tsx
    /orders/page.tsx
    /customers/page.tsx
    /analytics/page.tsx
    /profile/page.tsx
/components
  /ui (buttons, inputs, cards)
  /layout (header, footer, sidebar)
  /catalog (product-card, filters)
  /dashboard (tables, charts)
/lib
  /firebase.ts
  /mock-data.ts
/hooks
/styles
  /globals.css
```

### Firebase Schema (Implementation Reference)
```typescript
// users/{uid}
{
  uid: string
  fullName: string
  email: string
  role: 'buyer' | 'seller' | 'admin'
  phone?: string
  createdAt: Timestamp
}

// sellers/{sellerId}
{
  ownerId: string
  farmName: string
  description: string
  location: string
  deliveryRegions: string[]
  verified: boolean
  rating: number
  logoUrl?: string
  createdAt: Timestamp
}

// products/{productId}
{
  sellerId: string
  name: string
  species: string
  category: 'fresh' | 'frozen' | 'smoked' | 'live' | 'fillet'
  pricePerKg: number
  stockKg: number
  minOrderKg: number
  unit: 'kg'
  freshnessDate?: Timestamp
  images: string[]
  description: string
  origin: string
  deliveryRegions: string[]
  isPublished: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

// orders/{orderId}
{
  buyerId: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  shippingAddress: string
  createdAt: Timestamp
}
```

### Security Rules (Reference)
- Sellers: manage own products only
- Buyers: manage own orders/cart only
- Admins: full access
- Public read for published products

---

## Visual Checkpoints

1. **Homepage:** Clean, professional, marine blue gradient hero with white text
2. **Catalog:** Organized grid, clear filters, readable cards
3. **Product Detail:** Conversion-focused, clear pricing, trust indicators
4. **Dashboard:** Data-rich but clean, easy navigation, professional tables
5. **Mobile:** Fully responsive, touch-friendly, consistent branding

---

## Slovenian Localization Ready

All text should be in Slovenian:
- "Katalog" = Catalog
- "Prodajalci" = Sellers
- "Naročilo" = Order
- "Izdelek" = Product
- "Cena" = Price
- "Kosara" = Cart
- "Placilo" = Payment
- "Dostava" = Delivery
- "Sveže" = Fresh
- "Preverjeno" = Verified

Currency: EUR (€)
Language: Slovenian (SI)