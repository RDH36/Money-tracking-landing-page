import {
  Zap,
  Wifi,
  BadgeDollarSign,
  Building2,
  Tags,
  Target,
  BarChart3,
  Bell,
  FlaskConical,
  Lock,
  Palette,
  History,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "Money Tracker",
  url: "https://moneytracker.mg",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.moneytracker.app",
  appStoreUrl: "https://apps.apple.com/app/money-tracker",
};

export const navigation = [
  { name: "Accueil", href: "#" },
  { name: "Fonctionnalités", href: "#features" },
  { name: "FAQ", href: "#faq" },
];

export const hero = {
  headline: "Prenez le Contrôle de Vos Finances en 10 Secondes",
  subheadline:
    "Money Tracker est l'application mobile qui vous permet de suivre chaque Ariary dépensé, même sans connexion internet. Conçue pour Madagascar, adaptée au monde entier.",
  benefits: [
    "Enregistrez une dépense en moins de 10 secondes",
    "Fonctionne 100% hors ligne",
    "Support multi-devises (MGA, EUR, USD)",
  ],
  stats: {
    rating: "4.8/5",
    downloads: "10 000+",
  },
  cta: {
    primary: "Télécharger Gratuitement",
    secondary: "Voir la démo",
  },
};

export const problem = {
  headline: "Vous ne savez jamais où passe votre argent ?",
  painPoints: [
    {
      icon: "💸",
      title: "Votre salaire arrive... et s'évapore",
      description:
        "Vous retirez de l'argent au distributeur. Une semaine plus tard, votre portefeuille est vide. Où est passé cet argent ? Impossible de savoir.",
    },
    {
      icon: "📊",
      title: "Excel ? Trop lent. Les apps bancaires ? Inutiles.",
      description:
        "Les apps bancaires ne montrent que les retraits ATM - pas ce que vous faites ensuite avec cet argent.",
    },
    {
      icon: "📶",
      title: "La plupart des apps ne fonctionnent pas sans internet",
      description:
        "À Madagascar, la connexion est instable et coûteuse. Les apps qui nécessitent internet ? Impossibles à utiliser.",
    },
    {
      icon: "⏰",
      title: "Trop de champs à remplir",
      description:
        "Qui a le temps de catégoriser 50 champs pour une baguette ? Les apps de finance sont conçues pour des comptables.",
    },
  ],
  agitation:
    "Le résultat ? Vous travaillez dur, mais vous n'arrivez jamais à économiser. Chaque mois, c'est la même histoire : l'argent file entre vos doigts comme du sable. Ce n'est pas un problème de volonté. C'est un problème d'outil.",
};

