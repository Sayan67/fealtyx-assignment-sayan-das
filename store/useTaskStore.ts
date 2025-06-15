"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type TaskStatus =
  | "Open"
  | "In Progress"
  | "Closed"
  | "Pending Approval"
  | "Approved";
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
  filterTasks: (status?: TaskStatus) => Task[];
  sortTasks: (by: "priority-high" | "priority-low") => Task[];
  closeTask: (id: string) => void;
  approveTask: (id: string) => void;
  reopenTask: (id: string) => void;

  timeSpent: Record<string, number>; // total seconds
  activeTimer: { taskId: string; startTime: number } | null;
  startTimer: (id: string) => void;
  stopTimer: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      timeSpent: {},
      activeTimer: null,

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

      sortTasks: (by) => {
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
        return [...get().tasks].sort((a, b) =>
          by === "priority-high"
            ? priorityMap[b.priority] - priorityMap[a.priority]
            : priorityMap[a.priority] - priorityMap[b.priority]
        );
      },

      closeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status: "Pending Approval" } : t
          ),
        })),

      approveTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status: "Closed" } : t
          ),
        })),

      reopenTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status: "Open" } : t
          ),
        })),

      startTimer: (id) =>
        set(() => ({
          activeTimer: { taskId: id, startTime: Date.now() },
        })),

      stopTimer: () => {
        const state = get();
        const { taskId, startTime } = state.activeTimer || {};
        if (!taskId || !startTime) return;

        const endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000); // in seconds
        const prevTime = state.timeSpent[taskId] || 0;

        set({
          timeSpent: {
            ...state.timeSpent,
            [taskId]: prevTime + duration,
          },
          activeTimer: null,
        });
      },
    }),
    {
      name: "task-store",
      partialize: (state) => ({
        tasks: state.tasks,
        timeSpent: state.timeSpent,
      }),
    }
  )
);
