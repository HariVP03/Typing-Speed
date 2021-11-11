import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { rword } from "rword";
import randomWords from "random-words";
import {
  Flex,
  Heading,
  chakra,
  Input,
  Radio,
  Text,
  Button,
  Box,
  VisuallyHidden,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  RadioGroup,
} from "@chakra-ui/react";

const Section1: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const timer = useRef<number>(0); // Initializes timer ref
  const inputHidden = useRef<HTMLInputElement>(null);
  const pointer = useRef(-1);
  const lastCorrect = useRef(-1);
  const [typed, setTyped] = useState("");
  const [correct, setCorrect] = useState("");
  const [incorrect, setIncorrect] = useState("");
  const [sentence, setSentence] = useState(randomWords(5).join(" "));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wordCount = useRef(5);

  const startTimer = () => {
    timer.current = parseInt(moment().format("x"));
    console.log(timer.current);
  };
  const endTimer = () => {
    var end = parseInt(moment().format("x"));
    const timeDiff = end - timer.current;
    setTime(timeDiff);
    pointer.current = -1;
    lastCorrect.current = -1;
    setTyped("");
    setIncorrect("");
    setCorrect("");
  };

  useEffect(() => {
    var sentenceGenerated = randomWords(wordCount.current);
    try {
      setSentence(sentenceGenerated.join(" "));
    } catch (err) {
      console.error(err);
    }
  }, [wordCount.current]);

  useEffect(() => {
    if (pointer.current === 0) {
      startTimer();
    } else if (pointer.current === sentence.length - 1) {
      endTimer();
      pointer.current = -1;
      setTyped("");
    }
    if (typed === sentence.substring(0, pointer.current + 1)) {
      lastCorrect.current = pointer.current;
    }
    setCorrect(
      pointer.current === -1 ? "" : typed.substring(0, lastCorrect.current + 1)
    );
    if (pointer.current === lastCorrect.current) {
      setIncorrect("");
    } else {
      setIncorrect(
        sentence.substring(lastCorrect.current + 1, pointer.current + 1)
      );
    }
  }, [typed]);

  return (
    <Flex
      maxW="100vw"
      maxH="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        mb={6}
        minW="100%"
        minH="10vh"
        justifyContent="center"
        direction="column"
      >
        <Heading textAlign="center" fontFamily="'Londrina Solid', cursive">
          Typing Test
        </Heading>
      </Flex>
      <Button onClick={onOpen} mb={6} fontFamily="'Baloo 2', cursive">
        Settings
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="'Baloo 2', cursive">Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <chakra.h2 fontFamily="'Baloo 2', cursive">Word Count:</chakra.h2>
            <RadioGroup defaultValue={wordCount.current.toString()}>
              <Radio
                fontFamily="'Baloo 2', cursive"
                size="md"
                mx={2}
                value="5"
                onClick={() => {
                  wordCount.current = 5;
                }}
                defaultChecked
              >
                5
              </Radio>
              <Radio
                fontFamily="'Baloo 2', cursive"
                size="md"
                value="10"
                mx={2}
                onClick={() => {
                  wordCount.current = 10;
                }}
              >
                10
              </Radio>
              <Radio
                fontFamily="'Baloo 2', cursive"
                size="md"
                value="15"
                mx={2}
                onClick={() => {
                  wordCount.current = 15;
                }}
              >
                15
              </Radio>
              <Radio
                fontFamily="'Baloo 2', cursive"
                size="md"
                value="20"
                mx={2}
                onClick={() => {
                  wordCount.current = 20;
                }}
              >
                20
              </Radio>
              <Radio
                fontFamily="'Baloo 2', cursive"
                size="md"
                value="25"
                mx={2}
                onClick={() => {
                  wordCount.current = 25;
                }}
              >
                25
              </Radio>
            </RadioGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex w="100%" minH="50vh" justifyContent="center">
        <Flex
          zIndex="2"
          position="absolute"
          maxH="100px"
          fontSize="2xl"
          direction="column"
        ></Flex>
        <Box
          bg="gray.700"
          resize="none"
          cursor="pointer"
          overflowWrap="anywhere"
          color="gray"
          onClick={() => {
            inputHidden.current?.focus();
          }}
          fontSize="25px"
          border="1px solid"
          borderColor="gray.600"
          rounded="md"
          w="90%"
          p={5}
          minH="70%"
        >
          <chakra.span color="black" fontFamily='"Ubuntu Mono", monospace'>
            {correct}
          </chakra.span>

          <chakra.span color="red" fontFamily='"Ubuntu Mono", monospace'>
            {incorrect}
          </chakra.span>
          <chakra.span color="gray" fontFamily='"Ubuntu Mono", monospace'>
            {pointer.current === -1
              ? sentence
              : sentence.substring(pointer.current + 1, sentence.length)}
          </chakra.span>
        </Box>

        <VisuallyHidden>
          <Input
            type="text"
            value={typed}
            onChange={(e) => {
              pointer.current = e.target.value.length - 1;
              setTyped(e.target.value);
            }}
            ref={inputHidden}
          />
        </VisuallyHidden>
      </Flex>
      <Text fontFamily="'Baloo 2', cursive" fontSize="2xl">
        Average Words Per Minute: {(wordCount.current / time) * 1000 * 60}
      </Text>
      <Text fontFamily="'Baloo 2', cursive" fontSize="2xl">
        Time taken in seconds: {time}
      </Text>
      <Text fontFamily="'Baloo 2', cursive" fontSize="2xl">
        Words Typed: {wordCount.current}
      </Text>
    </Flex>
  );
};

export default Section1;
