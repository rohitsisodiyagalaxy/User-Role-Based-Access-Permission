// components/Header.js
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <div className={styles.userInfo}>
          <img className={styles.avatar} src="/avatar.png" alt="User Avatar" />
          <span>Welcome, User</span>
        </div>
      </header>
    );
  }
  