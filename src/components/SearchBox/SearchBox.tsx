import css from "./SearchBox.module.css";
import type { ChangeEvent } from "react";
import type { DebouncedState } from "use-debounce"

interface SearchBoxProps {
  onSearch:  DebouncedState<(value: string) => void>;
  value:string
}

export default function SearchBox({ onSearch,value }: SearchBoxProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      defaultValue={value}
      placeholder="Search notes"
      onChange={handleInputChange}
    />
  );
}
