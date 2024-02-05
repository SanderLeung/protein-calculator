import { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import Search from './Search';
import Dropdown from './Dropdown';

// Consider moving these into a utils/calc folder
const getName = (grocery) => grocery.name;
const getLeanness = (grocery) => ((grocery.protein / grocery.calories) * 400).toFixed(2)
const getCostEffectiveness = (grocery) => ((grocery.protein * grocery.servings) / grocery.cost).toFixed(2)
const getMaxCostEffectiveness = (groceries) => {
    return groceries.reduce((acc, cur) => {
        return Math.max(acc, getCostEffectiveness(cur))
    }, 0);
};

const GroceryTable = ({ groceries }) => {
  const top = getMaxCostEffectiveness(groceries);
  const [sortParam, setSortParam] = useState((null));
  const [order, setOrder] = useState("asc");
  const [query, setQuery] = useState("")
  const [filterParam, setFilterParam] = useState(["All"]);

  const handleSortingChange = (accessor) => {
    const handleSorting = (sortParam, sortOrder) => {
      if (sortParam) {
        groceries.sort((a, b) => {
          if (sortParam(a) === null) return 1;
          if (sortParam(b) === null) return -1;
          if (sortParam(a) === null && sortParam(b) === null) return 0;
          return (
            sortParam(a).toString().localeCompare(sortParam(b).toString(), "en", {
              numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
          );
        });
      }
    };

    const sortOrder =
      accessor === sortParam && order === "asc" ? "desc" : "asc";
    setSortParam(() => accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const search = (items) => {
    return items.filter((item) => {
      return ["name"].some((newItem) => {
        return (
            item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) > -1
        );
      });
    })       
  };

  const categories = () => {
    const categorySet = new Set(
      groceries.reduce((acc, cur) => {
        return acc.concat(cur.tags ?? [])
      }, [])
    );
    console.log([...categorySet])
    return [...categorySet];
  }

  return (
    <div className='wrapper'>
      <div className='flex justify-between items-center'>
        <Search data={query} handlerFunction={setQuery} />
        <Dropdown data={categories()} handlerFunction={setFilterParam} />
      </div>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr className='bg-slate-800'>
            <th className='w-1/3 border border-slate-600 rounded-md'>
              <div className='flex justify-center items-center gap-x-1'>
                Name
                <button onClick={() => handleSortingChange(getName)}>
                  <BiSolidUpArrow /><BiSolidDownArrow />
                </button>
              </div>
            </th>
            <th className='w-1/4 border border-slate-600 rounded-md'>
              <div className='flex justify-center items-center gap-x-1'>
                Leanness
                <button onClick={() => handleSortingChange(getLeanness)}>
                  <BiSolidUpArrow /><BiSolidDownArrow />
                </button>
              </div>
            </th>
            <th className='w-1/4 border border-slate-600 rounded-md'>
              <div className='flex justify-center items-center gap-x-1'>
                Cost Effectiveness
                <button onClick={() => handleSortingChange(getCostEffectiveness)}>
                  <BiSolidUpArrow /><BiSolidDownArrow />
                </button>
              </div>
            </th>
            <th className='w-1/6 border border-slate-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {search(groceries).map((grocery) => (
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
                    <BsFillInfoCircleFill className='text-l fill-blue-700' />
                  </Link>
                  <Link to={`/groceries/edit/${grocery.id}`}>
                    <AiOutlineEdit className='text-2xl fill-blue-800' />
                  </Link>
                  <Link to={`/groceries/delete/${grocery.id}`}>
                    <MdOutlineDelete className='text-xl fill-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroceryTable;