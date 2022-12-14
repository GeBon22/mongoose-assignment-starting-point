import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/ProductDashboard.module.css";
import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null); //"Food", "Technology"
  const [shouldReload, setShouldReload] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = categoryFilter
          ? `/api/products?category=${categoryFilter}`
          : "/api/products";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setShouldReload(false);
        } else {
          throw new Error(`Fetch failed with Status: ${response.status}`);
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    shouldReload ? getProducts() : "";
  }, [shouldReload]);

  async function handleDelete(name, id) {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert(`Product ${name} was succesfully deleted`);
        setShouldReload(true);
      } else {
        throw new Error(`Fetch failed with Status: ${response.status}`);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data);
      const body = {
        name: data.name,
        category: data.category,
        detail: data.detail,
      };
      const response = await fetch("api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        alert(`Product ${data.name} has been succesfully added`);
        setShouldReload(true);
        event.target.reset();
      } else {
        throw new Error(`Fetch failed with Status: ${response.status}`);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Product Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="test">Products Dashboard</h1>
        <select
          onChange={(event) => {
            if (event.target.value === "all") {
              setCategoryFilter(null);
            } else {
              setCategoryFilter(event.target.value);
            }
          }}
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Technology">Technology</option>
        </select>
        <p>{categoryFilter}</p>
        <ul className={styles["product-list"]}>
          {products.map((product) => {
            return (
              <>
                <li key={product._id}>
                  <Link href={`/products/${product._id}`}>{product.name}</Link>
                  <button
                    onClick={() => handleDelete(product.name, product._id)}
                  >
                    Delete
                  </button>
                </li>
              </>
            );
          })}
          <form onSubmit={(event) => handleOnSubmit(event)}>
            <p>Here you can insert a new product</p>
            <fieldset>
              <label>
                Name of the product:
                <input type="text" name="name" />
              </label>
              <br />
              <label>
                Category:
                <input type="text" name="category" />
              </label>
              <br />
              <label>
                A short description:
                <textarea rows="2" cols="10" name="detail"></textarea>
              </label>
              <br />
              <button type="submit">Insert new product</button>
            </fieldset>
          </form>
        </ul>
      </div>
    </>
  );
};

export default Products;
