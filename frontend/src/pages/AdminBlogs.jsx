import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import { Modal, Input, message } from "antd";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ title: "", image: "", content: "" });
  const [editId, setEditId] = useState(null);

  const fetchBlogs = () => {
    API.get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await API.delete(`/blogs/${id}`);
        message.success("Blog deleted");
        fetchBlogs();
      } catch (err) {
        console.error(err);
        message.error("Failed to delete blog");
      }
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setForm({ title: blog.title, image: blog.image, content: blog.content });
      setEditId(blog._id);
    } else {
      setForm({ title: "", image: "", content: "" });
      setEditId(null);
    }
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      return message.warning("Title and Content are required");
    }

    try {
      if (editId) {
        await API.put(`/blogs/${editId}`, form);
        message.success("Blog updated");
      } else {
        await API.post("/blogs", form);
        message.success("Blog created");
      }
      setModalVisible(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      message.error("Failed to save blog");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Manage Blogs</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-green-600 !text-white px-4 py-2 rounded"
          >
            + Add Blog
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b">
                  <td className="p-2">{blog.title}</td>
                  <td className="p-2 !space-x-2">
                    <button
                      onClick={() => handleOpenModal(blog)}
                      className="bg-blue-600 !text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 !text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Blog Modal */}
        <Modal
          open={modalVisible}
          title={editId ? "Edit Blog" : "Add Blog"}
          onCancel={() => setModalVisible(false)}
          onOk={handleSubmit}
          okText={editId ? "Update" : "Create"}
        >
          <Input
            className="mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            className="mb-2"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <Input.TextArea
            rows={5}
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </Modal>
      </div>
    </div>
  );
}
