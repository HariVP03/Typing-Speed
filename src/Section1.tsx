import React, { useState, useEffect, useRef } from "react";
import { Flex, Heading, Textarea, Button, Text } from "@chakra-ui/react";

const Section1: React.FC = () => {
  const [state, setState] = useState(""); // What is typed so far
  const [l, setL] = useState(0); // Current pointer
  const timer = useRef(new Date()); // Initializes timer ref
  const lastCorrect = useRef(0);

  var sentence =
    "Hello world this is a test message haha typing test tested epic gamer node bash close minimize tab not tab haha hehe huhu hehe";

  const startTimer = () => {
    timer.current = new Date();
  };
  const endTimer = () => {
    var end = new Date();
    const timeDiff = end - timer.current;
    console.log(timeDiff);
  };

  useEffect(() => {
    console.log(lastCorrect);

    if (l === 0) {
      startTimer();
    } else if (l === sentence.length - 1) {
      endTimer();
    }

    if (sentence.substring(0, l + 1) === state) {
      lastCorrect.current = l;
      console.log(l, lastCorrect);
    }
  }, [state]);

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
      <Flex w="100%" minH="50vh" justifyContent="center">
        <Flex
          zIndex="2"
          position="absolute"
          maxH="100px"
          fontSize="2xl"
          direction="column"
        >
          <Textarea
            background="transparent"
            resize="none"
            fontSize="25px"
            w="90vw"
            h="45vh"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setL(state.length);
            }}
          />
        </Flex>
        <Flex maxH="100px" fontSize="2xl" direction="column">
          <Textarea
            background="transparent"
            resize="none"
            color="gray"
            fontSize="25px"
            w="90vw"
            h="45vh"
            value={sentence}
          />
        </Flex>
      </Flex>
      <Button
        onClick={startTimer}
        size="lg"
        minH="50px"
        fontSize="20px"
        my={20}
      >
        Start Timer
      </Button>
      <Button onClick={endTimer} size="lg" minH="50px" fontSize="20px" my={20}>
        Stop Timer
      </Button>
      <Flex maxH="100px" maxW="90vw" direction="row">
        <Text>{state.substring(0, lastCorrect.current + 1)}</Text>
        <Text color="red">{state.substring(lastCorrect.current + 1, l)}</Text>
      </Flex>
    </Flex>
  );
};

export default Section1;
