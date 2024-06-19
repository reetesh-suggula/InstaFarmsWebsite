import {initializeApp, getApps, getApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCWzXQftelTzWUATeg4Dvxxl91-RVinNyY",
  authDomain: "instafarms-14ba5.firebaseapp.com",
  projectId: "instafarms-14ba5",
  storageBucket: "instafarms-14ba5.appspot.com",
  messagingSenderId: "571755893240",
  appId: "1:571755893240:web:0b271ef751d4e57545860d",
  measurementId: "G-DY35Y8B82L"
};

const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const auth = getAuth(app)

export {app,auth};
