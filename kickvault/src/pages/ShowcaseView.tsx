import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { useTimeout } from '@/hooks/useTimeout';
import styles from './showcase-view.module.css';


export function ShowcaseView() {
  const { id } = useParams<{ id: string }>();
  const { merchandisePool, addToBasket, toggleBasket, favorite, toggleFavorite } = useShop();
  const showcaseNode = merchandisePool.find((node) => node.id === id);
  const [chosenSize, setChosenSize] = useState<number | null>(null);

  const isFavorite = showcaseNode ? favorite.includes(showcaseNode.id) : false;

  const handleTrigger = useCallback(() => {
    toggleBasket('idle');
  }, [toggleBasket]);

  const startClock = useTimeout(handleTrigger, 2500);

  const handleAddToBasket = () => {
    if (!chosenSize || !showcaseNode) return;

    addToBasket(showcaseNode.id, String(chosenSize));
    toggleBasket('active');

    startClock();
  }


  if (!showcaseNode) {
    return (
      <main className={styles.showcaseContext}>
        <p className={styles.missingNotice}>Asset Missing</p>
      </main>
    );
  }

  return (
    <div className={styles.showcaseContext} >
      <main className={styles.showcaseShell}>
        <section className={styles.brandMedia}>
          <img
            src={showcaseNode.image}
            alt={showcaseNode.name}
            className={styles.showcaseAsset}
            loading="eager"
            fetchPriority="high"
          />

        </section>
        <section className={styles.editorialGroup}>
          <h1 className={styles.mainHeading}>
            {showcaseNode.name}
          </h1>
          <p className={styles.priceTag}>
            ${showcaseNode.price}
          </p>
          <div className={styles.dimensionCluster}>
            {showcaseNode.sizes.map((size) => {
              const isSelected = size === chosenSize;
              return (
                <button key={size} type="button" onClick={() => setChosenSize(size)}
                  className={styles.dimensionAction} data-state={isSelected ? "active" : "idle"} > {size}</button> )
            })}
          </div>
          <div className={styles.actionCluster}>
            <button type="button"  disabled={!chosenSize} className={styles.primaryAction}
              onClick={handleAddToBasket} >
              {chosenSize ? "Add to Cart" : "Select a Size"}
            </button>

            <button type="button" className={styles.itemVoucher} 
            data-state={isFavorite ? "active" : "idle"} 
            onClick={() => toggleFavorite(showcaseNode.id)} 
            aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>

              <svg viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} 
              stroke="currentColor" strokeWidth="2" className={styles.itemHero}>
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>

            </button>
          </div>
        </section>
      </main>
    </div>
  )

}