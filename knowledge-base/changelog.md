# Changelog

## 2026-08-13 — Vercel Deployment Configuration
**What**: Restructured the codebase and routing for a seamless monorepo deployment on Vercel.
**Why**: User requested to prepare the application for Vercel deployment.
**Files Changed**: `vercel.json` [NEW], `backend/server.js`, `frontend/vite.config.js`, `frontend/src/pages/admin/tabs/ProductsTab.jsx`, `frontend/src/pages/admin/tabs/OverviewTab.jsx`, `frontend/src/context/AuthContext.jsx`
- Created root `vercel.json` to route frontend builds and setup the Express backend as Vercel Serverless Functions.
- Added `module.exports = app` to `backend/server.js` for serverless support.
- Configured Vite proxy in `vite.config.js` to route `/api` to local port 5000 during local development.
- Removed all hardcoded `http://localhost:5000` URLs across the frontend, replacing them with dynamic relative `/api` paths for production compatibility.
## 2026-08-13 — Cloudinary Image Upload
**What**: Integrated Cloudinary for robust image uploads in the Admin Dashboard.
**Why**: User requested the ability to upload images for products using their Cloudinary credentials.
**Files Changed**: `backend/.env`, `backend/package.json`, `backend/routes/upload.js`, `backend/server.js`, `frontend/src/pages/admin/tabs/ProductsTab.jsx`
- Added Cloudinary configuration and credentials to the backend.
- Installed `multer` and `cloudinary` backend dependencies.
- Created `POST /api/upload` route to handle multipart form data, push to Cloudinary, and return the image URL.
- Updated the Products tab form in the dashboard to use a File Input instead of a text field.
- Implemented frontend uploading state, preview thumbnails, and automatic URL injection into the product data.
## 2026-08-13 — Added Smooth Scrolling
**What**: Integrated Locomotive Scroll into the frontend for a smooth scrolling experience.
**Why**: User requested smooth scrolling.
**Files Changed**: `frontend/package.json`, `frontend/src/App.jsx`
- Installed `locomotive-scroll` dependency.
- Initialized Locomotive Scroll globally inside `App.jsx` using a `useEffect` hook.
## 2026-08-13 — MongoDB Integration and Admin Product Management
**What**: Connected the backend to MongoDB and implemented real Add/Edit/Delete functionality for products in the Admin Dashboard.
**Why**: User requested removal of dummy data and workable Add/Edit functionality.
**Files Changed**: `backend/server.js`, `backend/models/Product.js`, `backend/routes/products.js`, `frontend/src/pages/admin/tabs/ProductsTab.jsx`, `frontend/src/pages/admin/tabs/OverviewTab.jsx`
- Wired `server.js` to connect to MongoDB using `MONGO_URI`.
- Created a Mongoose schema (`Product.js`) and RESTful routes (`routes/products.js`) for full CRUD capabilities.
- Migrated existing mock products from the frontend into the MongoDB database.
- Completely refactored `ProductsTab.jsx` to fetch live data from the API and handle Add, Edit, and Delete actions via modal forms.
- Updated `OverviewTab.jsx` to fetch the real product count from the database.
## 2026-08-13 — Admin Dashboard Added
**What**: Created a fully styled admin dashboard at `/admin`.
**Why**: User requested a dedicated space to manage the store and view metrics.
**Files Changed**: `frontend/src/pages/admin/AdminDashboard.jsx`, `frontend/src/pages/admin/tabs/*`, `frontend/src/App.jsx`
- Designed a dark-themed sidebar layout with three main tabs: Overview, Products, and Orders.
- Built `OverviewTab` with mock key performance metrics and recent activity.
- Built `ProductsTab` integrated with `allProducts` data, including a search filter.
- Built `OrdersTab` to display mock recent orders in a color-coded data table.
- Added basic route protection so only logged-in users can view the dashboard.
## 2026-08-13 — About Us Page Added
**What**: Created a new `/about-us` page based on the brand's persona and styling.
**Why**: User requested an About page following a specific design with a split-screen alternating layout and bold typography.
**Files Changed**: `frontend/src/pages/About.jsx`, `frontend/src/App.jsx`
- Designed `About.jsx` to closely match the provided aesthetic with bold headers, specific quotes, and existing product imagery.
- Added `/about-us` route to `App.jsx`.
## 2026-08-13 — 404 Page and Strict Routing Added
**What**: Added a dedicated 404 Not Found page and restricted the Collection routes.
**Why**: The catch-all `/*` route was matching any random URL (e.g. `/sdbfcff`) and rendering a broken Collection page instead of indicating the page doesn't exist.
**Files Changed**: `frontend/src/pages/NotFound.jsx`, `frontend/src/App.jsx`
- Created a `NotFound` component for invalid routes.
- Updated `App.jsx` to explicitly define valid category routes (`/shop-all`, `/men`, `/women`, etc.) and fall back to the `NotFound` component for anything else.
## 2026-08-13 — Mock Login and Registration Functionality Added
**What**: Added a mock authentication API, a global Auth context, and a slide-in login/register overlay.
**Why**: User requested login and registration functionality connected to the profile icon using an API.
**Files Changed**: `backend/routes/auth.js`, `backend/server.js`, `frontend/src/context/AuthContext.jsx`, `frontend/src/main.jsx`, `frontend/src/components/LoginOverlay.jsx`, `frontend/src/components/Header.jsx`
- Implemented a mock `/api/auth/register` and `/api/auth/login` endpoints utilizing an in-memory user list.
- Added `AuthContext` to manage user state and API calls.
- Created `LoginOverlay` styled similarly to the `CartSidebar`, supporting both Login and Register modes.
- Connected the profile icon in `Header.jsx` to open the `LoginOverlay`.
## 2026-08-12 — Unisex Category Mapping Fixed
**What**: Updated the category routing logic so that "Unisex" products automatically appear in both the "For Men" and "For Women" shop sections.
**Why**: User requested to see all relevant products in the Men/Women categories, which naturally includes Unisex options.
**Files Changed**: `src/data/products.js`
- Modified `getProductsByCategory` helper function to include products categorized as `unisex` when querying for `men` or `women`.

