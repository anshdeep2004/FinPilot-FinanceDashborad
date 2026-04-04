import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import Filters from "../components/Filters";
import AddTransaction from "../components/AddTransaction";
import ConfirmDelete from "../components/ConfirmDelete";
import { Plus, FileDown } from "lucide-react";

const Transaction = () => {
  
  const role = localStorage.getItem("role") || "admin";

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save to localStorage (IMPORTANT)
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    type: "all",
  });

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  // 🔍 Filtering
  const filteredTransactions = transactions.filter((t) => {
    const search = filters.search.toLowerCase();

    const matchesSearch =
      t.description.toLowerCase().includes(search) ||
      t.category.toLowerCase().includes(search) ||
      t.type.toLowerCase().includes(search);

    const matchesCategory =
      filters.category === "all" ||
      t.category.toLowerCase() === filters.category;

    const matchesType =
      filters.type === "all" ||
      t.type.toLowerCase() === filters.type;

    return matchesSearch && matchesCategory && matchesType;
  });

  // ➕ Add / Edit
  const handleSave = (data) => {
    if (role !== "admin") return;
    if (editData) {
      // ✅ EDIT using ID
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editData.id ? { ...data, id: editData.id } : t
        )
      );
      setEditData(null);
    } else {
      // ✅ ADD with unique ID
      const newTransaction = {
        ...data,
        id: Date.now(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }
    setShowModal(false);
  };

  // ✏️ Edit click
  const handleEdit = (t) => {
    setEditData(t);
    setShowModal(true);
  };

  // 🗑 Delete click
  const handleDelete = (t) => {
    setDeleteData(t);
  };

  // ✅ Confirm delete using ID
  const confirmDelete = () => {
    if (role !== "admin") return;
    setTransactions((prev) =>
      prev.filter((t) => t.id !== deleteData.id)
    );
    setDeleteData(null);
  };

  // 📥 CSV Export
  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];

    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className="px-6 flex flex-col gap-4 pb-10 dark:bg-gray-950 py-4">

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleExportCSV}
          className="group flex items-center gap-2 bg-white text-gray-600 dark:bg-gray-200 
          border border-gray-300 px-6 py-2 rounded-lg hover:bg-orange-500 text-sm dark-text-gray-300
          hover:text-white transition-colors duration-200 dark:border-gray-700"
        >
          <FileDown size={16} className="group-hover:text-white" />
          Export CSV
        </button>

        {role === "admin" && (
          <button
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
            className="bg-green-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* List */}
      <TransactionList
        transactions={filteredTransactions}
        onEdit={role === "admin" ? handleEdit : null}
        onDelete={role === "admin" ? handleDelete : null}
      />

      {/* Modals */}
      {showModal && (
        <AddTransaction
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editData={editData}
        />
      )}

      {deleteData && (
        <ConfirmDelete
          onConfirm={confirmDelete}
          onCancel={() => setDeleteData(null)}
        />
      )}
    </div>
  );
};

export default Transaction;