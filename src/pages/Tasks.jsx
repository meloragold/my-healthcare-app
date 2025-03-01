import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

import { Trash2 } from 'lucide-react';

export default function NurseTaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Check patient vitals', assignee: 'Aria', time: '10:00 AM' },
    { id: 2, title: 'Administer medications', assignee: 'John', time: '12:00 PM' },
    { id: 3, title: 'Update patient records', assignee: 'Maya', time: '2:00 PM' },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        id: tasks.length + 1,
        title: newTask,
        assignee: 'Unassigned',
        time: 'Not set',
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Nurse Task Manager</h1>
      
      <div className="w-full max-w-2xl">
        <div className="flex mb-4 gap-2">
          <Input 
            placeholder="Add a new task..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={addTask}>
            Add Task
          </Button>
        </div>

        {tasks.map((task) => (
          <Card key={task.id} className="mb-4 shadow-lg p-4 bg-white">
            <CardContent className="flex justify-between items-center">
              <div className="flex items-start flex-col">
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-500">🧑 Assigned to: {task.assignee}</p>
                <p className="text-gray-500">⏰ Time: {task.time}</p>
              </div>
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1" 
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 size={16} /> Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// This layout adds more detailed task info and improves the visual balance of the UI.
// Let me know if you want any adjustments! ✨
