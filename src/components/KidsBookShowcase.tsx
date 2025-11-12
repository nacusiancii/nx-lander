import { Card, CardContent } from "@/components/ui/card";

interface Book {
  id: number;
  title: string;
  author: string;
  ageRange: string;
  cover: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter Series",
    author: "J.K. Rowling",
    ageRange: "8-12 years",
    cover: "/book-covers/fourth-wing.jpg", // Placeholder
  },
  {
    id: 2,
    title: "The Magic Tree House",
    author: "Mary Pope Osborne",
    ageRange: "6-9 years",
    cover: "/book-covers/divine-rivals.jpg", // Placeholder
  },
  {
    id: 3,
    title: "Percy Jackson Series",
    author: "Rick Riordan",
    ageRange: "9-12 years",
    cover: "/book-covers/powerless.jpg", // Placeholder
  },
  {
    id: 4,
    title: "Diary of a Wimpy Kid",
    author: "Jeff Kinney",
    ageRange: "8-12 years",
    cover: "/book-covers/icebreaker.jpg", // Placeholder
  },
  {
    id: 5,
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    ageRange: "8-12 years",
    cover: "/book-covers/acotar.jpg", // Placeholder
  },
  {
    id: 6,
    title: "Wonder",
    author: "R.J. Palacio",
    ageRange: "8-12 years",
    cover: "/book-covers/book-lovers.jpg", // Placeholder
  },
];

const KidsBookShowcase = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular books kids are reading on Nextory
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From magical adventures to heartwarming stories, discover thousands of books that spark imagination and inspire young minds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="group cursor-pointer hover:shadow-xl transition-all border-border/50">
              <CardContent className="p-4">
                <div className="aspect-[2/3] mb-3 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">{book.author}</p>
                <p className="text-xs text-primary font-medium">{book.ageRange}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            And thousands more age-appropriate books and audiobooks for children of all ages!
          </p>
        </div>
      </div>
    </section>
  );
};

export default KidsBookShowcase;
