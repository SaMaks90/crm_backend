CRM BackEnd on NestJS Description

- Created a new branch for works with user:
  - GET /user - find by email;
  - POST /user - create user { name, email };
  - PUT /user - update user find by email;
  - DELETE /user - delete user find by email;
- Object User: name, email, id (generation on the server) and isVerification (for confirmation user by letter on email);

- Create DataBase PostgreSQL on AWS;
- Connection NestJS with PostgreSQL AWS;
- Created a new table for Users;

Stack: NestJs, Prisma and AWS PostgreSQL