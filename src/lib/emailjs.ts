import emailjs from "@emailjs/browser";
import type { ContactFormValues } from "@/types";

export async function sendContactEmail(data: ContactFormValues) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    },
    publicKey
  );
}
