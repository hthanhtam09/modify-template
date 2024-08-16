import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
 
  return (
    <main className={styles.main}>
      <h1>Please choose template to start</h1>

      <Link style={{
        width: '200px',
        height: '200px',
        backgroundColor: 'gray',
        marginTop: '50px',
      }} href={'/template'}>
        <h2>Template</h2>
      </Link>
    </main>
  );
}
