import { addUserInfo } from '@/store/slices/user';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './addUserInfo.module.scss';

type FieldType = {
  name?: string;
  age?: number;
  address?: string;
};
export function AddUserInfo() {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(
      addUserInfo({
        name: values.name,
        age: values.age,
        address: values.address,
      }),
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.addUserInfoWrapper}>
      <h1>添加用户信息</h1>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              pattern: /^\d{1,3}$/,
              message: 'Please input your age',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
