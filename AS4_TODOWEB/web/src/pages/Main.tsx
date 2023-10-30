import { Grid, GridItem, Heading, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Sidebar,
  CustomToast,
  ActivitiesTable,
  AddActivity,
} from "../components";
import { getCookie } from "typescript-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TodoModels } from "../models/activity";
import {ReformatTimeForRequest} from "../functions/function";
function Main() {
  const navigate = useNavigate();
  const { addToast } = CustomToast();
  const [data, SetData] = useState<TodoModels[]>();
  const token = getCookie("token");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `${token}`,
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return
    }
    console.log(token)
    axiosInstance
      .get("http://localhost:8100/activities/user")
      .then((res) => {
        SetData(res.data);
      })
      .catch((error) => {
        if (error.response.status && error.response.status == 401) {
          addToast({ description: "redirect to login", status: "warning" });
          navigate("/signin");
        }else {
          addToast({ description: "error fetching data", status: "error" });
        }
        
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdateData = (id: number, name: string, when: string) => {
    if (!data) {
      return;
    }

    const RequestWhen = ReformatTimeForRequest(when);

    //* Check not change
    const same = data.map((item) => {
      if (item.ID === id && item.name === name && item.when === when) {
        return true;
      } else if (item.ID === id) {
        return false;
      }
      return false;
    });

    if (same.includes(true)) {
      addToast({ description: "ไม่มีการเปลี่ยนแปลงข้อมูล", status: "warning" });
      return;
    }

    //* Update data in backend
    axiosInstance
      .put("http://localhost:8100/activities", {
        ID: id,
        name: name,
        when: RequestWhen,
      })
      .then(() => {
        addToast({ description: "แก้ไขรายการสำเร็จ", status: "success" });
        //* Update data in frontend
        const newState = data.map((item) => {
          if (item.ID === id) {
            item.name = name;
            item.when = when;
          }
          return item;
        });
        SetData(newState);
      })
      .catch(() => {
        addToast({ description: "error updating data", status: "error" });
      });
  };

  const DeleteData = (id: number) => {
    if (!data) {
      return;
    }

    //* Delete data in backend
    axiosInstance
      .delete("http://localhost:8100/activities" + "/" + id)
      .then(() => {
        addToast({ description: "ลบรายการสำเร็จ", status: "success" });
        //* Delete data in frontend
        const newState = data.filter((item) => {
          return item.ID !== id;
        });
        SetData(newState);
      })
      .catch(() => {
        addToast({ description: "error deleting data", status: "error" });
      });
  };

  const SubmitAddActivityForm = (name: string, when: string) => {
    //* reformat time
    const requestWhen = ReformatTimeForRequest(when);

    //* insert to backend
    axiosInstance
      .post("http://localhost:8100/activities", {
        name: name,
        when: requestWhen,
      })
      .then((res) => {
        addToast({ description: "เพิ่มกิจกรรมสำเร็จ", status: "success" });
        const id = res.data.ID;
        //* insert data in frontend
        const newTodo: TodoModels = {
          ID: id,
          name: name,
          when: when,
        };
        const newState = data ? [...data, newTodo] : [newTodo];
        SetData(newState);
        console.log("🚀 ~ file: Main.tsx:140 ~ .then ~ id:", id);
      })
      .catch(() => {
        addToast({ description: "error adding data", status: "error" });
      });
  };

  return (
    <Grid
      templateAreas={`"nav header" "nav main" `}
      gridTemplateRows={"70px 1fr 30px"}
      gridTemplateColumns={"5% 1fr"}
      minH={"100vh"}
      gap="2"
    >
      <GridItem pl="2" area={"header"}>
        <Flex alignItems="center" h="full">
          <Grid templateColumns="repeat(12, 1fr)" gap={4} w="full">
            <GridItem colSpan={2} h="10">
              <Heading>TODO</Heading>
            </GridItem>
            <GridItem colStart={11} colEnd={12} h="10" bg="papayawhip">
              <AddActivity SubmitForm={SubmitAddActivityForm} />
            </GridItem>
          </Grid>
        </Flex>
      </GridItem>
      <GridItem p="4" area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        {data && (
          <ActivitiesTable
            data={data}
            Editing={UpdateData}
            Deleting={DeleteData}
          />
        )}
      </GridItem>
    </Grid>
  );
}

export default Main;
