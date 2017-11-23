import axios from "axios";

export function checkLogin(context){
	axios.post("http://localhost:4200/users/gettoken")
	.then(res => {
		if(res.data.success){
			context.setState({
				logged : true
			});
			notifState("warning","You are already logged in");
			setTimeout(() => (window.location = "/user-profile"),2000);
		}else{
			context.setState({
				logged : false
			});
		}
	})
	.catch(err => {
	  console.log(err);
	});
};

//change notification text and color
export function notifState(type, message) {
	let notif = document.getElementById("notif");
	notif.innerHTML = message;
	notif.className = "btn btn-" + type;
	notif.style.display = "block";
	notif.style.opacity = 1;
	setTimeout(() => {
		let fadeEffect = setInterval(function () {
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
};

export function checkEmail(context,style) {
	var email = document.getElementById("mail").children;
	// language=JSRegexp
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(context.state.email)) {
		if (style === true) {
			email[0].style.color = "#c00";
			email[1].style.borderBottom = "1px solid #c00";
			email[1].style.boxShadow = "0 0px 0 0 #fff";
			email[2].style.color = "#c00";
			email[3].innerText = "enter a valid email address";
			email[3].style.color = "#c00";
			email[3].style.fontSize = "0.9rem";
		}
		return false;
	}
	else {
		if (style === true) {
			email[0].style.color = "#00c851";
			email[1].style.borderBottom = "1px solid #00c851";
			email[1].style.boxShadow = "0 0px 0 0 #fff";
			email[2].style.color = "#00c851";
			email[3].innerText = "";
		}
		return true;
	}
};

export function checkPassword(context,style) {
	var password = document.getElementById("password").children;
	if (context.state.password.length < 8 || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{7,25}$/.test(context.state.password))) {
		if (style === true) {
			password[0].style.color = "#c00";
			password[1].style.borderBottom = "1px solid #c00";
			password[1].style.boxShadow = "0 0px 0 0 #fff";
			password[2].style.color = "#c00";
			password[3].innerText = "your password must be at least 8 characters, long uppercase, lowercase, number and special characters";
			password[3].style.color = "#c00";
			password[3].style.fontSize = "0.9rem";
		}
		return false;
	}
	else {
		if (style === true) {
			password[0].style.color = "#00c851";
			password[1].style.borderBottom = "1px solid #00c851";
			password[1].style.boxShadow = "0 0px 0 0 #fff";
			password[2].style.color = "#00c851";
			password[3].innerText = "";
		}
		return true;
	}
};

export function loadScript() {
	window.fbAsyncInit = function () {
		window.FB.init({
				appId: "864188347076044", cookie: true, // enable cookies to allow the server to access the session
				xfbml: true, // parse social plugins on this page
				version: "v2.8" // use version 2.8
			});
	};
	// Load the required SDK asynchronously for facebook
	(function (d, s, id) {
		var js,
			fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) 
			return;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs
			.parentNode
			.insertBefore(js, fjs);
	}(document, "script", "facebook-jssdk"));
};

export function facebookLogin(context) {
	window.FB.login(function (res) {
		context.setState({facebook_accesstoken: res.authResponse.accessToken});
		if (res.status === "connected") {
			// Logged into your app and Facebook.
			window.FB.api("/me", function (user) {
				context.setState({facebook_id: user.id, facebook_name: user.name});
				updateAccount(context.state.id,user.id, user.name, context.state.facebook_accesstoken);
			});
			
		} else if (res.status === "not_authorized") {
			console.log("Import error", "Authorize app to import data", "error")
		} else {
			console.log("Import error", "Error occured while importing data", "error")
		}
	}, {scope: "email,public_profile,user_photos"});
}

export function loadAccount(context) {
	axios.post("http://localhost:4200/users/gettoken")
		.then(res => {
			if (res.data.success) {
				context.setState({
					id: res.data.token.id,
					email: res.data.token.email,
					facebook_id: res.data.token.facebook_id,
					facebook_name: res.data.token.facebook_name,
					facebook_accesstoken: res.data.token.facebook_accesstoken,
					logged : true
				});
			} else {
				context.setState({
					logged : false
				});
				//load account used by the navbar and user-profile 
				//the facebooklink and notification only used into user-profile 
				if(context._reactInternalInstance._context.router.route.location.pathname === "/user-profile"){
					document.getElementById("facebooklink").style.display = "none";
					notifState("warning", "you are not logged in pleaze login first");
				}
			}
		})
		.catch(err => {
			notifState("danger","Internal error plz try again later");
		});
}

export function updateAccount(id,facebook_id, facebook_name, facebook_accesstoken) {
	axios.post("http://localhost:4200/users/update/" + id, {facebook_id, facebook_name, facebook_accesstoken})
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

export function submit(action,email,password){
	axios.post("http://localhost:4200/users/"+action, {
		email: email,
		password : password,
	})
	.then(res => {
	if(res.data.success){
		notifState("success",res.data.message) ;
		setTimeout(() => (
			window.location = action==="login" ? "/user-profile": "/user-login"
		),2000);
	}else{
		notifState("warning",res.data.message) ;
	}
	})
	.catch(err => {
		notifState("danger","Internal error plz try again later");
	});
}

export function signout() {
	axios.post("http://localhost:4200/users/logout")
		.then(res => {
			if (res.data.success) {
				notifState("info", "Logging out");
				setTimeout(() => (window.location = "/"),2000);
			} else {
				notifState("danger","Internal error plz try again later");
			}
		})
		.catch(err => {
			notifState("danger","Internal error plz try again later");
		})
}

export function checkConfirmPassword(context,style) {
	var confirmpassword = document.getElementById("confirmpassword").children;
	if (context.state.confirmPassword !== context.state.password || context.state.confirmPassword.length < 8) {
		if (style === true) {
			confirmpassword[0].style.color = "#c00";
			confirmpassword[1].style.borderBottom = "1px solid #c00";
			confirmpassword[1].style.boxShadow = "0 0px 0 0 #fff";
			confirmpassword[2].style.color = "#c00";
			confirmpassword[3].innerText = "your password does not match";
			confirmpassword[3].style.color = "#c00";
			confirmpassword[3].style.fontSize = "0.9rem";
		}
		return false;
	}
	else {
		if (style === true) {
			confirmpassword[0].style.color = "#00c851";
			confirmpassword[1].style.borderBottom = "1px solid #00c851";
			confirmpassword[1].style.boxShadow = "0 0px 0 0 #fff";
			confirmpassword[2].style.color = "#00c851";
			confirmpassword[3].innerText = "";
		}
		return true;
	}
}