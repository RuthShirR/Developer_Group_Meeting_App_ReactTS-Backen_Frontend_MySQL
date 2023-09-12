import { Component } from "react";
import "./Logo.css";
import logoImage from "../../../Assets/Images/logo.jpeg"



 class Logo extends Component{
    public render(): JSX.Element {
        return (
        <div className="Logo">
            <img src={logoImage} alt="Logo"/>
        </div>
        );
    }
 } 
 export default Logo;