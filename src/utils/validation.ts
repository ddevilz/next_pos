import { LoginSchema, LoginSchemaType } from "@/schemas";
import * as z from "zod";

export const validate = (values: LoginSchemaType): Record<string, string> => {
  try {
    LoginSchema.parse(values);
    return {};
  } catch (error) {
    const formErrors: Record<string, string> = {};
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          formErrors[err.path[0]] = err.message;
        }
      });
    }
    return formErrors;
  }
};
