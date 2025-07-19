import React from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.9, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.2 } },
};

const AdoptModal = ({ isOpen, onClose, pet, onSubmitAdoption }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = React.useContext(AuthContext);

  const onSubmit = (data) => {
    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.image,
      userName: user?.displayName,
      email: user?.email,
      phone: data.phone,
      address: data.address,
      requestDate: new Date().toISOString(),
      status: 'Pending',
      addedBy: pet.addedBy
    };

    onSubmitAdoption(adoptionData);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
          <motion.div
            className="fixed inset-0 bg-black/40"
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <Dialog.Panel as={motion.div}
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>

              <Dialog.Title className="text-xl font-bold mb-4 text-center">
                Adopt {pet.name}
              </Dialog.Title>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">User Name</label>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    disabled
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="w-full px-3 py-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <textarea
                    {...register("address", { required: true })}
                    placeholder="Enter your address"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#018AE0] text-white py-2 rounded hover:bg-[#018AE0]/80 cursor-pointer"
                >
                  Submit Adoption Request
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AdoptModal;
