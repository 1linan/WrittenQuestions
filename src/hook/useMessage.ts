import { RootState } from '@/store';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export function useMessage() {
  const { messageApi } = useSelector((state: RootState) => state.message);
  const message = useCallback(
    (type: 'success' | 'error', content: string) => {
      messageApi.open({
        type,
        content,
      });
    },
    [messageApi],
  );

  return {
    message,
  };
}
