import logo from './logo.svg';
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
import Cinema from './pages/CinemaDisplay/Cinema';

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
             <Route path='/movie/:movieid' element={<MovieDetail/>}/>
             <Route path='/signup' element={<SignUp/>}/>
             <Route path='/cinema' element={<Cinema/>}/>
             <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;
