// src/services/taskService.ts
import { makeHousekeepingCall } from "./twilioService";
import { toast } from "@/hooks/use-toast";

export type TaskStatus = 'pending' | 'completed' | 'failed';

export type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  role: 'nurse' | 'housekeeping';
  status: TaskStatus;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
};

let tasks: Task[] = [];

export const getTasks = async (): Promise<Task[]> => {
  return tasks;
};

export const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'status'>): Promise<Task> => {
  const newTask: Task = {
    ...task,
    id: `T${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'pending',
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  tasks = [...tasks, newTask];

  return newTask;
};

export const updateTaskStatus = async (taskId: string, status: TaskStatus): Promise<Task | undefined> => {
  const updatedTask = tasks.find(task => task.id === taskId);
  if (updatedTask) {
    updatedTask.status = status;
    tasks = tasks.map(task => task.id === taskId ? updatedTask : task);
  }
  return updatedTask;
};

export const initiateHousekeepingCall = async (task: Task) => {
  toast({
    title: "Initiating Housekeeping Call",
    description: `For task: ${task.title}`,
  });

  const success = await makeHousekeepingCall(task.title, task.description);

  if (!success) {
    await updateTaskStatus(task.id, 'failed');
  }

  return success;
};
