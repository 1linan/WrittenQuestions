import { useMessage } from '@/hook/useMessage';
import { addUserInfo, editUserInfo } from '@/store/slices/user';
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './editUserInfo.module.scss';

type FieldType = {
  name?: string;
  age?: number;
  address?: string;
};
interface EditProps {
  onCancel: () => void;
  onOk: () => void;
  id: number;
  type: number;
}
function EditUserInfo(props: EditProps) {
  const { onCancel, onOk, id, type } = props;
  const dispatch = useDispatch();
  const { message } = useMessage();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const { name, age, address } = values;
    if (type === 1) {
      dispatch(
        editUserInfo({
          id,
          name,
          age,
          address,
        }),
      );
    }

    if (type === 2) {
      dispatch(
        addUserInfo({
          name,
          age,
          address,
        }),
      );
    }
    message('success', 'Successfully');
    onOk();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.editWrapper}>
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
          rules={[
            {
              required: type === 1 ? false : true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Age"
          name="age"
          rules={[
            {
              required: type === 1 ? false : true,
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
          rules={[
            {
              required: type === 1 ? false : true,
              message: 'Please input your address',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Row>
            <Button type="primary" onClick={onCancel}>
              Cancel
            </Button>
            <Col span={2}></Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditUserInfo;