## 2026-08-12 — Dynamic Product Notes Added
**What**: Updated the "NOTES" section on product pages to dynamically render the actual Top, Heart, and Base notes for the specific product being viewed.
**Why**: User requested to remove the random/hardcoded notes (Cherry, Almond, Nutmeg) and use their specific fragrance data.
**Files Changed**: `src/components/product/ProductNotes.jsx`, `src/pages/product/Product.jsx`
- Replaced hardcoded array with a dynamic parsing function `parseNotes(product.fullNotes...)`.
- Created an internal `noteIcons` dictionary that automatically maps common keywords (e.g., 'rose', 'bergamot', 'oud') to elegant matching emojis.
- Passed `product` prop down from `Product.jsx` into `<ProductNotes />`.

## 2026-08-12 — Search Converted to Dropdown
**What**: Changed the search functionality from a full-screen takeover into a sleek dropdown bar below the header.
**Why**: User found the full-screen layout too intrusive and requested a smaller dropdown.
**Files Changed**: `src/components/SearchOverlay.jsx`, `src/components/Header.jsx`
- Repositioned `<SearchOverlay>` inside the `<header>` element.
- Changed CSS from `fixed inset-0` to `absolute top-full left-0 w-full` to anchor it right below the header.
- Scaled down the fonts and padding to make the component smaller and cleaner.

## 2026-08-12 — Search Functionality Added
**What**: Implemented a full-screen search overlay that filters and displays products dynamically as the user types.
**Why**: User requested a live search functionality identical to the provided mockup.
**Files Changed**: `src/components/SearchOverlay.jsx`, `src/components/Header.jsx`
- Created `SearchOverlay` component handling search state, live filtering of the `allProducts` array, and a UI layout featuring text suggestions and visual product cards.
- Connected the search magnifying glass icon in the header to toggle the new search overlay.

## 2026-08-12 — Scroll Restoration Implemented
**What**: Added automatic scroll restoration so that navigating to a new page always starts at the top.
**Why**: React Router preserves scroll position by default; user requested new pages to load at the top.
**Files Changed**: `src/components/ScrollToTop.jsx`, `src/App.jsx`
- Created `ScrollToTop` component that listens to `pathname` changes and fires `window.scrollTo(0, 0)`.
- Mounted it globally in `App.jsx`.

## 2026-08-12 — Hidden Scrollbars (Cart & Thumbnails)
**What**: Removed the ugly horizontal scrollbars from the sliders, and the vertical scrollbar from the main cart items list.
**Why**: User requested to hide the scrollbars to make the UI cleaner.
**Files Changed**: `src/index.css`, `src/components/cart/CartSidebar.jsx`
- Added the `.no-scrollbar` utility classes globally to hide the default browser scrollbars.
- Applied `.no-scrollbar` to the vertical `overflow-y-auto` container inside the cart sidebar.

