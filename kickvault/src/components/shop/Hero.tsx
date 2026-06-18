import styles from './hero.module.css';
import heroImage from '@/images/shoes-image/heroPicture.jpg';

export function Hero() {
  return (
    <div className={styles.navigationAnchor} >
      
      <section className={styles.billboardStage} aria-label="feature-product-introduction" >
        <div className={styles.imageViewer}>
          <picture>
            <img src={heroImage}
              alt=""
              className={styles.showcaseAsset}
              loading="eager"
              fetchPriority="high" />
          </picture>
        </div>
        <div className={styles.editorialBillboard}>
          <h1 className={styles.mainHeading} >EVERY STEP ELEVATED</h1>
          <p className={styles.subHeading} >"Premium sneakers for those who move with intention."</p>
          <div className={styles.actionCluster}>
            <button
              className={styles.primaryAction} >
              Shop Now
            </button>
            <button
              className={styles.secondaryAction} >
              Explore
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}