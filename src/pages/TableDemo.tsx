import { Table } from '@/components/Table';
import styles from '@/styles/tableDemo.module.scss';

export function TableDemo() {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 62,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: '30%',
      sorter: (a: any, b: any) => {
        return a.age - b.age;
      },
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '100px',
      render: () => <button className={styles.tradBtn}>操作</button>,
    },
  ];

  return (
    <div>
      <Table
        theadClassName={styles.thead}
        rowClassName={styles.row}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default Table;
