import { Button } from "@/components/ui/button";
const ComparisonHero = () => {
  return <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Why Nextory outshines Storytel in 2025
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover the innovative features that make Nextory the smarter choice for audiobook and e-book lovers. 
              From AI-powered recommendations to synchronized reading, Nextory delivers an unmatched experience that 
              Storytel simply can't compete with.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">Try for free now</Button>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>14 days free • Cancel anytime</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src="/nextory-vs-storytel.png" alt="Better than Nextory vs Storytel" className="w-full max-w-lg rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>;
};
export default ComparisonHero;