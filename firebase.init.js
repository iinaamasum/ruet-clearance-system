import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAquHBTTe7wZeIAVcNujBzyRLsKbIYHT3A',
  authDomain: 'ruet-clearance-system.firebaseapp.com',
  projectId: 'ruet-clearance-system',
  storageBucket: 'ruet-clearance-system.appspot.com',
  messagingSenderId: '773388495228',
  appId: '1:773388495228:web:40038753eb61a30cc4dcf9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
