import Header from "@/components/Header";
import KidsHero from "@/components/KidsHero";
import KidsFeaturesGrid from "@/components/KidsFeaturesGrid";
import KidsBookShowcase from "@/components/KidsBookShowcase";

const Kids = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <KidsHero />
        <KidsFeaturesGrid />
        <KidsBookShowcase />
      </main>
    </div>
  );
};

export default Kids;
