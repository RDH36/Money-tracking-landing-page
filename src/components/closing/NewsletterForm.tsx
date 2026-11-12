"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { subscribeToNewsletter } from "@/actions/newsletter";

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, {
    success: false,
  });

  if (state.success) {
    return (
      <div id="newsletter" className="lp-form" role="status">
        <h3>{t("thankYou")}</h3>
        <p className="lp-form-done">{t("subheadline")}</p>
      </div>
    );
  }

  return (
    <form id="newsletter" className="lp-form" action={formAction}>
      <h3>{t("headline")}</h3>
      <small>{t("subheadline")}</small>
      <label htmlFor="newsletter-email">
        {t("form.email")} {t("form.required")}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder={t("form.emailPlaceholder")}
        required
        disabled={isPending}
      />
      <label htmlFor="newsletter-first-name">
        {t("form.firstName")} {t("form.optional")}
      </label>
      <input
        id="newsletter-first-name"
        name="firstName"
        type="text"
        autoComplete="given-name"
        placeholder={t("form.firstNamePlaceholder")}
        disabled={isPending}
      />
      <label className="lp-consent">
        <input
          type="checkbox"
          name="newsletterApproval"
          value="true"
          disabled={isPending}
        />
        {t("newsletterApprovalLabel")}
      </label>
      {state.error && (
        <p className="lp-form-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="lp-btn lp-btn-light" type="submit" disabled={isPending}>
        {isPending ? t("subscribing") : t("button")}
      </button>
      <small>{t("disclaimer")}</small>
    </form>
  );
}
