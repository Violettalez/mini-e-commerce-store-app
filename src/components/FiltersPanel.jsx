import { BsSearchHeart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchString,
  setSorting,
  addCategory,
  removeCategory,
  addBrand,
  removeBrand,
  setEndPrice,
  setStartPrice,
  clearFilters,
} from "../store/filtersSlice";

function FiltersPanel() {
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state) => state.filters.category);
  const selectedBrands = useSelector((state) => state.filters.brand);
  const { searchString, sorting, startPrice, endPrice, maxPrice } = useSelector(
    (state) => state.filters
  );

  const handleCheckBoxCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      dispatch(removeCategory(category));
    } else {
      dispatch(addCategory(category));
    }
  };

  const handleCheckBoxBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      dispatch(removeBrand(brand));
    } else {
      dispatch(addBrand(brand));
    }
  };

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

  return (
    <div className="flex flex-col gap-10 w-full h-full overflow-y-auto px-1 md:px-5 py-5 ">
      {/* Search */}
      <div className="relative w-full">
        <BsSearchHeart
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search products..."
          className="w-[90%] text-xl md:text-base md:w-full rounded-xl border bg-basic-weight border-gray-300 py-2 pl-10 pr-4 text-gray-700 focus:border-basic-red focus:ring-2 focus:ring-basic-red outline-none transition"
          onChange={(e) => dispatch(setSearchString(e.target.value))}
          value={searchString}
        />
      </div>

      {/* Sorting */}
      <div className="flex flex-col gap-2">
        <h2 className="font-header text-xl font-bold mb-1">Sorting</h2>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sorting"
            className="accent-basic-red"
            checked={sorting === "none"}
            onChange={() => dispatch(setSorting("none"))}
          />
          <span className="text-xl md:text-base">None</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sorting"
            className="accent-basic-red"
            checked={sorting === "price-low-to-high"}
            onChange={() => dispatch(setSorting("price-low-to-high"))}
          />
          <span className="text-xl md:text-base">Price: Low to High</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sorting"
            className="accent-basic-red"
            checked={sorting === "price-high-to-low"}
            onChange={() => dispatch(setSorting("price-high-to-low"))}
          />
          <span className="text-xl md:text-base">Price: High to Low</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sorting"
            className="accent-basic-red"
            checked={sorting === "top-rated"}
            onChange={() => dispatch(setSorting("top-rated"))}
          />
          <span className="text-xl md:text-base">Top Rated</span>
        </label>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-5 md:gap-2">
        <h2 className="font-header text-xl font-bold mb-2">Filters</h2>

        {/* Price filter */}
        <details className="flex flex-col gap-2" open={true}>
          <summary className="text-xl md:text-base">Price</summary>
          <div className="flex w-full justify-start gap-2 *:text-xl *:md:text-base">
            <p>from :</p>
            <input
              type="number"
              className="border rounded px-2 h-7 w-20"
              value={startPrice}
              min={0}
              max={maxPrice}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value < 0) value = 0;
                if (value > endPrice) value = endPrice;
                dispatch(setStartPrice(value));
              }}
            />
            <p>to:</p>
            <input
              type="number"
              className="border rounded px-2 h-7 w-20"
              value={maxPrice}
              min={startPrice}
              max={maxPrice}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value > maxPrice) value = maxPrice;
                if (value < startPrice) value = startPrice;
                dispatch(setEndPrice(value));
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
                <p className="text-xl md:text-base">{cat}</p>
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
                <p className="text-xl md:text-base">{brand}</p>
              </li>
            ))}
          </ul>
        </details>
        <button
          className="mt-4 bg-basic-red text-white py-2 px-4 rounded hover:bg-dark-red md:text-base text-xl"
          onClick={() => {
            dispatch(clearFilters());
          }}
        >
          Clean Filters
        </button>
      </div>
    </div>
  );
}

export default FiltersPanel;
