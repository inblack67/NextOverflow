import Link from 'next/link'

const Navbar = () => {

    return (
        <nav className='black'>
            <div className="nav-wrapper">
                <div className="container">
                    <Link href='/'>
                        <a className="brand-logo">
                            Next<span className="red-text">Overflow</span>
                        </a>
                    </Link>
                    <ul className="right">
                        <li>
                            <Link href='/login'>
                                <a>
                                    Login
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/register'>
                                <a>
                                    Register
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/login'>
                                <a>
                                    Logout
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/about'>
                                <a>
                                    About
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;