import { afterAll, beforeAll, expect, test } from 'vitest';
import request from 'supertest';

import { app } from '../src/app';

beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  await app.close()
})

// -> Descrição
test('user can create a new transaction', async () => {
  // -> Simulação de cenário e Execução
  const response = await request(app.server)
    .post('/transactions')
    .send({
      title: 'New Transaction',
      amount: 5000,
      type: 'credit',
    })

  // -> Validação
  expect(response.statusCode).toEqual(201)
});