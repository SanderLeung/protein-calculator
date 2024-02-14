import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TagsInput from '../components/TagsInput';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const CreateGrocery = () => {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState(null);
  const [calories, setCalories] = useState(null);
  const [cost, setCost] = useState(null);
  const [servings, setServings] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSaveGrocery = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await supabase
        .from('groceries')
        .insert({ name, protein, calories, servings, cost, user_id: user.id });

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
      <h1 className='text-center text-3xl my-4'>Create New Grocery Item</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-2'>
          <label htmlFor='name' className='text-xl mr-4 text-gray-500'>name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label htmlFor='protein' className='text-xl mr-4 text-gray-500'>protein</label>
          <input
            id='protein'
            type='number'
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label htmlFor='calories' className='text-xl mr-4 text-gray-500'>calories</label>
          <input
            id='calories'
            type='number'
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label htmlFor='servings' className='text-xl mr-4 text-gray-500'>servings</label>
          <input
            id='servings'
            type='number'
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label htmlFor='cost' className='text-xl mr-4 text-gray-500'>cost</label>
          <input
            id='cost'
            type='number'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-2'>
          <label htmlFor='tags' className='text-xl mr-4 text-gray-500'>tags</label>
          <TagsInput tags={tags} handlerFunction={setTags}/>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveGrocery}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateGrocery