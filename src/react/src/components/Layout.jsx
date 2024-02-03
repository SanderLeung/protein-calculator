export function Layout ({ children }) {
    return (
        <div
            // className="flex flex-col w-full overflow-hidden min-h-screen
            // bg-background text-title
            // transition-colors duration-300">
            className="min-w-full min-h-screen flex items-center justify-center bg-gray-200">
            {children}
        </div>   
    )
}