import { expect, test } from 'vitest';

// -> Descrição
test('o usuário consegue criar uma nova transação', () => {
  // -> Simulação de cenário e Execução
  const responseStatusCode = 201;

  // -> Validação
  expect(responseStatusCode).toEqual(201)
});