import { Routes, Route } from "react-router-dom";
import LogIn from './components1/LogIn'
import SignUp from './components1/SignUp'
import PrivateRoute from "./components2/PrivateRoutes";
import View from "./components2/View";
import Home from "./components3/Home";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
          <Route path='/tasks' element={<View />} />
        </Route>
        <Route path='/' element={<Home/>} />
      </Routes>
      
    </div>
  );
}

export default App;
