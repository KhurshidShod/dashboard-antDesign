import { Button, Checkbox, Flex, Form, Input } from "antd";
import styles from "./LoginPage.module.scss";
import PropTypes from 'prop-types'

const LoginPage = ({ setIsAuth }) => {
  const submitForm = (values) => {
    console.log(values);
    setIsAuth(true)
    localStorage.setItem("isAuth", true)
  };

  return (
    <section className={styles.login}>
      <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
        <Form
          name="basic"
          style={{
            border: "1px solid #D9D9D9",
            padding: "1rem",
            borderRadius: "10px",
          }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={submitForm}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input a valid email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </section>
  );
};

LoginPage.propTypes = {
    setIsAuth: PropTypes.func
}

export default LoginPage;
