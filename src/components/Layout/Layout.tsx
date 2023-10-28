import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/userlist');
  }, [navigate]);

  const items3 = [
    {
      key: '1',
      icon: React.createElement(UserOutlined),
      label: '用户管理',
      children: [
        {
          key: '11',
          label: <Link to={'/userlist'}>用户列表</Link>,
        },
        {
          key: '12',
          label: <Link to={'/add'}>添加用户信息</Link>,
        },
      ],
    },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items3}
          theme={'dark'}
        />
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
