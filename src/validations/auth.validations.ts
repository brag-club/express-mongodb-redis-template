import { object, string, TypeOf } from "zod";

const createUserInputSchema = {
  body: object({
    email: string({
      required_error: "Email is required!",
    }).email("Email is not valid!"),
    password: string({
      required_error: "Password is required!",
    }).min(6, "Password must be at least 6 characters long!"),
    name: object({
      first: string({
        required_error: "First name is required!",
      }),
      last: string({
        required_error: "Last name is required!",
      }),
    }),
  }),
};

const loginUserInputSchema = {
  body: object({
    email: string({
      required_error: "Email is required!",
    }).email("Email is not valid!"),
    password: string({
      required_error: "Password is required!",
    }).min(6, "Password must be at least 6 characters long!"),
  }),
};

export const createUserInput = object(createUserInputSchema);
export const loginUserInput = object(loginUserInputSchema);

export type CreateUserInput = TypeOf<typeof createUserInput>;
export type LoginUserInput = TypeOf<typeof loginUserInput>;
