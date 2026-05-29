import { loginAdminAction } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AdminLoginFormProps = {
  hasError?: boolean;
};

export function AdminLoginForm({ hasError = false }: AdminLoginFormProps) {
  return (
    <Card variant="light" className="mx-auto max-w-md border-slate-200/80 p-5 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
        Admin Login
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-slate-950">
        Secure MedPobeda access
      </h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        Sign in to manage inquiries, hospital partnerships, blog content, and
        operational analytics.
      </p>
      {hasError ? (
        <div className="mt-5 rounded-[1.3rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
          Invalid credentials. Please try again.
        </div>
      ) : null}
      <form action={loginAdminAction} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email
          <Input name="email" type="email" required placeholder="info@medpobedagroup.uz" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Password
          <Input
            name="password"
            type="password"
            required
            placeholder="Your admin password"
          />
        </label>
        <SubmitButton
          type="submit"
          variant="hero"
          size="lg"
          className="w-full justify-center"
          pendingLabel="Signing in..."
        >
          Sign In
        </SubmitButton>
      </form>
    </Card>
  );
}
