import React from "react";
import {Link} from "react-router-dom";
import {loadAccount} from "./helper";

class Firstpage extends React.Component {
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
        let login = (<Link to="/user-login" key="0"><button className="btn btn-lg waves-effect waves-light elegant-color-dark" type="" id="SignUp">LogIn</button></Link>);
        let singnup = (<Link to="/user-registration" key="1"><button className="btn btn-lg waves-effect waves-light elegant-color-dark" type="" id="SignUp">SignUp</button></Link>);
        let profile = (<Link to="/user-profile"><button className="btn btn-lg waves-effect waves-light elegant-color-dark" type="" id="">{username}</button></Link>);
        let control = (this.state.logged?profile:[login ,singnup]);
        return (
            <div className="index container animated fadeIn">
                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mx-auto">
                                    <h1 className="brand-heading">FacePics</h1>
                                    <hr className="hr-light"/>
                                    <p className="intro-text">Get your photos from facebook with one click</p>
                                    <div className="container">
                                        <div className="col-lg-8 mx-auto">
                                            <div className="text-center">
                                                {control}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <footer>
                    <div className="container text-center">
                        <p>Copyright &copy; Face Pics 2017</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Firstpage;