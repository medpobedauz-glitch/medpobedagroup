"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button, type ButtonProps } from "@/components/ui/button";

type SubmitButtonProps = ButtonProps & {
  pendingLabel?: string;
  children: ReactNode;
};

export function SubmitButton({
  pendingLabel = "Submitting...",
  children,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending || props.disabled}>
      {pending ? pendingLabel : children}
    </Button>
  );
}

