import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Search as SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { useSearch } from "@/features/catalog/api";
import { EmptyState } from "@/components/shared/EmptyState";

const searchSchema = z.object({
  q: z.string().catch("").default(""),
});

export const Route = createFileRoute("/_public/search")({
  validateSearch: (s) => searchSchema.parse(s),
  component: SearchRoute,
});

function SearchRoute() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(q);

  const { data: results = [], isLoading, isFetched } = useSearch(q);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/search", search: { q: draft.trim() } });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:px-8 md:py-16 safe-x">
      <header className="mb-8 sm:mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground md:text-5xl">Search</h1>
        <form onSubmit={submit} className="mt-5 sm:mt-6 flex max-w-xl gap-2">
          <Input
            placeholder="Search products, categories…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            className="h-11 min-w-0 flex-1"
          />
          <Button type="submit" className="h-11 px-4 shrink-0">
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">Search</span>
          </Button>
        </form>
        {q && (
          <p className="mt-4 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} for{" "}
            <span className="text-foreground">"{q}"</span>
          </p>
        )}
      </header>

      {!q ? (
        <EmptyState
          title="Start typing"
          description="Search by product name, description, or category."
        />
      ) : isFetched && results.length === 0 ? (
        <EmptyState
          title="No matches"
          description="Try a different keyword or browse categories instead."
        />
      ) : (
        <ProductGrid products={results} loading={isLoading} />
      )}
    </div>
  );
}
