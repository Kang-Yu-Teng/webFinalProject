// Initialize Firebase
var config = {
	apiKey: "AIzaSyD47cEGPxHO5ddXtiUUX4zUqgv-C9IPRp8",
	authDomain: "marioaccount-3f175.firebaseapp.com",
	databaseURL: "https://marioaccount-3f175.firebaseio.com",
	projectId: "marioaccount-3f175",
	storageBucket: "",
	messagingSenderId: "1099483426009"
};
firebase.initializeApp(config);

var database = firebase.database();




//Email/Pwd註冊
var account = document.getElementById("account");
var pwd = document.getElementById("pwd");
var userName = document.getElementById("name");
var registerSmtBtn = document.getElementById("registerSmtBtn");
registerSmtBtn.addEventListener("click", function () {
	console.log(account.value);
	firebase.auth().createUserWithEmailAndPassword(account.value, pwd.value).then(function () {
		//登入成功後，取得登入使用者資訊
		loginUser = firebase.auth().currentUser;
		console.log("登入使用者為", loginUser);
		//寫入使用者資訊
		firebase.database().ref('users/' + loginUser.uid).set({
			email: loginUser.email,
			userName: userName.value
		}).catch(function (error) {
			console.error("寫入使用者資訊錯誤", error);
		});
		//清空網頁欄位，
		account.value = "";
		pwd.value = "";
		userName.value = "";
	}).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMsg = error.message;
		console.log(errorMsg);
	});
	//不能寫在這裡，因為會被執行後才到then裡
	//userName.value = "";
}, false);


//登入
var accountL = document.getElementById("accountL");
var pwdL = document.getElementById("pwdL");
var loginSmtBtn = document.getElementById("loginSmtBtn");
loginSmtBtn.addEventListener("click", function () {
	console.log(accountL.value);
	firebase.auth().signInWithEmailAndPassword(accountL.value, pwdL.value).then(function () {
		accountL.value = "";
		pwdL.value = "";
		name.value = "";
	}).catch(function (error) {
		// Handle Errors here. 
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage);
	});
}, false);


//查看目前登入狀況 
var loginUser;
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		loginUser = user;
		console.log("User is logined", user)
	} else {
		loginUser = null;
		console.log("User is not logined yet.");
	}
});


//登出 
var signoutSmtBtn = document.getElementById("signoutSmtBtn");
signoutSmtBtn.addEventListener("click", function () {
	firebase.auth().signOut().then(function () {
		console.log("User sign out!");
	}, function (error) {
		console.log("User sign out error!");
	})
}, false);

//取得目前使用者資訊
var userInfoBtn = document.getElementById("userInfoBtn");
var userInfo = document.getElementById("userInfo");
userInfoBtn.addEventListener("click", function () {
	//資料讀取一次後就不再理會
	firebase.database().ref('/users/' + loginUser.uid).once('value').then(function (snapshot) {
		// var userInfoText = "使用者姓名：" + snapshot.val().name + ", 使用者年齡:" + snapshot.val().age;
		var userInfoText = "mail: " + snapshot.val().email + " user name: " + snapshot.val().userName;
		console.log(userInfoText);
		userInfo.innerHTML = userInfoText;
	});
}, false);

//關注使用者清單
var userRef = firebase.database().ref('users');
userRef.on('value', function (snapshot) {
	console.log("目前所有使用者：", snapshot.val());
});

//刪除使用者資料(database)
var delUserInfoBtn = document.getElementById("delUserInfoBtn");
delUserInfoBtn.addEventListener("click", function () {
	firebase.database().ref('/scores/' + loginUser.uid).remove().then(function () {
		console.log("成功刪除")
	});
}, false);


//刪除使用者
var delUserBtn = document.getElementById("delUserBtn");
delUserBtn.addEventListener("click", function () {
	//直接取得當下狀態
	var user = firebase.auth().currentUser;
	user.delete().then(function () {
		// User deleted.
		console.log("成功刪除");
	}).catch(function (error) {
		// An error happened.
		console.log("刪除失敗", error);
	});
	firebase.database().ref('/users/' + loginUser.uid).remove().then(function () {
		console.log("成功刪除")
	});
	firebase.database().ref('/scores/' + loginUser.uid).remove().then(function () {
		console.log("成功刪除")
	});
	// const credential = firebase.auth.EmailAuthProvider.credential(user.auth.email, password);
	// user.auth.reauthenticate(credential).then(() => {
	// 	user.auth.delete();
	// });
}, false);

//Email驗證 
var verifyBtn = document.getElementById("verifyBtn");
verifyBtn.addEventListener("click ", function () {
	user.sendEmailVerification().then(function () {
		console.log("驗證信寄出");
	}, function (error) {
		console.error("驗證信錯誤");
	});
}, false);

//更改密碼 
var chgPwd = document.getElementById("chgPwd");
var chgPwdBtn = document.getElementById("chgPwdBtn");
chgPwdBtn.addEventListener("click", function () {
	firebase.auth().sendPasswordResetEmail(chgPwd.value).then(function () {
		// Email sent. 
		console.log("更改密碼Email已發送");
		chgPwd.value = "";
	}, function (error) {
		// An error happened. 
		console.error("更改密碼", error);
	});
}, false);

//新增score
var scoreSmtBtn = document.getElementById("scoreSmtBtn");
var score = document.getElementById("score");
scoreSmtBtn.addEventListener("click", function () {

	firebase.database().ref('/users/' + loginUser.uid).once('value').then(function (snapshot) {
		var scoreRef = firebase.database().ref('/scores/' + loginUser.uid);
		scoreRef.push().set({
			userName: snapshot.val().userName,
			uid: loginUser.uid,
			scoreText: score.value,
			score: parseInt(score.value)
		}).then(function () {
			console.log("新增分數成功", score.value);
		}).catch(function (err) {
			console.error("新增分數錯誤：", err);
		});
		score.value = "";
	});

});

