import firebase from 'firebase';
import '@firebase/firestore';


var config = {
    apiKey: "AIzaSyCdY0Bh3yGH9VKygml7HbrkyVjAb-uK5LQ",
    authDomain: "analog-foundry-235403.firebaseapp.com",
    databaseURL: "https://analog-foundry-235403.firebaseio.com",
    projectId: "analog-foundry-235403",
    storageBucket: "analog-foundry-235403.appspot.com",
    messagingSenderId: "272473414962"
  };
  firebase.initializeApp(config);

  
export default firebase 