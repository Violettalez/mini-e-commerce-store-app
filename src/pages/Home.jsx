import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBoxes } from "react-icons/fa";
import { setEndPrice, setMaxPrice } from "../store/filtersSlice";
import FiltersPanel from "../components/FiltersPanel";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    searchString,
    sorting,
    category,
    brand,
    startPrice,
    endPrice,
    maxPrice,
  } = useSelector((state) => state.filters);

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
        dispatch(setMaxPrice(max));
        dispatch(setEndPrice(max));
      }
      setLoading(false);
    };

    getProducts();
  }, [dispatch]);

  return (
    <div className="flex bg-basic-weight w-full min-h-[85vh] rounded-xl pt-10">
      <section className="hidden bg-dark-weight flex-1.5 py-5 px-5 rounded-xl md:flex flex-col gap-10">
        <FiltersPanel sortingName={"sorting"} />
      </section>
      {/* Products */}
      <div className="flex-4 py-5 px-10 grid md:grid-cols-3 gap-4">
        {loading ? (
          <div className="flex flex-col md:col-start-2 items-center justify-center py-[20%] ml-auto mr-auto">
            <div className="relative w-12 h-12 mx-auto">
              <div className="absolute top-[60px] left-0 w-12 h-[5px] bg-red-400/50 rounded-full animate-shadow"></div>
              <div className="absolute top-0 left-0 w-12 h-12 bg-basic-red rounded-[4px] animate-jump"></div>
            </div>
          </div>
        ) : filterProducts().length > 0 ? (
          filterProducts().map((pr) => <ProductItem product={pr} key={pr.id} />)
        ) : (
          <div className="flex flex-col md:col-start-2 items-center justify-center py-[20%] ml-auto mr-auto">
            <FaBoxes className="text-6xl text-basic-red opacity-50" />
            <p className="font-bold opacity-50">No products available!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
