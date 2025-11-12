export function generatePageCode(pageName: string, content: any): string {
  return `import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

const ${pageName} = () => {
  const books: Book[] = ${JSON.stringify(content.books, null, 4)};

  const features = ${JSON.stringify(content.features, null, 4)};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              ${content.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              ${content.subtitle}
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              Start Free 30-Day Trial
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Why Choose Nextory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature: any, idx: number) => (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Books Grid Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Popular Titles Available Now
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {books.map((book) => (
                <Card
                  key={book.id}
                  className="bg-card border-border/50 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group"
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={book.cover}
                      alt={\`\${book.title} by \${book.author}\`}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {book.author}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Listening?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of readers enjoying unlimited audiobooks and e-books
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Try Free for 30 Days
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ${pageName};
`;
}

export function generateSearchResultsUpdate(
  variableName: string,
  keywords: string[],
  adContent: any,
  routePath: string
): string {
  return `
// Add these to SearchResults.tsx

// Keywords array (add after existing keyword arrays)
const ${variableName} = ${JSON.stringify(keywords, null, 2)};

// Matching logic (add after existing matching logic)
const is${variableName.replace('Keywords', 'Related')} = ${variableName}.some(keyword => 
  query.toLowerCase().includes(keyword.toLowerCase())
);

// Update hasResults line
const hasResults = isKidsRelated || isBooktokRelated || isComparisonRelated || is${variableName.replace('Keywords', 'Related')};

// Sponsored ad section (add with other sponsored ads)
{is${variableName.replace('Keywords', 'Related')} && (
  <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
    </div>
    <Link to="${routePath}" className="block hover:underline">
      <h3 className="text-xl text-blue-700 font-medium mb-1">
        ${adContent.title}
      </h3>
      <p className="text-sm text-green-700 mb-2">www.nextory.com${routePath}</p>
      <p className="text-sm text-gray-700">
        ${adContent.description}
      </p>
    </Link>
  </div>
)}
`;
}

export function generateRouteUpdate(pageName: string, routePath: string): string {
  return `
// Add to App.tsx imports
import ${pageName} from "./pages/${pageName}";

// Add to Routes (before the catch-all "*" route)
<Route path="${routePath}" element={<${pageName} />} />
`;
}

