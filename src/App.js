import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Todolist from './Todolist';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter > 
      <Routes>
      <Route  path='/' element={<Register />}/>
       <Route path='/Register' element= {<Register />}/>
       <Route path='/Login' element= {<Login />}/>
       <Route path='/Todolist' element= {<Todolist />}/>
      </Routes>
      </BrowserRouter>

    
    </div>
  );
}

export default App;
