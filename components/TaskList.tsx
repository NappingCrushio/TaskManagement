
import React from 'react';
import { Task, Status } from '../types';
import { STATUSES, STATUS_BG_COLORS, STATUS_TEXT_COLORS, STATUS_COLORS } from '../constants';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskColumn: React.FC<{
    status: Status;
    tasks: Task[];
    onUpdateTask: (updatedTask: Task) => void;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
}> = ({ status, tasks, onUpdateTask, onDeleteTask, onEditTask }) => {
    return (
        <div className={`flex-1 min-w-[300px] p-4 rounded-xl ${STATUS_BG_COLORS[status]}`}>
            <div className="flex items-center gap-3 mb-4 sticky top-0 bg-inherit pt-2 pb-2 z-10">
                <span className={`w-3 h-3 rounded-full ${STATUS_COLORS[status]}`}></span>
                <h2 className={`text-lg font-bold ${STATUS_TEXT_COLORS[status]}`}>{status}</h2>
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${STATUS_COLORS[status]} text-white`}>
                    {tasks.length}
                </span>
            </div>
            <div className="space-y-4 h-full overflow-y-auto pb-4 custom-scrollbar">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdateTask={onUpdateTask}
                            onDeleteTask={onDeleteTask}
                            onEditTask={onEditTask}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 px-4">
                        <p className="text-slate-500 dark:text-slate-400">No tasks here yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask, onEditTask }) => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
      {STATUSES.map(status => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};
