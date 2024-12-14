import Medicine from "../models/medicine.model.js";

export const createMedicine = async (req, res) => {
  try {
    // console.log("User ID from request:", req.user.id);
    const medicine = new Medicine({ ...req.body, userId: req.user.id });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(400).json({ error: "Error creating medicine" });
  }
};

export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user.id });
    res.status(200).json(medicines);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    if (medicine.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this medicine" });
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Medicine updated successfully",
      medicine: updatedMedicine,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    if (medicine.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this medicine" });
    }

    await Medicine.findByIdAndDelete(id);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error });
  }
};