export const solution = {
  headline: "Money Tracker : Simple, Rapide, et 100% Offline",
  valueProposition:
    "Money Tracker est la première application de suivi des dépenses conçue pour les économies en cash comme Madagascar. Notre promesse : enregistrer une dépense en moins de 10 secondes, sans jamais avoir besoin d'internet.",
  benefits: [
    {
      icon: "📊",
      title: "Voyez Où Va Votre Argent",
      description:
        "En un coup d'œil, comprenez vos dépenses du jour, de la semaine, du mois. Des graphiques simples qui révèlent vos habitudes.",
      outcome: "Fini les mystères financiers",
    },
    {
      icon: "⚡",
      title: "10 Secondes, Pas Une De Plus",
      description:
        "Montant → Catégorie → Enregistré. C'est tout. Pas de champs inutiles, pas de questions superflues.",
      outcome: "Une habitude qui tient dans la durée",
    },
    {
      icon: "📡",
      title: "Fonctionne Partout, Même Sans Internet",
      description:
        "Au marché, en brousse, dans le taxi-be : votre app fonctionne. Vos données restent sur votre téléphone, en sécurité.",
      outcome: "Plus d'excuse pour ne pas noter",
    },
    {
      icon: "💱",
      title: "MGA, EUR, USD - Tout En Un",
      description:
        "Gérez plusieurs devises avec conversion automatique. Parfait pour les voyageurs et expatriés.",
      outcome: "Une seule app pour toutes vos finances",
    },
  ],
};

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Zap,
    title: "Entrée en 10 Secondes",
    description: "Montant → Catégorie → Note → Enregistré. L'interface la plus rapide du marché.",
  },
  {
    icon: Wifi,
    title: "100% Offline",
    description: "Aucune connexion internet requise. Vos données sont stockées localement en toute sécurité.",
  },
  {
    icon: BadgeDollarSign,
    title: "Support Multi-Devises",
    description: "Ariary (MGA), Euro (EUR), Dollar (USD) avec conversion automatique.",
  },
  {
    icon: Building2,
    title: "Gestion de Comptes",
    description: "Gérez jusqu'à 3 comptes (portefeuille, épargne, mobile money) avec transferts.",
  },
  {
    icon: Tags,
    title: "Catégories sur Mesure",
    description: "8 catégories par défaut + 3 personnalisables. Couleurs et icônes uniques.",
  },
  {
    icon: Target,
    title: "Planifications",
    description: "Créez des budgets avec deadlines et suivez vos objectifs financiers.",
  },
  {
    icon: BarChart3,
    title: "Graphiques Clairs",
    description: "Camembert des dépenses, historique filtrable par jour/semaine/mois.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Rappels configurables (1h, 2h, 4h) pour ne jamais oublier une dépense.",
  },
  {
    icon: FlaskConical,
    title: 'Scénarios "What-If"',
    description: "Testez des dépenses hypothétiques sans les enregistrer.",
  },
  {
    icon: Lock,
    title: "Masquage du Solde",
    description: "Cachez votre solde en un clic pour protéger votre vie privée.",
  },
  {
    icon: Palette,
    title: "4 Thèmes de Couleur",
    description: "Turquoise, Bleu, Violet, Orange. Personnalisez selon vos préférences.",
  },
  {
    icon: History,
    title: "Transactions Illimitées",
    description: "Pagination infinie, groupement par date, suppression récupérable.",
  },
];

export const testimonials = [
  {
    quote:
      "Grâce à Money Tracker, j'ai identifié que je dépensais 150 000 Ar par mois en taxi-be. J'ai commencé à marcher plus souvent et j'ai économisé pour un vélo.",
    author: "Rakoto A.",
    role: "Commerçant",
    location: "Antananarivo",
    result: "150 000 Ar/mois économisés",
  },
  {
    quote:
      "Enfin une app qui fonctionne sans internet ! Je note mes dépenses au marché, en brousse, partout. C'est devenu un réflexe.",
    author: "Marie L.",
    role: "Enseignante",
    location: "Fianarantsoa",
    result: "Utilisatrice depuis 8 mois",
  },
  {
    quote:
      "Avant, je ne savais jamais pourquoi j'étais toujours à sec en fin de mois. Maintenant je vois tout. La planification m'a aidé à économiser 500 000 Ar en 3 mois.",
    author: "Jean-Claude R.",
    role: "Fonctionnaire",
    location: "Toamasina",
    result: "500 000 Ar économisés en 3 mois",
  },
];

export const comparison = {
  headline: "Pourquoi Money Tracker ?",
  criteria: [
    { label: "Temps d'entrée", traditional: "30-60 secondes", moneyTracker: "< 10 secondes" },
    { label: "Internet requis", traditional: "Oui, toujours", moneyTracker: "Non (100% offline)" },
    { label: "Multi-devises", traditional: "Limité ou payant", moneyTracker: "MGA, EUR, USD inclus" },
    { label: "Planification", traditional: "Rare ou complexe", moneyTracker: "Intégrée et simple" },
    { label: "Prix", traditional: "Freemium avec pubs", moneyTracker: "100% Gratuit, sans pub" },
    { label: "Vie privée", traditional: "Données sur serveurs", moneyTracker: "Stockage local uniquement" },
  ],
};

