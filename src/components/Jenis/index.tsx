import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import styles from "./Jenis.module.scss";
import { useJenisStore } from "../../store/jenisStore";
import { useAuth } from "../../store/authStore";
import { usePaginationStore } from "../../store/paginationStore";
import { Pagination } from "../core/Pagination";

type JenisType = {
  id?: string;
  name: string;
};

type JenisForm = {
  name: string;
};

export const Jenis: React.FC = () => {
  const jenis = useJenisStore((state) => state.Jenis);
  const getJenis = useJenisStore((state) => state.getJenis);
  const addJenis = useJenisStore((state) => state.addJenis);
  const updateJenis = useJenisStore((state) => state.updateJenis);
  const deleteJenis = useJenisStore((state) => state.deleteJenis);
  const { token } = useAuth();
  const { page } = usePaginationStore();
  const [formData, setFormData] = useState<JenisForm>({ name: "" });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    getJenis();
  }, [getJenis]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editMode) {
      await updateJenis(editId, formData, token as string);
    } else {
      await addJenis(formData, token as string);
    }
    setFormData({ name: "" });
    setEditMode(false);
    getJenis();
  };

  const handleEdit = (id: string, name: string) => {
    setEditId(id);
    setFormData({ name });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteJenis(id, token as string);
    getJenis();
  };

  const totalPages = Math.ceil(jenis.length / 5);

  const getVisibleItems = () => {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    return jenis.slice(startIndex, endIndex);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jenis Tanaman</h1>
      <button className={styles.addButton} onClick={() => setShowForm(true)}>
        <FaPlus />
      </button>
      {showForm && (
        <div className={styles.modal}>
          <form className={styles.modalContent} onSubmit={handleSubmit}>
            <span
              className={styles.closeButton}
              onClick={() => setShowForm(false)}>
              &times;
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan Jenis Tanaman"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              {editMode ? "Update" : "Tambah"}
            </button>
          </form>
        </div>
      )}
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>No</th>
            <th className={styles.tableHeader}>Jenis Tanaman</th>
            <th className={styles.tableHeader}>Aksi</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {getVisibleItems().map((item: JenisType, index: number) => (
            <tr key={item.id}>
              <td className={styles.tableData}>{index + 1 + (page - 1) * 5}</td>
              <td className={styles.tableData}>{item.name}</td>
              <td className={styles.tableData}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(item.id as string, item.name)}>
                  <FaEdit />
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item.id as string)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </div>
  );
};
