import { CollectionNode } from './CollectionNode';
import { MerchandiseAsset } from '@/types/merchandise-assets';
import styles from './collection-showcase.module.css';

interface CollectionShowcaseProps {
  readonly inventorySelection: readonly MerchandiseAsset[];
}

export function CollectionShowcase({ inventorySelection }: CollectionShowcaseProps) {

  return (
    <section className={styles.showcaseDisplay}>
      {inventorySelection.map((node) => (
        <CollectionNode key={node.id} displayAsset={node} />
      ))}
    </section>

  )

}