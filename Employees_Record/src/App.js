import './App.css';
import Home from './component/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import EmployeeState from './context/employees/EmployeeState';

function App() {
  return (
    <>
    <EmployeeState>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
    </EmployeeState>
    </>
    
  );
}

export default App;
