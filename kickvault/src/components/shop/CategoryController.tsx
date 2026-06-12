import { useParams } from 'react-router-dom';
import { CollectionShowcase } from './CollectionShowcase';
import { useShop } from '@/context/ShopContext'


export function CategoryController() {
  const { type } = useParams<{ type:string }>();
  const { merchandisePool } = useShop();
  const normalizedType = type?.toLowerCase();
  const pickCategory =
    normalizedType ?
      merchandisePool.filter((node) =>
        node.category.toLowerCase() === normalizedType)
      : merchandisePool;

  return (
    <section>
      <CollectionShowcase
        inventorySelection={pickCategory} />
    </section>
  )
}