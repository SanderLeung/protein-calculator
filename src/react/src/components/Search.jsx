import { IoSearch } from "react-icons/io5";

const Search = ({data, handlerFunction}) => {
  return (
    <div className="search-wrapper">
        <label htmlFor="search-form" className="flex gap-x-1 items-center">
        <IoSearch className="text-2xl"/>
            <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search..."
                value={data}
                /*
                // set the value of our useState q
                //  anytime the user types in the search box
                */
                onChange={(e) => handlerFunction(e.target.value)}
            />
        </label>
    </div>
  )
}

export default Search