//取得使用者所有分數
var scoreList = document.getElementById("scoreList");
var scoreListBtn = document.getElementById("scoreListBtn");
scoreListBtn.addEventListener("click", function () {

	var scoreRef = firebase.database().ref('scores/' + loginUser.uid).orderByChild("score");
	console.log("取得使用者所有分數")
	scoreRef.once('value').then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			console.log(childSnapshot.val());
		});
	})
}, false);

//監聽特定資料變化
// var postRef = firebase.database().ref('/posts/' + loginUser.uid);
// postRef.on('child_added', function (data) {
// 	addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });

// postRef.on('child_changed', function (data) {
// 	setCommentValues(postElement, data.key, data.val().text, data.val().author);
// });

// postRef.on('child_removed', function (data) {
// 	deleteComment(postElement, data.key);
// });



//如果使用者操作了更改密碼、刪除帳號、更改信箱等，需要再次驗證 
/*var user = firebase.auth().currentUser; var credential = firebase.auth().EmailAuthProvider.credential(user.email, //password from user )*/
// var provider = new firebase.auth.FacebookAuthProvider();
// //所需授權的Scope //查閱 https://developers.facebook.com/docs/facebook-login/permissions
// provider.addScope('user_birthday');
// provider.setCustomParameters({
// 	'display': 'popup'
// });



// //Using set() overwrites data at the specified location, including any child nodes.
// //For basic write operations, you can use set() to save data to a specified reference, replacing any existing data at that path. For example a social blogging application might add a user with set() as follows:
// function writeUserData(userId, name, email, imageUrl) {
// 	firebase.database().ref('users/' + userId).set({
// 		username: name,
// 		email: email,
// 		profile_picture: imageUrl
// 	});
// }

// //To read data at a path and listen for changes, use the on() oronce() methods of firebase.database.Reference to observe events.
// function readPostStarData(postId) {
// 	var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// 	starCountRef.on('value', function (snapshot) {
// 		updateStarCount(postElement, snapshot.val());
// 	});
// }

// //In some cases you may want a snapshot of your data without listening for changes, such as when initializing a UI element that you don't expect to change. You can use the once() method to simplify this scenario: it triggers once and then does not trigger again.
// function readUsernameDataOnce(params) {
// 	var userId = firebase.auth().currentUser.uid;
// 	return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
// 		var username = (snapshot.val() && snapshot.val().username) || 'Anonymous'; // ... 
// 	});
// }

// //To simultaneously write to specific children of a node without overwriting other child nodes, use the update() method. When calling update(), you can update lower-level child values by specifying a path for the key. If data is stored in multiple locations to scale better, you can update all instances of that data using data fan-out.
// function writeNewPost(uid, username, picture, title, body) {
// 	// A post entry. 
// 	var postData = {
// 		author: username,
// 		uid: uid,
// 		body: body,
// 		title: title,
// 		starCount: 0,
// 		authorPic: picture
// 	};
// 	// Get a key for a new Post. 
// 	var newPostKey = firebase.database().ref().child('posts').push().key;
// 	// Write the new post's data simultaneously in the posts list and the user's post list. 
// 	var updates = {};
// 	updates['/posts/' + newPostKey] = postData;
// 	updates['/user-posts/' + uid + '/' + newPostKey] = postData;
// 	return firebase.database().ref().update(updates);
// }
// //使用remove或是用update null、set null，來移除資料

// //To know when your data is committed to the Firebase Realtime Database server, you can use a Promise. Both set() and update()can return a Promise you can use to know when the write is committed to the database.

// //使用off()，來移除監聽

// //When working with data that could be corrupted by concurrent modifications, such as incremental counters, you can use a transaction operation.
// function toggleStar(postRef, uid) {
// 	postRef.transaction(function (post) {
// 		if (post) {
// 			if (post.stars && post.stars[uid]) {
// 				post.starCount--;
// 				post.stars[uid] = null;
// 			} else {
// 				post.starCount++;
// 				if (!post.stars) {
// 					post.stars = {};
// 				}
// 				post.stars[uid] = true;
// 			}
// 		}
// 		return post;
// 	});
// }

// // Create a new post reference with an auto-generated id 
// //Use the push() method to append data to a list in multiuser applications. The push() method generates a unique key every time a new child is added to the specified Firebase reference.
// // The .key property of a push() reference contains the auto-generated key.
// var newPostRef = postListRef.push();
// newPostRef.set({
// 	// ... 
// });

// //事件
// var commentsRef = firebase.database().ref('post-comments/' + postId);
// commentsRef.on('child_added', function (data) {
// 	addCommentElement(postElement,
// 		data.key, data.val().text, data.val().author);
// });
// commentsRef.on('child_changed', function (data) {
// 	setCommentValues(postElement,
// 		data.key, data.val().text, data.val().author);
// });
// commentsRef.on('child_removed', function (data) {
// 	deleteComment(postElement,
// 		data.key);
// });


// //監聽數值
// ref.once('value', function (snapshot) {
// 	snapshot.forEach(function (childSnapshot) {
// 		var childKey = childSnapshot.key;
// 		var
// 			childData = childSnapshot.val();
// 		// ... 
// 	});
// });

// //排序
// var myUserId = firebase.auth().currentUser.uid;
// var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');