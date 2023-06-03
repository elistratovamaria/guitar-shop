import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import ProductCardPage from '../../pages/product-card-page/product-card-page';
import ProductListPage from '../../pages/product-list-page/product-list-page';
import AddProductPage from '../../pages/add-product-page/add-product-page';
import EditProductPage from '../../pages/edit-product-page/edit-product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Register}
            element={<RegisterPage />}
          />
          <Route
            path={AppRoute.Guitars}
            element={<ProductListPage />}
          />
          <Route
            path={AppRoute.AddProduct}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <AddProductPage />
              </PrivateRoute>
            }
          />

          <Route
            path={`${AppRoute.Guitars}/:id`}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <ProductCardPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Guitars}/:id/${AppRoute.EditProduct}`}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <EditProductPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
