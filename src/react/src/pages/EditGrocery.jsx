import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const EditGrocery = () => {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState('');
  const [calories, setCalories] = useState('');
  const [cost, setCost] = useState('');
  const [servings, setServings] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const response = await fetch(`http://localhost:3000/groceries/${id}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          const grocery = data[0];
          setName(grocery.name);
          setProtein(grocery.protein);
          setCalories(grocery.calories);
          setServings(grocery.servings);
          setCost(grocery.cost);
      } catch (error) {
          console.error(error);
      } finally {
          setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveGrocery = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:3000/grocery/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, protein, calories, servings, cost }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLoading(false);
        navigate('/')
    } catch (error) {
        setLoading(false);
        console.error(error);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Grocery Item</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>protein</label>
          <input
            type='number'
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>calories</label>
          <input
            type='number'
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>servings</label>
          <input
            type='number'
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>cost</label>
          <input
            type='number'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveGrocery}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditGrocery