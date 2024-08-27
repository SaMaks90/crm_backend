CRM BackEnd on NestJS Description

- Created a new branch for works with user:
  - GET /user - find by email with token Bearer;
  - POST /user - create user { name, email } public branch;
  - PUT /user - update user find by email with token Bearer;
  - DELETE /user - delete user find by email with token Bearer;
  - User Data returned without key password and token;
- Object User: name, email, password, token, createdOn, updatedOn, role, id (generation on the server) and isVerification (for confirmation user by letter on email);

- Created a new branch for works with customer with token Bearer:
  - GET /customer/:id - find by id;
  - GET /customer - all customer;
  - POST /customer - create customer;
  - PUT /customer/:id - update customer find by id;
  - DELETE /customer/:id - delete customer find by id;
- Object Customer: id, name, created_on, updated_on, individual_tax_number, tax (ZERO - 0%, SEVEN - 7% AND TWENTY - 20%), email, phone, comment, type (IE and LLC) and inactive;

- Created a new branch for works with item with token Bearer:
  - GET /item/:id - find by item;
  - GET /item - all item;
  - POST /item - create item;
  - PUT /item/:id - update item find by id;
  - DELETE /item/:id - delete item find by id;
- Object Item: id, name, created_on, updated_on, default_tax (ZERO - 0%, SEVEN - 7% AND TWENTY - 20%) and description;

- Create DataBase PostgreSQL on AWS;
- Connection NestJS with PostgreSQL AWS;
- Created a new table for Users;
- Created a new table for Customer;

- Added a new global middleware for the action logger;
- Added a new exception filter for catch Http Error;
- Added a new Auth Guard for all branch and add check public branch;
- Added hashing password user and compared password pre-login;

Stack: NestJs, Prisma and AWS PostgreSQL