import React from "react";

import axios from "axios";

import Navbar from "./navbar";

import firebase from "firebase";

import {notifState,loadScript,loadAccount,facebookLogin} from "./helper"

var config = {
    apiKey: "AIzaSyC0s9Sox9XTVuWZvngWP6EFp0shuBeGSZI",
    authDomain: "codingchallenge-3e229.firebaseapp.com",
    databaseURL: "https://codingchallenge-3e229.firebaseio.com",
    projectId: "codingchallenge-3e229",
    storageBucket: "codingchallenge-3e229.appspot.com",
    messagingSenderId: "798211561197"
};

firebase.initializeApp(config);

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            facebook_id: "",
            facebook_name: "",
            facebook_accesstoken: "",
            photos : [],
            selected_photos: [],
            saved_photos:[]
        };

        this.updateAccount = this.updateAccount.bind(this);
        this.savePhotos = this.savePhotos.bind(this);
        this.getSavedPhotos = this.getSavedPhotos.bind(this);
        this.fetchPhotosFacebook = this.fetchPhotosFacebook.bind(this);
        this.select = this.select.bind(this);

        //load account if the user is connected if not go to log in
        loadAccount(this);
        //load facebook script
        loadScript();

    }
    

    getSavedPhotos(){
        let database = firebase.database().ref(this.state.id);
        let savedPhotos = [];
        let self = this;
        database.on("value", res => {
            let result = res.val();
            result.forEach(item => {
                savedPhotos.push(item);
            });
            self.setState({
                saved_photos : savedPhotos
            });
        }, err => {
            console.log("Error:  " + err.code);
        });
    }

    fetchPhotosFacebook() {
        let self = this;
        if (self.state.facebook_id) {
            notifState("success", "Fetching your photos....");
            window.FB.api("/" + 
                          self.state.facebook_id + 
                          "/photos?type=uploaded&limit=1000&fields=source,picture,cover,link,name,created_t" +
                          "ime&access_token=" + 
                          self.state.facebook_accesstoken, 
                          function (response) {
                            if (response && !response.error) {
                                //response.data
                                //console.log(response.data);
                                self.setState({
                                    photos : response.data
                                });
                                notifState("success", "Done");
                            } else {
                                self.setState({facebook_id: "", facebook_name: "", facebook_accesstoken: ""});
                                notifState("danger", "We cant Fetch your photos session expired");
                            }
                        });
        } else {
            notifState("danger", "Link your facebook account first");
        }
    }

    updateAccount(facebook_id, facebook_name, facebook_accesstoken) {
        axios.post("http://localhost:4200/users/update/" + this.state.id, {facebook_id, facebook_name, facebook_accesstoken})
            .then(res => {
                if (res.data.success) {
                    notifState("success", res.data.message);
                } else {
                    notifState("danger", res.data.message);
                }
            })
            .catch(err => {
                notifState("danger", "Internal Error plz try again later");
            });
    }

    mapPhotos(photos){
        let gallery;
        if (photos instanceof Array) {
            gallery = photos.map((object, i) => {
                return (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 photo animated zoomIn" key={i}>
                        <img className="img-thumbnail" id={object.id} src={object.source} alt={object.name} onClick={this.select} />
                    </div>
                );
            })
        }
        return gallery;
    }

    mapSavedPhotos(photos){
        let gallery;
        if (photos instanceof Array) {
            gallery = photos.map((object, i) => {
                return (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 photo animated zoomIn" key={i}>
                        <img className="img-thumbnail savedPhoto" src={object} alt=""/>
                    </div>
                );
            })
        }
        return gallery;
    }

    select(event) {
        let selected = this.state.selected_photos;
        if (selected.includes(event.target.src)) {
            document.getElementById(event.target.id).className = document.getElementById(event.target.id).className.replace(/(?:^|\s)selected(?!\S)/g, " ");
            selected.splice(selected.indexOf(event.target.src), 1);
        } else {
            document.getElementById(event.target.id).className += " selected";
            selected.push(event.target.src);
        }
        this.setState({
            selected_photos : selected
        })
    }

    savePhotos() {
        let photosToSave = this.state.selected_photos;
        let photosSaved = this.state.saved_photos;
        let photos = [  ...new Set(photosToSave.concat(photosSaved)) ];
        let database = firebase.database().ref(this.state.id);
        database.set(photos);
        notifState("success", "uploaded");
        this.getSavedPhotos();
    }


    render() {
        if (this.state.facebook_id) {
            return (
                <div>
                    <Navbar/>
                    <div id="gallery" className="row center">
                        <div className="col-md-12">
                            <a>Select photos and click the button</a>
                            <button id="upload" className="btn btn-indigo" onClick={this.savePhotos}>Save {this.state.selected_photos.length}</button>
                            <button id="showSaved" className="btn btn-indigo" onClick={this.getSavedPhotos}>Show Saved photos</button>
                        </div>
                        {this.mapSavedPhotos(this.state.saved_photos)}
                        {this.mapPhotos(this.state.photos)}
                    </div>
                    <div className="refresh waves-effect waves-light" onClick={this.fetchPhotosFacebook}>
                        <img id="refresh" src="./assets/img/refresh.png" className="img-fluid" alt="refresh"/>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Navbar/>
                    <img
                        className="img-fluid mx-auto"
                        id="facebooklink"
                        src="./assets/img/loginFacebook.png"
                        title="facebook login"
                        alt="facebook"
                        onClick={() => facebookLogin(this)} />
                </div>
            );
        }
    }
}

export default UserProfile;