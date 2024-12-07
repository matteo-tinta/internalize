import test, { expect } from "@playwright/test";
import DB from "../../db";
import seed from "./_seed/userId-without-roles.json";

const consumerPublicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyH6PYdWZ6tBrPMI9vtdr
WA7gp750KBD5h37o3f0hcmuM7rlHRCzUlKddgtZN5UNJCJ3Wfe9rGuAMIY9CQWGl
pIW30AWTHbrJ9RnZ42utcN7wJA4zbEXmHOIfYS8YURme4XsCphhIeO26SrPql+5p
EGRoyKMpyOKdvjvF4q7pYpJObZF2/HcBivfhrqypgnSrwG4UpVTvpEQUKedLLe+v
46AfrlEBSJzRdKqYpsrt2kMBP8SriULwYXgIA7nhQB/j8KoZVVAxiBds1fiKdlVd
nUDZhbssXYTTXxGjFnTuEo3tW13qISVDLN5dS0bo7RTyWRlEmoK8o+pyBdHOItFN
3ECZnfGsT709DoOTE731ZSTDGdSSrSHA77W3Khe172mjaFtc8TK5XlCwyoKSeWZw
LmStnXKsVB5YojX8YoGXvIvsc9+dI6kLW9+f2G8Mx1CYt1FB7uZFQlMqIa+WvYJs
sXri4vFHIK3D3FY6b1OPCCdjyDKvN4NW+Pjwbc3XcsXnXjd25zzpB9eMWRea5rsz
1FYSADoxq9vwJmCiVxlelFLIwdt9ut+XkyvUALQohIB9MmVe7tx/hS3+Hf8j7veE
ZVYWGFgXmQxVmXUSC++DWc4lS5J8rBmWp9gdsF9QSbgpIpPv5+24hCPqlWCLQq2D
8jEWlnSSohC3jQ0e6RgPEzsCAwEAAQ==
-----END PUBLIC KEY-----`
const interrogationUrl = `/users/api?interrogate=http://localhost:3004/decode`;

test.afterEach(async () => {
  await DB.cleanup();
});

test("Should ignore crypto if PUBLIC_KEY is not passed", async ({
  request,
}) => {
  await DB.seed("users", seed);

  const fetchRequest = request.get(interrogationUrl, {
    headers: {
      userid: "userId",
    }
  });
  const responseStatus = await fetchRequest;

  expect(responseStatus.ok()).toBeTruthy();
  expect(responseStatus.headers()["content-type"]).toBe("application/json");

  const result = await responseStatus.json();

  expect(result).toMatchObject({
    userId: "userId",
    roles: [],
  });

});

test("Should create user with roles if not exist (seed)", async ({
  request,
}) => {
  const userId = "userId"
  const roles = [
    { _id: DB.generateObjectId(), name: "role1" },
    { _id: DB.generateObjectId(), name: "role2" }
  ]

  await DB.seed("users", [
    { _id: DB.generateObjectId(), userId: userId, roles: roles.map(r => r._id) }
  ]);

  await DB.seed("roles", roles);

  const fetchRequest = request.get(interrogationUrl, {
    headers: {
      userid: userId,
      roles: JSON.stringify(roles.map(r => r.name))
    }
  });

  const responseStatus = await fetchRequest;

  expect(responseStatus.ok()).toBeTruthy();
  expect(responseStatus.headers()["content-type"]).toBe("application/json");

  const result = await responseStatus.json();

  expect(result).toMatchObject({
    userId: userId,
    roles: roles.map(r => ({
      name: r.name
    })),
  });
});

test("Should create user with roles if not exist (not seeded)", async ({
  request,
}) => {
  const userId = "userId"
  const roles = [
    { _id: DB.generateObjectId(), name: "role1" },
    { _id: DB.generateObjectId(), name: "role2" }
  ]

  const fetchRequest = request.get(interrogationUrl, {
    headers: {
      userid: userId,
      roles: JSON.stringify(roles.map(r => r.name))
    }
  });

  const responseStatus = await fetchRequest;

  expect(responseStatus.ok()).toBeTruthy();
  expect(responseStatus.headers()["content-type"]).toBe("application/json");

  const result = await responseStatus.json();

  expect(result).toMatchObject({
    userId: userId,
    roles: roles.map(r => ({
      name: r.name
    })),
  });
});

test("Should parse with given PUBLIC_KEY and decode with current PRIVATE_KEY", async ({
  request,
}) => {
  await DB.seed("users", seed);

  const fetchRequest = request.get(interrogationUrl, {
    headers: {
      userid: "userId",
      PUBLIC_KEY: consumerPublicKey.replaceAll("\n", "\\n"),
    },
  });

  const responseStatus = await fetchRequest;

  expect(responseStatus.ok()).toBeTruthy();
  expect(responseStatus.headers()["content-type"]).toBe("text/plain");

  const result = await responseStatus.text();

  /** ASSERTING RESPONSE CALLING CONSUMER TO DECODE RESPONSE */
  const decryptionRequest = request.post(`http://localhost:3004/decrypt`, {
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      response: result
    }
  })

  const decryptionResponse = await (await decryptionRequest).json()
  expect(decryptionResponse).toMatchObject({
    userId: "userId",
    roles: [],
  });
});
