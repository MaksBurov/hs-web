import Image from "next/image";
import cls from "./CounterCart.module.scss";

interface Props {
  count: number;
  onAddToCart: VoidFunction;
  onDeleteFromCart: VoidFunction;
  onChangeCounte: (num: number) => void;
}

export const CounterCart = (props: Props) => {
  const { count, onAddToCart, onDeleteFromCart, onChangeCounte } = props;

  return (
    <div className={cls.container}>
      {!count ? (
        <button
          type="button"
          title="Добавить в корзину"
          className={cls.btn}
          onClick={onAddToCart}
        >
          <Image
            src="/cart.svg"
            alt="Корзина"
            width={24}
            height={24}
            className={cls.btnIcon}
          />
        </button>
      ) : (
        <div className={cls.wrapperInput}>
          {count !== 1 ? (
            <button
              className={`${cls.btn} ${cls.btnAdd}`}
              title="Уменьшить количество в корзине"
              onClick={() => onChangeCounte(count - 1)}
            >
              -
            </button>
          ) : (
            <button
              type="button"
              title="Удалить из корзины"
              className={cls.btn}
              onClick={onDeleteFromCart}
            >
              <Image
                src="/trash.svg"
                alt="Корзина"
                width={24}
                height={24}
                className={cls.btnIcon}
              />
            </button>
          )}
          <input
            type="number"
            value={count}
            className={cls.inutCount}
            max="30"
            min="1"
            onChange={(e) => onChangeCounte(+e.target.value)}
          />
          <button
            className={`${cls.btn} ${cls.btnAdd}`}
            title="Увеличить количество в корзине"
            onClick={() => onChangeCounte(count + 1)}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
