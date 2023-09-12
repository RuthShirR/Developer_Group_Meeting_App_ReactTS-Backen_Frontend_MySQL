import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Logo />
			<h1> Class-92 Developers Meeting App </h1>
        </div>
    );
}

export default Header;
