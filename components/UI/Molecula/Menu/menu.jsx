import Link from 'next/link'

const Header = (props) => {
    return ( 
        <>
            <div className="menu">
                <nav>
                    <Link href={"/"}>
                        <a>
                            Home
                        </a>
                    </Link>
                    <Link href={"/article"}>
                        <a>
                            Article
                        </a>
                    </Link>
                </nav>
            </div>
        </>
     );
}
 
export default Header;