export const faq = [
  {
    question: "Quand l'application sera-t-elle disponible ?",
    answer:
      "Money Tracker est actuellement en développement. Inscrivez-vous à notre newsletter pour être notifié dès le lancement et bénéficier d'un accès anticipé.",
  },
  {
    question: "L'application sera-t-elle gratuite ?",
    answer:
      "Oui. Money Tracker sera 100% gratuit sans publicité. Toutes les fonctionnalités seront accessibles sans payer. Nous prévoyons une version Premium optionnelle avec synchronisation cloud, mais l'app de base restera toujours gratuite.",
  },
  {
    question: "Pourrai-je utiliser l'app sans connexion internet ?",
    answer:
      "Absolument. C'est notre différence principale. Money Tracker fonctionnera entièrement hors ligne. Enregistrement, consultation, graphiques - tout marchera sans internet.",
  },
  {
    question: "Mes données seront-elles sécurisées ?",
    answer:
      "Oui. Toutes vos données seront stockées localement sur votre téléphone dans une base SQLite sécurisée. Aucune donnée ne sera envoyée à des serveurs externes. Nous n'aurons pas accès à vos informations financières.",
  },
  {
    question: "Quelles devises seront supportées ?",
    answer:
      "Au lancement : Ariary malgache (MGA), Euro (EUR), et Dollar américain (USD). La conversion automatique entre devises sera incluse.",
  },
  {
    question: "Sur quelles plateformes l'app sera-t-elle disponible ?",
    answer:
      "Money Tracker sera disponible sur Android (Google Play Store) au lancement. Une version iOS (App Store) est prévue pour plus tard.",
  },
  {
    question: "Comment être informé du lancement ?",
    answer:
      "Inscrivez-vous à notre newsletter ci-dessus. Vous recevrez un email dès que l'application sera disponible, ainsi que des conseils exclusifs pour mieux gérer votre argent.",
  },
  {
    question: "Comment fonctionne la planification budgétaire ?",
    answer:
      "Vous pourrez créer une planification avec un montant cible et une deadline. Ajoutez des articles avec leurs montants. L'app suivra votre progression. Quand vous serez prêt, convertissez la planification en transactions réelles en un tap.",
  },
];

export const cta = {
  headline: "Prêt à Reprendre le Contrôle ?",
  subheadline: "Soyez parmi les premiers à découvrir Money Tracker et commencez à voir où va réellement votre argent.",
  tagline: "Gratuit. Sans publicité. Fonctionne hors ligne. Conçu pour Madagascar.",
  guarantees: [
    "Notification dès le lancement",
    "Accès anticipé exclusif",
    "Gratuit à vie (fonctionnalités de base)",
    "Vos données restent sur votre téléphone",
  ],
};

export const newsletter = {
  headline: "Restez Informé",
  subheadline:
    "Recevez les nouvelles fonctionnalités et nos meilleurs conseils pour mieux gérer votre argent. 1 email par mois maximum. Zéro spam.",
  benefits: [
    "Nouveautés en avant-première",
    "Conseils budgétaires exclusifs",
    "Accès anticipé aux nouvelles fonctionnalités",
  ],
  button: "S'inscrire à la Newsletter",
  disclaimer: "Désabonnement en un clic. Aucune donnée partagée.",
};

export const footer = {
  description: "Application mobile de suivi des dépenses offline-first pour Madagascar. Bientôt disponible.",
  columns: [
    {
      title: "Produit",
      links: [
        { name: "Fonctionnalités", href: "#features" },
        { name: "FAQ", href: "#faq" },
        { name: "Newsletter", href: "#newsletter" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact", href: "mailto:support@moneytracker.mg" },
      ],
    },
    {
      title: "Légal",
      links: [
        { name: "Confidentialité", href: "/privacy" },
        { name: "Conditions", href: "/terms" },
      ],
    },
  ],
  social: [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
  ],
  copyright: "© 2026 Money Tracker. Conçu avec ❤️ à Madagascar.",
};
