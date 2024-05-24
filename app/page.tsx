import styles from "./page.module.scss";
import Calculator from "./components/Calculator/Calculator";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>React Calculator App</h1>
      <Calculator />
    </main>
  );
}
