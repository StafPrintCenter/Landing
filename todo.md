Je fais
1- LISTE DES RESSOURCES 
curl -X 'GET' \
  'http://localhost:8000/api/v1/public/resources/list?page=1&perPage=20' \
  -H 'accept: */*' \
  -H 'X-CSRF-TOKEN: '
---
{
  "data": [
    {
      "slug": "gabarit-bache-banderole-pose",
      "title": "Gabarit bâche et banderole + guide de pose",
      "category": "Gabarit",
      "price": 3000,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Prêt à personnaliser",
      "short": "Gabarits grand format avec œillets, marges de sécurité et conseils de pose.",
      "format": "Canva · PDF · AI",
      "meta": "4 formats",
      "viewsCount": 5,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:48+00:00",
      "updatedAt": "2026-11-14T01:00:00+00:00"
    },
    {
      "slug": "modele-portfolio-designer",
      "title": "Modèle de portfolio et CV pour designers",
      "category": "Gabarit",
      "price": 2500,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Pour les apprenants",
      "short": "Un portfolio PDF et un CV créatif pour présenter vos projets et décrocher des missions.",
      "format": "Canva · PDF",
      "meta": "2 modèles",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:48+00:00",
      "updatedAt": "2026-11-14T00:02:48+00:00"
    },
    {
      "slug": "kit-pme-devis-facture-fcfa",
      "title": "Kit PME : devis, facture et en-tête (FCFA)",
      "category": "Gabarit",
      "price": 4500,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Prêt à l'emploi",
      "short": "Modèles de devis et de facture en FCFA, papier à en-tête et carte de visite, sur Word et Excel.",
      "format": "Word · Excel · Canva",
      "meta": "5 modèles",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:47+00:00",
      "updatedAt": "2026-11-14T00:02:47+00:00"
    },
    {
      "slug": "pack-reseaux-sociaux-canva",
      "title": "Pack réseaux sociaux (Canva)",
      "category": "Gabarit",
      "price": 4000,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Prêt à personnaliser",
      "short": "Posts Instagram et Facebook, statuts WhatsApp et couvertures pour une communication régulière.",
      "format": "Canva",
      "meta": "24 modèles",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:47+00:00",
      "updatedAt": "2026-11-14T00:02:47+00:00"
    },
    {
      "slug": "kit-evenement-canva",
      "title": "Kit événement complet (Canva)",
      "category": "Gabarit",
      "price": 6000,
      "originalPrice": 9000,
      "discountPercentage": 33,
      "status": "Pack complet",
      "short": "Badge, affiche, programme, bâche et kakémono assortis pour conférences, mariages et cérémonies.",
      "format": "Canva · PDF",
      "meta": "6 modèles",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:47+00:00",
      "updatedAt": "2026-11-14T00:02:47+00:00"
    },
    {
      "slug": "guide-fichier-pret-a-imprimer",
      "title": "Préparer un fichier prêt à imprimer",
      "category": "Guide",
      "price": 0,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Indispensable",
      "short": "Fond perdu, CMJN, résolution, polices, export PDF : tout pour éviter un fichier refusé.",
      "format": "PDF",
      "meta": "14 pages",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:46+00:00",
      "updatedAt": "2026-11-14T00:02:46+00:00"
    },
    {
      "slug": "fiche-formats-et-dimensions-standards",
      "title": "Fiche des formats et dimensions standards",
      "category": "Outil",
      "price": 0,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Aide-mémoire",
      "short": "A4, A5, A6, bâches, roll-up, badges : les tailles à connaître et la lisibilité selon la distance.",
      "format": "PDF",
      "meta": "2 pages",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:46+00:00",
      "updatedAt": "2026-11-14T00:02:46+00:00"
    },
    {
      "slug": "quel-support-pour-quel-besoin",
      "title": "Quel support pour quel besoin et quel budget ?",
      "category": "Guide",
      "price": 0,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Lecture 10 min",
      "short": "Flyer, bâche, roll-up, vinyle, badge : choisir le bon support selon votre objectif.",
      "format": "PDF",
      "meta": "8 pages",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:46+00:00",
      "updatedAt": "2026-11-14T00:02:46+00:00"
    },
    {
      "slug": "reussir-son-brief-design",
      "title": "Réussir son brief design",
      "category": "Guide",
      "price": 0,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Checklist à remplir",
      "short": "Les bonnes questions pour obtenir une proposition créative vraiment utile.",
      "format": "PDF",
      "meta": "6 pages",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:45+00:00",
      "updatedAt": "2026-11-14T00:02:45+00:00"
    },
    {
      "slug": "checklist-site-web-performant",
      "title": "Checklist site web performant",
      "category": "Outil",
      "price": 0,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Nouveauté 2026",
      "short": "20 points à contrôler avant de mettre votre site en ligne.",
      "format": "PDF",
      "meta": "20 contrôles",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:45+00:00",
      "updatedAt": "2026-11-14T00:02:45+00:00"
    },
    {
      "slug": "gabarit-flyer-a5",
      "title": "Gabarit flyer A5 recto-verso",
      "category": "Gabarit",
      "price": 3500,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Prêt à personnaliser",
      "short": "Deux compositions professionnelles avec marges et fond perdu inclus.",
      "format": "PDF · INDD",
      "meta": "2 compositions",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:45+00:00",
      "updatedAt": "2026-11-14T00:02:45+00:00"
    },
    {
      "slug": "kit-kakemono-85x200",
      "title": "Kit kakémono 85 × 200 cm",
      "category": "Gabarit",
      "price": 3000,
      "originalPrice": 5000,
      "discountPercentage": 40,
      "status": "Prêt à personnaliser",
      "short": "Un modèle professionnel à personnaliser pour vos stands et événements.",
      "format": "PSD · AI",
      "meta": "3 mises en page",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:44+00:00",
      "updatedAt": "2026-11-14T00:02:44+00:00"
    },
    {
      "slug": "gabarit-carte-visite-85x55",
      "title": "Gabarit carte de visite 85 × 55 mm",
      "category": "Gabarit",
      "price": 0,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Prêt à imprimer",
      "short": "Un fichier propre aux bonnes dimensions, avec fond perdu et marges de sécurité.",
      "format": "PDF · AI",
      "meta": "Recto & verso",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:44+00:00",
      "updatedAt": "2026-11-14T00:02:44+00:00"
    },
    {
      "slug": "choisir-couleurs-de-marque",
      "title": "Choisir ses couleurs de marque",
      "category": "Guide",
      "price": 2500,
      "originalPrice": null,
      "discountPercentage": 0,
      "status": "Lecture 15 min",
      "short": "Une méthode simple pour construire une palette cohérente et mémorable.",
      "format": "PDF",
      "meta": "12 pages",
      "viewsCount": 0,
      "downloadsCount": 0,
      "createdAt": "2026-11-14T00:02:44+00:00",
      "updatedAt": "2026-11-14T00:02:44+00:00"
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/v1/public/resources/list?page=1",
    "last": "http://localhost:8000/api/v1/public/resources/list?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": null,
        "label": "pagination.previous",
        "page": null,
        "active": false
      },
      {
        "url": "http://localhost:8000/api/v1/public/resources/list?page=1",
        "label": "1",
        "page": 1,
        "active": true
      },
      {
        "url": null,
        "label": "pagination.next",
        "page": null,
        "active": false
      }
    ],
    "path": "http://localhost:8000/api/v1/public/resources/list",
    "per_page": 20,
    "to": 14,
    "total": 14
  }
}
---
Pour les filtres et trie , voir le code
<?php

