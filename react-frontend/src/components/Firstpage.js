import React from "react";
import {Link} from "react-router-dom";

class Firstpage extends React.Component {
    render() {
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
                                                <Link to="/user-login">
                                                    <button
                                                        className="btn btn-lg waves-effect waves-light elegant-color-dark"
                                                        type=""
                                                        id="SignUp">LogIn
                                                    </button>
                                                </Link>

                                                <Link to="/user-registration">
                                                    <button
                                                        className="btn btn-lg waves-effect waves-light elegant-color-dark"
                                                        type=""
                                                        id="SignUp">SignUp
                                                    </button>
                                                </Link>
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