## 2026-08-12 — Cart Drawer Implemented
**What**: Built a fully functional side-drawer Cart and connected it globally across the app.
**Why**: User requested to replace the dummy "free product" cart flow with a relevant cross-sell section and a real sliding cart UI.
**Files Changed**: `src/context/CartContext.jsx`, `src/components/cart/CartSidebar.jsx`, `src/App.jsx`, `src/main.jsx`, `src/components/Header.jsx`, `src/components/ProductCard.jsx`, `src/components/product/ProductHero.jsx`
- Created `CartContext` to handle global state (add/remove/update quantities, calculate totals, persist to localStorage).
- Created `CartSidebar` featuring a sliding drawer, empty state, free shipping progress bar, interactive cart items, total calculation, and a "RELEVANT PRODUCTS" cross-sell section.
- Connected the `Header` cart icon to open the sidebar and display real-time item counts.
- Connected all "ADD TO CART" buttons (`ProductHero`, `ProductCard`) to actually add the specific product to the cart.

## 2026-08-12 — Trial Set Section Removed & Marquee Moved
**What**: Removed the "Game Changer Trial Set" section from the landing page and moved its scrolling text marquee to sit directly below the "Our Collection" section.
**Why**: User requested to hide the Trial Set section but retain the scrolling ticker tape.
**Files Changed**: `src/pages/landing/Landing.jsx`, `src/components/landing/OurCollectionSection.jsx`
- Removed `<TrialSetSection />` component from the main Landing page layout.
- Migrated the scrolling marquee component (`<div className="animate-marquee...">`) into the bottom of `OurCollectionSection.jsx`.

## 2026-08-12 — Landing Page Images Updated
**What**: Updated the landing page sections (Bestseller, Trial Set, and Our Collection) to use real product images instead of placeholders.
**Why**: User requested to have the images set across the landing page cards.
**Files Changed**: `src/components/landing/BestsellerSection.jsx`, `src/components/landing/TrialSetSection.jsx`, `src/components/landing/OurCollectionSection.jsx`
- Replaced all `placehold.co` image URLs with real images from the `/images/` public directory.
- Updated the hardcoded Bestseller mock data to feature four of the actual products (Royal Oudh, Velvet Lavender, Majestic Musk, Aqua Frost).
- Assigned appropriate real images for the "Trial Set" and category cards.

## 2026-08-12 — Product Images Object-Fit Fixed
**What**: Changed the product images in the Product Hero section, Collection Cards, and Home Page Cards from `object-cover` to `object-contain`.
**Why**: User requested the image fitting to be updated globally so that the full perfume bottles are visible without their tops or bottoms being cropped off.
**Files Changed**: `src/components/product/ProductHero.jsx`, `src/components/ProductCard.jsx`, `src/components/landing/OurCollectionSection.jsx`
- Updated both the main image and thumbnail images in the product page to use `object-contain`.
- Updated the image styling in `ProductCard` (used on Collection page) and `OurCollectionSection` (used on Home page) to use `object-contain` along with padding for a cleaner presentation.

## 2026-08-12 — Product Page Dynamic Integration
**What**: Integrated actual product images from the `public/images` folder and made the Product Hero section fully dynamic.
**Why**: User requested to use the main product images from the public folder instead of placeholders.
**Files Changed**: `src/data/products.js`, `src/pages/product/Product.jsx`, `src/components/product/ProductHero.jsx`
- Mapped all 13 base fragrances to their actual image files (e.g., `aquafrost.png`, `imperialgold.png`).
- Updated `Product.jsx` to fetch the correct product using the URL slug (`useParams`).
- Updated `ProductHero.jsx` to display dynamic data (real images, titles, pricing, and dynamic perfume notes) based on the current product.

## 2026-08-12 — Website Name Updated
**What**: Changed the website branding from "BLA BLI BLU" to "KIZ Perfumes".
**Why**: User explicitly requested the name change.
**Files Changed**: `index.html`, `src/components/Header.jsx`
- Updated the browser tab `<title>` to "KIZ Perfumes".
- Replaced the logo text in the header and adjusted the sizing/spacing to make "KIZ" look bold and prominent.

