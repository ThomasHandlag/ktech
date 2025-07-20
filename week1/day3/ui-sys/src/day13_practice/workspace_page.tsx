import { NavLink, Outlet, useLocation } from "react-router";
import { Layout, Menu, Avatar, Card, Button, Typography, Tag } from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuthStore } from "./api/useAuthStore";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const WorkspacePage13 = () => {
  const { loggedInUser: user, logOut } = useAuthStore();
  const location = useLocation();

  const isAdmin = user?.roles.some((role) =>
    ["Administrators", "Managers"].includes(role.name)
  );

  const menuItems: MenuProps["items"] = [
    {
      key: "list",
      icon: <UnorderedListOutlined />,
      label: <NavLink to="list">Tasks</NavLink>,
    },
    {
      key: "create",
      icon: <PlusOutlined />,
      label: <NavLink to="create">Create Task</NavLink>,
    },
    ...(isAdmin
      ? [
          {
            type: "divider" as const,
          },
          {
            key: "admin",
            label: "Administration",
            type: "group" as const,
            children: [
              {
                key: "users",
                icon: <UserOutlined />,
                label: <NavLink to="users">Users</NavLink>,
              },
              {
                key: "roles",
                icon: <TeamOutlined />,
                label: <NavLink to="roles">Roles</NavLink>,
              },
            ],
          },
        ]
      : []),
  ];

  const getSelectedKey = () => {
    const path = location.pathname.split("/").pop();
    return path || "list";
  };

  return (
    <Layout className="overflow-hidden h-full">
      <Sider width={280} className="bg-white border-r border-gray-200">
        <div className="p-4 bg-white">
          <Card size="small" className="mb-4">
            <div className="text-center">
              <Avatar
                size={64}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#1890ff",
                  marginBottom: "12px",
                }}
              />
              <Title level={5} style={{ margin: "0 0 4px 0" }}>
                {user?.fullName}
              </Title>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {user?.email}
              </Text>
              <div className="mt-2">
                {user?.roles.map((role) => (
                  <Tag key={role.id} color="blue" style={{ margin: "2px" }}>
                    {role.name}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{
            borderRight: 0,
            height: "calc(100vh - 200px)",
            overflow: "auto",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px",
          }}
        >
          <Button
            type="primary"
            danger
            block
            icon={<LogoutOutlined />}
            onClick={logOut}
            style={{ height: "40px" }}
          >
            Logout
          </Button>
        </div>
      </Sider>

      <Layout>
        <Content className="overflow-y-scroll h-full">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default WorkspacePage13;
