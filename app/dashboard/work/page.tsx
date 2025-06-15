"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useTaskStore, TaskStatus, TaskPriority } from "@/store/useTaskStore";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import TaskListComp from "@/components/pages/work/TaskList";
import CreateTask from "@/components/pages/work/CreateTask";
import { DropdownFilter } from "@/components/ui/DropDown";
import { useRouter } from "next/navigation";

const FilterBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  /* flex-wrap: wrap; */
  align-items: center;
`;

export default function WorkPage() {
  const { user } = useAuthStore();
  const { tasks, createTask, filterByStatus } = useTaskStore();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [status, setStatus] = useState<TaskStatus>("Open");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"priority-high" | "priority-low" | "">(
    ""
  );

  const filtered =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  const sorted = sortBy
    ? [...filtered].sort((a, b) => {
        const map = { High: 3, Medium: 2, Low: 1 };
        return sortBy === "priority-high"
          ? map[b.priority] - map[a.priority]
          : map[a.priority] - map[b.priority];
      })
    : filtered;

  const handleCreate = () => {
    if (title && desc) {
      createTask({
        title,
        description: desc,
        priority,
        status,
        assignee: user?.username ?? "unknown",
      });
      setTitle("");
      setDesc("");
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Your Tasks</h1>

      <FilterBarContainer>
        <CreateTask
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          priority={priority}
          setPriority={setPriority}
          status={status}
          setStatus={setStatus}
          handleCreate={handleCreate}
        />
        <Filters>
          <DropdownFilter
            label="Status"
            options={[
              "All",
              "Open",
              "In Progress",
              "Closed",
              "Pending Approval",
            ]}
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as TaskStatus)}
          />
          <DropdownFilter
            label="Sort"
            options={["none", "priority-high", "priority-low"]}
            value={sortBy}
            onChange={(val) =>
              setSortBy(
                val == "none" ? "" : (val as "priority-high" | "priority-low")
              )
            }
          />
        </Filters>
      </FilterBarContainer>
      <TaskListComp tasks={sorted} />
    </div>
  );
}
