import { useEffect, useState } from "react";
import { CounterCart } from "../CounterCart/CounterCart";
import cls from "./ProductCardInCart.module.scss";

interface Props {
  id: number;
  count: number;
  title: string;
  description?: string;
  image: string;
  price: number;
  quantity?: number;
  onRemove: (id: number) => void;
}

export const ProductCardInCart = (props: Props) => {
  const { id, title, count, description, image, price, onRemove } = props;

  //TODO
  const [inCart, setInCart] = useState(count);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) return;

    setInCart(JSON.parse(cart)[id] ?? 0);
  }, [id]);

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

    onRemove(id);
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
    <div className={cls.card}>
      <div className={cls.image}>
        <img className={cls.img} src={image} alt="test" />
      </div>
      <div className={cls.main}>
        <h2 className={cls.title}>{title}</h2>
        <p className={cls.description}>{description}</p>
        <div className={cls.price}>{price * inCart} &#8381;</div>
        <CounterCart
          count={inCart}
          onAddToCart={handleAddToCart}
          onDeleteFromCart={handleRemoveFromCart}
          onChangeCounte={handleChangeCountInCart}
        />
      </div>
    </div>
  );
};
