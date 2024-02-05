import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { supabase } from '../supabaseClient';

const ShowGrocery = () => {
  const [grocery, setGrocery] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('groceries')
          .select('*')
          .eq('id', id)
          .single()
        setGrocery(data);
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
      <BackButton />
      <h1 className='text-3xl my-4'>Show Grocery</h1>
      {loading ? <Spinner /> : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{grocery.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Protein</span>
            <span>{grocery.protein}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Calories</span>
            <span>{grocery.calories}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Servings</span>
            <span>{grocery.servings}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Cost</span>
            <span>{grocery.cost}</span>
          </div>
          <div className='flex justify-center items-center gap-x-4'>
            <Link to={`/groceries/edit/${id}`}>
              <AiOutlineEdit className='text-2xl fill-blue-800' />
            </Link>
            <Link to={`/groceries/delete/${id}`}>
              <MdOutlineDelete className='text-xl fill-red-600' />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowGrocery;