import React from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import Header from './header';
import Footer from './footer';

const { Option } = Select;

const UserForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values); // Truyền các giá trị vào callback
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.formContainer}>
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={{
            fullname: '',
            phone: '',
            address: '',
            gender: 'Nam',
            birthYear: null,
          }}
        >
          <Form.Item
            label="Họ và Tên"
            name="fullname"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Năm sinh"
            name="birthYear"
            rules={[{ required: true, message: 'Vui lòng nhập năm sinh!' }]}
          >
            <DatePicker picker="year" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',  // Đảm bảo căn giữa toàn bộ màn hình
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',  // Giới hạn chiều rộng của form
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  }
};

export default UserForm;
