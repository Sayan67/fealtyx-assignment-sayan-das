import React from "react";
import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/Button";
import { TaskPriority, TaskStatus } from "@/store/useTaskStore";

const DialogOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 50;
`;

const DialogContent = styled(Dialog.Content)`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 1.5rem;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 51;

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DialogTitle = styled(Dialog.Title)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const DialogClose = styled(Dialog.Close)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #6b7280;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  &:hover {
    background: #f3f4f6;
  }
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

const CustomButton = styled(Button)`
  width: 100%;
  @media screen and (min-width: 600px) {
    width: fit-content;
  }
`;

function CreateTask({
  title,
  setTitle,
  desc,
  setDesc,
  priority,
  setPriority,
  status,
  setStatus,
  handleCreate,
}: {
  title: string;
  setTitle: (value: string) => void;
  desc: string;
  setDesc: (value: string) => void;
  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;
  status: TaskStatus;
  setStatus: (value: TaskStatus) => void;
  handleCreate: () => void;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CustomButton variant="primary">
          + New Task
        </CustomButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogClose>✕</DialogClose>

          <FormLabel htmlFor="task-title">Title</FormLabel>
          <FormInput
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />

          <FormLabel htmlFor="task-description">Description</FormLabel>
          <FormTextArea
            id="task-description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe your task"
          />

          <FormLabel htmlFor="task-priority">Priority</FormLabel>
          <FormSelect
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </FormSelect>

          <FormLabel htmlFor="task-status">Status</FormLabel>
          <FormSelect
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Approval">Pending Approval</option>
          </FormSelect>

          <DialogFooter>
            <Dialog.Close asChild>
              <Button variant="secondary">Cancel</Button>
            </Dialog.Close>
            <Button variant="primary" onClick={handleCreate}>
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CreateTask;
