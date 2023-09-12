import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<nav>
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/add-meeting">Add Meeting</NavLink>
              
            </nav>
        </div>
    );
}

export default Menu;
