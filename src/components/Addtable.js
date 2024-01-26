import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const AddTable = ({ open, handleClose }) => {
  const [tableData, setTableData] = useState({
    restaurantId: "",
    numberOfTables: 1,
    tableDescriptions: Array(1).fill(""),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData({ ...tableData, [name]: value });
  };

  const handleAddTable = async () => {
    try {
      const { restaurantId, tableDescriptions } = tableData;

      for (let i = 0; i < tableDescriptions.length; i++) {
        const tablePosition = tableDescriptions[i];

        // Отправляем запрос на сервер для каждого стола
        await axios.post("http://localhost:5001/api/table/set", {
          table_position: tablePosition,
          restaurant_id: restaurantId,
        });

        console.log(`Стол ${i + 1} добавлен успешно`);
      }

      // Сбросить значения полей после добавления
      setTableData({
        restaurantId: "",
        numberOfTables: 1,
        tableDescriptions: Array(1).fill(""),
      });

      // Закрыть диалоговое окно
      handleClose();
    } catch (error) {
      console.error("Ошибка при добавлении столов", error);

      // Вывести alert с сообщением об ошибке
      alert(
        "Произошла ошибка при добавлении столов. Пожалуйста, повторите попытку."
      );
    }
  };

  const handleNumberOfTablesChange = (e) => {
    const numberOfTables = parseInt(e.target.value, 10) || 1;
    setTableData({
      ...tableData,
      numberOfTables,
      tableDescriptions: Array(numberOfTables).fill(""),
    });
  };

  const handleTableDescriptionChange = (index, value) => {
    const updatedTableDescriptions = [...tableData.tableDescriptions];
    updatedTableDescriptions[index] = value;
    setTableData({
      ...tableData,
      tableDescriptions: updatedTableDescriptions,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Добавить стол(ы)</DialogTitle>
      <DialogContent>
        <DialogContentText>Введите данные о столах:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="ID ресторана"
          type="text"
          fullWidth
          name="restaurantId"
          value={tableData.restaurantId}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Количество столов"
          type="number"
          fullWidth
          name="numberOfTables"
          value={tableData.numberOfTables}
          onChange={handleNumberOfTablesChange}
        />
        {Array.from({ length: tableData.numberOfTables }, (_, index) => (
          <TextField
            key={index}
            margin="dense"
            label={`Описание стола ${index + 1}`}
            type="text"
            fullWidth
            value={tableData.tableDescriptions[index]}
            onChange={(e) =>
              handleTableDescriptionChange(index, e.target.value)
            }
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleAddTable} color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTable;
