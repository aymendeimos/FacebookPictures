import React, {Component} from "react";

import axios from "axios";
import {Link} from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
    }

    signout() {
        axios.post("http://localhost:4200/users/logout")
            .then(res => {
                if (res.data.success) {
                    this.notifState("info", "Logging out");
                    window.location = "/";
                } else {
                    this.notifState("danger","Internal error plz try again later");
                }
            })
            .catch(err => {
                this.notifState("danger","Internal error plz try again later");
            })
    }

    notifState(type, message) {
        var notif = document.getElementById("notif");
        notif.innerHTML = message;
        notif.className = "btn btn-" + type;
        notif.style.display = "block";
        notif.style.opacity = 1;
        setTimeout(() => {
            var fadeEffect = setInterval(function () {
                if (!notif.style.opacity) {
                    notif.style.opacity = 1;
                }
                if (notif.style.opacity < 0.1) {
                    clearInterval(fadeEffect);
                } else {
                    notif.style.opacity -= 0.1;
                }
            }, 200);
        }, 1000);
    }

    render() {
        let signout = (<li className="nav-item"><a className="nav-link waves-effect waves-light" onClick={this.signout}>Sign Out</a></li>);
        let login = (<li className="nav-item" key="0"><Link to="/user-login"><strong className="nav-link waves-effect waves-light" type="" id="SignUp">LogIn</strong></Link></li>);
        let signup = (<li className="nav-item" key="1"><Link to="/user-registration"><strong className="nav-link waves-effect waves-light" type="" id="SignUp">SignUp </strong></Link></li>);
        let control = this.props.username ? signout: [login , signup];
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
                            <li className="nav-item">
                                <a className="nav-link waves-effect waves-light">
                                    {this.props.username}
                                </a>
                            </li>
                            {control}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
