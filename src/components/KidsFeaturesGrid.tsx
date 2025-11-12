import { Sparkles, Shield, Heart, BookOpen, Users, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const KidsFeaturesGrid = () => {
  const features = [
    {
      icon: Users,
      title: "Personalized Kids Profiles",
      description: "Each child gets their own profile with fun avatars, age-appropriate content, and personalized recommendations just for them.",
    },
    {
      icon: Sparkles,
      title: "Magical Interface",
      description: "A colorful, intuitive interface designed specifically for children makes browsing and discovering new books a delightful adventure.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Complete parental controls ensure your children only access age-appropriate content. Monitor their reading progress and set time limits.",
    },
    {
      icon: BookOpen,
      title: "Thousands of Kids Books",
      description: "From picture books to young adult novels, bedtime stories to educational content - we have something for every young reader.",
    },
    {
      icon: Heart,
      title: "Read & Listen Mode",
      description: "Kids can follow along with the text while listening to professionally narrated audiobooks, improving reading skills and comprehension.",
    },
    {
      icon: Trophy,
      title: "Reading Achievements",
      description: "Motivate young readers with fun badges, reading streaks, and achievements that celebrate their reading journey.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why kids love Nextory
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything your child needs to develop a lifelong love of reading, all in one safe and fun app.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KidsFeaturesGrid;
