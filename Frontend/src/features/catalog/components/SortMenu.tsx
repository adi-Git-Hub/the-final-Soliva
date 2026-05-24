import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ProductListQuery } from "../schema";

type Sort = ProductListQuery["sort"];

const OPTIONS: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

type Props = {
  value: Sort;
  onChange: (value: Sort) => void;
};

export function SortMenu({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as Sort)}>
      <SelectTrigger className="h-11 w-full sm:w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
