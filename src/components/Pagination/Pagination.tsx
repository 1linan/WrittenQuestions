import cn from 'classnames';
import RcPagination from 'rc-pagination';

import styles from './Pagination.module.scss';

interface PaginationProps {
  className?: string;
  current: number;
  total: number;
  pageSize: number;
  onChange?: (page: number, pageSize: number) => void;
}

const prefixCls = 'nftPaginate';
export function Pagination(props: PaginationProps) {
  const { className, total, onChange, current, pageSize } = props;

  const jumpPrevIcon = (
    <a className={styles[`${prefixCls}-item-link`]}>
      <div className={styles[`${prefixCls}-item-container`]}>
        <span className={styles[`${prefixCls}-item-ellipsis`]}>•••</span>
      </div>
    </a>
  );
  const jumpNextIcon = (
    <a className={styles[`${prefixCls}-item-link`]}>
      <div className={styles[`${prefixCls}-item-container`]}>
        <span className={styles[`${prefixCls}-item-ellipsis`]}>•••</span>
      </div>
    </a>
  );
  return (
    <div className={cn(styles.Pagination, className)}>
      <RcPagination
        current={current}
        prefixCls={prefixCls}
        hideOnSinglePage={false}
        jumpPrevIcon={jumpPrevIcon}
        jumpNextIcon={jumpNextIcon}
        onChange={onChange}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
}
