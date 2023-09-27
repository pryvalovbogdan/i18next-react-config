import { test, expect, request, APIRequestContext } from '@playwright/test';
import { RegistrationReqDTO, RegistrationResDTO } from '../dto/RegistrationDTO';

let context: APIRequestContext;

const requestData: RegistrationReqDTO = {
  first_name: 'Piter',
  last_name: 'Parker',
  email: 'piter@gmail.com',
  password: '123',
};

test.describe('API testing', async () => {
  test.beforeAll(async () => {
    context = await request.newContext({
      baseURL: 'http://localhost:4001/',
    });
  });

  test('expect registration to be success', async () => {
    const response = await context.post('/register', {
      data: { ...requestData, email: Date.now() + 'piter@gmail.com' },
      headers: {
        Accept: 'application/json',
      },
    });

    expect(response.status()).toEqual(201);
    expect(response.statusText()).toEqual('Created');
    expect((await response.json()) as RegistrationResDTO).toHaveProperty('first_name', 'Piter');
  });

  test('should return 409 status that user already exist', async () => {
    const response = await context.post('/register', {
      data: requestData,
      headers: {
        Accept: 'application/json',
      },
    });

    expect(response.status()).toEqual(409);
    expect(response.statusText()).toEqual('Conflict');
    expect(await response.text()).toEqual('User Already Exist. Please Login');
  });
});
