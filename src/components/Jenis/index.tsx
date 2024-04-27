import React, { useState, useEffect } from "react";
import styles from "./Jenis.module.scss";
import { useJenisStore } from "../../store/jenisStore";
import { useAuth } from "../../store/authStore";

type JenisType = {
  id?: string;
  name: string;
};

type JenisForm = {
  name: string;
};

export const Jenis: React.FC = () => {
  const jenis = useJenisStore((state) => state.Jenis);
  console.log(jenis);
  const getJenis = useJenisStore((state) => state.getJenis);
  const addJenis = useJenisStore((state) => state.addJenis);
  const updateJenis = useJenisStore((state) => state.updateJenis);
  const deleteJenis = useJenisStore((state) => state.deleteJenis);
  const { token } = useAuth();
  const [formData, setFormData] = useState<JenisForm>({ name: "" });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false); // State untuk mengontrol tampilan form

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jenis Tanaman</h1>
      {showForm && (
        <form className={styles.floatForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan Jenis Tanaman"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {editMode ? "Update" : "Add"}
          </button>
          <button
            className={styles.closeButton}
            onClick={() => setShowForm(false)}>
            Close
          </button>
        </form>
      )}
      {!showForm && (
        <button className={styles.addButton} onClick={() => setShowForm(true)}>
          Add Jenis
        </button>
      )}
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>No</th>
            <th className={styles.tableHeader}>Jenis Tanaman</th>
            <th className={styles.tableHeader}>Action</th>
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {Array.isArray(jenis) &&
            jenis.map((item: JenisType, index: number) => (
              <tr key={item.id}>
                <td className={styles.tableData}>{index + 1}</td>
                <td className={styles.tableData}>{item.name}</td>
                <td className={styles.tableData}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(item.id as string, item.name)}>
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(item.id as string)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jenis;
