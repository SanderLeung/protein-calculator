import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";

// Consider moving these into a utils/calc folder
const getLeanness = (grocery) => ((grocery.protein / grocery.calories) * 400).toFixed(2)
const getCostEffectiveness = (grocery) => ((grocery.protein * grocery.servings) / grocery.cost).toFixed(2)
const getMaxCostEffectiveness = (groceries) => {
    return groceries.reduce((acc, cur) => {
        return Math.max(acc, getCostEffectiveness(cur))
    }, 0);
};

const GroceryTable = ({ groceries }) => {
  const top = getMaxCostEffectiveness(groceries);



  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr className='bg-slate-800'>
          <th className='w-1/3 border border-slate-600 rounded-md'>
            <div className='flex justify-center items-center gap-x-1'>
              Name
              <button><BiSolidDownArrow /></button>
              <button><BiSolidUpArrow /></button>
            </div>
          </th>
          <th className='w-1/4 border border-slate-600 rounded-md'>
            <div className='flex justify-center items-center gap-x-1'>
              Leanness
              <button><BiSolidDownArrow /></button>
              <button><BiSolidUpArrow /></button>
            </div>
          </th>
          <th className='w-1/4 border border-slate-600 rounded-md'>
            <div className='flex justify-center items-center gap-x-1'>
              Cost Effectiveness
              <button><BiSolidDownArrow /></button>
              <button><BiSolidUpArrow /></button>
            </div>
          </th>
          <th className='w-1/6 border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {groceries.map((grocery) => (
          <tr key={grocery.id} className='h-8 bg-slate-800'>
            <td className='border border-slate-700 rounded-md text-center text-wrap'>
              {grocery.name}
            </td>
            <td className='border border-slate-700 rounded-md'>
              <div className='bg-green-700 rounded-md flex items-center' style={{ width: `${getLeanness(grocery)}%`}}>
                {`${getLeanness(grocery)}%`}
              </div>
            </td>
            <td className='border border-slate-700 rounded-md'>
              <div className='bg-lime-700 rounded-md flex items-center' style={{ width: `${getCostEffectiveness(grocery)/top*100}%`}}>
                {`${getCostEffectiveness(grocery)}g/$`}
              </div>
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center items-center gap-x-4'>
                <Link to={`/groceries/details/${grocery.id}`}>
                  <BsFillInfoCircleFill className='text-l text-blue-900' />
                </Link>
                <Link to={`/groceries/edit/${grocery.id}`}>
                  <AiOutlineEdit className='text-2xl text-blue-800' />
                </Link>
                <Link to={`/groceries/delete/${grocery.id}`}>
                  <MdOutlineDelete className='text-xl text-red-600' />
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