## 2026-08-12 — Catalog & Header Simplified
**What**: Removed programmatic variant generation, simplified header navigation, and streamlined Collection filters.
**Why**: User requested the site to exclusively feature the 13 core products and felt the header and filters were too cluttered.
**Files Changed**: `src/data/products.js`, `src/components/Header.jsx`, `src/pages/collection/FilterSidebar.jsx`, `src/components/landing/OurCollectionSection.jsx`, `src/pages/collection/Collection.jsx`
- Reduced `products.js` to exactly 13 items based on provided fragrance data.
- Overhauled `Header.jsx` to a single row with a dropdown containing the 13 products.
- Removed Availability and Occasion filters from `FilterSidebar.jsx`.
- Updated links in `OurCollectionSection.jsx` to point to actual categories/products.

## 2026-08-12 — Customer Reviews Component Added
**What**: Created a new `CustomerReviews` component and added it to the Product page.
**Why**: User requested a customer review section matching a provided screenshot, to be placed after the FAQs.
**Files Changed**: `src/components/product/CustomerReviews.jsx`, `src/pages/product/Product.jsx`
- Built out the review summary (average rating, distribution bars, CTA button).
- Implemented individual review cards with mock data matching user screenshots.
- Ensured all UI elements adhere to the black and gold aesthetic instead of red.
- Placed the component below the `FaqSection` on the main Product view.

## 2026-08-12 — Promo & Guide Replaced with Images
**What**: Replaced the HTML/CSS implementations of `PromoBanners` and `ConcentrationGuide` on the Product page with static image elements.
**Why**: User explicitly requested these sections to be rendered as images, matching their backend/CMS setup where these graphics are uploaded directly.
**Files Changed**: `src/components/product/PromoBanners.jsx`, `src/components/product/ConcentrationGuide.jsx`

## 2026-08-12 — Our Collection Links Updated
**What**: Updated the "Our Collection" cards on the landing page to link to collection categories instead of individual product pages.
**Why**: User requested the navigation behavior change to match the new Collection page architecture.
**Files Changed**: `src/components/landing/OurCollectionSection.jsx`

## 2026-08-12 — Collection Filter & Sort Implemented
**What**: Added a slide-out filter sidebar and sorting dropdown to the Collection Page.
**Why**: User requested advanced filtering (Availability, Price, Gender, Occasion) and sorting capabilities based on a provided screenshot.
**Files Changed**: `src/pages/collection/Collection.jsx`, `src/pages/collection/FilterSidebar.jsx`
- Built `FilterSidebar` component with slide-out animation and accordions.
- Updated `Collection.jsx` to manage complex filter state (price ranges, multiple checkboxes).
- Implemented active sorting logic (Price Low-High, High-Low).
- Ensured all UI elements adhere to the black/gold aesthetic.

## 2026-08-12 — Collection Page Banner Updated
**What**: Replaced the HTML top banner on the Collection Page with a full-width image banner.
**Why**: User requested the top hero to be an image banner matching the provided screenshot style.
**Files Changed**: `src/pages/collection/Collection.jsx`

## 2026-08-12 — Collection Page & 100+ Products Generated
**What**: Created a dynamic Collection Page and generated 104 products.
**Why**: User provided 13 base fragrances and requested 100+ products and a collection page matching a screenshot.
**Files Changed**: `src/data/products.js`, `src/components/ProductCard.jsx`, `BestsellerSection.jsx`, `src/pages/collection/Collection.jsx`, `App.jsx`
- Generated 104 products (13 bases * 8 variants) in `products.js`, tagged for specific routes.
- Extracted `<ProductCard>` for reuse.
- Built `<Collection>` page with banner, breadcrumbs, and dynamic filtering.
- Updated `<App>` with a catch-all route `/*` to handle all collection categories from the header navigation.

## 2026-08-12 — Header Announcement Bar Removed
**What**: Removed the "Free Shipping" top header line from the navigation.
**Why**: User explicitly requested the removal of the top header line.
**Files Changed**: `frontend/src/components/Header.jsx`

