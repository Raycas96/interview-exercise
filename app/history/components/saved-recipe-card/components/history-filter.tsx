"use client";

import { RadioGroupField } from "@/components/radio-group-field";

export type HistoryFilter = "all" | "liked" | "disliked";

interface HistoryFilterProps {
  activeFilter: HistoryFilter;
  onFilterChange: (filter: HistoryFilter) => void;
}

const filters: Array<{ id: HistoryFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "liked", label: "Liked" },
  { id: "disliked", label: "Disliked" },
];

export function HistoryFilter({
  activeFilter,
  onFilterChange,
}: HistoryFilterProps) {
  return (
    <RadioGroupField
      className="mt-4"
      label="Filter"
      value={activeFilter}
      options={filters.map((filter) => ({
        value: filter.id,
        label: filter.label,
      }))}
      onChange={onFilterChange}
      ariaLabel="History filter"
      optionsClassName="grid-cols-1 sm:grid-cols-3"
    />
  );
}
