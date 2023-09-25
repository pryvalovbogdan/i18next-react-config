import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

import './base.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const toast = useToast();

  const dispatchToast = (title: string, status?: any) =>
    toast({
      title,
      status: status || 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });

  const logInHandle = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post('http://localhost:4001/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data);

      dispatchToast('Successfully logged');

      navigate('/');
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      if (error.response?.data?.error) {
        dispatchToast(error.response?.data.error, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Flex align='center' justify='center' height='100%'>
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
        <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize='4xl'>Sign in to your account</Heading>
          </Stack>
          <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack direction={{ base: 'column', sm: 'row' }} align='start' justify='space-between'>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.400'}>Forgot password?</Text>
                </Stack>
                <Button
                  bg='blue.400'
                  color='white'
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={logInHandle}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
