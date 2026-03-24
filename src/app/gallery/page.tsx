
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-20 space-y-6">
        <h2 className="text-primary font-headline font-bold uppercase tracking-[0.3em] animate-in fade-in duration-500">Sanat Galerimiz</h2>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">Royal Dokunuşlar</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Sadece saç kesmiyoruz; karakterinizi ve tarzınızı yansıtan detaylar inşa ediyoruz. İşte koltuğumuzdan çıkan bazı kareler.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {galleryImages.map((img, index) => (
          <div 
            key={img.id} 
            className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-2xl hover:shadow-primary/10 transition-all duration-500"
          >
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={img.imageHint}
            />
            
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 shadow-lg">
                  Professional Care
                </span>
                <h3 className="text-2xl font-headline font-bold text-white mb-3">
                  {img.description}
                </h3>
                <div className="w-16 h-1 bg-primary rounded-full" />
              </div>
            </div>

            {/* Subtle Border Glow */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-primary/30 transition-colors duration-500 rounded-[2rem] pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="mt-24 pt-16 border-t border-border/50 text-center">
        <div className="inline-flex items-center gap-6 text-muted-foreground/40 font-headline uppercase tracking-[0.5em] text-xs">
          <div className="h-px w-20 bg-primary/20" />
          Mükemmel Detaylar, Benzersiz Sonuçlar
          <div className="h-px w-20 bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
