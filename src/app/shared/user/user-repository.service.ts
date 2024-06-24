import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { HttpClient } from '@angular/common/http';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJlErFrQpUVTZkpSFpRPvqxyQYlbhAnVY",
  authDomain: "capibara-team.firebaseapp.com",
  projectId: "capibara-team",
  storageBucket: "capibara-team.appspot.com",
  messagingSenderId: "1098350956677",
  appId: "1:1098350956677:web:515671b7336875975059ec",
  measurementId: "G-06MY0HPHJG"
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

  constructor(private http: HttpClient) { }

  getUser() {
    return auth.currentUser;
  }

  register(email: string, password: string, callback: (result: boolean) => void) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      this.userCrenedtial = userCredential;
      if (analytics) {
        logEvent(analytics, 'sign_up', {
          content_id: 'G-QVMH51QMEL'
        });
      }
      callback(true);
    }).catch((error) => {
      const errorMessage = error.message;
      alert("Error al registrar usuario: " + errorMessage);
      callback(false);
    });
  }

  loginWithEandP(email: string, password: string, callback: (result: boolean) => void) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      this.userCrenedtial = userCredential;
      if (analytics) {
        logEvent(analytics, 'login', {
          content_id: 'G-QVMH51QMER'
        });
      }
      alert("Inicio de sesión exitoso");
      callback(true);
    }).catch((error) => {
      const errorMessage = error.message;
      alert("Error al iniciar sesión! Usuario o contraseña incorrectos");
      callback(false);
    });
  }

  isLogged(): boolean {
    return auth.currentUser != null;
  }

  logout(callback: (result: boolean) => void) {
    auth.signOut().then(() => {
      callback(true);
    }).catch((error) => {
      alert("Error al cerrar sesión!");
      callback(false);
    });
  }

  sendCode(phone: string, buttonCaptcha: HTMLButtonElement, callback: (result: boolean) => void) {
    this.recaptchaVerifier = new RecaptchaVerifier(auth, buttonCaptcha, {'size': 'invisible'});

    this.recaptchaVerifier.verify().then(() => {
      
      signInWithPhoneNumber(auth, phone, this.recaptchaVerifier!).then((result) => {
        sessionStorage.setItem('verificationId', result.verificationId);
        alert("Mensaje enviado");
        callback(true);
      }).catch((error) => {
        alert("Error al enviar el mensaje: " + error.message);
        callback(false);
      });
    }).catch(() => {
      alert("Error al verificar el captcha!");
      callback(false);
    });

    setTimeout(() => {
      sessionStorage.removeItem('verificationId');
      alert("Tiempo excedido!");
      callback(false);
    }, 240000);
  }

  phoneConfirmationCode(code: string, callback: (result: boolean) => void) {
    const verificationId = sessionStorage.getItem('verificationId');
    if (!verificationId) {
      alert("Error al verificar el código!");
      callback(false);
      return;
    }

    const phoneCredential = PhoneAuthProvider.credential(verificationId, code);

    signInWithCredential(auth, phoneCredential).then((userCredential) => {
      this.userCrenedtial = userCredential;
      if (analytics) {
        logEvent(analytics, 'phone_sign_up', {
          content_id: 'G-QVMH51QMEP'
        });
      }
      alert("Usuario registrado con éxito!");
      callback(true);
    }).catch((error) => {
      alert("Error al verificar el código: " + error.message);
      callback(false);
    });
  }
}
