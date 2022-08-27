# HR Hero

## Programming Assignment for Digiqore Systems Ltd.

### Project Setup:

Setting up the Database first:

```sh
sudo -i -u postgres psql
create database hr_hero_db;
create user super_admin with encrypted password 'admin';
grant all privileges on database hr_hero_db to super_admin;
```

Setting up the project:

```sh
git clone https://github.com/thedrowsywinger/hr-hero.git
cd hr-hero.git
yarn
yarn dev
```

##### Running the seeder API first: (This can be automated)

URL (POST REQUEST): 127.0.0.1:3001/api/core/seeder
This API helps in seeding the initial requirement, which is having specific account types and creating a superadmin.
A super admin should have all power, meaning super admin can create managers and employees

###### Account Types:

Super Admin: 1
Manager: 2
Employee 3

##### Register Manager:

A superAdmin can only add a manager.
URL: 127.0.0.1:3001/api/core/register/user-profile/

Sample POST request

```sh
{
    "username": "manager1",
    "password": "Manager1",
    "name": "John Manager",
    "contactNumber": "01789652243",
    "email": "john@hrhero.com",
    "accountType": 2
}
```

Sample Response:

```sh
{
    "message": "Succesful",
    "data": {
        "id": 1,
        "username": "manager1",
        "name": "John Manager",
        "contactNumber": "01789652243",
        "email": "john@hrhero.com",
        "accountType": "Manager"
    }
}
```

##### Register Employee:

A super admin or a manager can add an employee
URL (POST REQUEST): 127.0.0.1:3001/api/core/register/user-profile/
Sample POST request:

```sh
{
    "username": "harryMaguire",
    "password": "Defender1",
    "name": "Harry Maguire",
    "contactNumber": "01789353343",
    "email": "harry@hrhero.com",
    "accountType": 3
}
```

Sample Response:

```sh
{
    "message": "Succesful",
    "data": {
        "id": 17,
        "username": "harryMaguire",
        "name": "Harry Maguire",
        "contactNumber": "01789353343",
        "email": "harry@hrhero.com",
        "accountType": "Employee"
    }
}
```

##### Login:

Authentication is done based on jwt web token and bcryptjs.
URL (POST REQUEST): 127.0.0.1:3001/api/core/login/
Sample POST request:

```sh
{
    "username": "manager1",
    "password": "Manager1"
}
```

Sample Response:

```sh
{
    "message": "Succesful",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwiaWF0IjoxNjYxNjA5MjY1LCJleHAiOjE2NjE2OTU2NjV9.PyKoL6DJyYaNk2q6twAlmivBWzVE8Rbn_2rPKEaClYE",
    "profile": {
        "id": 1,
        "name": "John Manager",
        "contactNumber": "01789652243",
        "email": "john@hrhero.com",
        "createdAt": "2022-08-27T10:01:49.739Z",
        "updatedAt": "2022-08-27T10:01:49.739Z",
        "userId": 1,
        "createdBy": 2,
        "updatedBy": 2
    }
}
```

This access token must be used as "Authorization" Header Key with "jwt" as prefix.
Example:

```sh
Authorization Header: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyIiwiaWF0IjoxNjYxNjAwMDYwLCJleHAiOjE2NjE2ODY0NjB9.DautAcR8nOdT8a2Xfm_j45-cf9CzHNuu2tsVssGFY54
```

##### Check In:

Any Employee can check in , but he/she must be logged in.
URL (POST REQUEST): 127.0.0.1:3001/api/attendance/check-in
Empty POST request
Sample Response:

```sh
{
    "message": "Succesful",
    "data": {
        "id": 1,
        "profileId": 16,
        "checkIn": "2022-08-27T13:17:02.611Z",
        "updatedAt": "2022-08-27T13:17:02.613Z",
        "createdAt": "2022-08-27T13:17:02.613Z",
        "checkOut": null
    }
}
```

##### Check Out:

Any Employee can check in with the following conditions: 1. He/She must be logged in 2. There must be a check in on that day, without a checkout.

URL (POST REQUEST): 127.0.0.1:3001/api/attendance/check-out
Empty POST request
Sample Response:

```sh
{
    "message": "Succesful"
}
```

##### Apply Leave Request:

Any Employee can apply for a leave request with the following conditions: 1. He/She must be logged in

URL (POST REQUEST): 127.0.0.1:3001/api/attendance/check-out
Sample POST request:

```sh
{
    "date": "2022-08-29"
}
```

Sample Response:

