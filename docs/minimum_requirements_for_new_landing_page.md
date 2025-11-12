# Minimum Requirements for New Landing Page

## Overview
This document outlines the minimum requirements for creating a new search engine landing page in the BookTok Hype Hub project.

## Prerequisites
- Basic understanding of React, TypeScript, and Tailwind CSS
- Familiarity with React Router for navigation
- Access to the existing component library (shadcn-ui)

---

## Step-by-Step Guide

### 1. Create the Page Component

**Location**: `/src/pages/YourPageName.tsx`

**Minimum Structure**:
```typescript
import Header from "@/components/Header";

const YourPageName = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Your content sections go here */}
      </main>
    </div>
  );
};

export default YourPageName;
```

**Key Requirements**:
- Must include `Header` component for consistent navigation
- Wrap content in semantic `<main>` tag
- Use `min-h-screen bg-background` classes on root div

---

### 2. Register the Route

**Location**: `/src/App.tsx`

**Steps**:
1. Import your page component:
   ```typescript
   import YourPageName from "./pages/YourPageName";
   ```

2. Add route **before** the catch-all `*` route:
   ```typescript
   <Route path="/your-route" element={<YourPageName />} />
   ```

**Example**:
```typescript
<Routes>
  <Route path="/" element={<Fooble />} />
  <Route path="/booktok" element={<Booktok />} />
  <Route path="/your-route" element={<YourPageName />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

### 3. Add Search Keywords & Result (REQUIRED for Demo)

**Location**: `/src/pages/SearchResults.tsx`

Since this is a **Search Engine Landing Page** demo, you MUST integrate your page with the mocked search functionality.

**Step 3.1: Define Keywords**

Add a keyword array that will trigger your landing page in search results:

```typescript
const yourPageKeywords = [
  "main keyword", "secondary keyword", "related term",
  "synonym", "long tail keyword phrase", "user intent phrase"
];
```

**Example**:
```typescript
const sciFiKeywords = [
  "science fiction", "sci fi books", "space books", "dystopian",
  "best sci-fi audiobooks", "futuristic novels", "sci-fi recommendations"
];
```

**Step 3.2: Add Matching Logic**

Add logic to check if the search query matches your keywords:

```typescript
const isYourPageRelated = yourPageKeywords.some(keyword => 
  query.toLowerCase().includes(keyword.toLowerCase())
);
```

Update the `hasResults` variable:
```typescript
const hasResults = isKidsRelated || isBooktokRelated || isComparisonRelated || isYourPageRelated;
```

**Step 3.3: Create Sponsored Ad Section**

Add a sponsored ad block that links to your new landing page:

```typescript
{/* Sponsored Ad - Your Page Name */}
{isYourPageRelated && (
  <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
    </div>
    <Link to="/your-route" className="block hover:underline">
      <h3 className="text-xl text-blue-700 font-medium mb-1">
        Compelling Ad Title - Include Keywords & Call to Action
      </h3>
      <p className="text-sm text-green-700 mb-2">www.nextory.com/your-route</p>
      <p className="text-sm text-gray-700">
        Brief description that highlights value proposition. Include relevant keywords. 
        Create urgency or interest to encourage clicks.
      </p>
    </Link>
  </div>
)}
```

**Complete Example**:
```typescript
// In SearchResults.tsx

// 1. Add keywords (around line 34)
const sciFiKeywords = [
  "science fiction", "sci fi books", "space books", "dystopian",
  "best sci-fi audiobooks", "futuristic novels", "sci-fi recommendations"
];

// 2. Add matching logic (around line 50)
const isSciFiRelated = sciFiKeywords.some(keyword => 
  query.toLowerCase().includes(keyword.toLowerCase())
);

// 3. Update hasResults (around line 51)
const hasResults = isKidsRelated || isBooktokRelated || isComparisonRelated || isSciFiRelated;

// 4. Add sponsored ad (around line 160, before mock results)
{isSciFiRelated && (
  <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
    </div>
    <Link to="/sci-fi" className="block hover:underline">
      <h3 className="text-xl text-blue-700 font-medium mb-1">
        Best Science Fiction Audiobooks 2025 - Stream on Nextory
      </h3>
      <p className="text-sm text-green-700 mb-2">www.nextory.com/sci-fi</p>
      <p className="text-sm text-gray-700">
        Discover epic space operas, dystopian worlds, and mind-bending sci-fi. 
        Listen to classics and new releases. Start your free 30-day trial.
      </p>
    </Link>
  </div>
)}
```

---

### 4. Create Content Components (Optional but Recommended)

**Location**: `/src/components/YourComponentName.tsx`

**Pattern**: Break your landing page into reusable sections

**Example Component Structure**:
```typescript
const YourHeroSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        {/* Your hero content */}
      </div>
    </section>
  );
};

