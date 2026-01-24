import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/constants/content";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Mitsitsy",
  description: "Politique de confidentialité de Mitsitsy - Comment nous protégeons vos données.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Politique de Confidentialité
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Dernière mise à jour : Janvier 2026
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                {siteConfig.name} ("nous", "notre", "nos") s'engage à protéger votre vie privée.
                Cette politique de confidentialité explique comment nous collectons, utilisons et
                protégeons vos informations lorsque vous utilisez notre application mobile et notre
                site web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Données Collectées
              </h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                2.1 Données de l'Application
              </h3>
              <p className="text-gray-600 mb-4">
                Mitsitsy est conçu selon le principe "offline-first". Toutes vos données
                financières (transactions, comptes, catégories, planifications) sont stockées
                <strong> localement sur votre appareil</strong> uniquement. Nous n'avons pas accès
                à ces données et elles ne sont jamais transmises à nos serveurs.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-2">
                2.2 Newsletter
              </h3>
              <p className="text-gray-600 mb-4">
                Si vous vous inscrivez à notre newsletter, nous collectons :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Votre adresse email</li>
                <li>Votre prénom (optionnel)</li>
                <li>La date d'inscription</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Ces données sont utilisées uniquement pour vous envoyer des informations sur
                Mitsitsy (nouveautés, conseils, lancement). Vous pouvez vous désabonner
                à tout moment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Stockage des Données
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>Données de l'application :</strong> Stockées localement sur votre appareil
                dans une base de données SQLite. Ces données ne quittent jamais votre téléphone
                sauf si vous choisissez explicitement de les exporter.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Données newsletter :</strong> Stockées de manière sécurisée sur nos serveurs
                avec chiffrement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Partage des Données
              </h2>
              <p className="text-gray-600 mb-4">
                Nous ne vendons, ne louons et ne partageons jamais vos données personnelles avec
                des tiers à des fins commerciales.
              </p>
              <p className="text-gray-600 mb-4">
                Vos données financières dans l'application restent sur votre appareil et ne sont
                accessibles que par vous.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Vos Droits
              </h2>
              <p className="text-gray-600 mb-4">
                Vous avez le droit de :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Accéder à vos données personnelles</li>
                <li>Rectifier vos données</li>
                <li>Supprimer vos données</li>
                <li>Vous désabonner de la newsletter</li>
                <li>Exporter vos données de l'application</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Pour exercer ces droits, contactez-nous à : support@mitsitsy.mg
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Sécurité
              </h2>
              <p className="text-gray-600 mb-4">
                Nous prenons la sécurité de vos données au sérieux :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>L'application fonctionne entièrement hors ligne</li>
                <li>Vos données financières ne transitent jamais par internet</li>
                <li>Possibilité de masquer votre solde pour protéger votre vie privée</li>
                <li>Aucune publicité ni traceur dans l'application</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Modifications
              </h2>
              <p className="text-gray-600 mb-4">
                Nous pouvons mettre à jour cette politique de confidentialité. Les modifications
                seront publiées sur cette page avec une nouvelle date de mise à jour.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Contact
              </h2>
              <p className="text-gray-600 mb-4">
                Pour toute question concernant cette politique de confidentialité :
              </p>
              <p className="text-gray-600">
                Email : <a href="mailto:support@mitsitsy.mg" className="text-primary hover:underline">support@mitsitsy.mg</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
