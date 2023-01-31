
import React,{useState} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import history from './history';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MovieDetail from './components/MovieDetail/MovieDetail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Cinema from './components/Cinema/Cinema';
 import SelectedCinema from './components/SelectedCinema/SelectedCinema';
 import Booking from './components/Booking/Booking';
import Footer from './components/Footer/Footer';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayOut from './Layouts/Admin/AdminLayOut';
import AdminPage from './pages/AdminPage/AdminPage';

function App() {
  const [location, setLocation] = useState(''); 
  return (
    <div className="app">
     
      <Router history ={history}>
      <NavigationBar setLocation={setLocation}/> 
        <div classsName='container'>
          <Routes>
             <Route path='/' element={<HomePage location={location}/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/movie/:movieid' element={<MovieDetail />}/>
             <Route path='/signup' element={<SignUp/>}/>
           <Route path='/cinema/:movieid' element ={<Cinema location={location}/>}/>
           <Route path='selectedCinema/movie/:movieid' element ={<SelectedCinema/>}/>
           <Route path='/booking' element ={<Booking/>}/>
             <Route path='*' element={<PageNotFound/>}/>
             <Route element={<ProtectedRoute/>}>
             <Route path='/user/profile' element={<Profile/>}/>
             {/* <Route path='/admin' element={<AdminLayOut/>}/> */}
             <Route
              path="/admin"
              element={
                <AdminPage redirect={<Login />}>
                  <AdminLayOut />
                </AdminPage>
              }
            />
             </Route>
             
          </Routes>
        </div>
        <Footer/>
        
      </Router>
    </div>
  );
}

export default App;
