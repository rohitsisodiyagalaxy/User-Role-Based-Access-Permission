// components/Sidebar.js
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
    <h2 className={styles.logo}>My Dashboard</h2>
    <nav className={styles.nav}>
      <a href="/dashboard" className={styles.navItem}>Dashboard</a>
      <a href="/profile" className={styles.navItem}>Profile</a>
      <a href="/settings" className={styles.navItem}>Settings</a>
      <a href="/logout" className={styles.navItem}>Logout</a>
    </nav>
  </aside>
  );
}
