import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateGrocery from './pages/CreateGrocery';
import ShowGrocery from './pages/ShowGrocery';
import EditGrocery from './pages/EditGrocery';
import DeleteGrocery from './pages/DeleteGrocery';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/groceries/create' element={<CreateGrocery />} />
      <Route path='/groceries/details/:id' element={<ShowGrocery />} />
      <Route path='/groceries/edit/:id' element={<EditGrocery />} />
      <Route path='/groceries/delete/:id' element={<DeleteGrocery />} />
    </Routes>
  );
};

export default App;