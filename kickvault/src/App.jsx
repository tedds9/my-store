import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { products } from './data/sneakers';
import { FilterBar } from './components/FilterBar';
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
