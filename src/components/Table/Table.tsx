import caretDown from '@/assets/images/table/caretDown.svg';
import caretUp from '@/assets/images/table/caretUp.svg';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import styles from './table.module.scss';

// interface ColumnState {
//   title: string;
//   key: string;
//   dataIndex?: string;
//   render?: (text?: string, record?: any, id?: number) => any;
//   sorter?: any;
//   width?: number;
// }

interface TableProps {
  columns: any;
  dataSource: any;
  theadClassName: any; //表头的样式
  rowClassName: any; //行的样式
}
export function Table(props: TableProps) {
  const { theadClassName, rowClassName, dataSource, columns } = props;
  const [dataSource2, setDataSource2] = useState([]);

  useEffect(() => {
    setDataSource2(dataSource);
  }, [dataSource]);

  function onSort(order: string, sort: any) {
    if (order === 'up') {
      setDataSource2((x) => {
        const res = x.sort(sort);
        return [...res];
      });
      return;
    }
    if (order === 'down') {
      setDataSource2((x) => {
        const res = x.sort(sort);
        return [...res.reverse()];
      });
    }
  }

  const getRowData = (obj: any, rowIndex: number) => {
    //获取对象的key
    const keys = Object.keys(obj);
    //删除key属性
    const availableKeys = keys.filter((key) => key !== 'key');
    //获取列属性
    const columnKey = columns.map((v: any) => v.dataIndex);
    //把row中多余的数据删除，使row中的数据和column中的数据一样
    const rowKey: any = [];
    for (let i = 0; i < availableKeys.length; i++) {
      for (let j = 0; j < columnKey.length; j++) {
        if (availableKeys[i] === columnKey[j]) {
          rowKey.push(availableKeys[i]);
        }
      }
    }

    let Action: any = null;
    if (columns[columns.length - 1].render) {
      Action = (
        <div
          key={'9999_7493413_du_yi_wu_er'}
          style={{ width: columns[columns.length - 1]?.width || 'auto' }}
        >
          {' '}
          {columns[columns.length - 1].render('-', obj, rowIndex)}
        </div>
      );
    }
    return (
      <>
        {rowKey.map((key: string, index: number) => {
          if (columns[index].render) {
            return (
              <td key={key} style={{ width: columns[index]?.width || 'auto' }}>
                {columns[index].render(obj[key], obj, index)}
              </td>
            );
          } else if (key === columns[index].dataIndex) {
            return (
              <td key={key} style={{ width: columns[index]?.width || 'auto' }}>
                {obj[key]}
              </td>
            );
          }
          return '00';
        })}
        <td>{Action}</td>
      </>
    );
  };

  const head = useMemo(() => {
    return columns.map((v: any) => {
      if (v.sorter) {
        return (
          <th
            key={v.key}
            style={{ width: v?.width || 'auto' }}
            className={cn(styles.column)}
          >
            <div className={styles.sorter}>
              <p className={styles.title}>{v.title}</p>
              <div className={styles.arrow}>
                <img
                  className={styles.arrowItemUp}
                  src={caretUp}
                  onClick={() => onSort('up', v.sorter)}
                />
                <img
                  className={styles.arrowItemDown}
                  src={caretDown}
                  onClick={() => onSort('down', v.sorter)}
                />
              </div>
            </div>
          </th>
        );
      }
      if (v.title === 'Action') {
        return (
          <th
            key={v.key}
            className={cn(styles.column, { [styles.width]: v?.width })}
          ></th>
        );
      }
      return (
        <th
          key={v.key}
          className={cn(styles.column, { [styles.width]: v?.width })}
        >
          <p>{v.title}</p>
        </th>
      );
    });
  }, [columns]);
  return (
    <div className={styles.table}>
      <table>
        <thead className={cn(theadClassName)}>
          <tr>{head}</tr>
        </thead>
        <tbody>
          {dataSource2.map((v: any, index: number) => {
            return (
              <tr className={cn(rowClassName)} key={index}>
                {getRowData(v, index)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
