import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().min(1, "NEXT_PUBLIC_EMAILJS_SERVICE_ID is required"),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string().min(1, "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID is required"),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string().min(1, "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is required"),
});

type Env = z.infer<typeof envSchema>;

let _env: Env | null = null;

function getEnv(): Env {
  if (!_env) {
    _env = envSchema.parse(process.env);
  }
  return _env;
}

export const env: Env = new Proxy({} as Env, {
  get(_, key) {
    return getEnv()[key as keyof Env];
  },
});
