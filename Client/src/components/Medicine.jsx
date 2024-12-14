import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} from "../services/api";
import {
  setMedicines,
  addMedicine,
  updateMedicineInStore,
  removeMedicine,
} from "../slices/medicineSlice";
import Navbar from "./NavBar";

const MedicineSchedule = () => {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicine.medicines);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [scheduleTimes, setScheduleTimes] = useState([""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await getMedicines();
        dispatch(setMedicines(response.data));
      } catch (error) {
        setError("Failed to fetch medicines");
        showTemporaryMessage(setError);
      }
    };
    fetchMedicines();
  }, [dispatch]);

  const resetForm = () => {
    setName("");
    setDosage("");
    setScheduleTimes([""]);
    setEditingId(null);
  };

  const showTemporaryMessage = (setter) => {
    setTimeout(() => {
      setter("");
    }, 2000);
  };

  const handleAddScheduleTime = () => {
    setScheduleTimes([...scheduleTimes, ""]);
  };

  const handleScheduleTimeChange = (index, value) => {
    const newScheduleTimes = [...scheduleTimes];
    newScheduleTimes[index] = value;
    setScheduleTimes(newScheduleTimes);
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const schedule = scheduleTimes.map((time) => new Date(time.trim()));
      const newMedicine = { name, dosage, scheduleTime: schedule };
      const response = await createMedicine(newMedicine);
      console.log(response);
      dispatch(addMedicine(response.data));
      resetForm();
      setSuccess("Medicine Added");
      showTemporaryMessage(setSuccess);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add medicine. Please try again."
      );
      showTemporaryMessage(setError);
    }
  };

  const handleEditMedicine = (id) => {
    setEditingId(id);
    const medicineToEdit = medicines.find((medicine) => medicine._id === id);
    setName(medicineToEdit.name);
    setDosage(medicineToEdit.dosage);
    setScheduleTimes(
      medicineToEdit.scheduleTime.map(
        (time) => new Date(time).toLocaleString("en-GB").split("T")[0]
      )
    );
  };

  const handleUpdateMedicine = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const schedule = scheduleTimes.map((time) => new Date(time.trim()));
      const updatedMedicine = { name, dosage, scheduleTime: schedule };
      const response = await updateMedicine(editingId, updatedMedicine);
      dispatch(updateMedicineInStore(response.data));
      resetForm();
      setSuccess("Medicine updated successfully");
      showTemporaryMessage(setSuccess);
    } catch (error) {
      console.error("Failed to update medicine:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update medicine. Please try again."
      );
      showTemporaryMessage(setError);
    }
  };

  const handleDeleteMedicine = async (id) => {
    try {
      await deleteMedicine(id);
      dispatch(removeMedicine(id));
      setSuccess("Medicine deleted successfully");
      showTemporaryMessage(setSuccess);
    } catch (error) {
      // console.error("Failed to delete medicine:", error);
      setError(
        error.response?.data?.message ||
          "Failed to delete medicine. Please try again."
      );
      showTemporaryMessage(setError);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 mt-14 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Medicine Schedule</h2>
        <form
          onSubmit={editingId ? handleUpdateMedicine : handleAddMedicine}
          className="mb-4 flex flex-col"
        >
          <input
            type="text"
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded py-2 px-3 mb-2"
            required
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="border rounded py-2 px-3 mb-2"
            required
          />
          {scheduleTimes.map((time, index) => (
            <input
              key={index}
              type="datetime-local"
              placeholder="Schedule Time"
              value={time}
              onChange={(e) => handleScheduleTimeChange(index, e.target.value)}
              className="border rounded py-2 px-3 mb-2"
              required
            />
          ))}
          <button
            type="button"
            onClick={handleAddScheduleTime}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
          >
            Add Another Schedule Time
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            {editingId ? "Update Medicine" : "Add Medicine"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {!error && success && (
            <p className="text-green-500 mt-2">{success}</p>
          )}
        </form>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Medicine Name</th>
              <th className="border border-gray-300 p-2">Dosage</th>
              <th className="border border-gray-300 p-2">Schedule Time</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td className="border border-gray-300 p-2">{medicine.name}</td>
                <td className="border border-gray-300 p-2">
                  {medicine.dosage}
                </td>
                <td className="border border-gray-300 p-2">
                  {medicine.scheduleTime.map((time, index) => (
                    <div key={index}>
                      {new Date(time).toLocaleString("en-GB")}
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEditMedicine(medicine._id)}
                    className="bg-green-500 m-2 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMedicine(medicine._id)}
                    className="bg-blue-500 m-2 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MedicineSchedule;
