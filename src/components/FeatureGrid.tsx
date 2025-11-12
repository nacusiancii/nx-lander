import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    id: 1,
    title: "AI Librarian",
    description: "Get personalized book recommendations powered by advanced AI that truly understands your reading preferences and mood.",
    badge: "Nextory Exclusive",
    icon: "🤖",
  },
  {
    id: 2,
    title: "Synchronized Reading & Listening",
    description: "Seamlessly switch between reading and listening with perfect synchronization across all your devices. Pick up exactly where you left off.",
    badge: "Better than Storytel",
    icon: "🔄",
  },
  {
    id: 3,
    title: "Family-Friendly Profiles",
    description: "Create dedicated kids' profiles with age-appropriate content, parental controls, and a safe reading environment for the whole family.",
    badge: "Nextory Exclusive",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: 4,
    title: "Reading Habit Tracking",
    description: "Monitor your reading progress, set goals, and gain insights into your reading habits with detailed analytics and statistics.",
    badge: "Nextory Exclusive",
    icon: "📊",
  },
  {
    id: 5,
    title: "Multi-Format Books",
    description: "Access books in multiple formats - audiobook, e-book, or both - all included in one subscription without extra costs.",
    badge: "Better Value",
    icon: "📚",
  },
  {
    id: 6,
    title: "Offline Reading Made Easy",
    description: "Download unlimited books for offline access with superior audio quality and faster download speeds than competitors.",
    badge: "Enhanced Feature",
    icon: "📱",
  },
];

const FeatureGrid = () => {
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Features that set Nextory apart
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Experience the future of audiobooks and e-books with innovative features designed for modern readers
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="group hover:shadow-lg transition-all duration-300 bg-card border-border hover:border-primary/50"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
