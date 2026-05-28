import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import {products} from './data/sneakers'



function App() {


  return (

    <>
    
    <Navbar></Navbar>
    <Hero></Hero>
    <ProductCard 
    products ={products}
    />
    
    </>
  )
}

export default App