namespace App\Http\Controllers\Api\Public\Resources;

use App\Http\Controllers\Controller;
use App\Http\Resources\DigitalResourceResource;
use App\Models\Resource as DigitalResource;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ListController extends Controller
{
  // SWAGGER DOC
  #[OA\Get(
    path: '/public/resources/list',
    summary: 'Liste des ressources publiques',
    tags: ['PUBLIC - RESSOURCES'],
    parameters: [
      new OA\Parameter(
        name: 'category',
        in: 'query',
        description: 'Catégorie de la ressource',
        required: false,
        schema: new OA\Schema(type: 'string', enum: ['Tout', 'Gabarit', 'Guide', 'Outil'])
      ),
      new OA\Parameter(
        name: 'query',
        in: 'query',
        description: 'Recherche par mot-clé (titre, description courte)',
        required: false,
        schema: new OA\Schema(type: 'string')
      ),
      new OA\Parameter(
        name: 'sortBy',
        in: 'query',
        description: 'Critère de tri',
        required: false,
        schema: new OA\Schema(type: 'string', enum: ['default', 'alpha', 'downloads', 'views'])
      ),
      new OA\Parameter(
        name: 'sortDir',
        in: 'query',
        description: 'Direction du tri',
        required: false,
        schema: new OA\Schema(type: 'string', enum: ['asc', 'desc'])
      ),
      new OA\Parameter(
        name: 'page',
        in: 'query',
        description: 'Numéro de page',
        required: false,
        schema: new OA\Schema(type: 'integer', default: 1, minimum: 1)
      ),
      new OA\Parameter(
        name: 'perPage',
        in: 'query',
        description: "Nombre de ressources par page (max 100)",
        required: false,
        schema: new OA\Schema(type: 'integer', default: 20, minimum: 1, maximum: 100)
      ),
    ],
    responses: [
      new OA\Response(response: 200, description: 'Liste paginée, filtrée et triée des ressources publiques'),
    ]
  )]

  // CONTROLLER FUNCTION
  public function __invoke(Request $request)
  {
    $query = DigitalResource::query()->where('is_active', true);

    // 1. Recherche par mot-clé
    if ($request->filled('query')) {
      $needle = '%' . $request->input('query') . '%';

      $query->where(function ($q) use ($needle) {
        $q->where('title', 'like', $needle)
          ->orWhere('short', 'like', $needle);
      });
    }

    // 2. Filtrage par catégorie
    if ($request->filled('category') && !in_array($request->category, ['all', 'Tout'], true)) {
      $query->where('category', $request->category);
    }

    // 3. Gestion des tris
    $sortBy = $request->input('sortBy', 'default');
    $sortDir = $request->input('sortDir', 'desc');
    $direction = strtolower($sortDir) === 'desc' ? 'desc' : 'asc';

    switch ($sortBy) {
      case 'alpha':
        $query->orderBy('title', $direction);
        break;

      case 'downloads':
        $query->orderBy('downloads_count', $direction);
        break;

      case 'views':
        $query->orderBy('views_count', $direction);
        break;

      case 'default':
      default:
        $query->latest();
        break;
    }

    // 4. Pagination
    $perPage = (int) $request->input('perPage', 20);
    $perPage = max(1, min($perPage, 100));

    return DigitalResourceResource::collection($query->paginate($perPage));
  }
}
***
DETAILS D'UNE RESSOURCE
curl -X 'GET' \
  'http://localhost:8000/api/v1/public/resources/kit-evenement-canva' \
  -H 'accept: */*' \
  -H 'X-CSRF-TOKEN: '
