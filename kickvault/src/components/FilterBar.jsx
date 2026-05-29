import { useParams } from 'react-router-dom';
import {products} from '../data/sneakers'

export function FilterBar() {
  const {type} = useParams();

  const pickCategory = products.filter((product)=> {return product.category === type ? true : false;
  })
  console.log (pickCategory)

  return (
    <section>

    </section>
  )
}