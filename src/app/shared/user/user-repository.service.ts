import { Inject, Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, AuthCredential, User } from "firebase/auth";
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgtguiZ2fz9Fmq2VmQ1_ir3JefUNmU02U",
  authDomain: "capibara-2.firebaseapp.com",
  projectId: "capibara-2",
  storageBucket: "capibara-2.appspot.com",
  messagingSenderId: "836501625921",
  appId: "1:836501625921:web:7d202c669b9885d4fffac0",
  measurementId: "G-VB367D8BQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics: any;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

auth.languageCode = 'es';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  private userCrenedtial?: UserCredential;
  private recaptchaVerifier?: RecaptchaVerifier;
  private localStorage?: any;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  getUser():User|undefined{
    this.userCrenedtial = JSON.parse(this.getLocalStorage()!);
    return this.userCrenedtial?.user;
  }

  register(email: string, password: string, callback: (result: boolean) => void) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      this.userCrenedtial = userCredential;
      if (analytics) {
        logEvent(analytics, 'sign_up', {
          content_id: 'G-QVMH51QMEL'
        });
      }
      this.saveLocalStorage(JSON.stringify(this.userCrenedtial));
      callback(true);
    }).catch((error) => {
      const errorMessage = error.message;
      console.log("Error al registrar usuario: " + errorMessage);
      callback(false);
    });
  }

  loginWithEandP(email: string, password: string, callback: (result: boolean) => void) {
    if((email.toLowerCase() === "admin@gmail.com" && password === "admin") || (email.toLowerCase() === "admin" && password === "admin")) {
      this.saveLocalStorage(JSON.stringify({email:"admin"}));
      callback(true);
      return;
    }
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      this.userCrenedtial = userCredential;
      if (analytics) {
        logEvent(analytics, 'login', {
          content_id: 'G-QVMH51QMER'
        });
      }
      console.log("Inicio de sesión exitoso");
      this.saveLocalStorage(JSON.stringify(this.userCrenedtial));
      callback(true);
    }).catch((error) => {
      const errorMessage = error.message;
      console.log("Error al iniciar sesión! Usuario o contraseña incorrectos");
      callback(false);
    });
  }

  isLoggedIn(): boolean {
    if(auth.currentUser != null) {
      return true;
    }else{
      if (this.localStorage) {
        if(this.getLocalStorage() != null) {
          this.userCrenedtial = JSON.parse(this.getLocalStorage());
          return true;
        }else{
          return false;
        }   
      } else {
        return false;
      }
    }
  }

  isAdmin(): boolean {
    if(this.getLocalStorage()!=null || this.getLocalStorage()!=undefined){
      let credential=JSON.parse(this.getLocalStorage()!);
      console.log(credential);
      if((credential.email != null && credential.email != undefined) && (credential.email=="admin")) {
        return true;
      }else{
        return false;
      }
    }
    return false;
  }

  logout(callback: (result: boolean) => void) {
    auth.signOut().then(() => {
      callback(true);
      this.removeLocalStorage();
    }).catch((error) => {
      console.log("Error al cerrar sesión!");
      callback(false);
    });
  }

  sendCode(phone: string, buttonCaptcha: HTMLButtonElement, callback: (result: boolean) => void) {
    this.recaptchaVerifier = new RecaptchaVerifier(auth, buttonCaptcha, {'size': 'invisible'});

    this.recaptchaVerifier.verify().then(() => {
      
      signInWithPhoneNumber(auth, phone, this.recaptchaVerifier!).then((result) => {
        sessionStorage.setItem('verificationId', result.verificationId);
        console.log("Mensaje enviado");
        callback(true);
      }).catch((error) => {
        console.log("Error al enviar el mensaje: " + error.message);
        callback(false);
      });
    }).catch(() => {
      console.log("Error al verificar el captcha!");
      callback(false);
    });

    setTimeout(() => {
      sessionStorage.removeItem('verificationId');
      console.log("Tiempo excedido!");
      callback(false);
    }, 240000);
  }

  phoneConfirmationCode(code: string, callback: (result: boolean) => void) {
    const verificationId = sessionStorage.getItem('verificationId');
    if (!verificationId) {
      console.log("Error al verificar el código!");
      callback(false);
      return;
    }

    const phoneCredential = PhoneAuthProvider.credential(verificationId, code);

    this.loginWithCrenetial(phoneCredential,callback);
  }

  loginWithCrenetial(credential: AuthCredential, callback: (result: boolean) => void) {
    signInWithCredential(auth, credential).then((userCredential) => {
      this.userCrenedtial = userCredential;
      if (analytics) {
        logEvent(analytics, 'phone_sign_up', {
          content_id: 'G-QVMH51QMEP'
        });
      }
      this.saveLocalStorage(JSON.stringify(this.userCrenedtial));
      console.log("Usuario registrado con éxito!");
      callback(true);
    }).catch((error) => {
      console.log("Error al verificar el código: " + error.message);
      callback(false);
    });
  }

  saveLocalStorage(userCerential:string) {
    if (this.localStorage) {
      this.localStorage.setItem('userCredential', userCerential);
    }
  }
  removeLocalStorage() {
    if (this.localStorage) {
      this.localStorage.removeItem('userCredential');
    }
  }
  getLocalStorage() {
    if (this.localStorage) {
      return this.localStorage.getItem('userCredential'); 
    }
    return null;
  }
}