export default YourHeroSection;
```

**Common Section Types**:
- Hero sections (large banner with CTA)
- Feature grids (highlight key features)
- Book/content grids (display items)
- Comparison tables (show competitive advantages)

---

### 5. Styling Guidelines

**Required Classes**:
- **Container**: `container mx-auto` for centered, responsive width
- **Padding**: `px-4` for horizontal, `py-12` for vertical spacing
- **Background**: Use `bg-background` (theme-aware)
- **Text Colors**: Use `text-foreground`, `text-primary`, `text-muted-foreground`
- **Borders**: Use `border-border/50` for subtle borders

**Responsive Design**:
```typescript
// Example: Responsive grid
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
```

**Hover Effects**:
```typescript
className="hover:scale-105 transition-transform duration-300"
className="hover:text-primary transition-colors"
```

---

### 6. Available UI Components

**Location**: `/src/components/ui/`

**Most Used Components**:
- `Button` - CTAs and actions
- `Card` - Content containers
- `Badge` - Labels and tags
- `Separator` - Visual dividers
- `Accordion` - Collapsible content
- `Tabs` - Tabbed navigation
- `Dialog` - Modals
- `Carousel` - Image/content sliders

**Import Pattern**:
```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

---

### 7. Navigation Integration

**Update Header Links** (if needed):

**Location**: `/src/components/Header.tsx`

Add your route to the navigation:
```typescript
<Link 
  to="/your-route" 
  className="text-foreground hover:text-primary transition-colors"
>
  Your Link Text
</Link>
```

---

### 8. Assets and Images

**Location**: `/public/`

**Adding Images**:
1. Place images in `/public/` directory (or create subdirectories)
2. Reference with absolute path: `/image-name.jpg`

**Example**:
```typescript
<img 
  src="/your-image.jpg" 
  alt="Descriptive text" 
  className="w-full h-full object-cover"
/>
```

**Book Covers**: Store in `/public/book-covers/`

---

### 9. Data Management

**Static Data** (Current Pattern):
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Book Title",
    author: "Author Name",
    cover: "/book-covers/book.jpg"
  }
];
```

---

## Quick Start: Minimal Example

**Step 1: Create the Page** (`/src/pages/MinimalExample.tsx`)

```typescript
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MinimalExample = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">Your Landing Page Title</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Compelling subtitle or value proposition
            </p>
            <Button size="lg">Get Started</Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
                <p className="text-muted-foreground">Description</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
                <p className="text-muted-foreground">Description</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
                <p className="text-muted-foreground">Description</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MinimalExample;
```

**Step 2: Register Route** (in `/src/App.tsx`)

```typescript
import MinimalExample from "./pages/MinimalExample";

// In Routes:
<Route path="/minimal" element={<MinimalExample />} />
```

**Step 3: Add Search Integration** (in `/src/pages/SearchResults.tsx`)

```typescript
// Add keywords
const minimalKeywords = ["your", "keywords", "here"];

// Add matching logic
const isMinimalRelated = minimalKeywords.some(keyword => 
  query.toLowerCase().includes(keyword.toLowerCase())
);

// Update hasResults
const hasResults = isKidsRelated || isBooktokRelated || isComparisonRelated || isMinimalRelated;

// Add sponsored ad section (before mock results)
{isMinimalRelated && (
  <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
    </div>
    <Link to="/minimal" className="block hover:underline">
      <h3 className="text-xl text-blue-700 font-medium mb-1">
        Your Compelling Ad Title Here
      </h3>
      <p className="text-sm text-green-700 mb-2">www.nextory.com/minimal</p>
      <p className="text-sm text-gray-700">
        Brief but engaging description that makes users want to click through.
      </p>
    </Link>
  </div>
)}
```

**Done!** Test by searching for your keywords on the Fooble homepage.

---

## Common Patterns

### Hero with Background Image
```typescript
<section className="relative h-[600px] flex items-center justify-center">
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-50" 
    style={{ backgroundImage: "url('/your-bg.jpg')" }}
  />
  <div className="relative z-10 text-center">
    <h1>Your Title</h1>
  </div>
</section>
```

### Call-to-Action Button
```typescript
<Button 
  size="lg" 
  className="bg-primary hover:bg-primary/90"
>
  Start Free Trial
</Button>
```

### Responsive Image Grid
```typescript
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => (
    <Card key={item.id} className="overflow-hidden hover:scale-105 transition-transform">
      <img src={item.image} alt={item.title} className="w-full aspect-[3/4] object-cover" />
    </Card>
  ))}
</div>
```

---

## File Checklist

- [ ] `/src/pages/YourPageName.tsx` - Main page component created
- [ ] `/src/App.tsx` - Route registered
- [ ] `/src/pages/SearchResults.tsx` - Keywords, matching logic, and sponsored ad added
- [ ] `/src/components/YourComponents.tsx` - Section components (optional)
- [ ] `/public/your-assets/` - Images and assets added
- [ ] Header navigation updated (if needed)

---

## Resources

- **Shadcn-ui Docs**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Router**: https://reactrouter.com/
- **Lucide Icons**: https://lucide.dev/ (used in project)

---

## Support

For questions or issues:
1. Check existing pages (`/src/pages/`) for reference
2. Review existing components (`/src/components/`)
3. Review `SearchResults.tsx` for keyword/ad patterns
4. Consult shadcn-ui documentation for component usage

---

## 💡 Pro Tips for Search Engine Landing Pages

1. **Choose Specific Keywords**: Think about real user search queries (e.g., "best romance audiobooks 2025" vs "books")
2. **Craft Compelling Ads**: Your sponsored ad is the first impression - make it count!
3. **Match Intent**: Ensure your landing page delivers on what the ad promises
4. **Test Multiple Keywords**: Add variations to catch different search patterns
5. **Use Action Words**: "Discover", "Listen", "Stream", "Start Free Trial"

Happy hacking! 🚀

