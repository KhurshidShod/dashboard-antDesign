import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { PiStudentBold } from "react-icons/pi";
import { FaUniversity } from 'react-icons/fa'
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            width: "100%",
            paddingLeft: "1rem",
          }}
        >
          <h1
            style={{
              color: "white",
              fontWeight: "700",
              letterSpacing: "2px",
              fontSize: "24px",
              lineHeight: "64px",
            }}
          >
            {!collapsed ? "Dashboard" : "D"}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ marginTop: "1rem" }}
          items={[
            {
              key: "1",
              icon: <Link to='/teachers'><FaUniversity /></Link>,
              label: "Teachers",
            },
            {
              key: "2",
              icon: <Link to='/students'><PiStudentBold /></Link>,
              label: "Students",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
