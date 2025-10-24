import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MOCK_USERS } from '@/utils/mockData';

const AdminUsers = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-8" data-testid="admin-users-page">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-6" style={{fontFamily: 'Work Sans'}}>User Management</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium py-3 px-4">User</th>
                <th className="text-left text-slate-400 font-medium py-3 px-4">Email</th>
                <th className="text-left text-slate-400 font-medium py-3 px-4">Role</th>
                <th className="text-left text-slate-400 font-medium py-3 px-4">Department</th>
                <th className="text-left text-slate-400 font-medium py-3 px-4">User ID</th>
                <th className="text-left text-slate-400 font-medium py-3 px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} data-testid={`user-row-${u.id}`} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                          {getInitials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{u.email}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 capitalize">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{u.department}</td>
                  <td className="py-4 px-4 text-slate-400 font-mono text-sm">{u.id}</td>
                  <td className="py-4 px-4 text-slate-400 text-sm">{u.signupDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;