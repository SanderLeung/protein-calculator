import { useEffect } from "react";

const TablePaginator = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className='flex items-center justify-center'>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${page === el ? 'text-white bg-blue-500' : 'text-black bg-white'} cursor-pointer mx-0.5 px-2 py-1 rounded-lg`}
          onClick={() => setPage(el)}>
          {el}
        </button>
      ))}
    </div>
  );
};

export default TablePaginator;