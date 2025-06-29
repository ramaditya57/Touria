import React, { useState, useEffect } from "react";
import { Modal, Input, Upload, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import API from "../services/api";

export default function TourFormModal({
  visible,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
    gallery: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        location: initialData.location || "",
        image: initialData.image || "",
        gallery: initialData.gallery || [],
      });
    } else {
      setForm({
        title: "",
        description: "",
        price: "",
        location: "",
        image: "",
        gallery: [],
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await API.post("/upload/image", formData);
      setForm((prev) => ({ ...prev, image: res.data.file }));
      message.success("Main image uploaded!");
    } catch (err) {
      console.error(err);
      message.error("Image upload failed");
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
      message.success("Gallery image added!");
    } catch (err) {
      console.error(err);
      message.error("Gallery upload failed");
    }
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = form.gallery.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, gallery: updatedGallery }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.location || !form.price) {
      return message.warning("Please fill in all required fields");
    }

    const { _id, ...sanitizedData } = form;
    onSubmit(sanitizedData);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      title={initialData ? "Edit Tour" : "Add New Tour"}
      okText={initialData ? "Update" : "Create"}
      destroyOnClose
    >
      <div className="space-y-4">
        {/* Tour Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Tour Title<span className="text-red-500">*</span>
          </label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter tour title"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Location<span className="text-red-500">*</span>
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
          <label className="block font-medium text-gray-700 mb-1">
            Price (₹)<span className="text-red-500">*</span>
          </label>
          <Input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            type="number"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Description
          </label>
          <Input.TextArea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the tour"
            rows={4}
          />
        </div>

        {/* Main Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Main Image
          </label>
          <Upload customRequest={handleImageUpload} showUploadList={false}>
            <button
              type="button"
              className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-sm flex items-center gap-2"
            >
              <UploadOutlined /> Upload Main Image
            </button>
          </Upload>
          {form.image && (
            <img
              src={form.image}
              alt="Main"
              className="h-32 mt-3 rounded border object-cover"
            />
          )}
        </div>

        {/* Gallery Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
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
