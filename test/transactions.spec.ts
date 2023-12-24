import { afterAll, beforeAll, expect, it, describe } from 'vitest';
import request from 'supertest';

import { app } from '../src/app';

describe('Transactions', () => {
  beforeAll(async () => {
    app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })
  
  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })
  
    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions',async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })
    
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      })
    ])
  })
})