```sh
{
    "message": "Succesful",
    "data": {
        "id": 3,
        "profileId": 16,
        "date": "2022-08-29",
        "status": 1,
        "updatedAt": "2022-08-27T14:06:07.565Z",
        "createdAt": "2022-08-27T14:06:07.565Z",
        "managerId": null
    }
}
```

###### Leave Request Statuse:

PENDING: 1
APPROVED: 2
DENIED: 3

##### Process Leave Request:

Only a Manager can apply for a leave request with the following conditions: 1. He/She must be logged in

URL (POST REQUEST): 127.0.0.1:3001/api/attendance/process-leave
Sample POST request:

```sh
{
    "id": 3,
    "status": 3
}
```

Sample Response:

```sh
{
    "message": "Succesful"
}
```

##### Daily Attendance:

URL (GET REQUEST): 127.0.0.1:3001/api/attendance/report/daily
Empty GET request:

Sample Response:

```sh
{
    "message": "Succesful",
    "data": [
        {
            "id": 1,
            "profileId": 16,
            "name": "Scott Mctominay",
            "checkInDate": "2022-08-27",
            "checkInTime": "13:17:02.611",
            "checkOutDate": "2022-08-27",
            "checkOutTime": "13:42:37.038"
        }
    ]
}
```

##### Weekly Attendance:

URL (GET REQUEST): 127.0.0.1:3001/api/attendance/report/weekly
Sample GET request:

```sh
{
    "week": "34"
}
```

Sample Response:

```sh
{
    "message": "Succesful",
    "data": [
        {
            "id": 1,
            "profileId": 16,
            "name": "Scott Mctominay",
            "week": 34,
            "checkInDate": "2022-08-27",
            "checkInTime": "13:17:02.611",
            "checkOutDate": "2022-08-27",
            "checkOutTime": "13:42:37.038"
        }
    ]
}
```

##### Monthly Attendance:

URL (GET REQUEST): 127.0.0.1:3001/api/attendance/report/monthly
Sample GET request:

```sh
{
    "month": "08"
}
```

Sample Response:

```sh
{
    "message": "Succesful",
    "data": [
        {
            "id": 1,
            "profileId": 16,
            "name": "Scott Mctominay",
            "checkInDate": "2022-08-27",
            "checkInTime": "13:17:02.611",
            "checkOutDate": "2022-08-27",
            "checkOutTime": "13:42:37.038"
        }
    ]
}
```

##### Get All Users:

URL (GET REQUEST): 127.0.0.1:3001/api/core/get-users/
EMPTY GET request:

Sample Response:

```sh
{
    "message": "Succesful",
    "data": [
        {
            "id": 2,
            "name": "Super Admin",
            "contactNumber": "01837645524",
            "email": "",
            "createdAt": "2022-08-27T10:08:57.452Z",
            "updatedAt": "2022-08-27T10:08:57.452Z",
            "userId": 2,
            "createdBy": null,
            "updatedBy": null
        },
        {
            "id": 1,
            "name": "John Manager",
            "contactNumber": "01789652243",
            "email": "john@hrhero.com",
            "createdAt": "2022-08-27T10:01:49.739Z",
            "updatedAt": "2022-08-27T10:01:49.739Z",
            "userId": 1,
            "createdBy": 2,
            "updatedBy": 2
        },
        {
            "id": 16,
            "name": "Scott Mctominay",
            "contactNumber": "01789653343",
            "email": "scott@hrhero.com",
            "createdAt": "2022-08-27T12:20:31.003Z",
            "updatedAt": "2022-08-27T12:20:31.003Z",
            "userId": 24,
            "createdBy": 2,
            "updatedBy": 2
        },
        {
            "id": 17,
            "name": "Harry Maguire",
            "contactNumber": "01789353343",
            "email": "harry@hrhero.com",
            "createdAt": "2022-08-27T12:23:02.423Z",
            "updatedAt": "2022-08-27T12:23:02.423Z",
            "userId": 25,
            "createdBy": 2,
            "updatedBy": 2
        }
    ]
}
```

##### Get User by id:

URL (GET REQUEST): 127.0.0.1:3001/api/core/get-user/?id=1

Sample Response:

```sh
{
    "message": "Succesful",
    "data": {
        "id": 1,
        "name": "John Manager",
        "contactNumber": "01789652243",
        "email": "john@hrhero.com",
        "createdAt": "2022-08-27T10:01:49.739Z",
        "updatedAt": "2022-08-27T10:01:49.739Z",
        "userId": 1,
        "createdBy": 2,
        "updatedBy": 2
    }
}
```
