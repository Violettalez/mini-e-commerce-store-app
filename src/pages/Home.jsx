import ProductItem from "../components/ProductItem";
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
      <section className="bg-dark-weight flex-1 py-5 px-5 rounded-xl">
        <h2 className="font-header text-xl font-bold">Sorting</h2>
        <h2 className="font-header text-xl font-bold">Filters</h2>
      </section>
      <div className="flex-4 py-5 px-10 flex flex-wrap justify-between gap-2">
        {loading ? (
          <div>Loading products...</div>
        ) : products.length > 0 ? (
          products.map((pr) => <ProductItem product={pr} key={pr.id}/>)
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
}
export default Home;
