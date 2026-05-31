import { Navbar } from './components/navbar/Navbar'
import { Hero } from './components/shop/Hero';
import { ProductGrid } from './components/shop/ProductGrid';
import { products } from './data/sneakers';
import { FilterBar } from './components/shop/FilterBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="scroll">
        <Navbar />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <ProductGrid products={products} />
          </>} />
          <Route path="/category/:type" element={
            <FilterBar />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
