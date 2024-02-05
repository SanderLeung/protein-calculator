import { IoFilter } from "react-icons/io5";

const Dropdown = ({data, handlerFunction}) => {
  return (
    <div className="select flex gap-x-1 items-center">
        <IoFilter className="text-2xl"/>
        <select
            onChange={e => {
                handlerFunction(e.target.value);
            }}
            className="custom-select" aria-label="Filter">
            {data = ["All", ...data]}
            {data.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
            ))}
        </select>
    </div>
  )
}

export default Dropdown