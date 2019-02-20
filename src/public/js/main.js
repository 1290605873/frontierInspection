import cookie from 'react-cookies';
global.headers={
    headers: {
      session_id: cookie.load('session_id')
    }
  }