const BottomBar = ({children}) => {
    return(
        <div className="flex flex-row items-center text-sm md:text-lg bg-tertiary bottom-0 right-0 left-0 w-screen h-10 md:h-14 fixed">
            {children}
        </div>
    )
}
export default BottomBar