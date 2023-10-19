import { Stack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import {generateCurrentThaiTime} from "../../../functions/function";
interface AddFormProps {
    SubmitForm: (name: string, when: string) => void;
}

function AddForm({SubmitForm}:AddFormProps) {
  const [name, Setname] = useState("");
  const [when, Setwhen] = useState(generateCurrentThaiTime());

  // const date = new Date().toISOString().slice(0, 16);
  const OnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    Setname(e.target.value);
  };

  const OnChangeWhen = (e: React.ChangeEvent<HTMLInputElement>) => {
    Setwhen(e.target.value);
  };
  return (
    <Stack spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel>ชื่อกิจกรรม</FormLabel>
        <Input type="text" onChange={OnChangeName} />
      </FormControl>
      <FormControl id="when" isRequired>
        <FormLabel>เมื่อไหร่</FormLabel>
        <Input type="datetime-local" onChange={OnChangeWhen} defaultValue={when} />
      </FormControl>

      <Button
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        onClick={() => SubmitForm(name, when)}
      >
        เพิ่มกิจกรรม
      </Button>
    </Stack>
  );
}

export default AddForm;
