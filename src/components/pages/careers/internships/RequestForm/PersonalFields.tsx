import { BookOpen, Mail, Phone, School, User } from "lucide-react";

interface PersonalFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  fieldOfStudy: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setInstitution: (value: string) => void;
  setFieldOfStudy: (value: string) => void;
}

export function PersonalFields(props: PersonalFieldsProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    institution,
    fieldOfStudy,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setInstitution,
    setFieldOfStudy,
  } = props;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <User size={14} className="text-primary" /> Prénom <span className="text-destructive">*</span>
          </span>
          <input
            type="text"
            required
            placeholder="Ex: Tony"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <User size={14} className="text-primary" /> Nom <span className="text-destructive">*</span>
          </span>
          <input
            type="text"
            required
            placeholder="Ex: Dossou"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Mail size={14} className="text-primary" /> Email <span className="text-destructive">*</span>
          </span>
          <input
            type="email"
            required
            placeholder="jean.dupont@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Phone size={14} className="text-primary" /> Téléphone <span className="text-destructive">*</span>
          </span>
          <input
            type="tel"
            required
            placeholder="+229 01 02 03 04"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <School size={14} className="text-primary" /> Établissement{" "}
            <span className="font-normal text-muted-foreground">(Optionnel)</span>
          </span>
          <input
            type="text"
            placeholder="Ex: Université d'Abomey-Calavi"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <BookOpen size={14} className="text-primary" /> Filière / Domaine{" "}
            <span className="font-normal text-muted-foreground">(Optionnel)</span>
          </span>
          <input
            type="text"
            placeholder="Ex: Informatique, Marketing..."
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>
    </>
  );
}
