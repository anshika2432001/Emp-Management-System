import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={<ListEmployeeComponent />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          {/* Uncomment the line below if you plan to use the edit functionality */}
          {/* <Route path="/edit-employee/:id" element={<AddEmployeeComponent />} /> */}
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;