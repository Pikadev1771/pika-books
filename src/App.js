import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from 'pages/Main';
import Detail from 'pages/Detail';
import LoginPage from 'pages/Login';
import SignupPage from 'pages/Signup';
import AddNew from 'pages/AddNew';
import Edit from 'pages/Edit';
import Cart from 'pages/Cart';
import MyPage from 'pages/MyPage';
import OrderHistory from 'components/OrderHistory';
import OrderDetail from 'pages/OrderDetail';
import NotFound from 'pages/NotFound';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/book/:id" element={<Detail />} />
            <Route path="/addnew" element={<AddNew />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="cart" element={<Cart />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="mypage/order" element={<OrderHistory />} />
            <Route path="order/:id" element={<OrderDetail />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
export default App;
