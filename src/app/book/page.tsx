"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, Scissors, User, Mail, Phone } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  serviceType: z.string().min(1, { message: "Please select a service." }),
  date: z.string().min(1, { message: "Please select a date." }),
  time: z.string().min(1, { message: "Please select a time." }),
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
    
    // 1. Store in Firestore (initiating mutation without blocking for responsiveness)
    addDoc(collection(db, "appointments"), {
      ...values,
      createdAt: serverTimestamp(),
    }).catch((error) => {
      console.error("Firestore error:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was a problem saving your appointment to our database.",
      });
    });

    // 2. Post to Webhook (as requested)
    const webhookUrl = ""; 
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).catch(error => console.error("Webhook error:", error));
    }

    // Immediately update UI to show success for better UX
    setIsSuccess(true);
    setIsSubmitting(false);
    toast({
      title: "Appointment Booked!",
      description: `Thank you ${values.fullName}, we've received your request.`,
    });
    form.reset();
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Card className="max-w-md w-full border-primary/20 bg-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Scissors className="text-primary h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">Booking Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              Your appointment has been successfully scheduled. We'll send a confirmation email to you shortly.
            </p>
            <Button asChild className="w-full bg-primary text-primary-foreground font-bold">
              <a href="/">Return Home</a>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setIsSuccess(false)}>
              Book Another
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-primary font-headline font-bold uppercase tracking-widest">Reserve Your Seat</h2>
        <h1 className="text-5xl font-headline font-bold text-foreground">Book Appointment</h1>
      </div>

      <Card className="border-border bg-card/50 shadow-2xl">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" /> Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-background" />
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
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" /> Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+44 7000 000000" {...field} className="bg-background" />
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
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" /> Email Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="bg-background" />
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
                    <FormLabel className="flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-primary" /> Service Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="haircut">Haircut (Saç Kesimi)</SelectItem>
                        <SelectItem value="beard">Beard Trim (Sakal Düzeltme)</SelectItem>
                        <SelectItem value="combo">Hair + Beard Combo</SelectItem>
                        <SelectItem value="skin">Skin Care (Cilt Bakımı)</SelectItem>
                        <SelectItem value="manicure">Manicure (Manikür)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-primary" /> Preferred Date
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="bg-background" />
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
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" /> Preferred Time
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold h-12 text-lg shadow-[0_0_20px_rgba(38,217,205,0.3)] hover:shadow-[0_0_30px_rgba(38,217,205,0.5)] transition-all" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Confirm Appointment"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        By booking, you agree to our terms and cancellation policy. We appreciate your punctuality.
      </p>
    </div>
  );
}
