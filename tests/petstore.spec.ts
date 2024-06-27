
const { test, expect } = require('@playwright/test')
const { getPetCreated, getCreateBody, getUpdateBody, getPetSchema } = require('../api/pet')


  test("Create", async({request}) => {

    const body = getCreateBody()

    const responsePetCreated = await request.post('/v2/pet', { data: body })

    expect(responsePetCreated.ok()).toBeTruthy();
    expect(responsePetCreated.status()).toBe(200); 

    const petCreated = await responsePetCreated.json();

    const getResponsePet = await request.get(`/v2/pet/`+petCreated.id);

    expect(getResponsePet.ok()).toBeTruthy();
    expect(getResponsePet.status()).toBe(200);

    const getpetCreated = await getResponsePet.json();

    expect(petCreated.id).toBe(getpetCreated.id);

});

test("Update", async({request}) => {

  const createRequestBody = getCreateBody()

  const responsePetCreated = await request.post('/v2/pet', { data: createRequestBody })

  expect(responsePetCreated.ok()).toBeTruthy();
  expect(responsePetCreated.status()).toBe(200); 

  const petCreated = await responsePetCreated.json();

  const getResponsePet = await request.get(`/v2/pet/`+petCreated.id);

  expect(getResponsePet.ok()).toBeTruthy();
  expect(getResponsePet.status()).toBe(200);

  const getpetCreated = await getResponsePet.json();

  expect(petCreated.id).toBe(getpetCreated.id);

  const updateRequestBody = getUpdateBody(petCreated.id);

  const responsePetUpdated = await request.put('/v2/pet', { data: updateRequestBody })

  expect(responsePetUpdated.ok()).toBeTruthy();
  expect(responsePetUpdated.status()).toBe(200); 

  const getpetUpdated = await responsePetUpdated.json();

  expect(petCreated.id).toBe(getpetUpdated.id);
  expect(updateRequestBody.category.id).toBe(getpetUpdated.category.id);
  expect(updateRequestBody.category.name).toBe(getpetUpdated.category.name);
  expect(updateRequestBody.name).toBe(getpetUpdated.name);

});

test("Delete", async({request}) => {

  const createRequestBody = getCreateBody()

  const responsePetCreated = await request.post('/v2/pet', { data: createRequestBody })

  expect(responsePetCreated.ok()).toBeTruthy();
  expect(responsePetCreated.status()).toBe(200); 

  const petCreated = await responsePetCreated.json();

  const getResponsePet = await request.get(`/v2/pet/`+petCreated.id);

  expect(getResponsePet.ok()).toBeTruthy();
  expect(getResponsePet.status()).toBe(200);

  const getpetCreated = await getResponsePet.json();

  expect(petCreated.id).toBe(getpetCreated.id);

  const responsePetDeleted = await request.delete(`/v2/pet/`+petCreated.id)

  expect(responsePetDeleted.ok()).toBeTruthy();
  expect(responsePetDeleted.status()).toBe(200); 

  const getResponsePetDeleted = await request.get(`/v2/pet/`+petCreated.id);

  expect(getResponsePetDeleted.status()).toBe(404);

});

test("Schema", async({request}) => {

  const body = getCreateBody()

  const responsePetCreated = await request.post('/v2/pet', { data: body })

  expect(responsePetCreated.ok()).toBeTruthy();
  expect(responsePetCreated.status()).toBe(200); 

  const petCreated = await responsePetCreated.json();

  const getResponsePet = await request.get(`/v2/pet/`+petCreated.id);

  expect(getResponsePet.ok()).toBeTruthy();
  expect(getResponsePet.status()).toBe(200);

  const getpetCreated = await getResponsePet.json();

  expect(petCreated.id).toBe(getpetCreated.id);

  const error = getPetSchema.safeParse(petCreated); // Validates userData against userSchema
  
  if (!error.success) {
    console.error(error.error);
  }

  expect(error.success).toBe(true);

});