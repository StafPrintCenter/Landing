import { GraduationCap, Mail, Phone, User } from "lucide-react";

const EDUCATION_LEVEL_OPTIONS = [
  { value: "sans_diplome", label: "Sans diplôme" },
  { value: "bepc", label: "BEPC" },
  { value: "bac", label: "BAC" },
  { value: "bac+2", label: "BAC +2 (BTS, DUT...)" },
  { value: "bac+3", label: "BAC +3 (Licence...)" },
  { value: "master", label: "BAC +5 (Master, DEA...)" },
  { value: "doctorat", label: "Doctorat" },
];

interface ApplicantFieldsProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationLevel: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setEducationLevel: (value: string) => void;
}

export function ApplicantFields({
  firstName,
  lastName,
  email,
  phone,
  educationLevel,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setEducationLevel,
}: ApplicantFieldsProps) {
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
            placeholder="votre.nom@example.com"
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
      <label className="block space-y-1.5">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <GraduationCap size={14} className="text-primary" /> Niveau d'études <span className="text-destructive">*</span>
        </span>
        <select
          required
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
        >
          <option value="" disabled>
            Sélectionnez votre niveau d'études
          </option>
          {EDUCATION_LEVEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
