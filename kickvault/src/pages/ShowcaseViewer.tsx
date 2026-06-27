import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import styles from './showcase-viewer.module.css';


export function ShowcaseViewer() {
  const { id } = useParams<{ id: string }>();
  const { merchandisePool, addToBasket, toggleBasket } = useShop();
  const showcaseNode = merchandisePool.find((node) => node.id === id);
  const [chosenSize, setChosenSize] = useState<number | null>(null);

  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);

  const handleAddToBasket = () => {
    if (!chosenSize || !showcaseNode) return;
    addToBasket(showcaseNode.id, String(chosenSize));
    toggleBasket('active');

    if (activeTimer) clearTimeout(activeTimer);

    const timerId = setTimeout(() => {
      toggleBasket('idle');
    }, 2500);

    setActiveTimer(timerId);
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
                <button
                  key={size}
                  type="button"
                  onClick={() => setChosenSize(size)}
                  className={styles.dimensionAction}
                  data-state={isSelected ? "active" : "idle"}
                >
                  {size}
                </button>
              )
            })}
          </div>

          <div className={styles.actionCluster}>
            <button
              type="button"
              disabled={!chosenSize}
              className={styles.primaryAction}
              onClick={handleAddToBasket}
            >
              {chosenSize ? "Add to Cart" : "Select a Size"}
            </button>

          </div>

        </section>
      </main>
    </div>
  )

}