import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const Social = () => {
  return (
    <Button variant={"outline"} className="cursor-pointer">
      <FcGoogle />
      <span>Continue with Google</span>
    </Button>
  );
};

export default Social;
