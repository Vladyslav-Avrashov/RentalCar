import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <NavLink to="/" className={s.logo}>
        <span className={s.logoBlack}>Rental</span>
        <span className={s.logoBlue}>Car</span>
      </NavLink>

      <nav className={s.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${s.link} ${s.active}` : s.link
          }
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
