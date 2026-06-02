
import styles from './hero.module.css';

export function Hero() {
  return (

    
    <section className={styles.hero} aria-label="feature-product-introduction" >
      <div className={styles.container}>
        <h1 className={styles.heading} >EVERY STEP. ELEVATED.</h1>
        <p className={styles.subHeading} >"Premium sneakers for those who move with intention."</p>
        <div className={styles.actionNowContainer}>
          <button className={styles.shopNow} >
            Shop Now
          </button>
          <button className={styles.exploreNow} >
            Explore
          </button>
        </div>
      </div>
    </section>
  )
}