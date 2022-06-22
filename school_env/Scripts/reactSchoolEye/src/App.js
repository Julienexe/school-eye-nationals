import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Register,
  Dashboard,
  Error,
  MinDashboard,
  Tests,
  DynamicSchool,
  Input,
  Scholarship,
} from './pages';
import Footer from './components/footer';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dashboard/tests' element={<Tests />}></Route>
        <Route path='/dashboard/:subject' element={<Input />}></Route>
        <Route path='/dashboard/scholarships' element={<Scholarship />}></Route>

        <Route path='/super' element={<MinDashboard />}></Route>
        <Route path='/super/:institution' element={<DynamicSchool />}></Route>

        <Route path='*' element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
