import { createFileRoute } from "@tanstack/react-router";
import { ScrollText, FileSignature, Banknote, Printer, Truck, GraduationCap, Copyright, Scale, } from "lucide-react";
import { LegalLayout, type LegalSection } from "@/components/pages/legal";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/legal/cgv")({
  head: () => ({
    meta: [
      { title: `Conditions Générales de Vente | ${SITE.name}` },
      { name: "description", content: `Conditions Générales de Vente de ${SITE.name} : devis, paiement, impression, livraison et formations.` },
    ],
  }),
  component: CgvPage,
});

function getSections(): LegalSection[] {
  return [
    {
      id: "objet",
      number: "01",
      icon: ScrollText,
      title: "Objet et champ d'application",
      content: (
        <div>
          <p>
            Les présentes Conditions Générales de Vente (« CGV ») régissent l'ensemble des relations contractuelles entre{" "} <span className="font-bold">{SITE.name}</span>, studio créatif, d'impression, de services et de formation basé à {SITE.city}, et toute personne physique ou morale (« le Client »), professionnelle (B2B) ou particulière (B2C).
          </p>

          <p className="mt-3">Elles s'appliquent sans restriction à l'ensemble des pôles d'activité du Prestataire :</p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Pôle Impression & Signalétique :</span>{" "} Bâches, kakémonos, cartes de visite, badges, étiquettes, enseignes, travaux de sérigraphie et grands formats.
            </li>
            <li>
              <span className="font-bold">Pôle Digital & Design :</span>{" "} Création d'identités visuelles, maquettes print/web, montage vidéo, développement web et solutions digitales.
            </li>
            <li>
              <span className="font-bold">Pôle Formation :</span>{" "} Modules d'apprentissage pratiques en infographie, prépresse, développement web et logiciels professionnels (InDesign, Photoshop, Illustrator, etc.).
            </li>
          </ul>

          <p className="mt-4">
            Toute commande ou inscription, quel que soit le canal utilisé (site web, e-mail, WhatsApp ou en agence), implique l'adhésion pleine et entière du Client aux présentes CGV.
          </p>
        </div>
      ),
    },
    {
      id: "commande",
      number: "02",
      icon: FileSignature,
      title: "Processus de commande et de devis",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Émission du devis :</span>{" "} Tout projet fait l'objet d'un devis préalable détaillé, gratuit et valable trente (30) jours calendaires à compter de sa date d'émission.
            </li>
            <li>
              <span className="font-bold">Validation :</span>{" "} Aucune prestation (conception, impression ou réservation de place en formation) ne démarre sans la validation expresse du devis par le Client (mention écrite "Bon pour accord", signature, paiement d'acompte ou confirmation électronique/WhatsApp).
            </li>
            <li>
              <span className="font-bold">Modification de brief :</span>{" "}  Toute modification substantielle des spécifications ou du cahier des charges initial après validation fera l'objet d'un avenant tarifaire et d'un réajustement des délais de livraison.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "paiement",
      number: "03",
      icon: Banknote,
      title: "Conditions tarifaires et modalités de paiement",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Tarification :</span>{" "} Les prix sont indiqués en francs CFA (FCFA) toutes taxes comprises (TTC), sauf mention contraire explicite sur le devis.
            </li>
            <li>
              <span className="font-bold">Acompte & Solde :</span>{" "} Sauf accord spécifique, un acompte de 50 % est exigé à la validation du devis pour lancer la production. Le solde de 50 % est payable obligatoirement à la livraison ou au retrait des livrables.
            </li>
            <li>
              <span className="font-bold">Échelonnement (Formations &gt; 100 000 FCFA) :</span>{" "} Pour les parcours de formation d'un montant supérieur à 100 000 FCFA, un paiement échelonné en 2 ou 3 tranches peut être accordé, formalisé par un calendrier d'échéances écrit avant le début des cours.
            </li>
            <li>
              <span className="font-bold">Moyens de paiement acceptés :</span>{" "} Espèces, virement bancaire, chèque certifié et Mobile Money (MTN Mobile Money, Moov Money, Celtiis Cash).
            </li>
            <li>
              <span className="font-bold">Retard de paiement :</span>{" "} Tout retard d'encaissement autorise {SITE.name} à suspendre immédiatement les travaux, différer la livraison ou refuser l'accès aux cours de formation.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "impression",
      number: "04",
      icon: Printer,
      title: "Spécificités du Pôle Impression & Signalétique",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Conformité des fichiers clients :</span>{" "}  Le Client est seul responsable de la qualité technique des fichiers transmis (résolution minimale 300 DPI, mode colorimétrique CMJN, fonds perdus et vectorisation des polices). {SITE.name} ne saurait être tenu responsable d'un rendu dégradé lié à la non-conformité du fichier fourni.
            </li>
            <li>
              <span className="font-bold">Bon À Tirer (BAT) :</span>{" "} Aucune impression en série ne sera lancée sans la validation formelle d'un Bon À Tirer (BAT numérique ou épreuve physique). La validation du BAT dégage le Prestataire de toute responsabilité pour toute erreur (coquille, orthographe, disposition) non signalée à ce stade.
            </li>
            <li>
              <span className="font-bold">Tolérance de teintes :</span>{" "} Le Client accepte que de légères variations de couleurs puissent exister entre l'affichage sur écran (mode RVB) et l'impression physique finale (mode CMJN). Ces différences techniques usuelles ne constituent pas un défaut de conformité.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "livraison",
      number: "05",
      icon: Truck,
      title: "Délais, livraison et retrait",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Délais de réalisation :</span>{" "}  Les délais communiqués sont donnés à titre indicatif et ne courent qu'à compter de la réception formelle des fichiers conformes, du BAT validé et de l'encaissement de l'acompte requis.
            </li>
            <li>
              <span className="font-bold">Retrait & livraison physique :</span>{" "} Les commandes imprimées sont à retirer dans nos locaux à {SITE.city}. Une livraison sur site (Porto-Novo, Cotonou et environs) ou par transporteur spécialisé peut être organisée aux frais et risques du Client.
            </li>
            <li>
              <span className="font-bold">Livrables digitaux :</span>{" "} Les fichiers sources, maquettes finales et accès web sont transmis par voie électronique uniquement après le règlement intégral de la facture.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "formation",
      number: "06",
      icon: GraduationCap,
      title: "Spécificités du pôle Formation",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Assiduité & Attestation :</span>{" "} La délivrance de l'attestation de fin de formation exige une présence effective d'au moins 80 % des heures de cours prévues et la validation des évaluations pratiques.
            </li>
            <li>
              <span className="font-bold">Absences :</span>{" "} Une absence (justifiée ou non) ne donne droit à aucun remboursement ou compensation financière. Les supports pédagogiques de la session manquée restent néanmoins mis à disposition de l'apprenant.
            </li>
            <li>
              <span className="font-bold">Annulation / Report par l'agence :</span>{" "} En cas d'effectif insuffisant ou d'un cas de force majeure, {SITE.name} se réserve le droit de reporter ou d'annuler une session. En cas d'annulation définitive du fait du Prestataire, les sommes versées seront intégralement remboursées.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "propriete",
      number: "07",
      icon: Copyright,
      title: "Propriété intellectuelle et droit de citation",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Transfert des droits :</span>{" "} Les droits d'exploitation et de reproduction des créations graphiques ou de développement ne sont transférés au Client qu'à compter du paiement intégral du prix convenu.
            </li>
            <li>
              <span className="font-bold">Droit de portfolio & référence :</span>{" "} Les travaux réalisés ne sont intégrés au portfolio, site web ou réseaux sociaux de {SITE.name} qu'avec l'accord préalable et explicite du Client. Sans cette autorisation, les réalisations restent strictement confidentielles.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "litiges",
      number: "08",
      icon: Scale,
      title: "Force majeure et règlement des litiges",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Force majeure :</span>{" "} Aucune des parties ne pourra être tenue responsable d'un retard ou d'un défaut d'exécution résultant d'un cas de force majeure (interruptions majeures des réseaux électriques/internet hors contrôle, catastrophes naturelles, contraintes gouvernementales).
            </li>
            <li>
              <span className="font-bold">Règlement amiable & Juridiction :</span>{" "} En cas de différend, les parties s'engagent à rechercher prioritairement une solution amiable. À défaut d'accord sous un délai de trente (30) jours, le litige sera porté devant les tribunaux compétents de Porto-Novo (République du Bénin).
            </li>
          </ul>
        </div>
      ),
    },
  ];
}

function CgvPage() {
  return (
    <LegalLayout
      icon={ScrollText}
      badge="Document contractuel"
      title="Conditions Générales de Vente"
      description={`Les modalités de commande, paiement, production et livraison applicables à toute prestation ${SITE.name}.`}
      lastUpdated="21 août 2026"
      sections={getSections()}
      contactQuestion="Une question sur ces conditions générales de vente ?"
    />
  );
}