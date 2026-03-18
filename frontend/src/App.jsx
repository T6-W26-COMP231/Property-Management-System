import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
 

const Home = () => <main><h1>Welcome to the Property Management System</h1></main>;
const Contact = () => <main><h1>Contact Support</h1></main>;
 
function App() {
  
  const userRole = 'guest';
 
  return (
    <Router>
      <div className="App">
        <Navbar userRole={userRole} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;