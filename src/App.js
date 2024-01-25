import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { isAuthTokenContext } from './context/ContextShare';
import { useContext } from 'react';

function App() {

  /* for checking if it is logged in or not and to block some routes on clicking back based on some conditions */
  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  console.log("is auth", isAuthToken);

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/dashboard' element={isAuthToken?<Dashboard dashboard/>:<Home/>}/> {/* Blocking the path if it is not logged in */}
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
