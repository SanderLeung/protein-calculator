const TagsInput = ({ tags, handlerFunction }) => {

    function handleKeyDown(e){
        // If user did not press enter key, return
        if(e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if(!value.trim()) return
        // Add the value to the tags array
        handlerFunction([...tags, value])
        // Clear the input
        e.target.value = ''
    }

    function removeTag(index){
        handlerFunction(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container flex flex-wrap items-center gap-0.5 border-2 p-2 border-gray-500">
            { tags.map((tag, index) => (
                <div className="tag-item inline-block rounded-2xl bg-slate-800 px-2" key={index}>
                    <span className="text">{tag}</span>
                    <span onClick={() => removeTag(index)} 
                        className="close bg-slate-950 inline-flex items-center justify-center h-4 w-4 rounded-full ml-1 cursor-pointer">&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown}
                type="text"
                className="tags-input grow px-2 border-0 outline-0 max-w-72"
                placeholder="Type and press enter to add new tags" />
        </div>
    )
}

export default TagsInput