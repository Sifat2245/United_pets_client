import React, { use, useState } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

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

const AddPet = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [customCategory, setCustomCategory] = useState("");
  const [vaccinated, setVaccinated] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

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
      console.log(res.data);
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
      addedTime: new Date().toISOString(),
      adoptionStatus: "Not Adopted",
      addedBy: user.email,
    };

    //store in db

    axiosSecure.post("/pets", petData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your pet has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Pet updated:", res.data);
        reset();
        navigate('/dashboard/my-pets')
        setImageUrl(null);
        setSelectedCategory(null);
        setCustomCategory("");
        editor?.commands.setContent("");
      }
    });
  };

  const btn = (isActive) =>
    `px-2 py-1 text-sm rounded-sm ${
      isActive ? "bg-gray-300 text-black" : "hover:bg-gray-100"
    }`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
        Add a Pet
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Provide details to help someone adopt your pet.
      </p>

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
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
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
                onClick={() => editor.chain().focus().toggleUnderline().run()}
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
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                • List
              </button>
              <button
                type="button"
                className={btn(editor?.isActive("orderedList"))}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                1. List
              </button>
              <button
                type="button"
                className={btn(editor?.isActive("blockquote"))}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
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
          Submit Pet
        </button>
      </form>
    </div>
  );
};

export default AddPet;
