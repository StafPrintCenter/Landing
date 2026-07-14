import { Link } from "@tanstack/react-router";
import { User, Mail, Phone, FileText, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { BookingData, UpdateBooking } from "./types";

interface StepInfosProps {
  data: BookingData;
  update: UpdateBooking;
}

export function StepInfos({ data, update }: StepInfosProps) {
  return (
    <div>
      <h2 className="text-xl font-bold">Vos informations</h2>
      <p className="mt-1 text-sm text-muted-foreground">Remplissez vos coordonnées pour la confirmation.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="lastName" className="flex items-center gap-1.5"><User size={14} /> Nom *</Label>
          <Input id="lastName" value={data.lastName} onChange={(e) => update("lastName", e.target.value)} maxLength={80} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="firstName" className="flex items-center gap-1.5"><User size={14} /> Prénom *</Label>
          <Input id="firstName" value={data.firstName} onChange={(e) => update("firstName", e.target.value)} maxLength={80} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email" className="flex items-center gap-1.5"><Mail size={14} /> Email *</Label>
          <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} maxLength={200} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="whatsapp" className="flex items-center gap-1.5"><Phone size={14} /> WhatsApp (optionnel)</Label>
          <Input id="whatsapp" placeholder="+229 …" value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} maxLength={30} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="subject" className="flex items-center gap-1.5"><FileText size={14} /> Sujet *</Label>
          <Input id="subject" placeholder="Ex : Devis site vitrine, logo, formation Photoshop…" value={data.subject} onChange={(e) => update("subject", e.target.value)} maxLength={140} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message" className="flex items-center gap-1.5"><MessageSquare size={14} /> Message (optionnel)</Label>
          <Textarea id="message" rows={4} maxLength={1000} value={data.message} onChange={(e) => update("message", e.target.value)} placeholder="Décrivez votre projet ou vos questions…" className="mt-1.5" />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3 cursor-pointer">
        <Checkbox
          checked={data.cgu}
          onCheckedChange={(v) => update("cgu", Boolean(v))}
          className="mt-0.5"
        />
        <span className="text-sm text-foreground/80">
          J'accepte d'être contacté(e) pour la confirmation de mon rendez-vous et j'ai lu les{" "}
          <Link to="/legal/mentions" className="underline text-primary">mentions légales</Link>. *
        </span>
      </label>
    </div>
  );
}