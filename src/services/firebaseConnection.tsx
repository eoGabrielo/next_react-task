
// Configuração e conexão com o Firebase Firestore
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDm0MNV71Ql9Qf7tQv5LR1-7jKxXc1fcuI",
  authDomain: "tarefasplus-d57d5.firebaseapp.com",
  projectId: "tarefasplus-d57d5",
  storageBucket: "tarefasplus-d57d5.firebasestorage.app",
  messagingSenderId: "655567451540",
  appId: "1:655567451540:web:68e94f688ca2653c624b81"
};

// Inicializa o app Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exporta a instância do Firestore para uso no projeto
const db = getFirestore(firebaseApp);

export {db};