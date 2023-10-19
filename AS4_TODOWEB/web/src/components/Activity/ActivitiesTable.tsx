import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,Heading
} from "@chakra-ui/react";

import Activity from "./Activity";
import { TodoModels } from "../../models/activity";

interface ActivitiesTableProps {
  data: TodoModels[];
  Editing: (id: number, name: string, when: string) => void;
  Deleting: (id: number) => void;
}

function ActivitiesTable({ data, Editing,Deleting }: ActivitiesTableProps) {

  return (
    <>
      {data.length > 0 && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Heading>กิจกรรม</Heading>
                </Th>
                <Th>
                  <Heading>วัน เวลา</Heading>
                </Th>
                <Th>
                  <Heading>Action</Heading>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Activity
                  key={index}
                  data={item}
                  Editing={Editing}
                  Deleting={Deleting}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default ActivitiesTable;
