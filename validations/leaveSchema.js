let yup = require("yup");
const { ELeaveStatus } = require("../utils/constants");
const {
  nameSchema,
} = require("./common");

const processLeaveSchema = yup.object({
  id: yup.number().required(),
  status: yup.number().required().oneOf([...Object.values(ELeaveStatus)].map((value) => Number(value))),
})

const applyLeaveSchema = yup.object({
  date: yup.date().required()
})

module.exports = {
  processLeaveSchema,
  applyLeaveSchema
}