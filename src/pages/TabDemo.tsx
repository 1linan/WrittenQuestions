import { Tab, TabItemState } from '@/components/Tab/Tab';
import { useState } from 'react';

const tabList: TabItemState[] = [
  { id: 1, name: '御茶家' },
  { id: 2, name: '夏嘉欢主理' },
  { id: 3, name: 'Ck' },
];
export function TabDemo() {
  const [selectedId, setSelectedId] = useState(1);

  function onSetSelectedId(id: number) {
    setSelectedId(id);
  }

  return (
    <div>
      <Tab
        tabList={tabList}
        selectedId={selectedId}
        onSetSelectedId={onSetSelectedId}
      />
    </div>
  );
}
