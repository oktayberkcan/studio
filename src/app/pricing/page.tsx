
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricingList = [
  { service: "Haircut (Saç Kesimi)", duration: "30 min", price: "£25.00" },
  { service: "Skin Fade", duration: "45 min", price: "£30.00" },
  { service: "Beard Trim (Sakal Düzeltme)", duration: "20 min", price: "£15.00" },
  { service: "Beard Sculpt & Steam", duration: "35 min", price: "£22.00" },
  { service: "Hair + Beard Combo", duration: "45 min", price: "£35.00" },
  { service: "Executive Combo (Full Service)", duration: "75 min", price: "£55.00" },
  { service: "Skin Care (Cilt Bakımı)", duration: "60 min", price: "£45.00" },
  { service: "Manicure (Manikür)", duration: "30 min", price: "£20.00" },
  { service: "Traditional Hot Towel Shave", duration: "40 min", price: "£25.00" },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-primary font-headline font-bold uppercase tracking-widest">Pricing</h2>
        <h1 className="text-5xl font-headline font-bold text-foreground">Service Rates</h1>
        <p className="text-muted-foreground text-lg">
          Transparent pricing for world-class grooming.
        </p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border">
              <TableHead className="py-6 text-foreground font-bold">Service</TableHead>
              <TableHead className="py-6 text-foreground font-bold text-center">Duration</TableHead>
              <TableHead className="py-6 text-foreground font-bold text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingList.map((item) => (
              <TableRow key={item.service} className="border-border hover:bg-muted/30 transition-colors group">
                <TableCell className="py-5 font-medium group-hover:text-primary transition-colors">{item.service}</TableCell>
                <TableCell className="py-5 text-center text-muted-foreground">{item.duration}</TableCell>
                <TableCell className="py-5 text-right font-bold text-primary">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-12 text-center p-8 bg-primary/5 rounded-xl border border-primary/20">
        <h3 className="text-xl font-headline font-bold mb-4">Ready for your transformation?</h3>
        <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold px-12">
          <Link href="/book">Book Now</Link>
        </Button>
      </div>
    </div>
  );
}
