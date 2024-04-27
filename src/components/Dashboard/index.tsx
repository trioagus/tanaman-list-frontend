import React from "react";
import { FaTree, FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoMdExit, IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useSidebarStore } from "../../store/sidebarStore";
import styles from "./Dashboard.module.scss";

const listSidebar = [
  {
    name: "Beranda",
    icon: <FaHome className={styles.sidebarIcon} />,
    url: "/",
  },
  {
    name: "Kategori",
    icon: <BiCategory className={styles.sidebarIcon} />,
    url: "/dashboard/category",
  },
  {
    name: "Tanaman",
    icon: <FaTree className={styles.sidebarIcon} />,
    url: "/dashboard/tanaman",
  },
];

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { showSidebar, toggleSidebar } = useSidebarStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Dashboard</h1>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <IoMdMenu className={styles.menuIcon} />
        </button>
      </header>
      <nav
        className={`${styles.sidebarMenu} ${showSidebar ? styles.active : ""}`}>
        <ul className={styles.sidebarList}>
          {listSidebar.map((item, index) => (
            <li key={index} className={styles.sidebarItem}>
              <a href={item.url} className={`${styles.sidebarLink} ${styles.active}`}>
                {item.icon}
                <span className={styles.sidebarText}>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content}>{children}</div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <IoMdExit className={styles.logoutIcon} />
        <span className={styles.logoutText}>Keluar</span>
      </button>
    </div>
  );
};
