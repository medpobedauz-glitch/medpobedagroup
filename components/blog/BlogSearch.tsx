import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BlogSearchProps = {
  query?: string;
  currentCategory?: string;
  placeholder: string;
  submitLabel: string;
};

export function BlogSearch({
  query,
  currentCategory,
  placeholder,
  submitLabel,
}: BlogSearchProps) {
  return (
    <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
      {currentCategory ? <input type="hidden" name="category" value={currentCategory} /> : null}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          name="q"
          defaultValue={query}
          placeholder={placeholder}
          className="pl-11"
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        {submitLabel}
      </Button>
    </form>
  );
}
