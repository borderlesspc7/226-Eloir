import { auth, db } from "../lib/firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";

export const authService = {
  async logOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Error logging out:" + error);
    }
  },

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const firebaseUser = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      if (!userDoc.exists()) {
        throw new Error("User not found");
      }

      const userData = userDoc.data() as User;

      const updateUserData = {
        ...userData,
        lastLoginAt: new Date(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), updateUserData);

      return updateUserData;
    } catch (error) {
      throw new Error("Error logging in:" + error);
    }
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const firebaseUser = userCredential.user;

      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? credentials.email,
        displayName: credentials.displayName,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userData);
      return userData;
    } catch (error) {
      throw new Error("Error registering user:" + error);
    }
  },

  observeAuthState(callback: (user: User | null) => void): Unsubscribe {
    try {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Usuário está logado, busca dados completos no Firestore
          try {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              callback(userData);
            } else {
              callback(null); // Usuário não encontrado no Firestore
            }
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            callback(null);
          }
        } else {
          // Usuário não está logado
          callback(null);
        }
      });
    } catch (error) {
      throw new Error("Erro ao observar estado de autenticação: " + error);
    }
  },
};