## 2026-08-12 — Product Page & React Router Added
**What**: Built the complete modular Product Page and set up client-side routing.
**Why**: User provided a massive screenshot of a product page to recreate, keeping the black/gold aesthetic.
**Files Changed**: `package.json`, `main.jsx`, `App.jsx`, `src/pages/product/Product.jsx`, `src/components/product/*.jsx`, `TrialSetSection.jsx`, `OurCollectionSection.jsx`, `BestsellerSection.jsx`
- Installed `react-router-dom`.
- Wrapped `<App>` in `<BrowserRouter>` and implemented `<Routes>` for `/` and `/product/:id`.
- Created 8 distinct product components: `ProductHero`, `ProductNotes`, `PromoBanners`, `ProductAccordion`, `VisualFeatures`, `UsageGuide`, `WhyUs`, and `ConcentrationGuide`.
- Updated all landing page product cards to use `<Link>` components to navigate to the new page.

## 2026-08-12 — Landing Page Component Created
**What**: Consolidated all landing page sections into a single `Landing.jsx` page component.
**Why**: User requested further structural cleanup to keep `App.jsx` clean and route-ready.
**Files Changed**: `frontend/src/pages/landing/Landing.jsx`, `frontend/src/App.jsx`
- Created `frontend/src/pages/landing/Landing.jsx`.
- Moved all imports and the `<main>` wrapper for the 7 landing components out of `App.jsx` and into `Landing.jsx`.
- Updated `App.jsx` to only render `<Header />`, `<Landing />`, and `<Footer />`, making it incredibly clean and ready for future routing (like React Router).

## 2026-08-12 — Restructured Landing Page Components
**What**: Moved all landing page-specific components into a `components/landing` subdirectory.
**Why**: User requested organization to separate page content from global layout components (Header/Footer).
**Files Changed**: Moved 7 components, updated `frontend/src/App.jsx`
- Created `frontend/src/components/landing/` directory.
- Moved `HeroSlider`, `TrialSetSection`, `OurCollectionSection`, `BestsellerSection`, `RiskFreeSection`, `FaqSection`, and `StatsSection` into the new folder.
- Kept `Header.jsx` and `Footer.jsx` in the root `components/` folder as they are global layout elements.
- Updated all import paths in `App.jsx`.

## 2026-08-12 — Footer Component
**What**: Created the Footer section including the "LOGGED IN YET?" CTA.
**Why**: User requested this section based on a screenshot to complete the bottom of the page.
**Files Changed**: `frontend/src/components/Footer.jsx`, `frontend/src/App.jsx`
- Built a two-part footer: A dark CTA banner followed by a 4-column links section.
- Replaced the solid red CTA background with black, and the red CTA text with gold, keeping the premium brand aesthetic.
- Included all the navigation links (Shop, Information, Contact, Other) from the screenshot.
- Added custom SVG icons for the social media links (Instagram, YouTube, LinkedIn, X, Facebook) with gold hover effects.
- Integrated the component into `App.jsx` at the very bottom.

## 2026-08-12 — Stats Section Component
**What**: Created the 3-column statistics banner.
**Why**: User requested this section based on a screenshot to display social proof and ratings.
**Files Changed**: `frontend/src/components/StatsSection.jsx`, `frontend/src/App.jsx`
- Built a 3-column layout that stacks vertically on mobile and horizontally on desktop with dividing lines.
- Designed custom SVG icons (People/Chat, Stars, Perfume Bottle with Heart) matching the screenshot's concept.
- Replaced the original red colors with the requested brand gold for the icons and numbers, using black for the text.
- Integrated the component into `App.jsx` below the FAQS section.

## 2026-08-12 — FAQS Section Component
**What**: Created the accordion-style "FAQS" section.
**Why**: User requested this section based on a screenshot to display frequently asked questions.
**Files Changed**: `frontend/src/components/FaqSection.jsx`, `frontend/src/App.jsx`
- Built an interactive accordion list for the 9 FAQs provided in the screenshot.
- Added smooth expand/collapse animations for the answers.
- Replaced the original red chevron arrows with gold to maintain the premium black/gold brand aesthetic.
- The first FAQ opens by default, matching the screenshot's behavior.
- Integrated the component into `App.jsx` below the Risk Free section.

## 2026-08-12 — Risk Free Section Component
**What**: Created the "TRY OUR FRAGRANCES RISK FREE" informational section.
**Why**: User requested this section layout based on a screenshot outlining the trial process.
**Files Changed**: `frontend/src/components/RiskFreeSection.jsx`, `frontend/src/App.jsx`
- Built a 5-column layout (1 column for CTA, 4 columns for steps) that stacks responsively on mobile.
- Replaced the original solid red background with a premium black gradient (`from-[#000000] via-[#1a1a1a] to-[#000000]`) to maintain the brand aesthetic.
- Implemented gold circular borders for step numbers and a solid gold "TRY NOW" button.
- Integrated the component into `App.jsx` below the Bestseller section.

