import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import Main from './pages/Main';
import Detail from './pages/Detail';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/book/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
