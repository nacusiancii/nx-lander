import Header from "@/components/Header";
import ComparisonHero from "@/components/ComparisonHero";
import FeatureGrid from "@/components/FeatureGrid";
import ComparisonTable from "@/components/ComparisonTable";

const Comparison = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ComparisonHero />
        <FeatureGrid />
        <ComparisonTable />
      </main>
    </div>
  );
};

export default Comparison;
