import { z } from "zod";

export const CredentialSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, "Passwords must be at least 8 characters long."),
});
