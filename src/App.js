import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import "./style.scss";
import "./style/dark.scss";
import { useSelector } from "react-redux";
import Register from './pages/register/Register';
import Products from './pages/products/Products';
import Categories from './pages/categories/Categories';
import Profile from './pages/profile/Profile';

function App() {
  const { darkMode } = useSelector((state) => state.DarkMode);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login page={"login"} />} />
            <Route path='register' element={<Register page={"register"} />} />

            <Route path='products' >
              <Route index element={<Products />} />
            </Route>

            <Route path='categories' >
              <Route index element={<Categories />} />
            </Route>

            <Route path='profile' >
              <Route index element={<Profile />} />
            </Route>

            <Route />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;