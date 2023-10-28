import { setMessageApi } from '@/store/slices/message';
import { UserOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (messageApi) {
      dispatch(setMessageApi(messageApi));
    }
  }, [messageApi, dispatch]);

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
      ],
    },
  ];

  return (
    <div className={styles.layout}>
      {contextHolder}
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
