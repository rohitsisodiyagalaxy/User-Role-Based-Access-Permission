// app/dashboard/DashboardLayout.js
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import styles from "./styles/dashboard.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardLayout}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
