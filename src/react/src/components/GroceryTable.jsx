import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import Search from './Search';
import Dropdown from './Dropdown';
import TablePaginator from './TablePaginator';

// Consider moving these into a utils/calc folder
const getName = (grocery) => grocery.name;
const getLeanness = (grocery) => ((grocery.protein / grocery.calories) * 400).toFixed(2)
const getCostEffectiveness = (grocery) => (((grocery.protein * grocery.servings) / grocery.cost) || 0).toFixed(2)
const getMaxCostEffectiveness = (groceries) => {
    return groceries.reduce((acc, cur) => {
        return Math.max(acc, getCostEffectiveness(cur))
    }, 0);
};

const usePage = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
  };
  
  const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  useEffect(() => {
      const range = calculateRange(data, rowsPerPage);
      setTableRange([...range]);

      const slice = sliceData(data, page, rowsPerPage);
      setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
};

const GroceryTable = ({ groceries }) => {
  const top = getMaxCostEffectiveness(groceries);
  const [sortParam, setSortParam] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [query, setQuery] = useState("")
  const [filterParam, setFilterParam] = useState("All");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleSortingChange = (accessor, sortOrder) => {
    const handleSorting = (sortParam, sortOrder) => {
      setSortOrder(sortOrder);
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

    setSortParam(() => accessor);
    handleSorting(accessor, sortOrder);
  };

  const search = (items) => {
    return items.filter((item) => {
      if (filterParam == "All" || 
        (item.tags ? item.tags.includes(filterParam) : false)) {
        return ["name"].some((newItem) => {
          return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1
          );
        });
      }
    })       
  };

  const categories = () => {
    const categorySet = new Set(
      groceries.reduce((acc, cur) => {
        return acc.concat(cur.tags ?? [])
      }, [])
    );
    return [...categorySet];
  }

  const groceryData = useMemo(() => (search(groceries)), [groceries, sortParam, sortOrder, query, filterParam, page])
  const { slice, range } = usePage(groceryData, page, rowsPerPage);

  return (
    <div className='wrapper'>
      <div className='flex justify-between items-center'>
        <Search data={query} handlerFunction={setQuery} />
        <div className='my-2 flex'>
          <input
            id='page'
            type='number'
            value={rowsPerPage}
            onInput={(e) => setRowsPerPage(e.target.value)}
            className='px-4 py-2'
          />
          <label htmlFor='page' className='ml-4'>rows per page</label>
        </div>
        <Dropdown data={categories()} handlerFunction={setFilterParam} />
      </div>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr className='bg-slate-800'>
            <th className='w-1/3 border border-slate-600 rounded-md'>
              <div className='flex justify-center items-center gap-x-1'>
                Name
                <button onClick={() => handleSortingChange(getName, "asc")}>
                  <BiSolidUpArrow />
                </button>
                <button onClick={() => handleSortingChange(getName, "desc")}>
                  <BiSolidDownArrow />
                </button>
              </div>
            </th>
            <th className='w-1/4 border border-slate-600 rounded-md'>
              <div className='flex justify-center items-center gap-x-1'>
                Leanness
                <button onClick={() => handleSortingChange(getLeanness, "asc")}>
                  <BiSolidUpArrow />
                </button>
                <button onClick={() => handleSortingChange(getLeanness, "desc")}>
                  <BiSolidDownArrow />
                </button>
              </div>
            </th>
            <th className='w-1/4 border border-slate-600 rounded-md'>
              <div className='flex justify-center items-center gap-x-1'>
                Cost Effectiveness
                <button onClick={() => handleSortingChange(getCostEffectiveness, "asc")}>
                  <BiSolidUpArrow />
                </button>
                <button onClick={() => handleSortingChange(getCostEffectiveness, "desc")}>
                  <BiSolidDownArrow />
                </button>
              </div>
            </th>
            <th className='w-1/6 border border-slate-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((grocery) => (
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
      <div className='flex justify-center items-center'>
        <TablePaginator range={range} slice={slice} setPage={setPage} page={page} />
      </div>
     
    </div>
  );
};

export default GroceryTable;