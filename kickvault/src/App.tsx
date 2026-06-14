import { ShopProvider, useShop } from '@/context/ShopContext';
import { Navbar } from '@/components/navbar/Navbar'
import { Hero } from '@/components/shop/Hero';
import { CollectionShowcase } from '@/components/shop/CollectionShowcase';
import { CategoryController } from '@/components/shop/CategoryController';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShowcaseViewer } from '@/pages/ShowcaseViewer';
import { CartDrawer } from '@/components/shop/CartDrawer';



function MainStoreFrontView() {

  const { merchandisePool } = useShop();
  
  return (
    <>
      <Hero />
      <CollectionShowcase inventorySelection={merchandisePool} />
    </>
  )

}

function App() {
  return (
    <ShopProvider >
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <main>
          <Navbar />
          <Routes>
            <Route path="/"
              element={<MainStoreFrontView />} />
            <Route path="/category/:type"
              element={<CategoryController />} />
            <Route path="/products/:id" 
              element={<ShowcaseViewer />} />
          </Routes>

          <CartDrawer isOpen={true} onClose={() => console.log('close canvas')} />

        </main>

      </BrowserRouter>
    </ShopProvider>
  )
}

export default App
