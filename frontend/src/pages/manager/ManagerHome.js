import React from 'react';
import { FolderKanban, CheckSquare, GitPullRequest, FileText, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { MOCK_TASKS, MOCK_PRS, MOCK_PROJECTS } from '@/utils/mockData';
import { formatDate } from '@/utils/constants';

const ManagerHome = ({ user }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const stats = {
    totalProjects: MOCK_PROJECTS.length,
    ongoingProjects: MOCK_PROJECTS.filter(p => p.status === 'Ongoing').length,
    completedProjects: MOCK_PROJECTS.filter(p => p.status === 'Completed').length,
    totalTasks: MOCK_TASKS.length,
    openPRs: MOCK_PRS.filter(pr => pr.status === 'Open' || pr.status === 'InReview').length,
    transcripts: 12 // Mock data
  };

  const upcomingDeadlines = MOCK_TASKS.filter(task => task.status !== 'Completed').slice(0, 3);

  return (
    <div className="p-8" data-testid="manager-home-page">
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-400 text-sm mb-2">{currentDate}</p>
        <h1 className="text-4xl font-bold text-white mb-2" style={{fontFamily: 'Work Sans'}}>Let's crush it today!!</h1>
      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-xl border border-blue-600/30 p-6">
          <div className="flex items-center gap-3 mb-2">
            <FolderKanban className="w-6 h-6 text-blue-400" />
            <span className="text-3xl font-bold text-white">{stats.totalProjects}</span>
          </div>
          <p className="text-slate-300 text-sm">Total Projects</p>
          <p className="text-slate-500 text-xs mt-1">{stats.ongoingProjects} Ongoing, {stats.completedProjects} Completed</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-600/5 rounded-xl border border-emerald-600/30 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckSquare className="w-6 h-6 text-emerald-400" />
            <span className="text-3xl font-bold text-white">{stats.totalTasks}</span>
          </div>
          <p className="text-slate-300 text-sm">Total Tasks</p>
        </div>

        <div className="bg-gradient-to-br from-violet-600/20 to-violet-600/5 rounded-xl border border-violet-600/30 p-6">
          <div className="flex items-center gap-3 mb-2">
            <GitPullRequest className="w-6 h-6 text-violet-400" />
            <span className="text-3xl font-bold text-white">{stats.openPRs}</span>
          </div>
          <p className="text-slate-300 text-sm">Open Pull Requests</p>
        </div>

        <div className="bg-gradient-to-br from-amber-600/20 to-amber-600/5 rounded-xl border border-amber-600/30 p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <span className="text-3xl font-bold text-white">{stats.transcripts}</span>
          </div>
          <p className="text-slate-300 text-sm">Transcripts</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h2 className="text-2xl font-semibold text-white mb-6" style={{fontFamily: 'Work Sans'}}>Upcoming Deadlines</h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((task) => (
              <div key={task.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h3 className="text-white font-medium mb-1">{task.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Assignee: {task.assignee}</span>
                  <span className="text-amber-400">Due: {formatDate(task.dueDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Performance */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h2 className="text-2xl font-semibold text-white mb-6" style={{fontFamily: 'Work Sans'}}>Project Performance</h2>
          <div className="space-y-4">
            {MOCK_PROJECTS.map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{project.title}</span>
                  <span className="text-slate-400 text-sm">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;