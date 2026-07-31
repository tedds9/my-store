import styles from './hero.module.css';
import heroImage from '@/images/hero-image/heroPicture.jpg';

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
          <h1 className={styles.mainHeading} >HEAVYWEIGHT</h1>
          <p className={styles.subHeading} ></p>
          <div className={styles.actionCluster}>
            <button
              className={styles.primaryAction} >
              Browse Outfits
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