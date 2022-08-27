const { sequelize } = require("../config/sequelize");

const { QueryTypes } = require("sequelize");
const { StatusCodes: EHttpStatusCodes } = require("http-status-codes");

const { AuthUser } = require("../models/core");
const { AccountType } = require("../models/accountType");
const { Profile, ProfileTypeMap } = require("../models/profile");

const ApiResponseMessages = require("../utils/apiResponseMessages");
const { EAccountTypes, ELeaveStatus } = require("../utils/constants");
const { Attendance } = require("../models/attendance");
const { attendanceQueries } = require("../utils/dbQueries");
const { LeaveLogs } = require("../models/leaveLogs");

const checkInController = async (req, res) => {
  try {

    var checkInEntry = {
      profileId: req.profileId,
      checkIn: new Date()
    }
    const entryInstance = await Attendance.create(checkInEntry)
    return res.status(EHttpStatusCodes.ACCEPTED).send(
      {
        "message": ApiResponseMessages.SUCCESS,
        "data": entryInstance
      }
    )

  } catch (e) {
    return res.status(EHttpStatusCodes.BAD_REQUEST).send(
      {
        "message": ApiResponseMessages.SYSTEM_ERROR
      }
    )
  }
}

const checkOutController = async (req, res) => {
  try {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const checkInInstance = await sequelize.query(attendanceQueries.checkInFindQuery(dd, mm, yyyy), { type: QueryTypes.SELECT });

    if (checkInInstance.length === 0) {
      return res.status(EHttpStatusCodes.BAD_REQUEST).send(
        {
          "message": ApiResponseMessages.NO_CHECK_IN_TODAY
        }
      )
    }

    const checkOutEntry = await Attendance.update(
      {
        checkOut: today
      },
      {
        where: {
          id: checkInInstance[0].id
        }
      }
    )

    return res.status(EHttpStatusCodes.ACCEPTED).send(
      {
        "message": ApiResponseMessages.SUCCESS,
      }
    )


  } catch (e) {
    return res.status(EHttpStatusCodes.BAD_REQUEST).send(
      {
        "message": ApiResponseMessages.SYSTEM_ERROR
      }
    )
  }
}

const applyLeaveController = async (req, res) => {
  try {
    const body = req.body;
    const entry = {
      profileId: req.profileId,
      date: body.date,
      status: ELeaveStatus.PENDING
    }
    console.log(entry)
    const leaveEntry = await LeaveLogs.create(entry);
    return res.status(EHttpStatusCodes.ACCEPTED).send(
      {
        "message": ApiResponseMessages.SUCCESS,
      }
    )

  } catch (e) {
    return res.status(EHttpStatusCodes.BAD_REQUEST).send(
      {
        "message": ApiResponseMessages.SYSTEM_ERROR
      }
    )
  }
}

const processLeaveController = async (req, res) => {
  try {

    const body = req.body;
    const leaveInstance = await LeaveLogs.findOne({ where: { id: body.id } });
    if (!leaveInstance) {
      return res.status(EHttpStatusCodes.BAD_REQUEST).send(
        {
          "message": ApiResponseMessages.INVALID_LEAVE
        }
      )
    }
    const leaveStatusUpdate = await LeaveLogs.update(
      {
        status: body.status,
        managerId: req.profileId
      },
      {
        where: { id: leaveInstance.id }
      }
    )
    return res.status(EHttpStatusCodes.ACCEPTED).send(
      {
        "message": ApiResponseMessages.SUCCESS,
      }
    )

  } catch (e) {
    return res.status(EHttpStatusCodes.BAD_REQUEST).send(
      {
        "message": ApiResponseMessages.SYSTEM_ERROR
      }
    )
  }
}

const attendanceReportDailyController = async (req, res) => {
  try {

    const checkInInstance = await sequelize.query(attendanceQueries.dailyReport(req.profileId), { type: QueryTypes.SELECT });
    if (!checkInInstance) {
      return res.status(EHttpStatusCodes.BAD_REQUEST).send(
        {
          "message": ApiResponseMessages.NO_ATTENDANCE
        }
      )
    }
    return res.status(EHttpStatusCodes.ACCEPTED).send(
      {
        "data": checkInInstance
      }
    )


  } catch (e) {
    return res.status(EHttpStatusCodes.BAD_REQUEST).send(
      {
        "message": ApiResponseMessages.SYSTEM_ERROR
      }
    )
  }
}

module.exports = {
  checkInController,
  checkOutController,
  applyLeaveController,
  processLeaveController,
  attendanceReportDailyController
}