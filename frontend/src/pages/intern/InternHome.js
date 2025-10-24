import React, { useState } from 'react';
import { CheckSquare, GitPullRequest, Plus, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_TASKS, MOCK_PRS } from '@/utils/mockData';
import { getStatusColor } from '@/utils/constants';
import AddTaskModal from '@/components/workspace/AddTaskModal';

const InternHome = ({ user }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const todayTasks = MOCK_TASKS.slice(0, 3);
  const openPRs = MOCK_PRS.filter(pr => pr.status !== 'Merged' && pr.status !== 'Closed').slice(0, 3);

  return (
    <div className="p-8" data-testid="intern-home-page">
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-400 text-sm mb-2">{currentDate}</p>
        <h1 className="text-4xl font-bold text-white mb-2" style={{fontFamily: 'Work Sans'}}>Let's crush it today!!</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks Card */}
        <div className="lg:col-span-2 bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckSquare className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Work Sans'}}>Tasks</h2>
          </div>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} data-testid={`task-item-${task.id}`} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{task.title}</h3>
                    <p className="text-slate-400 text-sm">{task.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Panel */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6" style={{fontFamily: 'Work Sans'}}>Quick Actions</h2>
          <div className="space-y-3">
            <Button
              onClick={() => setShowAddTask(true)}
              data-testid="quick-action-add-task-btn"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </Button>
            <Button
              onClick={() => window.open('https://github.com', '_blank')}
              data-testid="quick-action-raise-pr-btn"
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 justify-start gap-2"
            >
              <Github className="w-5 h-5" />
              Raise PR
            </Button>
          </div>
        </div>
      </div>

      {/* Pull Requests Card */}
      <div className="mt-6 bg-slate-900/50 rounded-xl border border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <GitPullRequest className="w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Work Sans'}}>Pull Requests</h2>
        </div>
        <div className="space-y-3">
          {openPRs.map((pr) => (
            <div key={pr.id} data-testid={`pr-item-${pr.id}`} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-400 font-mono text-sm">{pr.prId}</span>
                    <h3 className="text-white font-medium">{pr.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm">Task: {pr.task}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pr.status)}`}>
                  {pr.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddTaskModal isOpen={showAddTask} onClose={() => setShowAddTask(false)} />
    </div>
  );
};

export default InternHome;