const { Ajv } = require("ajv");
const { test, expect } = require("@playwright/test");

const ajv = new Ajv();

test("get request", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  console.log(await response.json());

  expect(response.status()).toEqual(200);
  expect(response.ok()).toBeTruthy();
});

test("post request", async ({ request }) => {
  const reqHeaders = {
    accept: "application/json",
  };

  const body = {
    name: "morpheus",
    job: "leader",
  };

  const response = await request.post("https://reqres.in/api/users", {
    headers: reqHeaders,
    data: body,
  });
    
  expect(response.status()).toEqual(201);
  expect(response.ok()).toBeTruthy();

  const resBody = await response.json();
  expect(resBody).toHaveProperty("id");
  expect(resBody).toHaveProperty("createdAt");

  const valid = ajv.validate(
    require("./json-schema/get-user.schema.json"),
    resBody
  );

  if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  expect(valid).toBe(true);
});

test("DELETE request", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  console.log(await response.json());

  expect(response.status()).toEqual(200);
  expect(response.ok()).toBeTruthy();
});

test("PUT request", async ({ request }) => {
  const reqHeaders = {
    accept: "application/json",
  };

  const body = {
    name: "morpheus",
    job: "zion resident",
  };

  const response = await request.get("https://reqres.in/api/users/2");
  const resBody = await response.json();
  console.log(resBody);

  expect(response.status()).toEqual(200);
  expect(response.ok()).toBeTruthy();
});