import Container from "./container";

let navItem = ["Discover","About","Contact us","Create My Portfolio","Login"]

function Navbar(){
    return(
        <Container direction="horizontal">
        <nav className="flex w-full items-center justify-between py-4 text-white">
            {/* Bold & Large Logo */}
            <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>

            {/* Navigation Items */}
            <ul className="flex items-center gap-10 text-lg font-medium">
            {navItem.map((item) => {
                const isButton = item === "Create My Portfolio";
                return (
                <li key={item}>
                    <a
                    href="#"
                    className={
                        isButton
                        ? "rounded bg-[#F44336] px-4 py-2 font-semibold text-white transition hover:bg-[#d32f2f]"
                        : "transition hover:text-gray-300"
                    }
                    >
                    {item}
                    </a>
                </li>
                );
            })}
            </ul>
        </nav>
        </Container>
    );

}

export default Navbar;