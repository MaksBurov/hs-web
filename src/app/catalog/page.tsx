import { ProductCard } from "@/components/ProductCard/ProductCard";
import s from "./page.module.scss";
import { useState } from "react";

export const metadata = {
  title: "Каталог",
};

interface Product {
  id: number;
  slug: string;
  title: string;
  description?: string;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
}

async function getProducts() {
  const res = await fetch("http://147.45.109.170:8080/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const CatalogPage = async () => {
  const productsPromise: Promise<{ products: Product[] }> = getProducts();

  const [{ products }] = await Promise.all([productsPromise]);

  return (
    <div className="container">
      <h1>Каталог</h1>

      <div className={s.productsList}>
        {products.length
          ? products.map((item) => (
              <div key={`key-product-${item.id}`} className={s.productItem}>
                <ProductCard {...item} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default CatalogPage;
