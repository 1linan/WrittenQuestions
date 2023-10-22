import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/button');
  }, [navigate]);

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <ul>
          <li>
            <Link to={'/button'}>Button</Link>
          </li>
          <li>
            <Link to={'/search'}>Search</Link>
          </li>
          <li>
            <Link to={'/countdown'}>CountDown</Link>
          </li>
          <li>
            <Link to={'/table'}>Table</Link>
          </li>
          <li>
            <Link to={'/tab'}>Tab</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
