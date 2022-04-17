import {useState} from 'react';
import Home from '../Home/Home';
import About from '../About/About';
import Login from '../Login/Login';
import jwtDecode from 'jwt-decode';
import People from '../People/People';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Details from './../Details/Details';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import TvShowes from '../TvShowes/TvShowes';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';
import { MediaContextProvider } from './../MediaContext/MediaContext';


function App() {

  let [loginData, setLoginData] = useState(
    localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")) : null
  );

    function setUserData () {
    let token = localStorage.getItem("token");
    let decoded =  jwtDecode(token);
    setLoginData(decoded)
    console.log(decoded);
    }

  let navigate = useNavigate()
  function logOut () {
    localStorage.removeItem("token");
    setLoginData(null);
    navigate("/login")
  }

  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //      setUserData() // =======================?
  //   }
  //   console.log("lllllllllll");
  // }, [])

  return (
    <>
    <Navbar loginData = {loginData} logOut= {logOut}/>

    <div className='container'>

    <MediaContextProvider>
      <Routes>
        <Route element={<ProtectedRoute loginData={loginData}/>}>
              <Route path='/' element={<Home />}></Route>
              <Route path='home' element={<Home />}></Route>
              <Route path='movies' element={<Movies />}></Route>
              <Route path='tvshowes' element={<TvShowes />}></Route>
              <Route path='people' element={<People />}></Route>
              <Route path='details' element={<Details />}></Route>
        </Route>
        <Route path='about' element={<About />}></Route>
        <Route path='login' element={<Login  setUserData={setUserData}/>}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </MediaContextProvider>
    
    </div>

    <Footer />
    </>
  );
}

export default App;
