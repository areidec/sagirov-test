import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import SingInForm from '../SingInForm';
import RegistForm from '../RegistForm';
import ModalWindow from '../ModalWindow';

const App = () => {
  const [modal, showModal] = useState({ isShow: false, title: '' });

  return (
    <>
      <Router>
        <Route path='/' exact>
          {
            ({ match }) => (
              <CSSTransition in={match != null} timeout={300} classNames="page" unmountOnExit>
                <div className="page">
                  <RegistForm setModal={showModal} />
                </div>
              </CSSTransition>
            )
          }
        </Route>
        <Route path='/login'>
          {
            ({ match }) => (
              <CSSTransition in={match != null} timeout={300} classNames="page" unmountOnExit>
                <div className="page">
                  <SingInForm setModal={showModal} />
                </div>
              </CSSTransition>
            )
          }
        </Route>
      </Router>
      <CSSTransition in={modal.isShow} classNames="fade" unmountOnExit timeout={1000}>
        <ModalWindow title={modal.title} />
      </CSSTransition>
    </>
  )
}

export default App;
