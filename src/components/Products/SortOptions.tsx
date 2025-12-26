import { ChangeEvent, FC } from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions:FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    const sortBy = e.target.value;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", sortBy);

    setSearchParams(newParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        id="sort"
        value={searchParams.get("sortBy") ?? ""}
        onChange={handleSortChange}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
