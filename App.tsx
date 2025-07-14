import React, { useState, useEffect, useCallback } from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';
import { EditTaskModal } from './components/EditTaskModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import type { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks]);

  const handleAddTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: new Date().toISOString() };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }, []);

  const handleUpdateTask = useCallback((updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    if (editingTask?.id === updatedTask.id) {
      setEditingTask(null);
    }
  }, [editingTask]);

  const handleDeleteTask = useCallback((taskId: string) => {
    setDeletingTaskId(taskId);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deletingTaskId) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== deletingTaskId));
      setDeletingTaskId(null);
    }
  }, [deletingTaskId]);
  
  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
  }, []);


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            My Task Manager
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Your smart assistant for productivity</p>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <AddTaskForm onAddTask={handleAddTask} />
        <div className="mt-8">
          <TaskList 
            tasks={tasks} 
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      </main>

      <EditTaskModal 
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={handleUpdateTask}
      />
      
      <ConfirmationModal
        isOpen={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
};

export default App;