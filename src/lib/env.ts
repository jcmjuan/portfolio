import { z } from "zod";

type EnvKey =
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "NEXT_PUBLIC_EMAILJS_SERVICE_ID"
  | "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID"
  | "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY";

type Env = Record<EnvKey, string>;

const validators: Record<EnvKey, z.ZodTypeAny> = {
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().min(1, "NEXT_PUBLIC_EMAILJS_SERVICE_ID is required"),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string().min(1, "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID is required"),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string().min(1, "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is required"),
};

const cache: Partial<Env> = {};

export const env: Env = new Proxy({} as Env, {
  get(_, key) {
    if (typeof key !== "string") return undefined;

    const k = key as EnvKey;
    if (k in cache) return cache[k] as string;

    const validator = validators[k];
    if (!validator) return undefined;

    const result = validator.safeParse(process.env[k]);
    if (!result.success) throw new Error(result.error.issues[0].message);

    cache[k] = result.data as string;
    return result.data;
  },
});
