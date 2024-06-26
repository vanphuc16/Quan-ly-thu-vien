import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import Success from './components/Success';

import Home from './components/Home';
import AdminBooks from './components/AdminBooks';
import UserBooks from './components/UserBooks';
import BookForm from './components/BookForm';
import Book from './components/Book';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import AddPreference from './components/AddPreference';
import Bookshelf from './components/Bookshelf';
import BorrowForm from './components/BorrowForm';
import AcceptBorrowForm from './components/AcceptBorrowForm';
import Request from './components/Request';
import Notification from './components/Notification';

import AuthProvider, { useAuth } from './security/authContext';

function Authenticated({children}) {
  const authContext = useAuth();
  if (authContext.authenticated())
      return children
  return <Navigate to="/" />
}

function Admin({children}) {
  const authContext = useAuth();
  if (authContext.admin())
      return children
  return <Navigate to="/error" />
}

function User({children}) {
  const authContext = useAuth();
  if (authContext.user())
      return children
  return <Navigate to="/error" />
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Login />} />
            <Route path='/profile' element={
              <Authenticated>
                  <Profile />
              </Authenticated>
            } />
            <Route path='/update-profile/:id' element={
              <Authenticated>
                  <EditProfile />
              </Authenticated>
            } />
            <Route path='/notifications' element={
              <Authenticated>
                  <Notification />
              </Authenticated>
            } />
            <Route path='/add-preference/:id' element={
              <Authenticated>
                <User>
                  <AddPreference />
                </User>
              </Authenticated>
            } />
            <Route path='/bookshelf' element={
              <Authenticated>
                <User>
                  <Bookshelf />
                </User>
              </Authenticated>
            } />
            <Route path='/home' element={
              <Authenticated>
                <User>
                  <Home />
                </User>
              </Authenticated>
            } />
            <Route path='/user-books' element={
              <Authenticated>
                <User>
                  <UserBooks />
                </User>
              </Authenticated>
            } />
            <Route path='/book-details/:id' element={
              <Authenticated>
                <User>
                  <Book />
                </User>
              </Authenticated>
            } />
            <Route path='/borrow-book/:user_id/:book_id' element={
              <Authenticated>
                <User>
                  <BorrowForm />
                </User>
              </Authenticated>
            } />
            <Route path='/all-book' element={
              <Authenticated>
                <Admin>
                  <AdminBooks />
                </Admin>
              </Authenticated>
            } />
            <Route path='/book-form' element={
              <Authenticated>
                <Admin>
                  <BookForm />
                </Admin>
              </Authenticated>
            } />
            <Route path='/accept-borrow/:user_id/:book_id' element={
              <Authenticated>
                <Admin>
                  <AcceptBorrowForm />
                </Admin>
              </Authenticated>
            } />
            <Route path='/requests' element={
              <Authenticated>
                <Admin>
                  <Request />
                </Admin>
              </Authenticated>
            } />
            <Route path='/success' element={<Success />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
