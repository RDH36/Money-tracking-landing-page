import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/constants/content";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | Mitsitsy",
  description: "Conditions générales d'utilisation de Mitsitsy.",
};

export default function TermsPage() {
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
            Conditions d'Utilisation
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Dernière mise à jour : Janvier 2026
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Acceptation des Conditions
              </h2>
              <p className="text-gray-600 mb-4">
                En téléchargeant, installant ou utilisant l'application {siteConfig.name},
                vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez
                pas ces conditions, veuillez ne pas utiliser l'application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Description du Service
              </h2>
              <p className="text-gray-600 mb-4">
                {siteConfig.name} est une application mobile de suivi des dépenses personnelles.
                Elle permet de :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Enregistrer vos transactions (revenus et dépenses)</li>
                <li>Catégoriser vos dépenses</li>
                <li>Gérer plusieurs comptes</li>
                <li>Visualiser vos statistiques financières</li>
                <li>Planifier vos budgets</li>
              </ul>
              <p className="text-gray-600 mb-4">
                L'application fonctionne entièrement hors ligne. Vos données sont stockées
                localement sur votre appareil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Utilisation de l'Application
              </h2>
              <p className="text-gray-600 mb-4">
                Vous vous engagez à :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Utiliser l'application uniquement à des fins personnelles et légales</li>
                <li>Ne pas tenter de modifier, décompiler ou désassembler l'application</li>
                <li>Ne pas utiliser l'application pour des activités frauduleuses</li>
                <li>Assurer la sauvegarde de vos propres données</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Propriété Intellectuelle
              </h2>
              <p className="text-gray-600 mb-4">
                L'application {siteConfig.name}, son code source, son design, ses icônes et
                son contenu sont protégés par les lois sur la propriété intellectuelle.
                Vous bénéficiez d'une licence d'utilisation personnelle, non exclusive et
                non transférable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Données et Responsabilité
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>Vos données :</strong> Toutes vos données financières sont stockées
                localement sur votre appareil. Nous n'avons pas accès à ces données.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Sauvegarde :</strong> Vous êtes responsable de la sauvegarde de vos
                données. En cas de perte, vol ou dommage de votre appareil, vos données
                pourraient être perdues.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Exactitude :</strong> L'application est un outil d'aide à la gestion
                financière. Nous ne garantissons pas l'exactitude des calculs ou des
                conversions de devises. Vérifiez toujours les informations importantes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Limitation de Responsabilité
              </h2>
              <p className="text-gray-600 mb-4">
                L'application est fournie "en l'état". Nous ne garantissons pas que
                l'application sera exempte d'erreurs ou fonctionnera sans interruption.
              </p>
              <p className="text-gray-600 mb-4">
                En aucun cas, {siteConfig.name} ne pourra être tenu responsable de :
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Pertes de données</li>
                <li>Décisions financières basées sur l'utilisation de l'application</li>
                <li>Dommages indirects ou consécutifs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Gratuité
              </h2>
              <p className="text-gray-600 mb-4">
                L'application de base est gratuite et le restera. Aucune publicité n'est
                affichée. Une version Premium avec des fonctionnalités supplémentaires
                (comme la synchronisation cloud) pourra être proposée ultérieurement
                de manière optionnelle.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Modifications
              </h2>
              <p className="text-gray-600 mb-4">
                Nous nous réservons le droit de modifier ces conditions à tout moment.
                Les modifications prendront effet dès leur publication. L'utilisation
                continue de l'application après modification vaut acceptation des
                nouvelles conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. Résiliation
              </h2>
              <p className="text-gray-600 mb-4">
                Vous pouvez cesser d'utiliser l'application à tout moment en la
                désinstallant. Vos données locales seront supprimées avec l'application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Droit Applicable
              </h2>
              <p className="text-gray-600 mb-4">
                Ces conditions sont régies par les lois de Madagascar. Tout litige sera
                soumis à la compétence exclusive des tribunaux d'Antananarivo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Contact
              </h2>
              <p className="text-gray-600 mb-4">
                Pour toute question concernant ces conditions d'utilisation :
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
