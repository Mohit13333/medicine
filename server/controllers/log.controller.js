import Log from "../models/log.model.js";

export const createLog = async (req, res) => {
  try {
    const { medicineId } = req.body;
    const existingLog = await Log.findOne({ medicineId, userId: req.user.id });
    if (existingLog) {
      return res
        .status(400)
        .json({ message: "Log already created for this medicine." });
    }
    const log = new Log({ ...req.body, userId: req.user.id });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find({ userId: req.user.id })
      .populate("medicineId")
      .populate("userId");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLogById = async (req, res) => {
  const { id } = req.params;
  try {
    const log = await Log.findById(id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLog = async (req, res) => {
  const { id } = req.params;
  try {
    const log = await Log.findByIdAndUpdate(id, req.body, { new: true });
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLog = async (req, res) => {
  const { id } = req.params;
  try {
    const log = await Log.findByIdAndDelete(id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
