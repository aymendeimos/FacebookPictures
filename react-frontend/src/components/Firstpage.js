import React from "react";
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
        let login = (<button   className="btn btn-lg waves-effect waves-light elegant-color-dark" 
                               key="0" type="" 
                               id="SignUp" 
                               onClick={()=>{this.props.history.push("user-login")}}>
                            LogIn
                    </button>);
        let singnup = (<button className="btn btn-lg waves-effect waves-light elegant-color-dark" 
                               key="1" 
                               type="" 
                               id="SignUp" 
                               onClick={()=>{this.props.history.push("user-registration")}}>
                            SignUp
                        </button>);
        let profile = (<button className="btn btn-lg waves-effect waves-light elegant-color-dark" 
                               key="2" 
                               type="" 
                               id="" 
                               onClick={()=>{this.props.history.push("user-profile")}}>
                            {username}
                        </button>);
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