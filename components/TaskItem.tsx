
import React, { useState } from 'react';
import { Task, Status } from '../types';
import { Icon } from './Icon';
import { STATUS_COLORS, STATUSES, STATUS_TEXT_COLORS } from '../constants';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask, onEditTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (newStatus: Status) => {
    onUpdateTask({ ...task, status: newStatus });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 space-y-3 transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-start">
        <h3 
          className="font-bold text-lg text-slate-800 dark:text-slate-100 cursor-pointer flex-1 pr-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {task.title}
        </h3>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={() => onEditTask(task)} className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Icon name="edit" className="w-5 h-5" />
          </button>
          <button onClick={() => onDeleteTask(task.id)} className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Icon name="delete" className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className={`text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="relative">
           <select 
              value={task.status} 
              onChange={(e) => handleStatusChange(e.target.value as Status)}
              className={`appearance-none text-xs font-semibold py-1 pl-3 pr-8 rounded-full cursor-pointer border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-indigo-500 ${STATUS_COLORS[task.status]} ${task.status === Status.Done ? 'text-white' : 'text-white'}`}
           >
              {STATUSES.map(status => (
                  <option key={status} value={status} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50">
                      {status}
                  </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        {!task.description ? null : (
            <button onClick={() => setIsExpanded(!isExpanded)} className={`text-xs font-semibold ${STATUS_TEXT_COLORS[task.status]}`}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
        )}
      </div>
    </div>
  );
};
