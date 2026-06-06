import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/navbar/Navbar'
import { Hero } from './components/shop/Hero';
import { ProductGrid } from './components/shop/ProductGrid';
import { FilterBar } from './components/shop/FilterBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function MainStoreFrontView() {

  const { products } = useShop();

  return (
    <>
      <Hero />
      <ProductGrid products={products} />
    </>
  )

}

function App() {
  return (
    <ShopProvider >
      <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <div className="scroll">
          <Navbar />
          <Routes>
            <Route path="/" 
            element={<MainStoreFrontView />} />
            <Route path="/category/:type" element={
              <FilterBar />
            } />
          </Routes>
        </div>

      </BrowserRouter>
    </ShopProvider>
  )
}

export default App
