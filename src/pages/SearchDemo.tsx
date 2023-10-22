// import { useDebounce } from 'ahooks'
import React, { useState } from 'react';
import { Search } from '@/components/Search';
import styles from '@/styles/searchDemo.module.scss'

export function SearchUseDemo() {
  const [searchValue, setSearchValue] = useState('');
  //https://ahooks.gitee.io/zh-CN/hooks/use-debounce
  //searchDebouncedValue 只会在输入结束 500ms 后变化。
  // const searchDebouncedValue = useDebounce(searchValue, { wait: 500 })

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div>
      <div className={styles.searchBox}>
        <Search value={searchValue} onChange={onSearch} />
      </div>

      {/* <p>{searchDebouncedValue}</p> */}
    </div>
  );
}
