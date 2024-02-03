import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const DeleteGrocery = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteGrocery = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('groceries')
        .delete()
        .eq('id', id);
        
      setLoading(false);
      navigate('/groceries/details');
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Grocery</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this item?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteGrocery}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteGrocery;