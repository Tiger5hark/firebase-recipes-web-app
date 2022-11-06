import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail as sendPasswordResetEmailFirebase, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const auth = getAuth()

const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

const logoutUser = () => {
    return signOut(auth)
}

const sendPasswordResetEmail = email => {
    return sendPasswordResetEmailFirebase(auth, email)
}

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
}

const subscribeToAuthChanges = (handleAuthChange) => {
    onAuthStateChanged(auth, (user) => {
        handleAuthChange(user)
    })
}

// NOTE: I would've done it like this, but he does it as shown below (also good)
// export { registerUser, loginUser, loginWithGoogle, logoutUser, sendPasswordResetEmail, subscribeToAuthChanges }

const FirebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    sendPasswordResetEmail,
    loginWithGoogle,
    subscribeToAuthChanges,
}

export default FirebaseAuthService