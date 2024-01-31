import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import GroceryTable from '../components/GroceryTable';

const Home = () => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/groceries');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setGroceries(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Grocery List</h1>
          <Link to='/groceries/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
      </div>
      { loading ? <Spinner /> : 
        groceries.length > 0 ? <GroceryTable groceries={groceries} /> :
        <div>Empty list</div>
      }
    </div>
  );
};

export default Home;