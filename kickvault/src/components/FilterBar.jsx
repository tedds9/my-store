import { useParams } from 'react-router-dom';
import {products} from '../data/sneakers'
import {ProductGrid} from './ProductGrid'


export function FilterBar() {
  const {type} = useParams();

  const pickCategory = products.filter((product)=> {return product.category === type ? true : false;
  })

  return (
    <section>
      <ProductGrid products={pickCategory} />
    </section>
  )
}