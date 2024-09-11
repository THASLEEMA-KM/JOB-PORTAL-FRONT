import { initializeApp } from "firebase/app";
// import { getAuth , signInWithPopup , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuF6HsN3QperDSULK9he0XLIdW6c7Dulo",
  authDomain: "job-portal-40a5f.firebaseapp.com",
  projectId: "job-portal-40a5f",
  storageBucket: "job-portal-40a5f.appspot.com",
  messagingSenderId: "446980777477",
  appId: "1:446980777477:web:23a63ffbd224c97f825e6c"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  // const googleProvider = new GoogleAuthProvider();

//   const signinWithGoogle = ()=>{
//     signInWithPopup(auth,googleProvider).then((result)=>{
//         console.log(result);
        
//     }).catch((error)=>{
//         console.log(error);
        
//     })
//   }

  // export { auth, googleProvider, signInWithPopup };
  
  export default app