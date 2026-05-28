import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { products } from './data/sneakers';



function App() {
  return (
    <>
    <Navbar />
    <Hero /> 
    <ProductGrid products={products} />
    </>
  )
}

export default App
