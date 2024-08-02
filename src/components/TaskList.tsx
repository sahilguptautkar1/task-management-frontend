import React from "react";
import { Box, List } from "@mui/material";
import { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => (
  <Box
    sx={{
      background: "white",
      borderRadius: 7,
      boxShadow: " 0px 0px 0px 3px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      overflow: "hidden",
      p: 2.5,
      height: "420px",
      "& .scrollable-content": {
        overflowY: "scroll",
        height: "100%",
        mr: -2.5,
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#9276ab",
          borderRadius: "8px",
        },
      },
    }}
  >
    <List className="scrollable-content" sx={{ pr: 2.5 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task._id)}
        />
      ))}
    </List>
  </Box>
);

export default TaskList;
