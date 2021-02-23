import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { userLogin, userRole } from '../data/User';

function AdminRoute(props) {
  const auth = useRecoilValue(userLogin);
  const user = useRecoilValue(userRole);
  const history = useHistory();

  if (!auth) {
    history.push('/login');
  }

  if (auth) {
    if (Cookies.get('role') === 'user') {
      history.push('/user');
    }
  }
  // console.log(Cookies.get('role'));

  return props.children;
}

export default AdminRoute;
