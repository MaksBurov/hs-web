import Link from "next/link";
import Image from "next/image";

import cls from "./Header.module.scss";

const Header = () => {
  return (
    <header className={cls.header}>
      <div className={`container ${cls.wrapper}`}>
        <div className="logo"></div>
        <nav>
          <Link href="/catalog">Каталог</Link>
        </nav>
        <nav>
          <Link href="/cart">
            <Image
              src="/cart.svg"
              alt="Корзина"
              width={24}
              height={24}
              className={cls.btnIcon}
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
