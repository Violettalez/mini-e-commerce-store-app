import ProductItem from "../components/ProductItem";
import { BsSearchHeart } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

function Home({ data }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const api_url =
      "https://68a58ad62a3deed2960dd7bd.mockapi.io/api/v1/products";
    const res = await axios.get(api_url);
    console.log(res.data);
    return res.data;
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const prods = await fetchProducts();
        setProducts(prods || []);
        console.log(prods);
        console.log(products);
      } catch (err) {
        console.log("Error:" + err);
        return [];
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  return (
    <div className="flex bg-basic-weight w-full min-h-[85vh] rounded-xl">
      <section className="bg-dark-weight flex-1 py-5 px-5 rounded-xl flex flex-col gap-10">
        <div className="relative w-full max-w-sm">
          <BsSearchHeart
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border bg-basic-weight border-gray-300 py-2 pl-10 pr-4 text-gray-700 focus:border-basic-red focus:ring-2 focus:ring-basic-red outline-none transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-header text-xl font-bold mb-1">Sorting</h2>
          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="sorting"
              value="none"
              class="accent-basic-red"
            />
            <span>None</span>
          </label>
          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="sorting"
              value="clothes"
              class="accent-basic-red"
            />
            <span>Price: Low to High</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="sorting"
              value="books"
              class="accent-basic-red"
            />
            <span>Price: High to Low</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="sorting"
              value="electronics"
              class="accent-basic-red"
            />
            <span>Top Rated</span>
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-header text-xl font-bold mb-2">Filters</h2>
          <details className="flex flex-col gap-2">
            <summary>Category</summary>
            <ul className="flex flex-col *:flex *:gap-2 *:items-center *:ml-[10%]">
              <li>
                <input
                  type="checkbox"
                  value="T-Shirts"
                  className="accent-basic-red"
                />
                <p>T-Shirts</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Leggings"
                  className="accent-basic-red"
                />
                <p>Leggings</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Hoodies"
                  className="accent-basic-red"
                />
                <p>Hoodies</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Shorts"
                  className="accent-basic-red"
                />
                <p>Shorts</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Tracksuits"
                  className="accent-basic-red"
                />
                <p>Tracksuits</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Tank Tops"
                  className="accent-basic-red"
                />
                <p>Tank Tops</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Jackets"
                  className="accent-basic-red"
                />
                <p>Jackets</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Socks"
                  className="accent-basic-red"
                />
                <p>Socks</p>
              </li>
            </ul>
          </details>
          <details className="flex flex-col gap-2">
            <summary>Brand</summary>
            <ul className="flex flex-col *:flex *:gap-2 *:items-center *:ml-[10%]">
              <li>
                <input
                  type="checkbox"
                  value="Nike"
                  className="accent-basic-red"
                />
                <p>Nike</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Adidas"
                  className="accent-basic-red"
                />
                <p>Adidas</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Puma"
                  className="accent-basic-red"
                />
                <p>Puma</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Under Armour"
                  className="accent-basic-red"
                />
                <p>Under Armour</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Reebok"
                  className="accent-basic-red"
                />
                <p>Reebok</p>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="Lululemon"
                  className="accent-basic-red"
                />
                <p>Lululemon</p>
              </li>
            </ul>
          </details>
        </div>

        <button className="bg-basic-red text-white py-2 px-4 rounded hover:bg-basic-black">
          Apply
        </button>
      </section>
      <div className="flex-4 py-5 px-10 flex flex-wrap justify-between gap-2">
        {loading ? (
          <div>Loading products...</div>
        ) : products.length > 0 ? (
          products.map((pr) => <ProductItem product={pr} key={pr.id} />)
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
}
export default Home;
