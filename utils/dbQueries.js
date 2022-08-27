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
  }
}

module.exports = {
  registerEmployeeQuery,
  attendanceQueries
}