import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clock, AlertTriangle, Phone } from 'lucide-react';
import CreateTaskForm from '@/components/Task/CreateTaskForm';
import type { Task } from '@/services/taskService';
import { getTasks, updateTaskStatus, initiateHousekeepingCall } from '@/services/taskService';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId, 'completed');
      await loadTasks();

      toast({
        title: "Task Completed",
        description: "The task has been marked as completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete task",
        variant: "destructive",
      });
    }
  };

  const handleRetryTask = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId, 'pending');
      await loadTasks();

      toast({
        title: "Task Retried",
        description: "The task has been retried and is now pending",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to retry task",
        variant: "destructive",
      });
    }
  };

  const handleCallHousekeeping = async (taskId: string) => {
    try {
      toast({
        title: "Calling Housekeeping",
        description: "Initiating call to housekeeping team",
      });

      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const success = await initiateHousekeepingCall(task);

        if (success) {
          toast({
            title: "Call Connected",
            description: "Housekeeping team has been notified",
          });
        } else {
          await updateTaskStatus(task.id, 'failed');
          await loadTasks();

          toast({
            title: "Call Failed",
            description: "Could not connect to housekeeping team",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call",
        variant: "destructive",
      });
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const failedTasks = tasks.filter(task => task.status === 'failed');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-emerG-secondary">Task Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-100 to-cyan-200 border-blue-300 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-800">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900">{pendingTasks.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-100 to-emerald-200 border-green-300 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-green-800">Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-900">{completedTasks.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-100 to-pink-200 border-red-300 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-red-800">Failed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-900">{failedTasks.length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="mb-4 bg-gradient-to-r from-slate-100 to-gray-100 p-1 rounded-xl shadow-md">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
              >
                Pending ({pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
              >
                Completed ({completedTasks.length})
              </TabsTrigger>
              <TabsTrigger
                value="failed"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300"
              >
                Failed ({failedTasks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingTasks.map(task => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium">{task.title}</h3>
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                              task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-4">Assigned to: {task.assignedTo}</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.createdAt}
                            </span>
                          </div>
                        </div>
                        <div>
                          <Button
                            size="sm"
                            onClick={() => handleCompleteTask(task.id)}
                            className="bg-emerG-primary hover:bg-emerG-secondary"
                          >
                            Complete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {pendingTasks.length === 0 && (
                  <div className="text-center p-8 text-gray-500">
                    No pending tasks at the moment
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4">
                {completedTasks.map(task => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium">{task.title}</h3>
                            <span className="ml-2 text-green-600 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-4">Assigned to: {task.assignedTo}</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {completedTasks.length === 0 && (
                  <div className="text-center p-8 text-gray-500">
                    No completed tasks yet
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="failed">
              <div className="space-y-4">
                {failedTasks.map(task => (
                  <Card key={task.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium">{task.title}</h3>
                            <span className="ml-2 text-red-600 flex items-center">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Failed
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-4">Assigned to: {task.assignedTo}</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.createdAt}
                            </span>
                          </div>
                        </div>
                        <div className="space-x-2">
                          {task.role === 'housekeeping' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center"
                              onClick={() => handleCallHousekeeping(task.id)}
                            >
                              <Phone className="h-3 w-3 mr-1" /> Call
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleRetryTask(task.id)}
                          >
                            Retry
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {failedTasks.length === 0 && (
                  <div className="text-center p-8 text-gray-500">
                    No failed tasks
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <CreateTaskForm onTaskCreated={loadTasks} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
