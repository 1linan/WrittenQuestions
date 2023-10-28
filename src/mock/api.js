import Mock from 'mockjs';

const { userList } = Mock.mock({
  'userList|100': [
    {
      'id|+1': 1,
      name: '@cname',
      'age|1-100': 17,
      address: '@province',
    },
  ],
});

Mock.mock('/api/users', 'get', () => {
  return {
    status: 200,
    mas: '请求成功',
    data: userList,
  };
});
/*************************************** */
Mock.mock('/api/deleteInfo', 'post', (req) => {
  const { id, list } = JSON.parse(req.body);
  const res = list.filter((item) => item.id === id);
  return {
    status: 200,
    mas: '删除成功',
    data: res,
  };
});