---
{
  "data": {
    "slug": "kit-evenement-canva",
    "title": "Kit événement complet (Canva)",
    "category": "Gabarit",
    "price": 6000,
    "originalPrice": 9000,
    "discountPercentage": 33,
    "status": "Pack complet",
    "short": "Badge, affiche, programme, bâche et kakémono assortis pour conférences, mariages et cérémonies.",
    "format": "Canva · PDF",
    "meta": "6 modèles",
    "viewsCount": 1,
    "downloadsCount": 0,
    "description": "Un ensemble cohérent de supports pour habiller un événement sans partir de zéro. Tous les modèles partagent la même identité et se modifient directement dans Canva, sans logiciel payant.",
    "includes": [
      "Badge d'accréditation nominatif",
      "Affiche A3 et visuel réseaux sociaux",
      "Programme de l'événement (A5 plié)",
      "Bâche 3 × 1 m prête à produire",
      "Kakémono 85 × 200 cm",
      "Guide d'adaptation à votre identité"
    ],
    "outcomes": [
      "Habiller un événement avec une identité unifiée",
      "Modifier vos textes et couleurs en quelques minutes",
      "Envoyer des fichiers prêts pour l'atelier"
    ],
    "audience": "Organisateurs d'événements, églises, ONG, entreprises et particuliers préparant une cérémonie.",
    "requirements": [
      "Un compte Canva gratuit",
      "Un navigateur ou l'application Canva"
    ],
    "license": "Utilisation commerciale autorisée sur vos événements. Revente ou partage des modèles interdit.",
    "downloadUrl": "http://localhost:8000/api/v1/public/resources/kit-evenement-canva/download",
    "downloadFileName": "kit-evenement-canva.pdf",
    "createdAt": "2026-11-14T00:02:47+00:00",
    "updatedAt": "2026-11-14T01:12:41+00:00"
  }
}
***
on va connecter les ressources pour consommer les données de l'API
***
inspire toi de src\routes\articles\index.tsx, src\routes\services\index.tsx et src\routes\trainings\index.tsx pour la page src\routes\tools\ressources\index.tsx (en morcelant le code aussi)
puis de leur page detail pour la page detail aussi de ressource
Aussire toi surtout d'appliquer les filtres de trie (nombre de vue, telechargement, etc...)
