import FormLayout from "@/features/auth/components/form-layout";
import SignUpForm from "@/features/auth/components/sign-up-form";

const SignUpPage = () => {
  return (
    <FormLayout
      title={"Sign Up"}
      description={"Create a new account"}
      type={"signup"}
    >
      <SignUpForm />
    </FormLayout>
  );
};

export default SignUpPage;
