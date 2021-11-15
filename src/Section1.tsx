import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
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
import ResultModal from "./components/ResultModal";

const Section1: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const timer = useRef<number>(0); // Initializes timer ref
  const inputHidden = useRef<HTMLInputElement>(null);
  const pointer = useRef<number>(-1);
  const lastCorrect = useRef<number>(-1);
  const [typed, setTyped] = useState<string>("");
  const [correct, setCorrect] = useState<string>("");
  const [incorrect, setIncorrect] = useState<string>("");
  const [sentence, setSentence] = useState<string>(randomWords(5).join(" "));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dataPoints = useRef<{ name: string; speed: number }[]>([]);
  const {
    isOpen: isOpenResult,
    onOpen: onOpenResult,
    onClose: onCloseResult,
  } = useDisclosure();
  const wordCount = useRef(5);
  const speeds = useRef<number[]>([]);

  const startTimer = () => {
    timer.current = parseInt(moment().format("x"));
    dataPoints.current = [];
    speeds.current = [];
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

    var sentenceGenerated = randomWords(wordCount.current);
    try {
      setSentence(sentenceGenerated.join(" "));
    } catch (err) {
      console.error(err);
    }
    speeds.current.push(end);
    console.log(speeds.current);
    var timeTemp = timer.current;
    speeds.current.forEach((e) => {
      dataPoints.current.push({
        name: `Word ${speeds.current.indexOf(e) + 1}`,
        speed: 60000 / (e - timeTemp),
      });
      timeTemp = e;
    });

    onOpenResult();
    speeds.current = [];
  };

  const reset = () => {
    pointer.current = -1;
    lastCorrect.current = -1;
    setTyped("");
    setIncorrect("");
    setCorrect("");
    speeds.current = [];
    var sentenceGenerated = randomWords(wordCount.current);
    try {
      setSentence(sentenceGenerated.join(" "));
    } catch (err) {
      console.error(err);
    }
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
      <Flex my={6} minW="100%" minH="10vh" justifyContent="space-around">
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
        <Heading textAlign="center" fontFamily="'Londrina Solid', cursive">
          Typing Test
        </Heading>
        <Button
          as="a"
          href="/signup"
          mb={6}
          fontFamily="'Baloo 2', cursive"
          disabled={true}
        >
          Signup/Login
        </Button>
      </Flex>

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
          <chakra.span color="black" fontFamily="Poppins">
            {correct}
          </chakra.span>

          <chakra.span color="red" fontFamily="Poppins">
            {incorrect}
          </chakra.span>
          <chakra.span color="gray" fontFamily="Poppins">
            {pointer.current === -1
              ? sentence
              : sentence.substring(pointer.current + 1, sentence.length)}
          </chakra.span>
        </Box>
        <VisuallyHidden>
          <Input
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                reset();
              } else if (event.key === " ") {
                var time = parseInt(moment().format("x"));
                speeds.current.push(time);
              }
            }}
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
      <Modal isOpen={isOpenResult} onClose={onCloseResult}>
        <ResultModal
          dataPoints={dataPoints.current}
          wpm={(wordCount.current / time) * 1000 * 60}
          time={time}
          wordsTyped={wordCount.current}
        />
      </Modal>
      <Text mt={3} fontFamily="'Baloo 2', cursive" fontSize="2xl">
        Press Enter to reset
      </Text>
    </Flex>
  );
};

export default Section1;
