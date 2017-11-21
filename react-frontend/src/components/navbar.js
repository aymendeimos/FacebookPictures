import React, {Component} from "react";

import axios from "axios";
import {Link} from "react-router-dom";

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            facebook_name: '',
            logged : true
        }
        this.signout = this.signout.bind(this);
        this.loadAccount();
    }

    loadAccount() {
        let self = this;
        axios.post("http://localhost:4200/users/gettoken")
            .then(res => {
                if (res.data.success) {
                    self.setState({
                        email: res.data.token.email,
                        facebook_name: res.data.token.facebook_name,
                        logged : true,
                    });
                } else {
                    self.setState({
                        logged : false,
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
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
        let username = (this.state.facebook_name ? this.state.facebook_name : this.state.email);
        let signout = (<li className="nav-item" key="0"><a className="nav-link waves-effect waves-light" onClick={this.signout}>Sign Out</a></li>);
        let profile = (<li className="nav-item" key="1"><Link to="/user-profile"><strong className="nav-link waves-effect waves-light" type="" id="">{username}</strong></Link></li>);
        let login = (<li className="nav-item" key="0"><Link to="/user-login"><strong className="nav-link waves-effect waves-light" type="" id="SignUp">LogIn</strong></Link></li>);
        let signup = (<li className="nav-item" key="1"><Link to="/user-registration"><strong className="nav-link waves-effect waves-light" type="" id="SignUp">SignUp </strong></Link></li>);
        let control = this.state.logged ? [profile ,signout]: [login , signup];
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
