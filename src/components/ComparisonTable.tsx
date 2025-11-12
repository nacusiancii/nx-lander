import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const comparisonData = [
  {
    feature: "AI-Powered Librarian",
    nextory: true,
    storytel: false,
    description: "Personalized recommendations based on your reading habits and preferences",
  },
  {
    feature: "Synchronized Reading & Listening",
    nextory: true,
    storytel: false,
    description: "Seamlessly switch between audiobook and e-book with perfect sync",
  },
  {
    feature: "Family Profiles with Parental Controls",
    nextory: true,
    storytel: false,
    description: "Dedicated kids' profiles with age-appropriate content and safety features",
  },
  {
    feature: "Reading Habit Analytics",
    nextory: true,
    storytel: false,
    description: "Track your progress, set goals, and gain insights into your reading patterns",
  },
  {
    feature: "Multi-Format Access",
    nextory: true,
    storytel: "Limited",
    description: "Full access to both audiobooks and e-books in one subscription",
  },
  {
    feature: "Catalog Size",
    nextory: "600,000+ titles",
    storytel: "500,000+ titles",
    description: "Larger selection with more exclusive releases and bestsellers",
  },
  {
    feature: "Offline Downloads",
    nextory: true,
    storytel: true,
    description: "Both services offer offline access, but Nextory has faster downloads",
  },
  {
    feature: "Price per Month",
    nextory: "139 kr",
    storytel: "159 kr",
    description: "Better value with more features at a lower price",
  },
  {
    feature: "Free Trial",
    nextory: "14 days (30 hours)",
    storytel: "14 days",
    description: "More generous trial period with specific listening hours included",
  },
];

const ComparisonTable = () => {
  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-6 w-6 text-primary mx-auto" />
      ) : (
        <X className="h-6 w-6 text-muted-foreground mx-auto opacity-50" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Side-by-side comparison
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          See how Nextory stacks up against Storytel feature by feature
        </p>

        <Card className="overflow-hidden border-border bg-card">
          <CardHeader className="bg-card/50">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-muted-foreground font-semibold">Feature</div>
              <div className="text-center">
                <CardTitle className="text-primary text-xl">Nextory</CardTitle>
              </div>
              <div className="text-center">
                <CardTitle className="text-muted-foreground text-xl">Storytel</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {comparisonData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-4 items-center p-4 ${
                  index % 2 === 0 ? "bg-card/30" : "bg-card/10"
                } hover:bg-card/50 transition-colors`}
              >
                <div>
                  <div className="font-medium mb-1">{item.feature}</div>
                  <div className="text-xs text-muted-foreground hidden md:block">
                    {item.description}
                  </div>
                </div>
                <div className="text-center flex justify-center items-center">
                  {renderValue(item.nextory)}
                </div>
                <div className="text-center flex justify-center items-center opacity-60">
                  {renderValue(item.storytel)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to experience the better audiobook service?
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start your free trial
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