## 2026-08-12 — Bestseller Section Component
**What**: Created the "BESTSELLER | NEW ARRIVALS" product grid section.
**Why**: User requested this section based on a screenshot.
**Files Changed**: `frontend/src/components/BestsellerSection.jsx`, `frontend/src/App.jsx`
- Built a 4-column responsive grid with interactive product cards.
- Included tabs for "BESTSELLER" and "NEW ARRIVALS".
- Replicated complex card elements: top-left badge ("FREE RAKHI"), bottom-left star rating, product notes, prices with discounts, tags, and a full-width "ADD TO CART" button.
- Maintained the brand aesthetic by replacing all original red elements (tabs, badges, discount text, CTA buttons) with premium black and gold styling.
- Integrated the component into `App.jsx`.

## 2026-08-12 — Our Collection Section Component
**What**: Created the "OUR COLLECTION" product carousel section.
**Why**: User requested this section layout based on a screenshot.
**Files Changed**: `frontend/src/components/OurCollectionSection.jsx`, `frontend/src/App.jsx`
- Created a responsive product carousel using Swiper.js (shows up to 6 items on large screens).
- Replicated the product card design with image, title, price, and "BUY NOW" button.
- Replaced the red colors from the original design with the requested brand gold and black aesthetic (e.g., gold bordered "BUY NOW" buttons).
- Integrated the component into `App.jsx` below the Trial Set section.

## 2026-08-12 — Trial Set Section Component
**What**: Created the "GAME CHANGER TRIAL SET" section below the hero banner.
**Why**: User requested this specific section layout based on a screenshot.
**Files Changed**: `frontend/src/components/TrialSetSection.jsx`, `frontend/src/App.jsx`, `frontend/index.html`, `frontend/src/index.css`
- Added the "Bebas Neue" Google font for the condensed headings.
- Created the `TrialSetSection` component with a 4-column responsive grid.
- Used placeholder images with matching aspect ratio (can be replaced with actual Shopify URLs).
- Implemented a custom CSS animation (`--animate-marquee`) for the infinitely scrolling ticker bar at the bottom.

## 2026-08-12 — Hero Banner Slider Component
**What**: Created a hero banner slider using Swiper.js and provided images.
**Why**: User requested a slider for the hero section with specific banner images.
**Files Changed**: `frontend/src/components/HeroSlider.jsx`, `frontend/src/App.jsx`
- Installed `swiper` library for the slider functionality.
- Created `HeroSlider.jsx` component with fade effect, autoplay, custom pagination (dots), and navigation arrows.
- Integrated `HeroSlider` into `App.jsx` below the `Header` component.

## 2026-08-12 — React Header Component with Tailwind CSS
**What**: Created Header component replicating the BLA BLI BLU Parfums design in React + Tailwind
**Why**: User wanted the same header design as the WordPress HTML version, but as a React component
**Files Changed**: `frontend/src/components/Header.jsx`, `frontend/src/App.jsx`, `frontend/src/index.css`, `frontend/index.html`, `frontend/vite.config.js`
- Installed Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Created custom theme tokens: `--color-gold`, `--font-cinzel`, `--font-montserrat`
- Built `Header.jsx` with: announcement bar, logo, 2-row nav, dropdowns, SVG icons, mobile drawer
- Nav data stored as arrays for easy editing
- Mobile menu with slide-out drawer + overlay + animated hamburger
- Dropdown toggles via hover (desktop) and click (mobile) with smooth animations

## 2026-08-12 — React + Node Fullstack Setup
**What**: Created fullstack app with separate frontend and backend folders
**Why**: User requested a React + Node app with separate folder structure
**Files Changed**: `frontend/*`, `backend/*`
- Scaffolded React 19 app using Vite 8 (`npm create vite@latest frontend -- --template react`)
- Created Express.js 5 backend with: `server.js`, `routes/api.js`, `.env`
- Installed backend deps: express, cors, dotenv, mongoose, nodemon
- Backend runs on port 5000 with nodemon for auto-reload
- Frontend runs on port 5173 with Vite HMR
- Both servers verified running successfully

