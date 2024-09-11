import { initializeApp } from "firebase/app";
import { getAuth , signInWithPopup , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDp_6JnnEwKOEMLNqrgwcu1svUA379oGP4",
    authDomain: "job-portal-4ccf3.firebaseapp.com",
    projectId: "job-portal-4ccf3",
    storageBucket: "job-portal-4ccf3.appspot.com",
    messagingSenderId: "172152496803",
    appId: "1:172152496803:web:3d355ee9d70580d8b2d516"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

//   const signinWithGoogle = ()=>{
//     signInWithPopup(auth,googleProvider).then((result)=>{
//         console.log(result);
        
//     }).catch((error)=>{
//         console.log(error);
        
//     })
//   }


  export { auth, googleProvider, signInWithPopup };
  
  export default app