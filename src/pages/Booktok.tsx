import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookGrid from "@/components/BookGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <BookGrid />
      </main>
    </div>
  );
};

export default Index;
