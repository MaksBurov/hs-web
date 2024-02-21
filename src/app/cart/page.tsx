"use client";

import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cls from "./page.module.scss";
import { ProductCardInCart } from "@/components/ProductCardInCart/ProductCardInCart";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  title: string;
  description?: string;
  image: string;
  price: number;
  tagList: string[];
  quantity: number;
}

async function getProductsByIds(data: any) {
  const res = await fetch("http://147.45.109.170:8080/products/by-ids", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function makeAnOrder(data: any) {
  const res = await fetch("http://147.45.109.170:8080/products/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const CartPage = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (!cartString) return;

    const cart = JSON.parse(cartString);
    setCart(cart);

    const fetchProductsInCart = async () => {
      const productsInCartPromise: Promise<{ products: Product[] }> =
        getProductsByIds({ ids: Object.keys(cart) });
      const [{ products }] = await Promise.all([productsInCartPromise]);
      setProductsInCart(
        products.map((item) => ({ ...item, quantity: +cart[item.id] }))
      );
    };

    fetchProductsInCart();
  }, []);

  const handleRemoveFromCart = (id: number) => {
    setProductsInCart((prev) => prev.filter((item) => item.id !== id));
  };

  const [values, setValues] = useState<any>({});

  const handleChangeValues = (key: string, value: string | number) => {
    setValues((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await makeAnOrder({
        ...values,
        products: productsInCart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      setValues({
        email: "",
        phone: "",
        name: "",
        address: "",
        comment: "",
      });
    } catch (error) {
      console.log("e", error);
    }
  };

  return (
    <div className="container">
      <h1>Корзина</h1>
      <div className={cls.wrapper}>
        <div className={cls.main}>
          {productsInCart.map((item) => (
            <div key={item.id} className={cls.productItem}>
              <ProductCardInCart
                {...item}
                count={cart[item.id]}
                onRemove={handleRemoveFromCart}
              />
            </div>
          ))}
        </div>
        <div className={cls.aside}>
          <div className={cls.asideWrapper}>
            <div className={cls.asideWrapperTitle}>В корзине</div>
            <br />
            <div>{productsInCart.length} товара</div>
            <br />
            <Link className={cls.linkFormOrder} href="#orderForm">
              Перейти к оформлению
            </Link>
          </div>
        </div>
      </div>

      <form
        id="orderForm"
        encType="multipart/form-data"
        action="/test"
        method="POST"
        className={cls.orderForm}
        onSubmit={handleSubmitForm}
      >
        <h3>Форма заказа</h3>
        <div className={cls.formField}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={({ target: { value } }) =>
              handleChangeValues("email", value)
            }
            placeholder="mail.mail.ru"
            // pattern=".+@example\.com"
            size={30}
            required
          />
        </div>
        <div className={cls.formField}>
          <label htmlFor="phone">Номер телефона</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="+7 999 999 99 99"
            required
            value={values.phone}
            onChange={({ target: { value } }) =>
              handleChangeValues("phone", value)
            }
          />
        </div>
        <div className={cls.formField}>
          <label htmlFor="name">Ф.И.О.</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Иванов Иван Иванович"
            required
            minLength={3}
            value={values.name}
            onChange={({ target: { value } }) =>
              handleChangeValues("name", value)
            }
          />
        </div>
        <div className={cls.formField}>
          <label htmlFor="address">Адрес доставки</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="г.Москва, ул.Громобоя, д.54, кв.43"
            required
            minLength={10}
            value={values.address}
            onChange={({ target: { value } }) =>
              handleChangeValues("address", value)
            }
          />
        </div>
        <div className={cls.formField}>
          <label htmlFor="comment">Комментарий к заказу</label>
          <textarea
            name="comment"
            id="comment"
            cols={30}
            rows={5}
            value={values.comment}
            onChange={({ target: { value } }) =>
              handleChangeValues("comment", value)
            }
          ></textarea>
        </div>

        <div className={cls.actions}>
          <button className={cls.btnSubmit} type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </div>
  );
};

export default CartPage;
