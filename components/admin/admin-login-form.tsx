import { loginAdminAction } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AdminLoginFormProps = {
  hasError?: boolean;
};

export function AdminLoginForm({ hasError = false }: AdminLoginFormProps) {
  return (
    <Card className="mx-auto max-w-md border-white/12 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
        Admin Login
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-white">
        Secure MedPobeda access
      </h1>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        Sign in to manage inquiries, hospital partnerships, blog content, and
        operational analytics.
      </p>
      {hasError ? (
        <div className="mt-5 rounded-[1.3rem] border border-amber-300/20 bg-amber-400/10 px-4 py-4 text-sm text-amber-50">
          Invalid credentials. Please try again.
        </div>
      ) : null}
      <form action={loginAdminAction} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-white/90">
          Email
          <Input name="email" type="email" required placeholder="admin@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-white/90">
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

