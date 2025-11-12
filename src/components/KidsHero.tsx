import { Button } from "@/components/ui/button";
const KidsHero = () => {
  return <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The perfect reading app for kids !  
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Nextory makes reading fun and safe for children! With personalized kids profiles, 
              thousands of age-appropriate books and audiobooks, and a magical interface designed 
              just for young readers, your child will discover the joy of reading.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">Try for free now</Button>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>Safe for kids • Parental controls included</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src="/kids-hero.avif" alt="Kids enjoying Nextory reading and audiobooks" className="w-full max-w-lg rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>;
};
export default KidsHero;