import { ChangeEvent, useState } from 'react';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  ChakraProvider,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import '../login/base.css';

import axios from 'axios';
import { redirect } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const toast = useToast();

  const signUpHandle = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post('http://localhost:4001/register', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      toast({
        title: 'You have been registered',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data);

      redirect('/');
    } catch (data: any) {
      if (data.response.data.error) {
        toast({
          title: data.response.data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Flex height='100%' align={'center'} justify={'center'}>
        {isLoading && (
          <Flex
            position='absolute'
            top={0}
            background='rgba(0, 0, 0, 0.7)'
            height='100%'
            width='100%'
            zIndex={2}
            alignItems='center'
            justifyContent='center'
          >
            <Spinner size='xl' />
          </Flex>
        )}
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box rounded={'lg'} bg={'gray.700'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id='firstName'>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type='text'
                      value={firstName}
                      onInput={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id='lastName'>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type='text'
                      value={lastName}
                      onInput={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button variant={'ghost'} onClick={() => setShowPassword(showPassword => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={signUpHandle}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};

export default SignUp;
