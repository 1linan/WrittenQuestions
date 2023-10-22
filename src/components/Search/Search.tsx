import searchIcon from '@/assets/images/Search.svg';
import React from 'react';
import styles from './search.module.scss';

/**
 * 如何使用，请看demo.tsx
 */
interface SearchProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Search(props: SearchProps) {
  const { value, onChange } = props;

  return (
    <div className={styles.searchContainer}>
      <img src={searchIcon} alt="" />
      <input
        placeholder="Search username..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
