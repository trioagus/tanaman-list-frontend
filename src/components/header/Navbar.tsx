import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import { useNavbarStore } from "../../store/navbarStore";
import styles from "./Navbar.module.scss";

interface MenuItem {
  label: string;
  url: string;
  onClick?: () => void;
}

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isOpen, toggle } = useNavbarStore();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const generateMenuItems = (user: any, logout: () => void) => {
      const defaultMenuItems: MenuItem[] = [
        { label: "Home", url: "/" },
        { label: "About", url: "/about" },
        { label: "Contact", url: "/contact" },
      ];

      const updatedMenuItems: MenuItem[] = [...defaultMenuItems];

      if (user) {
        if (user.role === "admin") {
          updatedMenuItems.push({ label: "Dashboard", url: "/dashboard" });
        }
        updatedMenuItems.push({ label: "Logout", url: "/", onClick: logout });
      } else {
        updatedMenuItems.push({ label: "Login", url: "/login" });
      }

      return updatedMenuItems;
    };

    setMenuItems(generateMenuItems(user, logout));
  }, [user, logout]);

  return (
    <nav className={styles.navbar}>
      <button className={styles.menuButton} onClick={toggle}>
        <FiMenu  className={styles.menuIcon} />
      </button>
      <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            {item.onClick ? (
              <button onClick={item.onClick}>{item.label}</button>
            ) : (
              <Link to={item.url} className={styles.menuLink}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
