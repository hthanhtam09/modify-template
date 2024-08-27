import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
 
  return (
    <main className={styles.main}>
      <h1 style={{ color: '#000' }}>Choose a template to start</h1>


      <Link style={{
        marginTop: '50px',
      }} href={'/template'}>
        <div style={{
          width: '15rem',
          height: '11rem',
          backgroundColor: '#b5baaa',
        }}>

        </div>
        <p style={{ color: '#000', border: '1px solid #b5baaa', textAlign: 'center', padding: '10px 0' }} >Template default</p>
      </Link>
    </main>
  );
}
