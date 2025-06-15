"use client";

import { useTaskStore } from "@/store/useTaskStore";
import { TaskPriority, TaskStatus } from "@/store/useTaskStore";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";

const DialogTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  transition: border-color 0.15s ease;
  margin-bottom: 1rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  transition: border-color 0.15s ease;
  margin-bottom: 1rem;
  min-height: 6rem;
  resize: vertical;
  font-size: 0.875rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  transition: border-color 0.15s ease;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
  }
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const FormContainer = styled.div`
margin-top: 1rem;
  max-width: 100%;
`;

export function EditTaskForm({ taskId }: { taskId: string }) {
  const { tasks, updateTask } = useTaskStore();
  const task = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSave = () => {
    updateTask(taskId, {
      title,
      description: desc,
      priority: priority as TaskPriority,
      status: status as TaskStatus,
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="secondary">
          <Pencil size={14} /> Edit
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            background: "rgba(0,0,0,0.4)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100dvw",
            height: "100dvh",
          }}
        />
        <Dialog.Content
          style={{
            width: "100%",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "500px",
          }}
        >
          <Dialog.Title>Edit Task</Dialog.Title>
          {/* <EditTaskForm taskId={task.id} /> */}

          <FormContainer>
            <FormLabel htmlFor="edit-task-title">Title</FormLabel>
            <FormInput
              id="edit-task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />

            <FormLabel htmlFor="edit-task-description">Description</FormLabel>
            <FormTextArea
              id="edit-task-description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe your task"
            />

            <FormLabel htmlFor="edit-task-priority">Priority</FormLabel>
            <FormSelect
              id="edit-task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </FormSelect>

            <FormLabel htmlFor="edit-task-status">Status</FormLabel>
            <FormSelect
              id="edit-task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Closed">Closed</option>
            </FormSelect>

            <DialogFooter>
              <Dialog.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Dialog.Close>
            </DialogFooter>
          </FormContainer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
