import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import API from "../services/api";

export default function HotelFormModal({ visible, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    profileImage: "",
    gallery: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        location: initialData.location || "",
        price: initialData.price || "",
        description: initialData.description || "",
        profileImage: initialData.profileImage || "",
        gallery: initialData.gallery || [],
      });
    } else {
      setForm({
        name: "",
        location: "",
        price: "",
        description: "",
        profileImage: "",
        gallery: [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await API.post("/upload/image", formData);
      setForm((prev) => ({ ...prev, profileImage: res.data.file }));
      message.success("Profile image uploaded");
    } catch (err) {
      console.error(err);
      message.error("Failed to upload profile image");
    }
  };

  const handleGalleryUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await API.post("/upload/image", formData);
      setForm((prev) => ({
        ...prev,
        gallery: [...prev.gallery, res.data.file],
      }));
      message.success("Gallery image uploaded");
    } catch (err) {
      console.error(err);
      message.error("Failed to upload gallery image");
    }
  };

  const removeGalleryImage = (index) => {
    const updated = form.gallery.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, gallery: updated }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.location || !form.price) {
      return message.warning("Please fill all required fields");
    }
    onSubmit(form);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      title={initialData ? "Edit Hotel" : "Add New Hotel"}
      okText={initialData ? "Update" : "Create"}
      destroyOnClose
    >
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Hotel Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter hotel name"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <Input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Enter price"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <Input.TextArea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the hotel and facilities"
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Profile Image
          </label>
          <Upload customRequest={handleProfileUpload} showUploadList={false}>
            <button
              type="button"
              className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm flex items-center gap-2"
            >
              <UploadOutlined /> Upload Profile Image
            </button>
          </Upload>
          {form.profileImage && (
            <img
              src={form.profileImage}
              alt="Profile"
              className="h-32 mt-3 rounded border object-cover"
            />
          )}
        </div>

        {/* Gallery Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Gallery Images
          </label>
          <Upload customRequest={handleGalleryUpload} showUploadList={false}>
            <button
              type="button"
              className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm flex items-center gap-2"
            >
              <UploadOutlined /> Upload Gallery Image
            </button>
          </Upload>

          {form.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {form.gallery.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`Gallery ${idx}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:text-red-500"
                    title="Remove"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
