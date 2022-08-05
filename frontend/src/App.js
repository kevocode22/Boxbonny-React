import './styles/App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import packsActions from "./redux/actions/packsActions"
import PacksPage from './pages/PacksPage';
import Index from './pages/Index';
import Upload from "./components/Upload"
import OneExperiencePage from './pages/OneExperiencePage';
import SignIn from './components/SingnIn'
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import PackDetails from './components/PackDetails';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "react-scroll-to-top";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import {BsFillArrowUpCircleFill} from 'react-icons/bs'
import usuariosActions from './redux/actions/usuariosActions';
import shoppingActions from './redux/actions/shoppingActions';
import LoadingHome from './helpers/LoadingHome';
import { useState } from 'react';

function App() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const dispatch = useDispatch()
  const [reload, setReload] = useState(false)

  useEffect(() => {
    dispatch(packsActions.getPacks(99999))
    dispatch(shoppingActions.getUserProducts())
    setReload(!reload)
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem("token")
      dispatch(usuariosActions.verificarToken(token))
    }
    // eslint-disable-next-line
  }, [])

  const user = useSelector(store => store.usuariosReducer.user)

  return (

    <div className="app ">
      {loading ?
        <LoadingHome />
        :
        <>
          <Nav />
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: '',
              style: {
                boxShadow: "0px 3px 10px rgba(8, 8, 8, 0.413)",
                padding: '1rem',
                color: 'black',
                textAlign: "center",
                fontSize: "16px",
                border: "5px solid #FF8E72",
              },
            }} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<Index />} />
            <Route path="/packs" element={<PacksPage />} />
            {user?.rol === "admin" && <Route path="/administrador" element={<Upload />}/>}
            <Route path="/packs/packdetails/:id" element={<PackDetails />} />
            <Route path="/packs/oneexperience/:id" element={<OneExperiencePage />} />
            {!user && <Route path="/signin" element={<SignIn />} />}
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
          <ScrollToTop
            style={{ backgroundColor: "#ff8e72" }}
            smooth
            component={<ExpandLessIcon />}
          />
        </>
      }


    </div>

  );
}




export default App;
