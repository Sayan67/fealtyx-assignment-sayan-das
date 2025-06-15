"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";

export type TaskStatus = "Open" | "In Progress" | "Closed" | "Pending Approval";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  createdAt: Date;
}

interface TaskState {
  tasks: Task[];
  createTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterByStatus: (status: TaskStatus) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  createTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: nanoid(),
          createdAt: new Date(),
        },
      ],
    })),

  updateTask: (id, data) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...data } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  filterByStatus: (status) => {
    return get().tasks.filter((task) => task.status === status);
  },
  
  filterTasks: (status?: TaskStatus) => {
    const all = get().tasks;
    return status ? all.filter((task) => task.status === status) : all;
  },

  sortTasks: (by: "priority-high" | "priority-low") => {
    const priorityMap = { High: 3, Medium: 2, Low: 1 };
    return [...get().tasks].sort((a, b) =>
      by === "priority-high"
        ? priorityMap[b.priority] - priorityMap[a.priority]
        : priorityMap[a.priority] - priorityMap[b.priority]
    );
  },
}));
