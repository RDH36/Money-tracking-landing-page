"use server";

interface NewsletterState {
  success: boolean;
  error?: string;
}

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;

  // Validation
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email invalide" };
  }

  try {
    // In production, integrate with:
    // - Resend: await resend.contacts.create({ email, firstName, audienceId: "..." })
    // - Mailchimp: await mailchimp.lists.addListMember("listId", { email_address: email })
    // - Database: await db.newsletter.create({ data: { email, firstName } })

    // Simulate network delay for demo
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For development, just log
    console.log("Newsletter subscription:", {
      email,
      firstName,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Newsletter error:", error);
    return { success: false, error: "Erreur lors de l'inscription" };
  }
}
