import { useState } from 'react';
import './App.css';
// Needs to be before FirebaseAuthService
// eslint-disable-next-line no-unused-vars
import firebaseApp from './FirebaseConfig'
import LoginForm from './components/LoginForm';
import FirebaseAuthService from './FirebaseAuthService';

function App() {

  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser)

  return (
    <div className="App">
      <div className='title-row'>
        <h1 className='title'>Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
    </div>
  );
}

export default App;
