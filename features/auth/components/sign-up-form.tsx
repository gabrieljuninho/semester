"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SignUpSchema } from "@/schemas/auth";

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

const SignUpForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setIsPending(true);
    console.log(values);
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    disabled={isPending}
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
                    disabled={isPending}
                  />
                  <button
                    type={"button"}
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
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
                    disabled={isPending}
                  />
                  <button
                    type={"button"}
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
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
          disabled={isPending}
        >
          {isPending ? (
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
