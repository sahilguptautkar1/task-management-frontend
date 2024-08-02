import React, { useState } from "react";
import { ListItem, ListItemText, Button, Box, Snackbar, Alert } from "@mui/material";
import { Task } from "../types";
import styled from "@emotion/styled";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const CustomButton = styled(Button)({
  backgroundColor: "#B054F8",
  border: "2px solid #7A46AD",
  borderRadius: 10,
  marginTop: "20px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#4E3562",
  },
});

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleCancelClick = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDelete = () => {
    try {
      onDelete(task._id);
    } catch (err) {
      setError("Failed to delete the task. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 5,
        boxShadow: " 0px 0px 0px 1px rgba(0, 0, 0, 0.2)",
        m: 1,
      }}
    >
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <ListItemText
          primary={task.title}
          secondary={`${task.description} - Status: ${task.status}`}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {confirmDelete ? (
            <>
              <CustomButton
                size="medium"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                aria-label="confirm"
                onClick={handleConfirmDelete}
              >
                OK
              </CustomButton>
              <CustomButton
                size="medium"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                aria-label="cancel"
                onClick={handleCancelClick}
              >
                Cancel
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton
                size="small"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                aria-label="edit"
                onClick={() => onEdit(task)}
              >
                Edit
              </CustomButton>
              <CustomButton
                size="small"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                aria-label="delete"
                onClick={handleDeleteClick}
              >
                Delete
              </CustomButton>
            </>
          )}
        </Box>
      </ListItem>

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
    </Box>
  );
};

export default TaskItem;
