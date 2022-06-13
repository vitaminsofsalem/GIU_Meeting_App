import firebaseAuth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default class FirebaseAuth {
  subscribeToAuthChangesAndReturnUnsubscribe(
    onAuthStateChange: (isLoggedIn: boolean) => void
  ): () => void {
    const unsubscribe = firebaseAuth().onAuthStateChanged((user) =>
      onAuthStateChange(!!user)
    );
    return unsubscribe;
  }

  getCurrentUser(): FirebaseAuthTypes.User | null {
    return firebaseAuth().currentUser;
  }

  async registerWithEmailAndPassword(
    email: string,
    password: string,
    name: string
  ): Promise<FirebaseAuthTypes.User> {
    const result = await firebaseAuth().createUserWithEmailAndPassword(
      email,
      password
    );
    await result.user.updateProfile({ displayName: name });
    return result.user;
  }

  async updateUserPhoto(photoUrl: string) {
    const user = this.getCurrentUser();
    if (!user) {
      throw Error("Can't update photo when not signed in");
    }
    await user.updateProfile({ photoURL: photoUrl });
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.User> {
    const result = await firebaseAuth().signInWithEmailAndPassword(
      email,
      password
    );
    return result.user;
  }

  async logOut() {
    await firebaseAuth().signOut();
  }
}
