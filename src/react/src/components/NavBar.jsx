import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

export function Navbar() {
  return (
    <nav className="flex justify-between gap-x-2 px-4 py-2">
      <h1 className="text-title font-bold text-2xl">
        <Link to='/' className='flex justify-between items-center'>
          <MdHome className='fill-sky-800 text-4xl' />
        </Link>
      </h1>
      <div className="flex flex-row gap-x-2 justify-center items-center">
        <Link to='/account' className='flex justify-between items-center'>
          <MdAccountCircle className='fill-sky-800 text-4xl' />
        </Link>
      </div>
    </nav>
  )
}