CRM BackEnd on NestJS Description

- Created a new branch for works with user:
  - GET /user - find by email with token Bearer;
  - POST /user - create user { name, email } public branch;
  - PUT /user - update user find by email with token Bearer;
  - DELETE /user - delete user find by email with token Bearer;
  - User Data returned without key password and token;
- Object User: name, email, password, token, createdOn, updatedOn, role, id (generation on the server) and isVerification (for confirmation user by letter on email);

- Create DataBase PostgreSQL on AWS;
- Connection NestJS with PostgreSQL AWS;
- Created a new table for Users;

- Added a new global middleware for the action logger;
- Added a new exception filter for catch Http Error;
- Added a new Auth Guard for all branch and add check public branch;
- Added hashing password user and compared password pre-login;

Stack: NestJs, Prisma and AWS PostgreSQL