import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import './App.css';
 

const Home = () => <main><h1>Welcome to the Property Management System</h1></main>;
import MainRouter from './router/MainRouter';
import './App.css';
 


 
function App() {
  
  return (
    <MainRouter />
  );
}
 
export default App;