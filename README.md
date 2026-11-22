# Home Circle Realty — Luxury Real Estate Web Application

A modern, high-performance luxury real estate portal and advisory web application built for **Home Circle Realty** (Bengaluru, India), modeled after leading property advisory firms like [RSquare Reality](https://rsquarereality.com/). The application features deep integration with the client's official [Home Circle Realty YouTube Channel](https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug) and includes a comprehensive **Admin Portal** to add, edit, and manage property listings and client leads.

---

## 🌟 Key Features

### 🏛️ 1. Client-Facing Luxury Portal (RSquare Reality Style)
- **Cinematic Hero Section**: High-impact visuals with a multi-criteria search and filter system (Buy, Villas, Villaments, Penthouses, Plots, Budget, BHK, Location).
- **Verified Bangalore Portfolio**: Pre-seeded with signature properties across prime corridors:
  - *The Presidential Lakefront Villa* (IVC Road / International Airport Corridor)
  - *Skyline Horizon Duplex Penthouse* (Whitefield EPIP Zone)
  - *Serenade Earth Luxury Villament* (Yelahanka)
  - *Emerald Grove Courtyard Villa* (Sarjapur Road)
  - *The Grand Sovereign Sky Residence* (Indiranagar HAL 2nd Stage)
  - *Aerotropolis Gated Plotted Estate* (Devanahalli Aerospace SEZ)
- **Direct YouTube Video Walkthroughs**:
  - Embedded 4K video player modal on property listings and detail pages.
  - Dedicated `/video-tours` page showcasing video tours from the client's YouTube channel (`UCVspkQelHEryqK4QKMHATug`).
  - Direct subscribe and channel visit CTAs.
- **Interactive EMI Mortgage Calculator**:
  - Dynamic sliders for Property Price, Down Payment (%), Loan Tenure (Years), and Interest Rate.
  - Real-time computation of monthly EMI, total interest, and total outflow.
- **Conversion & Lead Capture**:
  - "Book VIP Site Visit" modal with chauffeur pickup request.
  - 1-click WhatsApp inquiry pre-filled with property title and price.
  - RERA compliance verification badges and legal due-diligence assurances (0% brokerage on builder sales).

---

### ⚙️ 2. Admin Portal & Management System
- **Dashboard Overview (`/admin`)**:
  - Metric cards: Total active properties, featured residences, customer inquiries, and YouTube channel status.
  - Quick management table for recent listings with 1-click edit, delete, and preview actions.
  - Live customer inquiry leads stream.
- **Add Property Details Page (`/admin/add`)**:
  - Complete, structured property onboarding form:
    1. **Basic Info**: Title, Tagline, Developer/Builder, Property Type (Villa, Villament, Apartment, Penthouse, Plot, Commercial).
    2. **Commercials**: Formatted Price (e.g. ₹8.50 Cr), Numeric Price for filters, Price/sq.ft.
    3. **Location**: Landmark, Micro-market Area, City, Pincode.
    4. **Specifications**: Bedrooms (BHK), Bathrooms, Balconies, Super Built-up Area, Carpet Area, Furnishing, Facing, Possession Status, Possession Date, Karnataka RERA Number.
    5. **Media & YouTube**: YouTube Video ID/URL integration for automated player embeds, image gallery management.
    6. **Amenities & Features**: Interactive checklist for 15+ luxury amenities (Private Pool, Private Elevator, EV Charger, Italian Marble, etc.).
    7. **Narrative & Highlights**: Detailed description and bulleted highlights.
    8. **Homepage Spotlight Toggle**: One-click feature toggle.
    9. **"Auto-fill Luxury Sample" button**: Quick testing preset.
- **Property Management (`/admin/properties`)**:
  - Searchable and filterable data table of all properties.
  - Fast editing (`/admin/edit/[id]`), deleting, and feature toggles.
- **Lead & Inquiry Management (`/admin/inquiries`)**:
  - Real-time tracking of site visit requests, callbacks, and price inquiries.
  - Status pipeline: `New` → `Contacted` → `Visit Scheduled` → `Closed`.
  - Direct Call and WhatsApp buttons for instant agent follow-up.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom luxury gold/navy design tokens
- **Icons**: Lucide React
- **Data Persistence**: JSON-based file storage engine with ACID write operations located at `/data/properties.json` and `/data/inquiries.json` (no external database server required; zero config, persists across restarts).
- **APIs**:
  - `GET/POST /api/properties`: Full catalog with search, filter, and property creation.
  - `GET/PUT/DELETE /api/properties/[id]`: Individual property CRUD operations.
  - `GET/POST/PATCH /api/inquiries`: Customer leads and status tracking.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ (Node v20 LTS recommended)
- npm or yarn

### Running the Application

1. **Navigate to the project directory**:
   ```bash
   cd /home/shahid/home-circle-realty
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be running at [http://localhost:3000](http://localhost:3000).

3. **Or run the production build**:
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Project Structure

```
home-circle-realty/
├── data/
│   ├── properties.json        # Persistent property database
│   └── inquiries.json         # Customer leads and site visit bookings
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── properties/    # REST API for properties
│   │   │   └── inquiries/     # REST API for lead capture
│   │   ├── admin/
│   │   │   ├── add/           # Admin page to add property details
│   │   │   ├── edit/[id]/     # Admin page to edit property details
│   │   │   ├── properties/    # Admin property listing table
│   │   │   ├── inquiries/     # Admin leads pipeline
│   │   │   ├── layout.tsx     # Admin portal layout & sidebar
│   │   │   └── page.tsx       # Admin dashboard & analytics
│   │   ├── properties/        # Public property search & catalog
│   │   │   └── [id]/          # Property detail view with video tour & specs
│   │   ├── video-tours/       # Dedicated YouTube walkthroughs page
│   │   ├── calculator/        # Standalone mortgage EMI calculator
│   │   ├── about/             # Agency philosophy & builder partnerships
│   │   ├── contact/           # Contact form & Bangalore office info
│   │   ├── globals.css        # Luxury styling & gradients
│   │   ├── layout.tsx         # Public website layout with Navbar & Footer
│   │   └── page.tsx           # Home Circle Realty homepage
│   ├── components/
│   │   ├── Navbar.tsx         # Header navigation & quick contact
│   │   ├── Footer.tsx         # Legal disclaimer, RERA info & YouTube links
│   │   ├── PropertyCard.tsx   # Luxury property card with badges & actions
│   │   ├── HeroSearch.tsx     # Search & filter widget (RSquare Reality style)
│   │   ├── EMICalculator.tsx  # Dynamic loan calculator component
│   │   ├── YouTubeShowcase.tsx# YouTube channel video tour embed section
│   │   └── SiteVisitModal.tsx # VIP site visit booking modal
│   ├── lib/
│   │   └── dataStore.ts       # Backend data persistence layer
│   └── types/
│       └── property.ts        # TypeScript interfaces & types
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## 🔗 Connected Channels & References
- **Client YouTube Channel**: [https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug](https://www.youtube.com/channel/UCVspkQelHEryqK4QKMHATug)
- **Reference Real Estate Agency**: [https://rsquarereality.com/](https://rsquarereality.com/)
