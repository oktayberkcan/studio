
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-primary font-headline font-bold uppercase tracking-widest">Visual Portfolio</h2>
        <h1 className="text-5xl font-headline font-bold text-foreground">The Experience</h1>
        <p className="text-muted-foreground text-lg">
          A glimpse into the craftsmanship and atmosphere at Royal Cuts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {galleryImages.map((img) => (
          <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl group border border-border">
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={img.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary font-headline font-bold tracking-wider mb-2 uppercase text-xs">Royal Mastery</p>
                <h3 className="text-xl font-bold text-white">{img.description}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
        {/* Decorative row */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-[4/5] bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
