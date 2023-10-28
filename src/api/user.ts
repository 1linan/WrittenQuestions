import { DataType } from '@/pages/userList';
import axios from '@/utils/request';

// mock开关，设置是否引入文件
const mock = true;
if (mock) {
  require('@/mock/api'); // 注意使用require，不用import，在需要的时使用。
}

export function getUserList() {
  return axios.get('/api/users');
}

export function deleteInfo(list: DataType[], id: number) {
  return axios.post('/api/deleteInfo', { list, id });
}
