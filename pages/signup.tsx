import React, { useState, useEffect } from "react";
import { signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "../src/firebase";
import { Flex, Button, Heading, Text, useToast } from "@chakra-ui/react";

const Signup: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  const toast = useToast();
  return (
    <Flex maxW="100vw" minH="100vh" justify="center" align="center" my={10}>
      <Flex
        align="center"
        w="60%"
        h="75%"
        rounded="md"
        bg="gray.700"
        direction="column"
      >
        <Heading
          fontFamily="'Baloo 2', cursive"
          w="full"
          textAlign="center"
          mt={3}
        >
          Signup with Google
        </Heading>
        <Button
          fontFamily="'Baloo 2', cursive"
          _hover={{ bg: "blue.700" }}
          bg="blue.600"
          w="40%"
          onClick={async () => {
            await signInWithPopup(auth, new googleProvider()).catch((error) => {
              toast({
                title: "Error",
                description: "Please try again after some time",
                status: "error",
                isClosable: true,
              });
            });
            setUser(auth.currentUser);
          }}
        >
          Signup with Google
        </Button>
        <Text p={3} maxW="100%">
          {JSON.stringify(user)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Signup;
