import ProductItem from "../components/ProductItem";
import { BsSearchHeart } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBoxes } from "react-icons/fa";
import {
  setSearchString,
  setSorting,
  addCategory,
  removeCategory,
  addBrand,
  removeBrand,
  setEndPrice,
} from "../store/filtersSlice";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);

  const dispatch = useDispatch();
  const selectedCategories = useSelector((state) => state.filters.category);
  const selectedBrands = useSelector((state) => state.filters.brand);
  const { searchString, sorting, category, brand, startPrice, endPrice } =
    useSelector((state) => state.filters);

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

  const filterProducts = () => {
    let filtered = products
      .filter(
        (pr) =>
          searchString === "" ||
          pr.title.toLowerCase().includes(searchString.toLowerCase())
      )
      .filter((pr) => category.length === 0 || category.includes(pr.category))
      .filter((pr) => brand.length === 0 || brand.includes(pr.brand))
      .filter((pr) => pr.price >= startPrice && pr.price <= endPrice);

    switch (sorting) {
      case "price-low-to-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "top-rated":
        filtered.sort((a, b) => b.rating - a.rating); // предполагаем, что есть поле rating
        break;
      case "none":
      default:
        break; // без сортировки
    }

    return filtered;
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://68a58ad62a3deed2960dd7bd.mockapi.io/api/v1/products"
      );
      return res.data || [];
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const prods = await fetchProducts();
      setProducts(prods);

      if (prods.length > 0) {
        const max = Math.max(...prods.map((p) => p.price));
        setMaxPrice(max);
        dispatch(setEndPrice(max));
      }

      setLoading(false);
    };

    getProducts();
  }, [dispatch]);

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
    <div className="flex bg-basic-weight w-full min-h-[85vh] rounded-xl pt-10">
      <section className="bg-dark-weight flex-1 py-5 px-5 rounded-xl flex flex-col gap-10">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <BsSearchHeart
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border bg-basic-weight border-gray-300 py-2 pl-10 pr-4 text-gray-700 focus:border-basic-red focus:ring-2 focus:ring-basic-red outline-none transition"
            onChange={(e) => dispatch(setSearchString(e.target.value))}
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
            <span>None</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sorting"
              className="accent-basic-red"
              onChange={() => dispatch(setSorting("price-low-to-high"))}
            />
            <span>Price: Low to High</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sorting"
              className="accent-basic-red"
              onChange={() => dispatch(setSorting("price-high-to-low"))}
            />
            <span>Price: High to Low</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sorting"
              className="accent-basic-red"
              onChange={() => dispatch(setSorting("top-rated"))}
            />
            <span>Top Rated</span>
          </label>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2">
          <h2 className="font-header text-xl font-bold mb-2">Filters</h2>

          {/* Price filter */}
          <details className="flex flex-col gap-2" open={true}>
            <summary>Price</summary>
            <div className="flex w-full justify-start gap-2">
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
                  dispatch(setStartPrice(Number(e.target.value)));
                }}
              />
              <p>to:</p>
              <input
                type="number"
                className="border rounded px-2 h-7 w-20"
                value={endPrice}
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
            <summary>Category</summary>
            <ul className="flex flex-col gap-2 ml-4">
              {categories.map((cat) => (
                <li key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-basic-red"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCheckBoxCategoryChange(cat)}
                  />
                  <p>{cat}</p>
                </li>
              ))}
            </ul>
          </details>

          {/* Brand filter */}
          <details className="flex flex-col gap-2">
            <summary>Brand</summary>
            <ul className="flex flex-col gap-2 ml-4">
              {brands.map((brand) => (
                <li key={brand} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-basic-red"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleCheckBoxBrandChange(brand)}
                  />
                  <p>{brand}</p>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* Products */}
      <div className="flex-4 py-5 px-10 grid grid-cols-3 gap-4">
        {loading ? (
          <div>Loading products...</div>
        ) : filterProducts().length > 0 ? (
          filterProducts().map((pr) => <ProductItem product={pr} key={pr.id} />)
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-[20%] ml-auto mr-auto">
            <FaBoxes className="text-6xl text-basic-red opacity-50" />
            <p className="font-bold opacity-50">No products available!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
