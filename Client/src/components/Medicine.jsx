import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMedicines,
  // addMedicine,
  // updateMedicineInStore,
  // removeMedicine,
} from "../slices/medicineSlice";
import {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  getMedicineById,
} from "../services/api";
import Navbar from "./NavBar";
import { setLoading } from "../slices/globalSlice";

const Medicine = () => {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines.medicines);
  const loading = useSelector((state) => state.global.loading);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [scheduleTimes, setScheduleTimes] = useState([""]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getMedicines();
        dispatch(setMedicines(response.data));
      } catch (error) {
        setError("Failed to fetch medicines. Please try again.");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMedicines();
  }, [dispatch]);

  const resetForm = () => {
    setName("");
    setDosage("");
    setScheduleTimes([""]);
    // setEditingId(null);
  };
  const showTemporaryMessage = (setMessage) => {
    setTimeout(() => {
      setMessage("");
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

  const handleAddMedicine = async () => {
    // e.preventDefault();
    setError("");
    if (!name || !dosage || !scheduleTimes) {
      showTemporaryMessage("name dosage and scheduled times are required.");
      return;
    }
    try {
      const schedule = scheduleTimes.map((time) => new Date(time.trim()));
      const medicineData = { name, dosage, scheduleTime: schedule };
      await createMedicine(medicineData);
      // dispatch(addMedicine(response.data));
      resetForm();
      setSuccess("Medicine Added");
      showTemporaryMessage(setSuccess);
      const response = await getMedicines();
      dispatch(setMedicines(response.data));
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Failed to add medicine. Please try again."
      );
      showTemporaryMessage(setError);
    }
  };

  // const handleEditMedicine = (id) => {
  //   setEditingId(id);
  //   const medicineToEdit = medicines.find((medicine) => medicine._id === id);
  //   setName(medicineToEdit.name);
  //   setDosage(medicineToEdit.dosage);
  //   setScheduleTimes(
  //     medicineToEdit.scheduleTime.map(
  //       (time) => new Date(time).toLocaleString("en-GB").split("T")[0]
  //     )
  //   );
  // };

  // const handleUpdateMedicine = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     const schedule = scheduleTimes.map((time) => new Date(time.trim()));
  //     const updatedMedicine = { name, dosage, scheduleTime: schedule };
  //     const response = await updateMedicine(editingId, updatedMedicine);
  //     dispatch(updateMedicineInStore(response.data));
  //     resetForm();
  //     setSuccess("Medicine updated successfully");
  //     showTemporaryMessage(setSuccess);
  //   } catch (error) {
  //     console.error("Failed to update medicine:", error);
  //     setError(
  //       error.response?.data?.message ||
  //         "Failed to update medicine. Please try again."
  //     );
  //     showTemporaryMessage(setError);
  //   }
  // };

  const handleUpdateMedicine = async (id) => {
    // e.preventDefault();
    setError("");
    if (!name || !dosage || !scheduleTimes) {
      showTemporaryMessage("name dosage and scheduled times are required.");
      return;
    }

    try {
      const schedule = scheduleTimes.map((time) => new Date(time.trim()));
      await updateMedicine(id, { name, dosage, scheduleTime: schedule });
      resetForm();
      setSuccess("Medicine updated successfully.");
      showTemporaryMessage(setSuccess);
      const response = await getMedicines();
      dispatch(setMedicines(response.data));
    } catch (error) {
      // console.error("Failed to update medicine:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update medicine. Please try again."
      );
      showTemporaryMessage(setError);
    }
  };

  // const handleDeleteMedicine = async (id) => {
  //   try {
  //     await deleteMedicine(id);
  //     dispatch(removeMedicine(id));
  //     setSuccess("Medicine deleted successfully");
  //     showTemporaryMessage(setSuccess);
  //   } catch (error) {
  //     // console.error("Failed to delete medicine:", error);
  //     setError(
  //       error.response?.data?.message ||
  //         "Failed to delete medicine. Please try again."
  //     );
  //     showTemporaryMessage(setError);
  //   }
  // };

  const handleDeleteMedicine = async (id) => {
    try {
      await deleteMedicine(id);
      const response = await getMedicines();
      dispatch(setMedicines(response.data));
      setError("");
      setSuccess("Medicine deleted successfully.");
      showTemporaryMessage(setSuccess);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete medicine. Please try again."
      );
      showTemporaryMessage(setError);
    }
  };

  const handleFetchMedicineById = async (id) => {
    // console.log(id);
    try {
      const medicine = await getMedicineById(id);
      // console.log(medicine.data);
      setSelectedMedicine(medicine.data);
      setName(medicine.data.name);
      setDosage(medicine.data.dosage);
      setError("");
    } catch (error) {
      setError("Failed to fetch medicine details. Please try again.");
      showTemporaryMessage(setError);
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <div className="w-[100px] h-[100px] border-8 border-t-8 border-r-blue-500 border-t-green-500 border-l-rose-500 border-solid rounded-full animate-spin"></div>
        <p className="text-md m-2 text-black">
          Establishing connection, please wait...
        </p>
      </section>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 mt-14 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Medicine Schedule</h2>
        <div className="mb-4 flex flex-col">
          <input
            type="text"
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded py-2 px-3 mb-2"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="border rounded py-2 px-3 mb-2"
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
            onClick={
              selectedMedicine
                ? () => handleUpdateMedicine(selectedMedicine._id)
                : handleAddMedicine
            }
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            {selectedMedicine ? "Update Medicine" : "Create Medicine"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {!error && success && (
            <p className="text-green-500 mt-2">{success}</p>
          )}
        </div>
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
                    onClick={() => handleFetchMedicineById(medicine._id)}
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

export default Medicine;
