import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowGrocery = () => {
  const [grocery, setGrocery] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const response = await fetch(`http://localhost:3000/groceries/${id}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setGrocery(data[0]);
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
        </div>
      )}
    </div>
  );
};

export default ShowGrocery;