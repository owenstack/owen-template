"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";

export function Submit({ className, variant, size, children }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      disabled={pending}
      type="submit"
    >
      {pending ? <Loader className="size-6 animate-spin" /> : children}
    </Button>
  );
}
