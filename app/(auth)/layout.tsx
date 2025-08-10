import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-4 sm:p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={"/"} className="flex items-center gap-2 self-center">
          <div className="flex items-center justify-center">
            <Image
              src={"/images/logo.png"}
              alt={"Semester Logo"}
              width={30}
              height={30}
            />
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
