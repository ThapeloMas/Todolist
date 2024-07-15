import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter > 
      <Routes>
      <Route  path='/' element={<Login />}/>
       <Route path='/Login' element= {<Login />}/>
       <Route path='/Register' element= {<Register />}/>
      </Routes>
      </BrowserRouter>

    
    </div>
  );
}

export default App;
