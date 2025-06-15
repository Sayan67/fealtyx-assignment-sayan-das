import { Task, useTaskStore } from "@/store/useTaskStore";
import React from "react";
import styled from "styled-components";

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskCard = styled.div`
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

function TaskListComp({ tasks }: { tasks: Task[] }) {
  return (
    <TaskList>
      {tasks.map((task) => (
        <TaskCard key={task.id}>
          <h3 style={{ fontWeight: 600 }}>{task.title}</h3>
          <p>{task.description}</p>
          <small>
            Status: {task.status} | Priority: {task.priority}
          </small>
        </TaskCard>
      ))}
    </TaskList>
  );
}

export default TaskListComp;
