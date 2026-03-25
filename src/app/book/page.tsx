
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, Scissors, User, Mail, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Lütfen geçerli bir e-posta adresi girin." }),
  phone: z.string().min(10, { message: "Lütfen geçerli bir telefon numarası girin." }),
  serviceType: z.string().min(1, { message: "Lütfen bir hizmet seçin." }),
  date: z.string().min(1, { message: "Lütfen bir tarih seçin." }),
  time: z.string().min(1, { message: "Lütfen bir saat seçin." }),
});

export default function BookPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceType: "",
      date: "",
      time: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Firestore'a kaydet (Non-blocking)
    addDoc(collection(db, "appointments"), {
      ...values,
      status: "pending",
      createdAt: serverTimestamp(),
    }).catch((error) => {
      console.error("Firestore error:", error);
      toast({
        variant: "destructive",
        title: "Kayıt Hatası",
        description: "Randevunuz kaydedilirken bir sorun oluştu.",
      });
    });

    // Opsiyonel Webhook
    fetch("https://nonoral-willetta-provincially.ngrok-free.app/webhook-test/randevu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => {});

    // Başarı simülasyonu
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      toast({
        title: "Randevu Onaylandı!",
        description: `Sayın ${values.fullName}, talebiniz başarıyla alındı.`,
      });
    }, 800);
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center">
        <Card className="max-w-lg w-full border-primary/20 bg-card shadow-2xl animate-in zoom-in-95 duration-500">
          <CardHeader className="text-center pt-10">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-primary h-12 w-12" />
            </div>
            <CardTitle className="text-4xl font-headline font-bold">Harika!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-8 pb-10">
            <p className="text-muted-foreground text-lg leading-relaxed px-4">
              Randevu talebiniz başarıyla oluşturuldu. Uzman ekibimiz kısa süre içinde sizinle iletişime geçerek teyit sağlayacaktır.
            </p>
            <div className="space-y-4 px-6">
              <Button asChild className="w-full bg-primary text-primary-foreground font-bold h-14 text-lg">
                <Link href="/">Ana Sayfaya Dön</Link>
              </Button>
              <Button variant="outline" className="w-full h-14" onClick={() => {
                setIsSuccess(false);
                form.reset();
              }}>
                Yeni Randevu Al
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-primary font-headline font-bold uppercase tracking-widest">Koltuğunuzu Ayırın</h2>
        <h1 className="text-5xl md:text-6xl font-headline font-bold text-foreground">Online Randevu</h1>
        <p className="text-muted-foreground text-lg">Hızlı ve kolay bir şekilde yerinizi ayırtın.</p>
      </div>

      <Card className="border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm">
        <CardContent className="pt-10 px-8 pb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground font-bold">
                        <User className="h-4 w-4 text-primary" /> Ad Soyad
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ahmet Yılmaz" {...field} className="h-12 bg-background border-border/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground font-bold">
                        <Phone className="h-4 w-4 text-primary" /> Telefon
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="05XX XXX XX XX" {...field} className="h-12 bg-background border-border/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground font-bold">
                      <Mail className="h-4 w-4 text-primary" /> E-posta
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ahmet@example.com" {...field} className="h-12 bg-background border-border/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground font-bold">
                      <Scissors className="h-4 w-4 text-primary" /> Hizmet Seçimi
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-background border-border/50">
                          <SelectValue placeholder="Almak istediğiniz hizmeti seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="haircut">Saç Kesimi (₺450)</SelectItem>
                        <SelectItem value="beard">Sakal Tasarımı (₺300)</SelectItem>
                        <SelectItem value="combo">Saç + Sakal Combo (₺650)</SelectItem>
                        <SelectItem value="skin">Cilt Bakımı (₺500)</SelectItem>
                        <SelectItem value="shave">Geleneksel Tıraş (₺350)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground font-bold">
                        <CalendarIcon className="h-4 w-4 text-primary" /> Tarih
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-12 bg-background border-border/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground font-bold">
                        <Clock className="h-4 w-4 text-primary" /> Saat
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} className="h-12 bg-background border-border/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground font-bold h-16 text-xl shadow-xl hover:shadow-primary/20 transition-all" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "İşleniyor..." : "Randevuyu Onayla"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
