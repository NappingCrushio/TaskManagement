
import React, { useState } from 'react';
import { Status, Task } from '../types';
import { Icon } from './Icon';
import { suggestSubtasks } from '../services/geminiService';

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      title,
      description,
      status: Status.ToDo,
    });
    setTitle('');
    setDescription('');
  };

  const handleSuggestSubtasks = async () => {
    if (!title) {
        alert("Please enter a title for the task first.");
        return;
    }
    setIsSuggesting(true);
    try {
        const subtasks = await suggestSubtasks(title, description);
        if (subtasks.length > 0) {
            const subtaskText = subtasks.map(s => `- ${s}`).join('\n');
            setDescription(prev => prev ? `${prev}\n\nSuggested Subtasks:\n${subtaskText}` : `Suggested Subtasks:\n${subtaskText}`);
        } else {
            alert("Could not generate suggestions. Please try a different title.");
        }
    } catch (error) {
        console.error("Failed to get subtask suggestions", error);
        alert("An error occurred while fetching suggestions.");
    } finally {
        setIsSuggesting(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Add a New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Task Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Plan summer vacation"
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900 dark:text-slate-50"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details, links, or notes..."
            rows={4}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900 dark:text-slate-50 custom-scrollbar"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
           <button
            type="button"
            onClick={handleSuggestSubtasks}
            disabled={isSuggesting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSuggesting ? <Icon name="spinner" className="w-5 h-5 animate-spin" /> : <Icon name="sparkles" className="w-5 h-5" />}
            Suggest Subtasks
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
          >
            <Icon name="plus" className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
