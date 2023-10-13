import { useCallback, useEffect, useState } from "react";
import styles from "./Students.module.scss";
import request from "../../server/endpoint";
import { Button, Flex, Image, Input, Select, Space, Table } from "antd";

const StudentsPage = () => {
  const [students, setStudents] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('')
  const [teacherId, setTeacherId] = useState("all");
  const [teacherSelect, setTeacherSelect] = useState([
    { value: "all", label: "All" },
  ]);

  const getTeachers = useCallback(async () => {
    await request("teachers").then((res) => {
      setTeachers(res.data);
      for (let i = 0; i < res.data.length; i++) {
        setTeacherSelect((prev) => [
          ...prev,
          { value: res.data[i].id, label: res.data[i].fullName },
        ]);
      }
    });
  }, []);
  const getStudents = useCallback(() => {
    setLoading(true);
    if (teacherId === "all") {
      Promise.all(teachers?.map((teacher) => promiseStudents(teacher.id)))
        .then((res) => setStudents(res.flat(1)))
        .finally(setLoading(false));
    } else {
      request(`teachers/${teacherId}/students`)
        .then((res) => setStudents(res.data))
        .catch((err) => console.log(err))
        .finally(setLoading(false));
    }
    setLoading(false);
  }, [teacherId, teachers]);
  useEffect(() => {
    getStudents();
    getTeachers();
  }, [getTeachers, getStudents]);

  function promiseStudents(id) {
    return new Promise(async (resolve, reject) => {
      let res = await fetch(
        `https://6528c4ac931d71583df26f7b.mockapi.io/teachers/${id}/students`
      );
      if (res.status === 200 && res.ok === true) {
        let data = res.json();
        resolve(data);
      } else {
        reject(new Error(res.status, "Error"));
      }
    });
  }

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (data) => (
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
          src={data}
        />
      ),
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
      filteredValue: [search],
      onFilter: (value, record) => {
        return (
          record.fullName.toLowerCase().includes(value)
        )
      }
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.students}>
      <div className={styles.students__header}>
        <h1>Students</h1>
        <Space>
          <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search" style={{ width: 300 }} />
          <Select
            onChange={(e) => {
              setTeacherId(e);
              getStudents();
            }}
            defaultValue="All"
            style={{
              width: 150,
            }}
            options={teacherSelect}
          ></Select>
        </Space>
      </div>
      <div className={styles.students__wrapper}>
        <Table loading={loading} dataSource={students} columns={columns} />
      </div>
    </div>
  );
};

export default StudentsPage;
