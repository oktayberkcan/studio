
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Zap, Users, Sparkles, Hand } from "lucide-react";

const services = [
  {
    name: "Haircut (Saç Kesimi)",
    duration: "30 min",
    price: "£25",
    description: "Precision cutting tailored to your head shape and style preferences. Includes consultation and styling.",
    icon: <Scissors className="h-8 w-8 text-primary" />,
  },
  {
    name: "Beard Trim (Sakal Düzeltme)",
    duration: "20 min",
    price: "£15",
    description: "Sharp outlines and length control to maintain the perfect facial profile.",
    icon: <Zap className="h-8 w-8 text-primary" />,
  },
  {
    name: "Hair + Beard Combo",
    duration: "45 min",
    price: "£35",
    description: "Our signature service for the complete transformation. Full haircut and beard grooming.",
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    name: "Skin Care (Cilt Bakımı)",
    duration: "60 min",
    price: "£45",
    description: "Deep cleansing facial with steam treatment and premium masks designed for men's skin.",
    icon: <Sparkles className="h-8 w-8 text-primary" />,
  },
  {
    name: "Manicure (Manikür)",
    duration: "30 min",
    price: "£20",
    description: "Professional hand and nail care. Shaping, buffing, and cuticle management.",
    icon: <Hand className="h-8 w-8 text-primary" />,
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
        <h2 className="text-primary font-headline font-bold uppercase tracking-widest">Our Expertise</h2>
        <h1 className="text-5xl font-headline font-bold text-foreground">Premium Services</h1>
        <p className="text-muted-foreground text-lg">
          Meticulously crafted treatments designed to elevate your personal style and confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.name} className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <CardHeader>
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.name}</CardTitle>
                <span className="text-primary font-bold text-lg">{service.price}</span>
              </div>
              <CardDescription className="text-primary/70 font-medium">
                Duration: {service.duration}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
