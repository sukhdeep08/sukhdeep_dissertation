import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Cart from "./pages/Cart";
import ProductDetail from "./features/product/ProductDetail";
import Products from "./features/product/Products";
import { Toaster } from "react-hot-toast";
import SearchPage from "./features/Search/SearchPage";
import CartOverview from "./features/cart/CartOverview";
// import Login from "./pages/Login/Login";
// import ProtectedRoutes from "./pages/ProtectedRoutes";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AccountsProvider } from "./Context/AccountsContext";
import SignUp from "./pages/Signup";
import { AuthProvider } from "./Context/AuthContext";
import SignIn from "./pages/Sigin";
import CheckoutProcess from "./features/Checkout/Checkout";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000 * 6, // 10 seconds (in milliseconds)
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <AccountsProvider>
          <AuthProvider>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<Home />}>
                <Route index element={<Products />} />

                <Route
                  path="checkout"
                  element={
                    <ProtectedRoutes>
                      <CheckoutProcess />
                    </ProtectedRoutes>
                  }
                />

                <Route path="cart" element={<CartOverview />} />
                <Route path="search/:query" element={<SearchPage />} />
                <Route path="product/:id" element={<ProductDetail />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 2000,
                },
                error: {
                  duration: 4000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(--color-grey-0)",
                  color: "var(--color-grey-700)",
                },
              }}
            />
          </AuthProvider>
        </AccountsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
