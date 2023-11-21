import React, { useState, useEffect } from "react";
import { Dimensions, TouchableOpacity, View, ScrollView } from "react-native";
import {
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  Divider,
  Flex
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { extractTime } from "../functions";
function ToDoList({ data, deleteActivity, DisplayModal }) {
  return (
    <Box w="full" h="full">
      <Box bg="white" flex="1" w="100%">
        <Flex direction="row" justify="space-between" px={6}>
          <Text fontSize="lg" fontFamily={"KanitBold"}>
            Name
          </Text>
          <Text fontSize="lg" fontFamily={"KanitBold"}>
            When
          </Text>
        </Flex>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data && (
            <TODOS
              data={data}
              deleteActivity={deleteActivity}
              DisplayModal={DisplayModal}
            />
          )}
        </ScrollView>
      </Box>
    </Box>
  );
}

function TODOS({ data, deleteActivity, DisplayModal }) {
  const [listData, setListData] = useState(data);
  useEffect(() => {
    setListData(data);
  }, [data]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey,item) => {
    closeRow(rowMap, rowKey);
    const newData = listData.filter((i) => i.ID !== item.ID);
    // const prevIndex = listData.findIndex((item) => item.key === rowKey);
    // newData.splice(prevIndex, 1);
    setListData(newData);
    deleteActivity(item);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => {
    const { date, time } = extractTime(item.when);

    return (
      <Box>
        <Pressable onPress={() => console.log("You touched me")} bg="white">
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <VStack>
                <Text color="coolGray.800">{item.name}</Text>
              </VStack>
              <Spacer />
              <VStack>
                <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
                  {date}
                </Text>
                <Text fontSize="xs" color="coolGray.600" alignSelf="flex-start">
                  {time}
                </Text>
              </VStack>
            </HStack>
          </Box>
          <Divider mt={2} mx={2} />
        </Pressable>
      </Box>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => DisplayModal(data.item)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<Entypo name="edit" />} size="xs" color="coolGray.800" />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            Edit
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key,data.item)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" flex="1">
      {listData && (
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      )}
    </Box>
  );
}

export default ToDoList;
