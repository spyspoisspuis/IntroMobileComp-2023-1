import React from "react";
import { VStack, Box, Flex, Heading, Button } from "native-base";
import { useState, useEffect } from "react";
import { ToDoList, ActivityModal } from "../components";
import {
  fetchData,
  AddActivityAPI,
  UpdateActivityAPI,
  DeleteActivityAPI,
} from "../api";

import { getSecureValue } from "../storage";
import useMessageToast from "../hook/messageToast";
import { ToastStatus } from "../constant/SystemStatus";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import {
  formatDateThai,
  formatUTFToThaiTime,
  convertThaiDateToISO,
} from "../functions";

const emptyData = {
  ID: -1,
  name: "",
  when: "",
};
function Main() {
  const messageToast = useMessageToast();
  const nav = useNavigation();

  const [showModal, setshowModal] = useState(false);
  const [ActivityInModalDetail, setActivityInModalDetail] = useState(emptyData);
  const DisplayModal = (ActivityDetails) => {
    setActivityInModalDetail(ActivityDetails);
    setshowModal(true);
  };

  const [ToDos, setToDos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetch = async () => {
        try {
          const result = await fetchData();
          messageToast(ToastStatus.Success, "Success", "fetching data success");
          const formatData = result.data.map((item) => {
            return {
              ...item,
              when:
                formatDateThai(item.when) +
                " เวลา " +
                formatUTFToThaiTime(item.when),
            };
          });
          setToDos(formatData);
        } catch (error) {
          messageToast(ToastStatus.Error, "Error", "error fetching data");
        }
      };

      fetch();
    }, [])
  );

  const AddActivity = async (item) => {
    if (item.ID !== -1) {
      UpdateActivity(item);
      return;
    }
    item.when = convertThaiDateToISO(item.when);

    try {
      const res = await AddActivityAPI(item.name, item.when);
      messageToast(ToastStatus.Success, "Success", "Add data success");
      const newItem = {
        ID: res.id,
        name: item.name,
        when:   formatDateThai(item.when) +
              " เวลา " +
              formatUTFToThaiTime(item.when),
      };
      const newState = [...ToDos, newItem];
      setToDos(newState);
    } catch (error) {
      messageToast(ToastStatus.Error, "Error", "Error occured");
    }
  };

  const UpdateActivity = async (item) => {
    try {
      item.when = convertThaiDateToISO(item.when);
      const res = await UpdateActivityAPI(item.ID, item.name, item.when);
      const newState = ToDos.map((todo) => {
        if (todo.ID === item.ID) {
          todo.name = item.name;
          todo.when =   formatDateThai(item.when) +
              " เวลา " +
              formatUTFToThaiTime(item.when);
        }
        return todo;
      });
      setToDos(newState);
      messageToast(ToastStatus.Success, "Success", "Update data success");
    } catch (error) {
      messageToast(ToastStatus.Error, "Error", "Error occured");
    }
  };

  const DeleteActivity = async (i) => {
    try {
      const deleteItem = ToDos.find((item) => item.ID === i.ID);
      const res = await DeleteActivityAPI(deleteItem.ID);

      const newState = ToDos.filter((todo) => todo.ID !== deleteItem.ID);
      setToDos(newState);

      messageToast(ToastStatus.Success, "Success", "Delete data success");
    } catch (error) {
      messageToast(ToastStatus.Error, "Error", "Error occured");
    }
  };

  return (
    <VStack space={2} w="full" bg="white">
      <Flex
        w="full"
        px={4}
        py={2}
        justify="space-between"
        direction="row"
        align="center"
      >
        <Heading fontFamily={"KanitBold"}>To Do</Heading>
        <Button onPress={() => DisplayModal(emptyData)}>Add Acivity</Button>
      </Flex>
      <Box w="full">
        {ToDos && (
          <ToDoList
            data={ToDos}
            deleteActivity={DeleteActivity}
            DisplayModal={DisplayModal}
          />
        )}
        <ActivityModal
          showModal={showModal}
          setshowModal={setshowModal}
          AddActivity={AddActivity}
          ActivityInModalDetail={ActivityInModalDetail}
        />
      </Box>
    </VStack>
  );
}

export default Main;
