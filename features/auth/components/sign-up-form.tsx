"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

import { SignUpSchema } from "@/schemas/auth";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SignUpResponse } from "@/features/auth/types";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof SignUpSchema>) => {
      const response = await api.post<SignUpResponse>("/v1/auth/signup", data);

      return response;
    },
    onSuccess: (response) => {
      if (response.status === 201) {
        setAlertMessage(response.data.message);
        setAlertType("success");
        form.reset();
        router.push("/account/verify");
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        const status = error.response?.status;

        if (status === 400 || status === 409 || status === 500) {
          setAlertMessage(message);
          setAlertType("error");
        }
      } else {
        setAlertMessage("An unexpected error occurred. Please try again.");
        setAlertType("error");
      }

      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setAlertMessage(null);
    setAlertType(null);
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {alertMessage && alertType && (
          <Alert
            variant={alertType === "success" ? "default" : "destructive"}
            className={cn(
              alertType === "error" &&
                "border-destructive/20! bg-destructive/5",
              alertType === "success" && "border-green-200 bg-green-50"
            )}
          >
            <AlertDescription
              className={cn(alertType === "success" && "text-green-700!")}
            >
              {alertMessage}
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    {...field}
                    type={"email"}
                    placeholder={"example@site.com"}
                    autoComplete={"off"}
                    className="pl-9 text-sm"
                    disabled={mutation.isPending}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder={"Minimum 8 characters"}
                    autoComplete={"off"}
                    className="px-9 text-sm"
                    disabled={mutation.isPending}
                  />
                  <button
                    type={"button"}
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"confirmPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={"Minimum 8 characters"}
                    autoComplete={"off"}
                    className="px-9 text-sm"
                    disabled={mutation.isPending}
                  />
                  <button
                    type={"button"}
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type={"submit"}
          className="w-full cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              <span>Please wait</span>
            </>
          ) : (
            "Create an account"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
