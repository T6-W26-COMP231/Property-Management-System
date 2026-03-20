import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import './App.css';
import MainRouter from './router/MainRouter';
 


 
function App() {
  
  return (
    <MainRouter />
  );
}
 
export default App;