import { NextRequest, NextResponse } from "next/server";

import { User } from "@prisma/client";

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

import { SignUpSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/features/auth/services/user";

export const POST = async (
  request: NextRequest
): Promise<
  NextResponse<{
    message: string;
    data?: User;
  }>
> => {
  try {
    const body = await request.json();

    const validatedFields = SignUpSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Please check your input and try again.",
          errors: validatedFields.error.issues,
        },
        { status: 400 }
      );
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "An account with this email already exists. Please log in or use a different email.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Your account has been created successfully!", data: user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Something went wrong. Please try again later.",
          errors: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred. Please contact support." },
      { status: 500 }
    );
  }
};
