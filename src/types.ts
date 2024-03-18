export type AuthFormState =
  | {
      email?: string[] | undefined;
      password?: string[] | undefined;
      message?: string;
    }
  | undefined;

export type ForgetPasswordFormState =
  | { success: true }
  | {
      success: false;
      email?: string[] | undefined;
      message?: string;
    };
