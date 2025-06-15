// Updated Dashboard Layout — inspired by your screenshot

"use client";

import styled from "styled-components";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import HeaderComp from "./layout/header";
import { useTaskStore } from "@/store/useTaskStore";

const StatGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatCard = styled.div`
  max-width: 180px;
  width: 100%;
  height: fit-content;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  text-align: center;
  @media screen and (max-width: 420px) {
    max-width: 100%;
  }
`;

// Updated TaskCard to match the style in TaskList component
const TaskCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaecef;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  margin: 0.75rem 0;

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

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { tasks } = useTaskStore();
  const TotalAssigned = tasks.filter(
    (task) => task.assignee === user?.username && task.status !== "Approved"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.assignee === user?.username && task.status === "Approved"
  ).length;

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) return null;

  const DashboardWrapper = styled.div`
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    @media screen and (max-width: 600px) {
      padding: 0.5rem;
      gap: 1rem;
    }
  `;

  const TaskListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  `;

  return (
    <DashboardWrapper>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Dashboard Overview</h1>

      <StatGrid>
        <StatCard>
          <h2>{TotalAssigned}</h2>
          <p>Issues assigned</p>
        </StatCard>
        <StatCard>
          <h2>0</h2>
          <p>Issues overdue</p>
        </StatCard>
        <StatCard>
          <h2>0</h2>
          <p>Issues created</p>
        </StatCard>
        <StatCard>
          <h2>{completedTasks}</h2>
          <p>Issues completed</p>
        </StatCard>
      </StatGrid>

      <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Recent Tasks</h2>

      <TaskListContainer>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id}>
              <TaskHeader>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskStatus status={task.status}>{task.status}</TaskStatus>
              </TaskHeader>

              <TaskDescription>{task.description}</TaskDescription>

              <TaskMetadata>
                <TaskPriority priority={task.priority}>
                  {task.priority} Priority
                </TaskPriority>
                <span>Assigned to: {task.assignee}</span>
              </TaskMetadata>
            </TaskCard>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#6b7280",
            }}
          >
            No tasks available.
          </div>
        )}
      </TaskListContainer>
    </DashboardWrapper>
  );
}
