"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Activity,
  Building2,
  CornerDownLeft,
  FileQuestion,
  Hospital,
  Loader2,
  Search as SearchIcon,
  Stethoscope,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";
import { stripLocaleFromPath } from "@/lib/i18n/config";

type PublicSearchItemType =
  | "page"
  | "disease"
  | "treatment"
  | "hospital"
  | "doctor"
  | "cost"
  | "faq"
  | "specialty";

type PublicSearchItem = {
  id: string;
  type: PublicSearchItemType;
  title: string;
  description: string;
  href: string;
  category?: string;
  keywords: string[];
  badge?: string;
};

type SearchResponse = {
  items: PublicSearchItem[];
  total: number;
  query: string;
};

const TYPE_META: Record<PublicSearchItemType, { label: string; icon: LucideIcon; tone: string }> = {
  page: { label: "Page", icon: ArrowRight, tone: "text-sky-700 bg-sky-50 border-sky-100" },
  disease: { label: "Disease", icon: Activity, tone: "text-rose-700 bg-rose-50 border-rose-100" },
  treatment: { label: "Treatment", icon: Stethoscope, tone: "text-blue-700 bg-blue-50 border-blue-100" },
  hospital: { label: "Hospital", icon: Building2, tone: "text-cyan-700 bg-cyan-50 border-cyan-100" },
  doctor: { label: "Doctor", icon: UserRound, tone: "text-indigo-700 bg-indigo-50 border-indigo-100" },
  cost: { label: "Cost", icon: Hospital, tone: "text-emerald-700 bg-emerald-50 border-emerald-100" },
  faq: { label: "FAQ", icon: FileQuestion, tone: "text-violet-700 bg-violet-50 border-violet-100" },
  specialty: { label: "Specialty", icon: Stethoscope, tone: "text-amber-700 bg-amber-50 border-amber-100" },
};

