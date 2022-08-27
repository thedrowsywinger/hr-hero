const { sequelize, DataTypes } = require("../config/sequelize");
const { ELeaveStatus } = require("../utils/constants");

const LeaveLogs = sequelize.define("LeaveLogs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: ELeaveStatus.PENDING
  },
});

module.exports = {
  LeaveLogs
}