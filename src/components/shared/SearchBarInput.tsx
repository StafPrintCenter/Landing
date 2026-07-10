import { useEffect, useState } from "react";
import { SearchBarField } from "./SearchBarField";

interface SearchBarInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchBarInput({ value, onChange, placeholder }: SearchBarInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localValue.trim());
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <SearchBarField
      value={localValue}
      onValueChange={setLocalValue}
      onSubmit={handleSubmit}
      onClear={handleClear}
      placeholder={placeholder}
    />
  );
}