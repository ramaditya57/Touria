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
      message.success("Profile image uploaded!");
    } catch (err) {
      console.error(err);
      message.error("Profile upload failed");
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
      return message.warning("Please fill required fields");
    }

    const { _id, ...sanitizedData } = form;
    onSubmit(sanitizedData);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      title={initialData ? "Edit Tour" : "Add Tour"}
      okText={initialData ? "Update" : "Create"}
    >
      <div className="space-y-3">
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tour Title"
        />
        <Input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <Input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
        />
        <Input.TextArea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
        />

        {/* Main Image Upload */}
        <Upload customRequest={handleImageUpload} showUploadList={false}>
          <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            <UploadOutlined /> Upload Profile Image
          </button>
        </Upload>
        {form.image && (
          <img
            src={form.image}
            alt="Main"
            className="h-32 mt-2 rounded border"
          />
        )}

        {/* Gallery Upload */}
        <Upload customRequest={handleGalleryUpload} showUploadList={false}>
          <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            <UploadOutlined /> Upload Gallery Image
          </button>
        </Upload>

        {form.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {form.gallery.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                  title="Remove"
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
