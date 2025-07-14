
import React, { useState, useEffect } from 'react';
import { Task, Status } from '../types';
import { Modal } from './Modal';
import { STATUSES } from '../constants';

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>(Status.ToDo);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSave = () => {
    if (task && title.trim()) {
      onSave({
        ...task,
        title,
        description,
        status,
      });
      onClose();
    }
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <div className="space-y-4">
        <div>
          <label htmlFor="edit-title" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Task Title</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900 dark:text-slate-50"
          />
        </div>
        <div>
          <label htmlFor="edit-description" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Description</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900 dark:text-slate-50 custom-scrollbar"
          />
        </div>
        <div>
          <label htmlFor="edit-status" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Status</label>
          <select
            id="edit-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900 dark:text-slate-50"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};
