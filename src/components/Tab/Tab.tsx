import cn from 'classnames';
import styles from './tab.module.scss';

export interface TabItemState {
  id: number;
  name: string;
}
interface TabProps {
  tabList: TabItemState[];
  selectedId: number;
  onSetSelectedId: (id: number) => void;
}
export function Tab(props: TabProps) {
  const { tabList, selectedId, onSetSelectedId } = props;
  return (
    <div className={styles.wrapper}>
      {tabList.map((item) => (
        <span
          className={cn(styles.tabItem, {
            [styles.active]: item.id === selectedId,
          })}
          key={item.id}
          onClick={() => onSetSelectedId(item.id)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}
