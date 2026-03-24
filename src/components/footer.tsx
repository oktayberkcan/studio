
import { Scissors } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-bold text-foreground">
                ROYAL CUTS
              </span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              The ultimate destination for the modern gentleman's grooming needs.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <h4 className="font-headline font-bold mb-2">OPENING HOURS</h4>
            <p className="text-sm text-muted-foreground">Mon - Fri: 9:00 AM - 8:00 PM</p>
            <p className="text-sm text-muted-foreground">Sat: 10:00 AM - 6:00 PM</p>
            <p className="text-sm text-muted-foreground">Sun: Closed</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <h4 className="font-headline font-bold mb-2">LOCATION</h4>
            <p className="text-sm text-muted-foreground">123 Grooming Lane</p>
            <p className="text-sm text-muted-foreground">London, UK EC1V 9EE</p>
            <p className="text-sm text-muted-foreground">+44 (0) 20 7946 0000</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Royal Cuts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
