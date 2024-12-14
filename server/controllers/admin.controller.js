import Log from "../models/log.model.js";
import User from "../models/user.model.js";

export const adminPanel = async (req, res, next) => {
  try {
    const users = await User.find().select({ password: 0 });
    if (!users || users.length == 0) {
      return res.status(404).json({ message: "No users found !" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
export const getFilteredLogs = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;
    const query = {};

    if (userId) {
      query.userId = userId;
    }

    if (startDate || endDate) {
      query.timestamp = {};

      if (startDate) {
        query.timestamp.$gte = new Date(startDate);
      }
      if (endDate) {
        query.timestamp.$lte = new Date(endDate);
      }
    }

    const logs = await Log.find(query)
      .populate("medicineId")
      .populate("userId");

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
