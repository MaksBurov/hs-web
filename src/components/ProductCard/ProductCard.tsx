"use client";

import Image from "next/image";

import s from "./ProductCard.module.scss";
import { useEffect, useState } from "react";
import { CounterCart } from "../CounterCart/CounterCart";

interface Props {
  id: number;
  title: string;
  description?: string;
  image: string;
  price: number;
}

export const ProductCard = (props: Props) => {
  const { id, title, description, image, price } = props;

  const [inCart, setInCart] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) return;

    setInCart(JSON.parse(cart)[id] ?? 0);
  }, [id]);

  //TODO
  const handleAddToCart = () => {
    const cart = localStorage.getItem("cart");

    localStorage.setItem(
      "cart",
      JSON.stringify(cart ? { ...JSON.parse(cart), [id]: 1 } : { [id]: 1 })
    );
    setInCart(1);
  };

  const handleRemoveFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") ?? "");
    delete cart[id];

    localStorage.setItem("cart", JSON.stringify(cart));
    setInCart(0);
  };

  const handleChangeCountInCart = (count: number) => {
    const cart = localStorage.getItem("cart");

    localStorage.setItem(
      "cart",
      JSON.stringify(
        cart ? { ...JSON.parse(cart), [id]: count } : { [id]: count }
      )
    );
    setInCart(count);
  };
  //TODO

  return (
    <div className={s.card}>
      <div className={s.image}>
        {/* <Image className={s.img} src={image} alt={""} width={150} /> */}
        <img
          className={s.img}
          src={image}
          alt="test"
          // width={150}
          // height={150}
        />
      </div>
      <h2 className={s.title}>{title}</h2>
      <div className={s.description}>{description}</div>
      <div className={s.price}>{price} &#8381;</div>

      <div className={s.actions}>
        <CounterCart
          count={inCart}
          onAddToCart={handleAddToCart}
          onDeleteFromCart={handleRemoveFromCart}
          onChangeCounte={handleChangeCountInCart}
        />
        {/* {inCart === 0 ? (
          <button onClick={handleAddToCart} type="button" className={s.addBtn}>
            <Image
              className={s.imageIconButton}
              src="/cart-add.png"
              alt="Добавить в корзину"
              width={28}
              height={28}
            />
          </button>
        ) : (
          <button
            onClick={handleRemoveFromCart}
            type="button"
            className={s.addBtn}
          >
            <Image
              className={s.imageIconButton}
              src="/cart-minus.png"
              alt="Удалить из корзины"
              width={28}
              height={28}
            />
          </button>
        )} */}
      </div>
    </div>
  );
};
