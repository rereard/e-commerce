const Header = ({children}) => {
    return(
        <header className="md:text-3xl text-2xl p-3 border-secondary border-b-2 w-full font-medium">
            {children}
        </header>
    )
}
export default Header