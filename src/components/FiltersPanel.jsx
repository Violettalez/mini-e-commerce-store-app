import { BsSearchHeart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setSearchString,
  setSorting,
  addCategory,
  removeCategory,
  addBrand,
  removeBrand,
  setEndPrice,
  setStartPrice,
} from "../store/filtersSlice";

function FiltersPanel({ sortingName }) {
  const dispatch = useDispatch();
  const {
    category: selectedCategories,
    brand: selectedBrands,
    sorting,
    searchString,
    startPrice,
    endPrice,
    maxPrice,
  } = useSelector((state) => state.filters);

  const categories = [
    "T-Shirts",
    "Leggings",
    "Hoodies",
    "Shorts",
    "Tracksuits",
    "Tank Tops",
    "Jackets",
    "Socks",
  ];

  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Under Armour",
    "Reebok",
    "Lululemon",
  ];

  const sortingOptions = [
    { value: "none", label: "None" },
    { value: "price-low-to-high", label: "Price: Low to High" },
    { value: "price-high-to-low", label: "Price: High to Low" },
    { value: "top-rated", label: "Top Rated" },
  ];

  const handleCheckBoxCategoryChange = (cat) => {
    selectedCategories.includes(cat)
      ? dispatch(removeCategory(cat))
      : dispatch(addCategory(cat));
  };

  const handleCheckBoxBrandChange = (brand) => {
    selectedBrands.includes(brand)
      ? dispatch(removeBrand(brand))
      : dispatch(addBrand(brand));
  };

  const handleSortingChange = (value) => {
    dispatch(setSorting(value));
  };

  useEffect(() => {
    // Принудительно обновляем checked состояние
    const radio = document.querySelector(`input[value="${sorting}"]`);
    if (radio) {
      radio.checked = true;
    }
  }, [sorting]);

  return (
    <div className="flex flex-col gap-10 px-1 md:px-5 py-5">
      {/* Search */}
      <div className="relative w-full">
        <BsSearchHeart
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search products..."
          className="w-[90%] md:w-full text-xl md:text-base rounded-xl border bg-basic-weight border-gray-300 py-2 pl-10 pr-4 text-gray-700 focus:border-basic-red focus:ring-2 focus:ring-basic-red outline-none transition"
          value={searchString}
          onChange={(e) => dispatch(setSearchString(e.target.value))}
        />
      </div>

      {/* Sorting */}
      <div className="flex flex-col gap-2">
        <h2 className="font-header text-xl font-bold mb-1">Sorting</h2>
        {sortingOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={sortingName}
              value={option.value}
              className="accent-basic-red"
              checked={sorting === option.value}
              onChange={() => handleSortingChange(option.value)}
            />
            <span className="text-xl md:text-base">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-5 md:gap-2">
        <h2 className="font-header text-xl font-bold mb-2">Filters</h2>

        {/* Price filter */}
        <details className="flex flex-col gap-2" open>
          <summary className="text-xl md:text-base">Price</summary>
          <div className="flex w-full justify-start gap-2 *:text-xl *:md:text-base">
            <p>from :</p>
            <input
              type="number"
              className="border rounded px-2 h-7 w-20"
              value={startPrice}
              min={0}
              max={endPrice}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length > 1 && value.startsWith("0")) {
                  value = value.replace(/^0+/, "");
                }
                let num = Number(value);
                if (isNaN(num)) num = 0;
                if (num < 0) num = 0;
                if (num > endPrice) num = endPrice;
                dispatch(setStartPrice(num));
              }}
            />
            <p>to:</p>
            <input
              type="number"
              className="border rounded px-2 h-7 w-20"
              value={endPrice}
              min={startPrice + 1}
              max={maxPrice}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length > 1 && value.startsWith("0")) {
                  value = value.replace(/^0+/, "");
                }
                let num = Number(value);
                if (isNaN(num)) num = startPrice + 1;
                if (num < startPrice) num = startPrice;
                if (num > maxPrice) num = maxPrice;
                dispatch(setEndPrice(num));
              }}
            />
          </div>
        </details>

        {/* Category filter */}
        <details className="flex flex-col gap-2">
          <summary className="text-xl md:text-base">Category</summary>
          <ul className="flex flex-col gap-2 ml-4">
            {categories.map((cat) => (
              <li key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-basic-red"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCheckBoxCategoryChange(cat)}
                />
                <span className="text-xl md:text-base">{cat}</span>
              </li>
            ))}
          </ul>
        </details>

        {/* Brand filter */}
        <details className="flex flex-col gap-2">
          <summary className="text-xl md:text-base">Brand</summary>
          <ul className="flex flex-col gap-2 ml-4">
            {brands.map((brand) => (
              <li key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-basic-red"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleCheckBoxBrandChange(brand)}
                />
                <span className="text-xl md:text-base">{brand}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

export default FiltersPanel;
