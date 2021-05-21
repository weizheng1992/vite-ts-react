import { mock, resultSuccess, resultError } from '../config';

function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Admin',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      desc: 'tester',
      token: 'fakeToken2',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

mock.mock('/basic-api/login', 'post', ({ body }) => {
  const { username, password } = JSON.parse(body);
  const checkUser = createFakeUserList().find(
    (item) => item.username === username && password === item.password
  );
  if (!checkUser) {
    return resultError('Incorrect account or password！');
  }
  const { userId, username: _username, token, realName, desc, roles } = checkUser;
  return resultSuccess({
    roles,
    userId,
    username: _username,
    token,
    realName,
    desc,
  });
});

mock.mock('/basic-api/token/refresh', 'post', () => {
  return resultSuccess({
    userId: '1',
    username: 'admin',
    realName: 'Admin',
    desc: 'manager',
    password: '123456',
    token: 'fakeToken1',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super',
      },
    ],
  });
});
