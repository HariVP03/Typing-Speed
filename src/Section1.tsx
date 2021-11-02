import React, { useState } from "react";
import { Flex, Heading, Textarea } from "@chakra-ui/react";

const Section1: React.FC = () => {
  const [state, setState] = useState("");

  return (
    <Flex
      minW="100vw"
      maxH="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex minW="100%" minH="10vh" justifyContent="center">
        <Heading textAlign="center">Typing Test</Heading>
      </Flex>
      <Flex mt={10} w="100%" minH="70vh" justifyContent="center">
        <Flex maxH="100px" fontSize="2xl">
          <Textarea
            fontSize="25px"
            w="90vw"
            h="20rem"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Flex>
      </Flex>
      <Flex maxH="100px" maxW="90vw">
        {state}
      </Flex>
    </Flex>
  );
};

export default Section1;
