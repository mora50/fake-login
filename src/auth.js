export default function isAuthenticated () {

  const token = localStorage.getItem('token');

  if (token === 'QpwL5tke4Pnpja7X4') {

    return true

  }


  return false
};