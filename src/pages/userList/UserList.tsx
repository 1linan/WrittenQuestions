import { getUserList } from '@/api/user';
import EditUserInfo from '@/components/EditUserInfo/EditUserInfo';
import { useMessage } from '@/hook/useMessage';
import { RootState } from '@/store';
import {
  deleteAllUser,
  deleteUser,
  searchUserByName,
  setCurrentUserList,
  setUserList,
  setUserTotal,
} from '@/store/slices/user';
import {
  Button,
  Col,
  Input,
  Modal,
  PaginationProps,
  Row,
  Space,
  Table,
} from 'antd';
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
  const {
    userList,
    total,
    currentUserList: list,
  } = useSelector((state: RootState) => state.user);
  const { message } = useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [optionType, setOptionType] = useState(1); //type 1==="edit" type 2==="添加用户消息"
  // const [list, setList] = useState<DataType[]>([]);
  useEffect(() => {
    getUserList()
      .then((res: any) => {
        dispatch(setUserList(res));
        dispatch(setUserTotal(res.length));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  // const list = useMemo(() => {
  //   if (userList) {
  //     const pageSize = 10;
  //     const offset = currentPage * pageSize;
  //     const data = [];
  //     for (let i = offset - 10; i < userList.length; i++) {
  //       if (i < offset - 10 + pageSize) {
  //         data.push(userList[i]);
  //       }
  //     }
  //     // const res = userList.splice(offset - 1, pageSize);
  //     console.log(data, '截取的数组');
  //     return data;
  //   }
  //   return [];
  // }, [currentPage, userList]);

  useEffect(() => {
    if (userList) {
      const pageSize = 10;
      const offset = currentPage * pageSize;
      const data = [];
      for (let i = offset - 10; i < userList.length; i++) {
        if (i < offset - 10 + pageSize) {
          data.push(userList[i]);
        }
      }
      console.log(data, '截取的数组');
      dispatch(setCurrentUserList(data));
    }
  }, [currentPage, userList, dispatch]);

  const showModal = (record: DataType) => {
    setOptionType(1);
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
    message('success', 'Successfully deleted');
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

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  // 表格分页属性
  const paginationProps = {
    total: total,
    //showTotal: (total: number) => `Total ${total} items`,
    defaultPageSize: 10,
    pageSize: 10,
    defaultCurrent: currentPage,
    onChange: onChange,
    showSizeChanger: false,
  };

  function onAddUserInfo() {
    setOptionType(2);
    setIsModalOpen(true);
  }
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
        <Row>
          <Col span={12}>
            <Button
              type="primary"
              className={styles.deleteAll}
              onClick={onAddUserInfo}
            >
              add +
            </Button>
          </Col>

          <Col span={8}>
            <Button
              type="primary"
              className={styles.deleteAll}
              onClick={onDeleteAllUser}
            >
              delete all
            </Button>
          </Col>
        </Row>
      </div>
      <Table columns={columns} dataSource={data} pagination={paginationProps} />
      <Modal
        title={optionType === 1 ? 'Edit UserInfo' : 'Add UserInfo'}
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <EditUserInfo
          type={optionType}
          onCancel={handleCancel}
          onOk={handleOk}
          id={selectedId}
        />
      </Modal>
    </div>
  );
}
