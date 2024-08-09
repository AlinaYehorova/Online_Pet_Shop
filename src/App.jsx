import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ConnectedModal from "./components/modal/ConnectedModal";
import HomePage from "./pages/Home/HomePage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ProductsByCategoryPage from "./pages/Products/ByCategory/ProductsByCategoryPage";
import AllProductsPage from "./pages/Products/All/AllProductsPage";
import DiscountedProductsPage from "./pages/Products/Discounted/DiscountedProductsPage";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import CartPage from "./pages/Cart/CartPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import store from "./redux/store";
import "./App.css"

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route
            path="categories/:categoryId"
            element={<ProductsByCategoryPage />}
          />
          <Route path="products" element={<AllProductsPage />} />
          <Route
            path="discounted-products"
            element={<DiscountedProductsPage />}
          />
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/404" element={<NotFoundPage/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        </div>
        <ConnectedModal />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
