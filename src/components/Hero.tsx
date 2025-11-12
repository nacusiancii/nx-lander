import { Button } from "@/components/ui/button";
const Hero = () => {
  return <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              BookTok's most popular books of 2025{" "}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover the hottest audiobooks that have taken BookTok by storm! All of these fantastic stories are
              available on Nextory. Try free for 14 days with 30 hours of listening and reading. Continue after for 139
              kr/month.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">Try for free now</Button>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex gap-2"></div>
                <span>14 days free • Cancel anytime







 </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src="/booktok-hero-books.png" alt="Most Popular BookTok Books" className="w-full max-w-lg rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;