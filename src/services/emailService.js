import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export async function sendEnquiryNotification(data) {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: ADMIN_EMAIL,
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      event: data.event,
      package: data.package,
      message: data.message,
      submitted_at: new Date().toLocaleString(),
    },
    { publicKey: PUBLIC_KEY }
  );
}
