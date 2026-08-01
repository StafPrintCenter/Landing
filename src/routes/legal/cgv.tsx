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
            Les présentes Conditions Générales de Vente (« CGV ») régissent l'ensemble des relations contractuelles entre <span className="font-bold">{SITE.name}</span>, studio créatif, d'impression et de services digitaux basé à {SITE.city}, et toute personne physique ou morale (« le Client »), professionnelle (B2B) ou particulière (B2C).
            <br />
            Elles s'appliquent sans restriction à l'ensemble des pôles d'activité du Prestataire :
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Pôle Digital :</span>{" "} Design graphique, création de sites web, montage vidéo, référencement et publicité en ligne.
            </li>
            <li>
              <span className="font-bold">Pôle Impression & Signalétique :</span>{" "} Bâches, kakémonos, cartes de visite, badges, étiquettes, enseignes lumineuses et travaux de sérigraphie.
            </li>
            <li>
              <span className="font-bold">Pôle Formation :</span>{" "} Cours pratiques et développement de compétences (InDesign, vidéo, After Effects, etc.).
            </li>
          </ul>
          <br />
          Toute commande ou inscription, quel que soit le canal utilisé (site web, e-mail, WhatsApp ou en agence), implique l'adhésion pleine et entière du Client aux présentes CGV.
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
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Émission du devis :</span>{" "} Tout projet fait l'objet d'un devis préalable détaillé, gratuit et valable trente (30) jours calendaires à compter de sa date d'émission.
            </li>
            <li>
              <span className="font-bold">Validation :</span>{" "} Aucune prestation (conception, impression ou réservation de place en formation) ne démarre sans la validation expresse du devis par le Client (mention écrite "Bon pour accord", signature ou confirmation électronique/WhatsApp).
            </li>
            <li>
              <span className="font-bold">Modification de brief :</span>{" "} Toute modification substantielle des spécifications ou du brief initial après validation fera l'objet d'un avenant tarifaire et d'un ajustement des délais de livraison.
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
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Tarification :</span>{" "} Les prix sont indiqués en francs CFA (FCFA) toutes taxes comprises (TTC), sauf mention contraire sur le devis.
            </li>
            <li>
              <span className="font-bold">Acompte & Solde :</span>{" "} Sauf accord particulier, un acompte de 50 % est exigé à la validation du devis pour lancer la production. Le solde (50 %) est payable obligatoirement à la livraison ou au retrait des livrables.
            </li>
            <li>
              <span className="font-bold">{"Échelonnement (Formations > 100 000 FCFA) :"}</span>{" "} Pour les formations d'un montant supérieur à 100 000 FCFA, un paiement échelonné en 2 ou 3 tranches peut être accordé sur demande, formalisé par un calendrier d'échéances écrit avant la session.
            </li>
            <li>
              <span className="font-bold">Moyens de paiement acceptés :</span>{" "} Espèces, chèque certifié et Mobile Money (MTN Mobile Money, Moov Money, Celtiis Cash).
            </li>
            <li>
              <span className="font-bold">Retard de paiement :</span>{" "} Tout retard d'encaissement autorise {SITE.name} à suspendre immédiatement les travaux ou à différer la livraison.
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
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Conformité des fichiers clients :</span>{" "} Le Client est seul responsable de la qualité technique des fichiers qu'il fournit (résolution 300 DPI, mode colorimétrique CMJN, fonds perdus et vectorisation des polices). {SITE.name} décline toute responsabilité en cas de rendu dégradé lié à un fichier non conforme.
            </li>
            <li>
              <span className="font-bold">Bon À Tirer (BAT) :</span>{" "} Aucune impression en série ne sera lancée sans la validation formelle d'un Bon À Tirer (BAT numérique ou épreuve physique). La validation du BAT dégage le Prestataire de toute responsabilité pour toute erreur (coquille, orthographe, disposition) non signalée par le Client à ce stade.
            </li>
            <li>
              <span className="font-bold">Tolérance de teintes :</span>{" "} Le Client accepte que des nuances mineures de teintes puissent exister entre l'affichage sur écran (mode RVB) et l'impression finale (mode CMJN). Ces variations usuelles ne constituent pas un défaut de conformité.
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
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Délais de réalisation :</span>{" "} Les délais communiqués sont donnés à titre indicatif et ne courent qu'à compter de la réception de l'ensemble des éléments (fichiers validés, brief complet) et de l'encaissement de l'acompte.
            </li>
            <li>
              <span className="font-bold">Retrait & livraison physique :</span>{" "} Les produits imprimés sont à retirer au studio {SITE.name} à {SITE.city}. Une livraison sur site (Porto-Novo, Cotonou et environs) ou par transporteur peut être organisée aux frais et risques du Client.
            </li>
            <li>
              <span className="font-bold">Livrables digitaux :</span>{" "} Les fichiers sources et accès web sont transmis par voie électronique uniquement après le règlement intégral du solde de la prestation.
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
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Assiduité & Attestation :</span>{" "} La délivrance de l'attestation de fin de formation exige un taux de présence effective d'au moins 80 % des heures de cours prévues.semble des éléments (fichiers validés, brief complet) et de l'encaissement de l'acompte.
            </li>
            <li>
              <span className="font-bold">Absences :</span>{" "} Une absence (justifiée ou non) ne donne droit à aucun remboursement ou compensation financière. Les supports de cours de la session manquée seront néanmoins mis à disposition de l'apprenant.
            </li>
            <li>
              <span className="font-bold">Annulation / Report par l'agence :</span>{" "} En cas d'effectif insuffisant ou de force majeure, {SITE.name} se réserve le droit de reporter ou d'annuler une session. En cas d'annulation définitive, les sommes versées seront intégralement remboursées.
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
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Transfert de propriété :</span>{" "} Les droits de propriété intellectuelle sur les créations (logos, chartes graphiques, maquettes, sites web, montages vidéo) ne sont cédés au Client qu'après paiement intégral du solde dû.
            </li>
            <li>
              <span className="font-bold">Droit de portfolio (Auto-promotion) :</span>{" "} Sauf clause de confidentialité spécifique signée avant le projet, {SITE.name} se réserve le droit de présenter les réalisations effectuées dans son portfolio, sur son site web et ses réseaux sociaux à des fins de promotion.
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
        <p>
          Aucune partie ne pourra être tenue responsable d'un retard résultant d'un cas de force majeure. En cas de différend, les parties s'efforceront de trouver une solution amiable préalablement à toute action contentieuse. À défaut, le litige sera porté devant les tribunaux compétents de Porto-Novo, République du Bénin.
        </p>
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
      lastUpdated="30 juin 2026"
      sections={getSections()}
      contactQuestion="Une question sur ces conditions générales de vente ?"
    />
  );
}