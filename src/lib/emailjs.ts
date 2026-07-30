import emailjs from "@emailjs/browser";
import type { ContactFormValues } from "@/types";
import { env } from "@/lib/env";

export async function sendContactEmail(data: ContactFormValues) {
  return emailjs.send(
    env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    },
    env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
}