const QUICK_LINKS_LABEL = "Quick links";
const RECENT_LABEL = "Recent searches";
const NO_RESULTS_LABEL = "No matches";

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-amber-100 px-0.5 text-slate-900">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function useRecentSearches() {
  const STORAGE_KEY = "medpobeda-recent-searches";
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecents(parsed.filter((v): v is string => typeof v === "string").slice(0, 5));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const push = useCallback((term: string) => {
    const trimmed = term.trim();
    if (trimmed.length < 2) return;
    setRecents((current) => {
      const next = [trimmed, ...current.filter((c) => c.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setRecents([]);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { recents, push, clear };
}

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

type SiteSearchPaletteProps = {
  localePathStripper?: (path: string) => string;
};

export function SiteSearchPalette({ localePathStripper }: SiteSearchPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<PublicSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { recents, push, clear: clearRecents } = useRecentSearches();
  const [mac, setMac] = useState(false);

  const stripLocale = useCallback(
    (path: string) => {
      if (localePathStripper) return localePathStripper(path);
      return stripLocaleFromPath(path);
    },
    [localePathStripper],
  );

  // Detect platform once
  useEffect(() => {
    setMac(isMac());
  }, []);

  // Keyboard shortcut: Cmd/Ctrl+K to open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Debounced fetch when query changes
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!open) return;

    if (query.trim().length < 2) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `/api/public-search?q=${encodeURIComponent(query)}&limit=10`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) {
          setItems([]);
          return;
        }
        const data: SearchResponse = await res.json();
        setItems(data.items ?? []);
        setActiveIndex(0);
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, open]);

  // Reset loading when dialog closes
  useEffect(() => {
    if (!open) {
      setIsLoading(false);
    }
  }, [open]);

  const handleSelect = useCallback(
    (item: PublicSearchItem | null, index: number) => {
      if (!item) return;
      push(query);
      setOpen(false);
      const path = stripLocale(item.href);
      // Use anchor scroll if href has a hash
      if (path.includes("#")) {
        const [base, anchor] = path.split("#");
        router.push(base || "/");
        setTimeout(() => {
          const el = document.getElementById(anchor);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 250);
      } else {
        router.push(path);
      }
      // Keep index for reference even though we don't use it now
      void index;
    },
    [push, query, router, stripLocale],
  );

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(items.length - 1, 0)));
        scrollActiveIntoView();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        scrollActiveIntoView();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (items[activeIndex]) {
          handleSelect(items[activeIndex], activeIndex);
        } else if (query.trim().length >= 2) {
          // Search the blog as fallback
          push(query);
          setOpen(false);
          router.push(`/blog?q=${encodeURIComponent(query)}`);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    },
    [activeIndex, handleSelect, items, push, query, router],
  );

  function scrollActiveIntoView() {
    requestAnimationFrame(() => {
      const list = listRef.current;
      if (!list) return;
      const active = list.querySelector<HTMLElement>('[data-active="true"]');
      if (active) {
        active.scrollIntoView({ block: "nearest" });
      }
    });
  }

  // Group items by type for the results view
  const grouped = useMemo(() => {
    const groups: Array<{ type: PublicSearchItemType; items: PublicSearchItem[] }> = [];
    for (const item of items) {
      const existing = groups.find((g) => g.type === item.type);
      if (existing) {
        existing.items.push(item);
      } else {
        groups.push({ type: item.type, items: [item] });
      }
    }
    return groups;
  }, [items]);

  const shortcutLabel = mac ? "⌘ K" : "Ctrl K";

  return (
    <>
      {/* Trigger pill — visible in header / floating */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.04)] backdrop-blur transition hover:border-blue-300 hover:text-blue-700 hover:shadow-md sm:px-3.5 sm:py-2"
      >
        <SearchIcon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[0.65rem] text-slate-500 sm:inline">
          {shortcutLabel}
        </kbd>
      </button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-slate-950/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
          <DialogPrimitive.Content
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              inputRef.current?.focus();
            }}
            className="fixed left-1/2 top-[10vh] z-[81] w-[calc(100%-1rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_30px_80px_rgba(2,22,47,0.32)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 sm:w-[calc(100%-2rem)]"
          >
            <DialogPrimitive.Title className="sr-only">Search the website</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Use this dialog to search across pages, cost guide, FAQs, and treatments.
            </DialogPrimitive.Description>

            {/* Search input row */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
              <SearchIcon className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search treatments, costs, FAQs, pages…"
                className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                aria-label="Search query"
                aria-autocomplete="list"
                aria-controls="site-search-results"
                spellCheck={false}
                autoComplete="off"
              />
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  aria-label="Close search"
                  className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogPrimitive.Close>
            </div>

            {/* Results area */}
            <div
              ref={listRef}
              id="site-search-results"
              role="listbox"
              aria-label="Search results"
              className="max-h-[60vh] overflow-y-auto px-2 py-2"
            >
              {/* Empty state: quick links + recents */}
              {query.trim().length < 2 && (
                <div className="space-y-3">
                  {recents.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between px-3 pb-1.5">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {RECENT_LABEL}
                        </p>
                        <button
                          type="button"
                          onClick={clearRecents}
                          className="text-[0.65rem] font-medium text-slate-400 hover:text-slate-700"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-3 pb-2">
                        {recents.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setQuery(r)}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="px-3 pb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {QUICK_LINKS_LABEL}
                  </p>
                  <div className="grid gap-0.5 sm:grid-cols-2">
                    {items.length === 0 ? (
                      <p className="col-span-2 px-3 py-4 text-center text-xs text-slate-400">
                        Start typing to search pages, diseases, treatments, hospitals, and doctors,
                        or pick a quick link below.
                      </p>
                    ) : null}
                  </div>
                </div>
              )}

              {/* Results state */}
              {query.trim().length >= 2 && (
                <div className="space-y-2">
                  {grouped.length === 0 && !isLoading && (
                    <div className="px-4 py-10 text-center">
                      <p className="text-sm font-semibold text-slate-700">{NO_RESULTS_LABEL}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Try a different keyword or browse the <Link href="/cost-guide" className="text-blue-600 underline">cost guide</Link>.
                      </p>
                    </div>
                  )}

                  {grouped.map((group) => {
                    const meta = TYPE_META[group.type];
                    const Icon = meta.icon;
                    return (
                      <div key={group.type} className="pb-1">
                        <div className="flex items-center gap-2 px-3 pb-1.5">
                          <Icon className={cn("h-3 w-3", meta.tone.split(" ")[0])} />
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {meta.label}
                          </p>
                          <span className="text-[0.65rem] text-slate-400">
                            {group.items.length}
                          </span>
                        </div>

                        {group.items.map((item) => {
                          const globalIndex = items.findIndex((i) => i.id === item.id);
                          const isActive = globalIndex === activeIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              data-active={isActive}
                              onClick={() => handleSelect(item, globalIndex)}
                              onMouseEnter={() => setActiveIndex(globalIndex)}
                              className={cn(
                                "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition",
                                isActive
                                  ? "bg-blue-50 ring-1 ring-blue-200"
                                  : "hover:bg-slate-50",
                              )}
                            >
                              <span
                                className={cn(
                                  "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border",
                                  meta.tone,
                                )}
                              >
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span className="truncate text-sm font-semibold text-slate-900">
                                    {highlightMatch(item.title, query)}
                                  </span>
                                  {item.badge ? (
                                    <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[0.6rem] font-semibold text-slate-600">
                                      {item.badge}
                                    </span>
                                  ) : null}
                                </span>
                                <span className="mt-0.5 line-clamp-1 text-[0.72rem] text-slate-500">
                                  {highlightMatch(item.description, query)}
                                </span>
                                <span className="mt-0.5 block truncate text-[0.65rem] text-slate-400">
                                  {item.href}
                                </span>
                              </span>
                              <CornerDownLeft
                                className={cn(
                                  "mt-1 h-3.5 w-3.5 shrink-0 transition",
                                  isActive ? "text-blue-600 opacity-100" : "text-slate-300 opacity-0",
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}

                  {query.trim().length >= 2 && grouped.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        push(query);
                        setOpen(false);
                        router.push(`/blog?q=${encodeURIComponent(query)}`);
                      }}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50/50 px-3 py-2.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                    >
                      Search blog articles for “{query}”
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer with keyboard hints */}
            <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-2.5 text-[0.65rem] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[0.6rem] text-slate-600">↑↓</kbd>
                  navigate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[0.6rem] text-slate-600">↵</kbd>
                  open
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[0.6rem] text-slate-600">esc</kbd>
                  close
                </span>
              </div>
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[0.6rem] text-slate-600">{shortcutLabel}</kbd>
                toggle
              </span>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
