import {
  useEditableControls,
  Tooltip,
  EditablePreview,
  useColorModeValue,
  Input,
  EditableInput,
  Editable,
  Td,
} from "@chakra-ui/react";
import { TodoModels } from "../../../models/activity";
import EditingAction from "./EditingAction";
import { useState } from "react";

function EditableControls() {
  const { isEditing } = useEditableControls();

  return isEditing ? null : null;
}

function EditableRows(props: {
  data: TodoModels;
  SetEditing: (name: string, when: string) => void;
  Cancel: () => void;
}) {
  const [name, SetName] = useState(props.data.name);
  const [when, SetWhen] = useState(props.data.when);
  const Editing = () => {
    props.SetEditing(name, when);
  };

  const OnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetName(e.target.value);
  };

  const OnchangeWhen = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetWhen(e.target.value);
  };

  const trimmedWhen = props.data.when[when.length -1] === "Z" ? props.data.when.slice(0, -1) : props.data.when;

  return (
    <>
      <Td>
        <Editable
          defaultValue={props.data.name}
          isPreviewFocusable={true}
          selectAllOnFocus={false}
        >
          <Tooltip label="Click to edit" shouldWrapChildren={true}>
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: useColorModeValue("gray.100", "gray.700"),
              }}
            />
          </Tooltip>
          <Input py={2} px={4} as={EditableInput} onChange={OnChangeName} />
          <EditableControls />
        </Editable>
      </Td>
      <Td>
        <Input
          type="datetime-local"
          defaultValue={trimmedWhen}
          onChange={OnchangeWhen}
        />
      </Td>
      <Td>
        <EditingAction Editing={Editing} Cancel={props.Cancel} />
      </Td>
    </>
  );
}

export default EditableRows;
