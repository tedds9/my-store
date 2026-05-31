import { ProductCard } from './ProductCard';

export function ProductGrid({ products }) {

  return (
    <div className="card-container-grid">
      {products.map((product) => {
        return (
            <ProductCard key={product.id} product={product}  ></ProductCard>
        )
      }
      )}
    </div>

  )

}