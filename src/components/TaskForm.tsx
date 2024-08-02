import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";
import { Task } from "../types";

interface TaskFormProps {
  onSave: (task: Task) => void;
  taskToEdit?: Task;
}

const StyledTextField = styled(TextField)({
  background: "#EFF1F5",
  borderRadius: 15,
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#303134",
    },
  },
});

const CustomButton = styled(Button)({
  backgroundColor: "#B054F8",
  border: "2px solid #7A46AD",
  borderRadius: 10,
  marginTop: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#4E3562",
  },
  fontSize: 18,
});

const TaskForm: React.FC<TaskFormProps> = ({ onSave, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"To-Do" | "In Progress" | "Done">("To-Do");
  const [error, setError] = useState<string | null>(null); // Error state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSave({ _id: taskToEdit?._id || "", title, description, status });
      setTitle("");
      setDescription("");
      setStatus("To-Do");
    } catch (err) {
      setError("Failed to save the task. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <StyledTextField
        id="task-title"
        name="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        InputLabelProps={{
          style: {
            color: "#49494B",
            border: 5,
            borderRadius: 13,
            borderColor: "#303134",
          },
        }}
        InputProps={{
          style: {
            color: "#3B3C3F",
            border: 5,
            borderRadius: 13,
            borderColor: "#303134",
          },
        }}
      />
      <StyledTextField
        multiline
        rows={7}
        id="task-description"
        name="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
        InputLabelProps={{
          style: {
            color: "#49494B",
            border: 5,
            borderRadius: 13,
            borderColor: "#303134",
          },
        }}
        InputProps={{
          style: {
            color: "#3B3C3F",
            border: 5,
            borderRadius: 13,
            borderColor: "#303134",
          },
        }}
      />
      <StyledTextField
        id="task-status"
        name="status"
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as "To-Do" | "In Progress" | "Done")}
        required
        fullWidth
        InputLabelProps={{
          style: {
            color: "#49494B",
            border: 5,
            borderRadius: 13,
            borderColor: "#303134",
          },
        }}
        InputProps={{
          style: {
            color: "#3B3C3F",
            border: 5,
            borderRadius: 13,
            borderColor: "#303134",
          },
        }}
      >
        <MenuItem value="To-Do">To-Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </StyledTextField>
      <CustomButton type="submit" fullWidth variant="contained" color="primary">
        {taskToEdit ? "Update Task" : "Add Task"}
      </CustomButton>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default TaskForm;
