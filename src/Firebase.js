import firbase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD-R5RTqpF0i03glYFYmd-mS9-4GnIsoNw",
  authDomain: "netflix-build-6ad68.firebaseapp.com",
  projectId: "netflix-build-6ad68",
  storageBucket: "netflix-build-6ad68.appspot.com",
  messagingSenderId: "916477099909",
  appId: "1:916477099909:web:fc0b2c24afb06d47414eec",
};

const firebaseApp = firbase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firbase.auth();

export { auth };
export default db;
