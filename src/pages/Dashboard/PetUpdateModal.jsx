import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";
import Code from "@tiptap/extension-code";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};


const categoryOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Fish", label: "Fish" },
  { value: "Bird", label: "Bird" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Other", label: "Other" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const vaccinationOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const PetUpdateModal = ({ isModalOpen, onModalClose, pet }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [vaccinated, setVaccinated] = useState(null);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (pet) {
      setImageUrl(pet.image || "");
      setSelectedGender(genderOptions.find((g) => g.value === pet.gender));
      setSelectedCategory(
        categoryOptions.find((c) => c.value === pet.category) || {
          value: "Other",
          label: "Other",
        }
      );
      setCustomCategory(
        pet.category !== "Other" ? "" : pet.customCategoryValue
      );
      setVaccinated(vaccinationOptions.find((v) => v.value === pet.vaccinated));

      setValue("name", pet.name);
      setValue("age", pet.age);
      setValue("breed", pet.breed);
      setValue("location", pet.location);
      setValue("shortDescription", pet.shortDescription);
      setValue("longDescription", pet.longDescription);
      editor?.commands.setContent(pet.longDescription || "");
    }
  }, [pet]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2] } }),
      Underline,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Code,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("longDescription", editor.getText());
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pet_image");
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_Cloudinary_cloudname
        }/image/upload`,
        formData
      );
      setImageUrl(res.data.url);
      // console.log(res.data);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const onSubmit = (data) => {
    const petData = {
      ...data,
      image: imageUrl,
      gender: selectedGender?.value,
      category:
        selectedCategory?.value === "Other"
          ? customCategory
          : selectedCategory?.value,
      vaccinated: vaccinated?.value,
      updatedAt: new Date().toISOString(),
    };

    //update
    axiosSecure
      .put(`/pets/${pet._id}`, petData)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Information Updated",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            onModalClose();
            setImageUrl(null);
            setSelectedCategory(null);
            setCustomCategory("");
            editor?.commands.setContent("");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Update failed:", error);
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Something went wrong!",
        });
      });
  };

  const btn = (isActive) =>
    `px-2 py-1 text-sm rounded-sm ${
      isActive ? "bg-gray-300 text-black" : "hover:bg-gray-100"
    }`;

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center overflow-auto bg-black/50 p-4"
      >
        <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg relative p-6 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onModalClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          >
            <X></X>
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-4">
            Update Pet Information
          </h2>

          {/* Your Form Here */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Pet Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm border rounded px-3 py-2"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Pet"
                  className="mt-2 w-40 h-40 object-cover rounded border"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Pet Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Pet Age
                </label>
                <input
                  type="text"
                  {...register("age", { required: "Age is required" })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Gender
                </label>
                <Select
                  options={genderOptions}
                  value={selectedGender}
                  onChange={(option) => setSelectedGender(option)}
                  placeholder="Select gender"
                  className="text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Pet Category
                </label>
                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={(option) => {
                    setSelectedCategory(option);
                    setCustomCategory("");
                  }}
                  placeholder="Select category"
                  className="text-sm"
                />
                {selectedCategory?.value === "Other" && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    className="mt-2 w-full border px-3 py-2 rounded"
                  />
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Pet Breed
                </label>
                <input
                  type="text"
                  {...register("breed", { required: "Breed is required" })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter breed (e.g., Labrador, Persian, etc.)"
                />
                {errors.breed && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.breed.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  Vaccinated
                </label>
                <Select
                  options={vaccinationOptions}
                  value={vaccinated}
                  onChange={(option) => setVaccinated(option)}
                  placeholder="Select vaccination status"
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Pet Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.location && (
                <p className="text-red-500">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Short Description
              </label>
              <input
                type="text"
                {...register("shortDescription", { required: true })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Long Description
              </label>
              <div className="border rounded bg-white">
                <div className="flex flex-wrap gap-1 p-2 border-b">
                  <button
                    type="button"
                    className={btn(editor?.isActive("bold"))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                  >
                    <b>B</b>
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("italic"))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                  >
                    <i>I</i>
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("underline"))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                  >
                    <u>U</u>
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("code"))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                  >
                    {"<>"}
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("heading", { level: 1 }))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("heading", { level: 2 }))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("bulletList"))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("orderedList"))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                  >
                    1. List
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive("blockquote"))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                  >
                    ❝
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive({ textAlign: "left" }))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                  >
                    🡸
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive({ textAlign: "center" }))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                  >
                    ⎯
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive({ textAlign: "right" }))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                  >
                    🡺
                  </button>
                  <button
                    type="button"
                    className={btn(editor?.isActive({ textAlign: "justify" }))}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      editor.chain().focus().setTextAlign("justify").run()
                    }
                  >
                    ☰
                  </button>
                </div>
                <EditorContent
                  editor={editor}
                  className="p-3 min-h-[160px] focus:outline-none"
                />
                <input type="hidden" {...register("longDescription")} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full hover:cursor-pointer md:w-auto bg-[#018AE0] text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PetUpdateModal;
