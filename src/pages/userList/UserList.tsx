import { getUserList } from '@/api/user';
import EditUserInfo from '@/components/EditUserInfo/EditUserInfo';
import { RootState } from '@/store';
import {
  deleteAllUser,
  deleteUser,
  searchUserByName,
  setUserList,
  setUserTotal
} from '@/store/slices/user';
import { Button, Input, Modal, Pagination, Space, Table } from 'antd';
import { SearchProps } from 'antd/es/input';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './userList.module.scss';
const { Search } = Input;
export interface DataType {
  id: number;
  name: string;
  age: number;
  address: string;
}
export function UserList() {
  const dispatch = useDispatch();
  const { userList: list } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  // const [list, setList] = useState<DataType[]>([]);
  useEffect(() => {
    getUserList()
      .then((res: any) => {
        // setList(res);
        dispatch(setUserList(res));
        dispatch(setUserTotal(res.length));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const showModal = (record: DataType) => {
    setSelectedId(record.id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function onDelete(record: any) {
    // try {
    //   deleteInfo(list, record.id);
    // } catch (err) {
    //   console.log(err);
    // }
    dispatch(deleteUser(record.id));
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>Edit</a>
          <a onClick={() => onDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = useMemo(() => {
    const dataSource = [];
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        dataSource.push({
          key: list[i].id,
          id: list[i].id,
          name: list[i].name,
          age: list[i].age,
          address: list[i].address,
        });
      }
    }
    return dataSource;
  }, [list]);

  const onSearch: SearchProps['onSearch'] = (value) => {
    dispatch(searchUserByName(value));
  };

  const onDeleteAllUser = () => {
    dispatch(deleteAllUser());
  };

  return (
    <div className={styles.userWrapper}>
      <h1>用户列表</h1>
      <div className={styles.search}>
        <div className={styles.searchItem}>
          <Search
            placeholder="input search name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <Button
          type="primary"
          className={styles.deleteAll}
          onClick={onDeleteAllUser}
        >
          全部删除
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Pagination
        total={85}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={10}
        defaultCurrent={1}
      />
      <Modal title="Edit UserInfo" footer={null} open={isModalOpen}>
        <EditUserInfo onCancel={handleCancel} onOk={handleOk} id={selectedId} />
      </Modal>
    </div>
  );
}
