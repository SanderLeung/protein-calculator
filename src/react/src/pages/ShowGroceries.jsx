import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import GroceryTable from '../components/GroceryTable';
import { supabase } from '../supabaseClient';

const ShowGroceries = () => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);

        try {
          const { data: { user } } = await supabase.auth.getUser()
          const { data, error } = await supabase
            .from('groceries')
            .select('*')
            .eq('user_id', user.id)
            .order('id')
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
          <h1 className='text-3xl my-8 text-slate-50'>Grocery List</h1>
          <Link to='/groceries/create' className='flex justify-between items-center text-l'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />Create New
          </Link>
      </div>
      { loading ? <Spinner /> : 
        groceries.length > 0 ? <GroceryTable groceries={groceries} /> :
        <div>Empty list</div>
      }
    </div>
  );
};

export default ShowGroceries;