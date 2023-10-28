import { editUserInfo } from '@/store/slices/user';
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
}
function EditUserInfo(props: EditProps) {
  const { onCancel, onOk, id } = props;
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(
      editUserInfo({
        id,
        name: values.name,
        age: values.age,
        address: values.address,
      }),
    );
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
        <Form.Item<FieldType> label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Age"
          name="age"
          rules={[
            {
              pattern: /^\d{1,3}$/,
              message: 'Please input your age',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Address" name="address">
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
