import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userLogin, userRole } from '../data/User';

function Authenticated(props) {
  const auth = useRecoilValue(userLogin);
  const user = useRecoilValue(userRole);
  const history = useHistory();

  useEffect(() => {
    if (auth) {
      if (user === '1') {
        history.push('/admin');
      } else {
        history.push(`/user/${user}`);
      }
    }
  }, []);

  return props.children;
}

export default Authenticated;
