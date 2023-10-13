import { useCallback, useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard";
import styles from "./Teachers.module.scss";
import request from "../../server/endpoint";
import { Button, Checkbox, Flex, Form, Input, Modal, Pagination } from "antd";

const TeachersPage = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loadTeachers, setLoadTeachers] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const getTeachers = useCallback(async () => {
    setLoadTeachers(true);
    await request("teachers", { params: { page, limit: 8, search } })
      .then((res) => setTeachers(res.data))
      .catch((err) => console.log(err))
      .finally((_) => setLoadTeachers(false));
  }, [page, search]);
  const getData = useCallback(async () => {
    await request("teachers", {params: {search}})
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [search]);

  useEffect(() => {
    getTeachers();
    getData();
  }, [getTeachers, getData]);

  const deleteTeacher = async (id) => {
    await request.delete(`teachers/${id}`);
    getTeachers();
    getData();
  };
  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      console.log(values);
      setIsModalOpen(false);
      if (selected === null) {
        await request.post("teachers", {
          fullName: values.fullName,
          avatar: values.avatar,
          age: values.age,
          email: values.email,
        });
      } else {
        await request.put(`teachers/${selected}`, {
          fullName: values.fullName,
          avatar: values.avatar,
          age: values.age,
          email: values.email,
        });
      }
      getTeachers();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const editTeacher = async (id) => {
    setSelected(id);
    showModal();
    const { data } = await request(`teachers/${id}`);
    form.setFieldsValue(data);
  };

  const onFinish = () => {};
  return (
    <div className={styles.teachers}>
      <Modal
        title={`${selected !== null ? "Edit teacher" : "Add teacher"}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{}}
          initialValues={{
            remember: true,
            fullName: "",
            age: "",
            email: "",
            avatar: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Flex wrap="wrap" gap="1rem">
            <Form.Item
              style={{ margin: "0", width: "calc(100% / 2 - 1rem)" }}
              label="Fullname"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              style={{ margin: "0", width: "calc(100% / 2 - 1rem)" }}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input valid email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Age"
              style={{ margin: "0", width: "calc(100% / 2 - 1rem)" }}
              name="age"
              rules={[
                {
                  required: true,
                  message: "Please input your age!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Avatar"
              style={{ margin: "0", width: "calc(100% / 2 - 1rem)" }}
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please input your avatar link!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>

          <Flex vertical style={{ marginTop: "1rem" }}>
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ margin: "0" }}
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                onClick={handleOk}
              >
                {selected === null ? "Submit" : "Save"}
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
      <Flex
        justify="space-between"
        style={{ width: "100%", padding: "0 1rem", paddingBottom: "10px" }}
      >
        <h1 style={{zIndex: '2'}}>Teachers</h1>
        <Flex style={{zIndex: '2'}} align="center" gap='1rem'>
          <Input type="search" onChange={(e) => setSearch(e.target.value)} />
          <Button
            onClick={showModal}
            type="dashed"
            style={{ borderColor: "green", color: "green" }}
          >
            Add teacher
          </Button>
        </Flex>
      </Flex>
      <div className={styles.teachers__wrapper}>
        {loadTeachers ? (
          <div className={styles.loader}>
            <li className={styles.ball}></li>
            <li className={styles.ball}></li>
            <li className={styles.ball}></li>
          </div>
        ) : (
          teachers?.map((teacher) => (
            <TeacherCard
              deleteTeacher={deleteTeacher}
              editTeacher={editTeacher}
              key={teacher.id}
              {...teacher}
            />
          ))
        )}
        {/* <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard /> */}
      </div>
      <Pagination
        onChange={(e) => setPage(e)}
        style={{ marginTop: "2rem" }}
        pageSize={8}
        total={data?.length}
      />
    </div>
  );
};

export default TeachersPage;
