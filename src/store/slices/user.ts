import { DataType } from '@/pages/userList/UserList';
import { cloneUserList } from '@/utils/clone';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userList: DataType[]; //
  cloneUserList: DataType[]; //
  copyUserList: DataType[]; //
  currentUserList: DataType[]; //
  total: number; //
}
interface EditState {
  id: number;
  name?: string;
  age?: number;
  address?: string;
}

interface AddUserInfoState {
  name: string;
  age: number;
  address: string;
}
const initialState: UserState = {
  userList: [],
  cloneUserList: [],
  copyUserList: [],
  currentUserList: [],
  total: 0,
};

export const userSlice = createSlice({
  name: 'user', //命名空间,可以自动把每一个action进行独立,解决了action的type出现同名的文件,在使用的时候会默认使用name/actionName
  initialState, //state数据的初始值

  //reducers里面包裹的是同步方法
  reducers: {
    //定义的action,由于内置了immutable插件,可以直接使用赋值的方式进行数据的改变,
    //不需要每一次都返回一个新的state数据
    //第一个参数 state 为当前state中的数据
    //第二个参数action为{payload,type:'user/setUserList'}
    //payload 为传过来的新参数
    // type 为action触发的类型
    setUserList(state: UserState, action: PayloadAction<DataType[]>) {
      console.log(action.payload, ')___');
      state.userList = action.payload;
    },
    setCopyUserList(state: UserState, action: PayloadAction<DataType[]>) {
      state.copyUserList = action.payload;
    },
    setCurrentUserList(state: UserState, action: PayloadAction<DataType[]>) {
      state.currentUserList = action.payload;
    },
    deleteUser(state: UserState, action: PayloadAction<number>) {
      console.log(action.payload, 'id');
      const res = state.userList.filter((item) => item.id !== action.payload);
      state.userList = res;
    },
    editUserInfo(state: UserState, action: PayloadAction<EditState>) {
      const { id, name, age, address } = action.payload;
      const res = state.userList.map((item) => {
        if (item.id === id) {
          if (name) item.name = name;
          if (age) item.age = age;
          if (address) item.address = address;
          return item;
        }
        return item;
      });
      state.userList = res;
    },
    searchUserByName(state: UserState, action: PayloadAction<string>) {
      if (state.cloneUserList.length === 0)
        state.cloneUserList = cloneUserList(state.currentUserList);
      const res = state.userList.filter((v) => {
        if (v.name.includes(action.payload)) {
          return v;
        }
      });
      state.currentUserList = res;
    },
    deleteAllUser(state: UserState) {
      state.userList = [];
    },
    addUserInfo(state: UserState, action: PayloadAction<AddUserInfoState>) {
      const data = {
        id: state.userList.length + 1,
        ...action.payload,
      };
      state.userList.push(data);
    },
    setUserTotal(state: UserState, action: PayloadAction<number>) {
      state.total = action.payload;
    },
  },
});

// 导出actions
export const {
  setUserList,
  deleteUser,
  editUserInfo,
  searchUserByName,
  deleteAllUser,
  addUserInfo,
  setUserTotal,
  setCopyUserList,
  setCurrentUserList,
} = userSlice.actions;
