import { Center, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import { Sidebar } from "../components";

function Credit() {
  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateColumns={"5% 1fr"}
      minH={"100vh"}
      gap="2"
    >
      <GridItem p="4" area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem pl="2" area={"main"} >
        <Center h="full" w="full" >
          <VStack spacing={6}>
            <Heading as="h3" noOfLines={1}>
              จัดทำโดย
            </Heading>
            <Heading as="h1" noOfLines={1}>
              นายวาริิส หลักทอง
            </Heading>
          </VStack>
        </Center>
      </GridItem>
    </Grid>
  );
}

export default Credit;
