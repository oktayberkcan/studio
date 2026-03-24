
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/barber1/1920/1080"}
          alt="Royal Cuts Barber Shop"
          fill
          className="object-cover"
          priority
          data-ai-hint="barber shop"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-primary font-headline font-bold tracking-[0.2em] uppercase">
              Modern Gentlemen's Sanctuary
            </h2>
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-foreground leading-[1.1]">
              Sharper Look. <br />
              <span className="text-primary italic">Better Feel.</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed">
            Experience the ultimate fusion of traditional mastery and contemporary style. Your journey to perfection starts here.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/book">Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/10">
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
        <p className="font-headline text-9xl font-bold select-none text-primary">01</p>
      </div>
    </div>
  );
}
