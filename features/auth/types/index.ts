import { User } from "@prisma/client";

export type SignUpResponse = {
  message: string;
  data?: User;
};
