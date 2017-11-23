import React, {Component} from "react";

import {loadAccount,signout} from "./helper";

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            facebook_name: '',
            logged : true
        }
        
        loadAccount(this);
    }

    render() {
        let username = (this.state.facebook_name ? this.state.facebook_name : this.state.email);
        let logout = (<li className="nav-item" key="0">
                        <a className="nav-link waves-effect waves-light" 
                           onClick={()=>{signout(this)}}>Sign Out</a>
                      </li>);
        let profile = (<li className="nav-item" key="1">
                            <strong className="nav-link waves-effect waves-light" 
                                    type="" 
                                    id="" 
                                    onClick={()=>{this._reactInternalInstance._currentElement._owner._instance.props.history.push("user-profile")}}>{username}
                            </strong>
                        </li>);
        let login = (<li className="nav-item" key="0">
                        <strong className="nav-link waves-effect waves-light" 
                                type="" 
                                id="login" 
                                onClick={()=>{this._reactInternalInstance._currentElement._owner._instance.props.history.push("user-login")}}>LogIn
                            </strong>
                    </li>);
        let signup = (<li className="nav-item" key="1">
                        <strong className="nav-link waves-effect waves-light" 
                                type="" 
                                id="SignUp" 
                                onClick={()=>{this._reactInternalInstance._currentElement._owner._instance.props.history.push("user-registration")}}>SignUp 
                        </strong>
                    </li>);
        let control = this.state.logged ? [profile ,logout]: [login , signup];
        return (
            <nav
                className="navbar fixed-top navbar-toggleable-sm navbar-dark elegant-color-dark navbarr">
                <div className="container">
                    <button
                        className="navbar-toggler navbar-toggler-right"
                        data-toggle="collapse"
                        data-target="#navbarNav4"
                        aria-controls="navbarNav4"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <a className="navbar-brand" onClick={()=>{this._reactInternalInstance._currentElement._owner._instance.props.history.push("/")}}>
                        <strong>FacePics</strong>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav4">
                        <ul className="navbar-nav mr-auto"></ul>

                        <ul className="navbar-nav ">
                            {control}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
