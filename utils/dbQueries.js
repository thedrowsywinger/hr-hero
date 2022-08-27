const { AuthUser } = require("../models/core")
const { Profile, ProfileTypeMap } = require("../models/profile")

const registerEmployeeQuery = async (req, res, transaction, accountTypeInstance) => {
  const authUserInstance = await AuthUser.create(
    {
      "username": req.body.username,
      "password": req.body.password
    },
    transaction,
  )

  const userProfileInstance = await Profile.create(
    {
      "name": req.body.name,
      "contactNumber": req.body.contactNumber,
      "email": req.body.email,
      "userId": authUserInstance.id,
      "createdBy": req.userId,
      "updatedBy": req.userId
    },
    transaction,
  )

  const profileAccountTypeMapping = await ProfileTypeMap.create(
    {
      "AccountTypeId": accountTypeInstance.id,
      "ProfileId": userProfileInstance.id
    },
    transaction
  )
}

const attendanceQueries = {
  checkInFindQuery: function (dd, mm, yyyy) {
    const query = `
    select 
      * 
    from public."Attendances" a 
    where 
      to_char(a."checkIn", 'dd') = '${dd}'
      and to_char(a."checkIn", 'mm') = '${mm}'
      and to_char(a."checkIn", 'yyyy') = '${yyyy}'
      and a."checkOut" is null;
    `
    return query
  },
  dailyReport: function (profileId) {
    const query = `
    select 
      a.id,
      p.id as "profileId",
      p."name",
      to_char(a."checkIn", 'yyyy-mm-dd') as "checkInDate",
      a."checkIn"::time as "checkInTime",
      to_char(a."checkOut", 'yyyy-mm-dd') as "checkOutDate",
      a."checkOut"::time as "checkOutTime"
    from public."Attendances" a
    left join public."Profiles" p on p.id = a."profileId"
    where p.id = ${profileId};
    `
    return query
  },
  monthlyReport: function (profileId, month) {
    const query = `
    select 
      a.id,
      p.id as "profileId",
      p."name",
      to_char(a."checkIn", 'yyyy-mm-dd') as "checkInDate",
      a."checkIn"::time as "checkInTime",
      to_char(a."checkOut", 'yyyy-mm-dd') as "checkOutDate",
      a."checkOut"::time as "checkOutTime"
    from public."Attendances" a
    left join public."Profiles" p on p.id = a."profileId"
    where 
      p.id = ${profileId}
      and to_char(a."checkIn", 'mm') = '${month}';
    `
    return query
  }
}

module.exports = {
  registerEmployeeQuery,
  attendanceQueries
}