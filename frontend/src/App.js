import React from 'react';
import { Router } from 'react-router-dom';
import { ChakraProvider, CSSReset } from "@chakra-ui/react"

import history from './services/history';

import Routes from './routes';

const App = () => {
  return (
    <Router history={history} >
      <ChakraProvider>
        <Routes />
        <CSSReset />
      </ChakraProvider>
    </Router>
  );
}

export default App;
