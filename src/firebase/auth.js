/* Authentication Firebase */
import { auth, googleProvider, facebookProvider } from './firebase'

// sign up
export const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password)

// sign in
export const doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password)

// sign out
export const doSignOut = () => auth.signOut()

// password reset
export const doPasswordReset = email => auth.sendPasswordResetEmail(email)

// password change
export const doPasswordChange = password => auth.currentUser.updatePassword(password)

// google
export const doGoogleSignIn = () => auth.signInWithPopup(googleProvider)

// facebook
export const doFacebookSignIn = () => auth.signInWithPopup(facebookProvider)
