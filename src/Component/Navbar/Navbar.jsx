import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li><NavLink className="NavLink" to="">Home</NavLink></li>
                    <li><NavLink className="NavLink" to="results">Results</NavLink></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
