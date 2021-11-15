import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalHeader,
  Flex,
  Button,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ResultModal: React.FC<{
  dataPoints: { name: string; speed: number }[];
  wpm: number;
  time: number;
  wordsTyped: number;
}> = ({ dataPoints, wpm, time, wordsTyped }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent minH="60vh" minW="70vw">
        <ModalHeader textAlign="center" fontFamily="'Baloo 2', cursive">
          Result
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="column"
            w="full"
            h="full"
            justify="center"
            align="center"
          >
            <LineChart
              width={700}
              height={350}
              style={{ color: "black" }}
              data={dataPoints}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="speed"
                strokeWidth="2px"
                stroke="#05668d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
            <Flex direction="column" my={5} align="center">
              <Text fontFamily="'Baloo 2', cursive" fontSize="2xl">
                Average Words Per Minute: {Math.round(wpm)}
              </Text>
              <Text fontFamily="'Baloo 2', cursive" fontSize="2xl">
                Time taken in seconds: {Math.round(time / 1000)}
              </Text>
              <Text fontFamily="'Baloo 2', cursive" fontSize="2xl">
                Words Typed: {wordsTyped}
              </Text>
              <Button mt={3} variant="ghost" maxW="55%" bg="gray.600">
                Save to Profile
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </>
  );
};
export default ResultModal;
