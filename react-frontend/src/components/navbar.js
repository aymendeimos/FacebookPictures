import React, {Component} from "react";
import {Link} from "react-router-dom";

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
        let logout = (<li className="nav-item" key="0"><a className="nav-link waves-effect waves-light" onClick={signout}>Sign Out</a></li>);
        let profile = (<li className="nav-item" key="1"><Link to="/user-profile"><strong className="nav-link waves-effect waves-light" type="" id="">{username}</strong></Link></li>);
        let login = (<li className="nav-item" key="0"><Link to="/user-login"><strong className="nav-link waves-effect waves-light" type="" id="SignUp">LogIn</strong></Link></li>);
        let signup = (<li className="nav-item" key="1"><Link to="/user-registration"><strong className="nav-link waves-effect waves-light" type="" id="SignUp">SignUp </strong></Link></li>);
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
                    <a className="navbar-brand" href="/">
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
