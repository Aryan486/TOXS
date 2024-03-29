import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSANGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env"


const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSANGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};

let app=null
if (!firebase.apps.length) {
    app=firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.initializeApp(firebaseConfig);
}


firebase.firestore().settings({ experimentalAutoDetectLongPolling: true, merge: true })

export const db = getFirestore(app);
export const storage=getStorage(app)