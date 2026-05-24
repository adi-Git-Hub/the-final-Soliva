import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCategories } from "../api";
import type { Category } from "../schema";

type Props = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  onChange: (next: { category?: string; minPrice?: number; maxPrice?: number }) => void;
  onClear: () => void;
};

export function FilterSidebar({ category, minPrice, maxPrice, onChange, onClear }: Props) {
  const { data: categories = [] } = useCategories();

  return (
    <aside className="space-y-6">
      <section>
        <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Category
        </h4>
        <ul className="space-y-1.5">
          <li>
            <button
              type="button"
              onClick={() => onChange({ category: undefined })}
              className={
                "text-left text-sm transition-colors " +
                (!category ? "text-foreground" : "text-muted-foreground hover:text-foreground")
              }
            >
              All
            </button>
          </li>
          {categories.map((c: Category) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onChange({ category: c.slug })}
                className={
                  "text-left text-sm transition-colors " +
                  (category === c.slug
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      <section>
        <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Price
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minPrice" className="sr-only">
              Min
            </Label>
            <Input
              id="minPrice"
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={(e) =>
                onChange({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="maxPrice" className="sr-only">
              Max
            </Label>
            <Input
              id="maxPrice"
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={(e) =>
                onChange({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </div>
        </div>
      </section>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="w-full justify-start text-muted-foreground"
      >
        Clear filters
      </Button>
    </aside>
  );
}
