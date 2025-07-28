
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAXtERf4xx3mX1CPOXiIzKllLoGNz6I3io",
  authDomain: "netflix-clone-8043e.firebaseapp.com",
  projectId: "netflix-clone-8043e",
  storageBucket: "netflix-clone-8043e.firebasestorage.app",
  messagingSenderId: "394832286482",
  appId: "1:394832286482:web:9f3f04b3848662da2d99cb"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    }catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const login = async(email, password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password);

    }catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, signup, login, logout};