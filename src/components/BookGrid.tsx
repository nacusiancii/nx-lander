import { Card } from "@/components/ui/card";
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}
const books: Book[] = [{
  id: 1,
  title: "Fourth Wing",
  author: "Rebecca Yarros",
  cover: "/book-covers/fourth-wing.jpg"
}, {
  id: 2,
  title: "Iron Flame",
  author: "Rebecca Yarros",
  cover: "/book-covers/iron-flame.jpg"
}, {
  id: 3,
  title: "A Court of Thorns and Roses",
  author: "Sarah J. Maas",
  cover: "/book-covers/acotar.jpg"
}, {
  id: 4,
  title: "The Love Hypothesis",
  author: "Ali Hazelwood",
  cover: "/book-covers/love-hypothesis.jpg"
}, {
  id: 5,
  title: "It Ends with Us",
  author: "Colleen Hoover",
  cover: "/book-covers/it-ends-with-us.jpg"
}, {
  id: 6,
  title: "Book Lovers",
  author: "Emily Henry",
  cover: "/book-covers/book-lovers.jpg"
}, {
  id: 7,
  title: "The Seven Husbands of Evelyn Hugo",
  author: "Taylor Jenkins Reid",
  cover: "/book-covers/evelyn-hugo.jpg"
}, {
  id: 8,
  title: "Powerless",
  author: "Lauren Roberts",
  cover: "/book-covers/powerless.jpg"
}, {
  id: 9,
  title: "Divine Rivals",
  author: "Rebecca Ross",
  cover: "/book-covers/divine-rivals.jpg"
}, {
  id: 10,
  title: "Icebreaker",
  author: "Hannah Grace",
  cover: "/book-covers/icebreaker.jpg"
}, {
  id: 11,
  title: "Happy Place",
  author: "Emily Henry",
  cover: "/book-covers/happy-place.jpg"
}, {
  id: 12,
  title: "The Atlas Six",
  author: "Olivie Blake",
  cover: "/book-covers/atlas-six.jpg"
}];
const BookGrid = () => {
  return <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Listen to all of these books in Nextory
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {books.map(book => <Card key={book.id} className="bg-card border-border/50 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <div className="aspect-[2/3] relative overflow-hidden">
                <img src={book.cover} alt={`${book.title} av ${book.author}`} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default BookGrid;