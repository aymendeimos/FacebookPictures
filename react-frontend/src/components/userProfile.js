import React from "react";

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
            saved_photos:[],
            photos_to_remove :[],
            control_out : true
        };

        this.savePhotos = this.savePhotos.bind(this);
        this.deletPhotos = this.deletPhotos.bind(this);
        this.getSavedPhotos = this.getSavedPhotos.bind(this);
        this.fetchPhotosFacebook = this.fetchPhotosFacebook.bind(this);
        this.select = this.select.bind(this);
        this.selectToDelet = this.selectToDelet.bind(this);
        this.showControl = this.showControl.bind(this);
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
            if(result){
                result.forEach(item => {
                    savedPhotos.push(item);
                });                
                self.setState({
                    saved_photos : savedPhotos
                });
            } else{
                notifState("warning", "Nothing saved");
            }
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
                        <img id={i} className="img-thumbnail savedPhoto" src={object} alt="" onClick={this.selectToDelet}/>
                    </div>
                );
            })
        }
        return gallery;
    }

    select(event) {
        let selected = this.state.selected_photos;
        if (selected.includes(event.target.src)) {
            document.getElementById(event.target.id).className = "img-thumbnail";
            selected.splice(selected.indexOf(event.target.src), 1);
        } else {
            document.getElementById(event.target.id).className += " selected";
            selected.push(event.target.src);
        }
        this.setState({
            selected_photos : selected
        })
    }

    selectToDelet(event){
        let selected = this.state.photos_to_remove;
        if (selected.includes(event.target.src)) {
            document.getElementById(event.target.id).className = "img-thumbnail savedPhoto ";
            selected.splice(selected.indexOf(event.target.src), 1);
        } else {
            document.getElementById(event.target.id).className += " selectedToRemove";
            selected.push(event.target.src);
        }
        this.setState({
            photos_to_remove : selected
        })
    }

    savePhotos() {
        let photosToSave = this.state.selected_photos;
        if(photosToSave.length === 0){
            notifState("warning", "Select some photos");
            return;
        }
        let photosSaved = this.state.saved_photos;
        let photos = [  ...new Set(photosToSave.concat(photosSaved)) ];
        let database = firebase.database().ref(this.state.id);
        database.set(photos);
        notifState("success", "Uploaded");
        this.getSavedPhotos();
        let allPhotos = document.getElementsByClassName(" selected");
        let temp = [];
        for (let key = 0; key < allPhotos.length; key++) {
            temp.push(allPhotos[key]);
        }
        for(let key in temp){
            temp[key].className = "img-thumbnail"; 
        }
        this.setState({
            selected_photos:[]
        })
    }

    deletPhotos() {
        let photosToDelet = this.state.photos_to_remove;
        if(photosToDelet.length === 0){
            notifState("warning", "Select some photos to remove");
            return;
        }
        let photosSaved = this.state.saved_photos;
        photosSaved = photosSaved.filter(el => !photosToDelet.includes(el));
        let database = firebase.database().ref(this.state.id);
        database.set(photosSaved);
        notifState("success", "Deleted");
        this.getSavedPhotos();
        let allPhotos = document.getElementsByClassName(" selectedToRemove");
        let temp = [];
        for (let key = 0; key < allPhotos.length; key++) {
            temp.push(allPhotos[key]);
        }
        for(let key in temp){
            temp[key].className = "img-thumbnail savedPhoto "; 
        }
        this.setState({
            saved_photos : photosSaved,
            photos_to_remove:[]
        })
    }

    showControl(){
        let self = this ;
        let showControlButton = document.getElementById("showControlButton").children;
        let refreshButton = document.getElementById("refreshButton");
        let saveButton = document.getElementById("saveButton");
        let showSavedButton = document.getElementById("showSavedButton");
        let deletButton = document.getElementById("deleteButton");
        if(!self.state.control_out){
            refreshButton.style.display = "block";
            saveButton.style.display = "block";
            showSavedButton.style.display = "block";
            deletButton.style.display = "block";
            showControlButton[0].style.transform  = "rotate(135deg)";
            self.setState({
                control_out : true
            });
        }else{
            showControlButton[0].style.transform  = "rotate(0deg)";
            refreshButton.style.display = "none";
            saveButton.style.display = "none";
            showSavedButton.style.display = "none";
            deletButton.style.display = "none";
            self.setState({
                control_out : false
            });
        }
    }

    render() {
        if (this.state.facebook_id) {
            return (
                <div>
                    <Navbar/>
                    <div id="gallery" className="row center">
                        {this.mapSavedPhotos(this.state.saved_photos)}
                        {this.mapPhotos(this.state.photos)}
                    </div>
                    <div id="showControlButton"
                         className="show-control waves-effect waves-light" 
                         onClick={this.showControl}>
                        <img id="showControlImg" src="./assets/img/plus.png" className="img-fluid" alt="refresh"/>
                    </div>
                    <div id="refreshButton" 
                         data-balloon="Refresh photos from facebook" 
                         data-balloon-pos="left" 
                         className="ballon refresh animated fadeInUp waves-effect waves-light" 
                         onClick={this.fetchPhotosFacebook}>
                        <img id="refreshImg" src="./assets/img/refresh.png" className="img-fluid" alt="refresh"/>
                    </div>
                    <div id="saveButton" 
                         data-balloon={"Save " + this.state.selected_photos.length + " selected photos"}
                         data-balloon-pos="left" 
                         className="ballon save animated fadeInUp waves-effect waves-light" 
                         onClick={this.savePhotos}>
                        <img id="saveImg" src="./assets/img/save.png" className="img-fluid" alt="refresh"/>
                    </div>
                    <div id="showSavedButton" 
                         data-balloon="Show saved photos" 
                         data-balloon-pos="left" 
                         className="ballon showSaved animated fadeInUp waves-effect waves-light" 
                         onClick={this.getSavedPhotos}>
                        <img id="showSavedImg" src="./assets/img/show.png" className="img-fluid" alt="refresh"/>
                    </div>
                    <div id="deleteButton" 
                         data-balloon={"Delet " + this.state.photos_to_remove.length + " Selected photos"} 
                         data-balloon-pos="left" 
                         className="ballon delete animated fadeInUp waves-effect waves-light" 
                         onClick={this.deletPhotos}>
                        <img id="deleteImg" src="./assets/img/delet.png" className="img-fluid" alt="refresh"/>
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