import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Pressable,
  Flex,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateThai, formatTimeThai, extractTime } from "../functions";
const ActivityModal = ({
  showModal,
  setshowModal,
  AddActivity,
  ActivityInModalDetail,
}) => {
  const [defaultModal,setDefaultModal] = useState(ActivityInModalDetail);
  useEffect(()=> {
    setDefaultModal(ActivityInModalDetail)
  },[ActivityInModalDetail])

  const [showDate, setshowDate] = useState("")
  const [showTime, setshowTime] = useState("")
  useEffect(()=>{
  const { date, time } = extractTime(ActivityInModalDetail.when);
    setshowDate(date);
    setshowTime(time);
  },[ActivityInModalDetail])
  // const { date, time } = extractTime(ActivityInModalDetail.when);
  const [ActivityName, setActivityName] = useState(ActivityInModalDetail.name);
  const [chooseDate, setchooseDate] = useState("");
  const [chooseTime, setchooseTime] = useState("");
  const [currDate, setdate] = useState(new Date());
  const [currTime, settime] = useState(new Date());
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [showTimePicker, setshowTimePicker] = useState(false);

  const [showFillName, setshowFillName] = useState(false);
  useEffect(() => {
    const condition = ActivityInModalDetail.ID !== -1 && ActivityName === "";
    setshowFillName(condition);
  }, [ActivityInModalDetail, ActivityName]);

  const [showFilledDate, setshowFilledDate] = useState(false);
  useEffect(() => {
    const condition = ActivityInModalDetail.ID !== -1 && chooseDate === "";
    setshowFilledDate(condition);
  }, [ActivityInModalDetail, chooseDate]);

  const [showFilledTime, setshowFilledTime] = useState(false);
  useEffect(() => {
    const condition = ActivityInModalDetail.ID !== -1 && chooseTime === "";
    setshowFilledTime(condition);
  }, [ActivityInModalDetail, chooseTime]);

  const onDateChange = ({ type }, selectedDate) => {
    if (type == "set") {
      setdate(selectedDate);
      setchooseDate(formatDateThai(selectedDate.toDateString()));
    } else {
      setshowDatePicker(false);
    }
  };

  const onTimeChange = ({ type }, selectedTime) => {
    if (type == "set") {
      settime(selectedTime);
      setchooseTime(formatTimeThai(selectedTime.toTimeString()));
    } else {
      setshowTimePicker(false);
    }
  };

  const confirmDate = () => {
    setchooseDate(formatDateThai(currDate.toDateString()));
    setshowDatePicker(false);
  };

  const confirmTime = () => {
    setchooseTime(formatTimeThai(currTime.toTimeString()));
    setshowTimePicker(false);
  };

  const addActivity = () => {
    const name = ActivityName == "" ? defaultModal.name : ActivityName;
    const finalDate = chooseDate == "" ? showDate : chooseDate;
    const finalTime = chooseTime == "" ? showTime : chooseTime;
    const item = {
      ID: defaultModal.ID,
      name: name,
      when: `${finalDate} เวลา ${finalTime}`,
    };
    closeModal();
    AddActivity(item);
  };

  const closeModal = () => {
    setActivityName("");
    setchooseDate("");
    setchooseTime("");
    setshowModal(false);
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Activity</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <FormControl.Label>Name</FormControl.Label>
              {showFillName ? (
                <Input
                  defaultValue={ActivityInModalDetail.name}
                  onChangeText={(name) => setActivityName(name)}
                />
              ) : (
                <Input
                  onChangeText={(name) => setActivityName(name)}
                  value={ActivityName}
                  placeholder="ชื่อกิจกรรม"
                />
              )}
            </FormControl>
            <FormControl mt="3" isRequired>
              <FormControl.Label>Date</FormControl.Label>
              <Pressable onPress={() => setshowDatePicker(true)}>
                {showFilledDate ? (
                  <Input
                    defaultValue={showDate}
                    editable={false}
                    onPressIn={() => setshowDatePicker(true)}
                  />
                ) : (
                  <Input
                    value={chooseDate}
                    placeholder="24 ส.ค. 66"
                    editable={false}
                    onPressIn={() => setshowDatePicker(true)}
                  />
                )}
              </Pressable>
              {showDatePicker && (
                <>
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={currDate}
                    onChange={onDateChange}
                  />
                  <Flex direction="row" justify="space-around">
                    <Button
                      variant="outline"
                      _text={{ color: "black" }}
                      onPress={() => setshowDatePicker(false)}
                    >
                      Cancel
                    </Button>
                    <Button bgColor="green.700" onPress={confirmDate}>
                      Select
                    </Button>
                  </Flex>
                </>
              )}
            </FormControl>
            <FormControl mt="3" isRequired>
              <FormControl.Label>Time</FormControl.Label>
              <Pressable onPress={() => setshowTimePicker(true)}>
                {showFilledTime ? (
                  <Input
                    defaultValue={showTime}
                    editable={false}
                    onPressIn={() => setshowTimePicker(true)}
                  />
                ) : (
                  <Input
                    value={chooseTime}
                    placeholder="10:11 น."
                    editable={false}
                    onPressIn={() => setshowTimePicker(true)}
                  />
                )}
              </Pressable>
              {showTimePicker && (
                <>
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={currTime}
                    onChange={onTimeChange}
                    is24Hour={true}
                  />
                  <Flex direction="row" justify="space-around">
                    <Button
                      variant="outline"
                      _text={{ color: "black" }}
                      onPress={() => setshowTimePicker(false)}
                    >
                      Cancel
                    </Button>
                    <Button bgColor="green.700" onPress={confirmTime}>
                      Select
                    </Button>
                  </Flex>
                </>
              )}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  closeModal();
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  addActivity();
                }}
              >
                Add
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ActivityModal;
