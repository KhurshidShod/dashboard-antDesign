import { Button, Flex, Tooltip } from "antd";
import styles from "./TeacherCard.module.css";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";

const TeacherCard = ({
  fullName,
  email,
  age,
  avatar,
  id,
  deleteTeacher,
  editTeacher,
}) => {
  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <div className={styles.card}>
      <div className={styles.bg}>
        <div className={styles.bg__img}>
          <img src={avatar} alt="" />
        </div>
        <div className={styles.bg__text}>
          <h3>{fullName}</h3>
          <p>{email}</p>
          <p>{age} years old</p>
        </div>
        <Flex gap="middle">
          <Tooltip placement="top" title="Edit teacher" arrow={mergedArrow}>
            <Button
              onClick={() => editTeacher(id)}
              style={{ width: "50px" }}
              type="primary"
            >
              <Flex justify="center" align="center">
                <AiOutlineEdit size={20} />
              </Flex>
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Delete teacher" arrow={mergedArrow}>
            <Button
              onClick={() => deleteTeacher(id)}
              style={{ width: "50px" }}
              type="primary"
              danger
            >
              <Flex justify="center" align="center">
                <AiOutlineDelete size={20} />
              </Flex>
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="See students" arrow={mergedArrow}>
            <Button
              style={{ width: "50px", backgroundColor: "green" }}
              type="primary"
              danger
            >
              <Flex justify="center" align="center">
                <AiOutlineEye size={20} />
              </Flex>
            </Button>
          </Tooltip>
        </Flex>
      </div>
      <div className={styles.blob}></div>
    </div>
  );
};

TeacherCard.propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  age: PropTypes.number,
  avatar: PropTypes.string,
  id: PropTypes.string,
  deleteTeacher: PropTypes.func,
  editTeacher: PropTypes.func,
};

export default TeacherCard;
