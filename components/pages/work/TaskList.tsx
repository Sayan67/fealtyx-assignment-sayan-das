import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { Task, useTaskStore } from "@/store/useTaskStore";
import React from "react";
import styled from "styled-components";
import { Clock, Check, Ban, RefreshCw, Play, Pause, Edit2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { EditTaskForm } from "./EditTaskForm";

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const TaskCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaecef;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TaskTitle = styled.h3`
  font-weight: 600;
  font-size: 1.125rem;
  color: #111827;
  margin: 0;
`;

const TaskDescription = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const TaskMetadata = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const TaskStatus = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.75rem;
  background: ${({ status }) => {
    switch (status) {
      case "Open":
        return "#dbeafe";
      case "In Progress":
        return "#fef9c3";
      case "Pending Approval":
        return "#fef3c7";
      case "Closed":
        return "#dcfce7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case "Open":
        return "#1e40af";
      case "In Progress":
        return "#854d0e";
      case "Pending Approval":
        return "#9a3412";
      case "Closed":
        return "#166534";
      default:
        return "#4b5563";
    }
  }};
`;

const TaskPriority = styled.span<{ priority: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.75rem;
  background: ${({ priority }) => {
    switch (priority) {
      case "High":
        return "#fee2e2";
      case "Medium":
        return "#fef3c7";
      case "Low":
        return "#f3f4f6";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ priority }) => {
    switch (priority) {
      case "High":
        return "#b91c1c";
      case "Medium":
        return "#b45309";
      case "Low":
        return "#374151";
      default:
        return "#4b5563";
    }
  }};
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;

    & > button {
      width: 100%;
    }
  }
`;

const TimerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #e5e7eb;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
  flex-grow: 1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px dashed #d1d5db;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

function TaskListComp({ tasks }: { tasks: Task[] }) {
  const { user } = useAuthStore();
  const {
    closeTask,
    approveTask,
    reopenTask,
    timeSpent,
    activeTimer,
    startTimer,
    stopTimer,
    deleteTask,
  } = useTaskStore();

  const isDeveloper = user?.role === "developer";
  const isManager = user?.role === "manager";

  return (
    <TaskListContainer>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id}>
            <TaskHeader>
              <TaskTitle>{task.title}</TaskTitle>
              <div>
                <TaskStatus status={task.status}>{task.status}</TaskStatus>
              </div>
            </TaskHeader>

            <TaskDescription>{task.description}</TaskDescription>

            <TaskMetadata>
              <TaskPriority priority={task.priority}>
                {task.priority} Priority
              </TaskPriority>
              <span>Assigned to: {task.assignee}</span>
            </TaskMetadata>

            {isDeveloper && (
              <>
                {(task.status === "Open" || task.status === "In Progress") && (
                  <TaskActions>
                    <Button
                      onClick={() => closeTask(task.id)}
                      variant="secondary"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Check size={16} /> Complete Task
                    </Button>
                    <EditTaskForm taskId={task.id} />

                    <Button
                      variant="secondary"
                      style={{
                        color: "#dc2626",
                        borderColor: "#dc2626",
                        borderWidth: "1px",
                      }}
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this task?"
                        );
                        if (confirmed) deleteTask(task.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TaskActions>
                )}
              </>
            )}

            {isManager && task.status === "Pending Approval" && (
              <TaskActions>
                <Button
                  onClick={() => approveTask(task.id)}
                  variant="primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Check size={16} /> Approve
                </Button>
                <Button
                  onClick={() => reopenTask(task.id)}
                  variant="ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <RefreshCw size={16} /> Reopen
                </Button>
              </TaskActions>
            )}

            {isDeveloper && (
              <TimerSection>
                <TimeDisplay>
                  <Clock size={18} />
                  <span>Time Spent: {formatTime(timeSpent[task.id] || 0)}</span>
                </TimeDisplay>

                {activeTimer?.taskId === task.id ? (
                  <Button
                    onClick={stopTimer}
                    variant="ghost"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Pause size={16} /> Stop Timer
                  </Button>
                ) : (
                  <Button
                    onClick={() => startTimer(task.id)}
                    variant="secondary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    disabled={task.status === "Closed" || Boolean(activeTimer)}
                  >
                    <Play size={16} /> Start Timer
                  </Button>
                )}
              </TimerSection>
            )}
          </TaskCard>
        ))
      ) : (
        <EmptyState>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📋</div>
          <p>No tasks available.</p>
          <p style={{ fontSize: "0.875rem" }}>
            Tasks you create will appear here.
          </p>
        </EmptyState>
      )}
    </TaskListContainer>
  );
}

export default TaskListComp;
