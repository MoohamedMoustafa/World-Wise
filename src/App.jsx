import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CitiesContextProvider from "./contexts/CitiesContext";
import AuthContextProvider from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// before lazy
// dist/index.html                   0.48 kB │ gzip:   0.31 kB
// dist/assets/index-a4f91e83.css   30.24 kB │ gzip:   5.05 kB
// dist/assets/index-ed698172.js   523.01 kB │ gzip: 153.68 kB

// import HomePage from "./pages/HomePage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import NotFound from "./pages/NotFound";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));

// after lazy
// dist/index.html                           0.48 kB │ gzip:   0.30 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/HomePage-b9276e6f.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-24ef586d.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-aaed525c.css           26.47 kB │ gzip:   4.35 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/NotFound-fc5d150c.js          0.20 kB │ gzip:   0.18 kB
// dist/assets/Logo-016058b2.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-ff024802.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-d67aef0a.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/HomePage-818a8396.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-15224361.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-000a2c50.js             1.04 kB │ gzip:   0.56 kB
// dist/assets/AppLayout-316658b6.js       157.10 kB │ gzip:  46.30 kB
// dist/assets/index-32cce16c.js           363.63 kB │ gzip: 106.53 kB

/* eslint-ignore */
export default function App() {
  return (
    <AuthContextProvider>
      <CitiesContextProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={ <HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} /> */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesContextProvider>
    </AuthContextProvider>
  );
}
