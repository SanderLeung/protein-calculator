import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const GroceryTable = ({ groceries }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Leanness
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Cost Effectiveness
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {groceries.map((grocery) => (
          <tr key={grocery.id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {grocery.name}
            </td>
            <td className='border border-slate-700 rounded-md text-right'>
              {`${((grocery.protein / grocery.calories) * 400).toFixed(2)}%`}
            </td>
            <td className='border border-slate-700 rounded-md text-right'>
              {`${((grocery.protein * grocery.servings) / grocery.cost).toFixed(2)}g/$`}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/groceries/details/${grocery.id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/groceries/edit/${grocery.id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/groceries/delete/${grocery.id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GroceryTable;