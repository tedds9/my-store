import { lazy, Suspense } from 'react';
import { ShopProvider, useShop } from '@/context/ShopContext';
import { ViewChannelsProvider } from './context/ViewChannels';
import { Navbar } from '@/components/navbar/Navbar'
import { Hero } from '@/components/shop/Hero';
import { CollectionShowcase } from '@/components/shop/CollectionShowcase';
import { CategoryController } from '@/components/shop/CategoryController';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { RouteSnap } from '@/components/router/RouteSnap';

const ShowcaseView = lazy(() =>
  import('@/pages/ShowcaseView').then(m => ({ default: m.ShowcaseView })));
const CartView = lazy(() =>
  import('@/pages/CartView').then(m => ({ default: m.CartView })));
const SuccessView = lazy(() =>
  import('@/pages/SuccessView').then(m => ({ default: m.SuccessView })));
const FavoritesView = lazy(() =>
  import('@/pages/FavoritesView').then(m => ({ default: m.FavoritesView })));



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

    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ShopProvider >
        <ViewChannelsProvider>
          <main>
            <RouteSnap />
            <Navbar />
            <Suspense fallback={<></>}>
              <Routes>
                <Route path="/"
                  element={<MainStoreFrontView />} />
                <Route path="/products"
                  element={<CategoryController />} />
                <Route path="/cart"
                  element={<CartView />} />
                <Route path={"/favorites"}
                  element={<FavoritesView />} />
                <Route path="/category/:type"
                  element={<CategoryController />} />
                <Route path="/products/:id"
                  element={<ShowcaseView />} />
                <Route path="/success"
                  element={<SuccessView />} />


              </Routes>
            </Suspense>

            <CartDrawer />

          </main>
        </ViewChannelsProvider>
      </ShopProvider>
    </BrowserRouter>

  )
}

export default App
