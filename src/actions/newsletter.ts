"use server";

import { supabase } from "@/lib/supabase";

interface NewsletterState {
  success: boolean;
  error?: string;
}

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = formData.get("email") as string;
  const firstName = (formData.get("firstName") as string) || null;
  const newsletterApproval = formData.get("newsletterApproval") === "true";

  // Validation
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email invalide" };
  }

  try {
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      first_name: firstName,
      project: "Mitsitsy",
      newsletter_approval: newsletterApproval,
    });

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "Cet email est déjà inscrit" };
      }
      console.error("Supabase error:", error);
      return { success: false, error: "Erreur lors de l'inscription" };
    }

    return { success: true };
  } catch (error) {
    console.error("Newsletter error:", error);
    return { success: false, error: "Erreur lors de l'inscription" };
  }
}
