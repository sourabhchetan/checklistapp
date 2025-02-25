import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export default function ChecklistApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checklist</h1>
      <div className="flex gap-2 mb-4">
        <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task" />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className="mb-4">
        <Button variant="outline" onClick={() => setFilter("all")} className="mr-2">All</Button>
        <Button variant="outline" onClick={() => setFilter("completed")} className="mr-2">Completed</Button>
        <Button variant="outline" onClick={() => setFilter("pending")}>Pending</Button>
      </div>
      <div className="space-y-2">
        {filteredTasks.map((t, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardContent className="flex justify-between items-center p-3">
                <div className="flex items-center gap-2">
                  <Checkbox checked={t.completed} onCheckedChange={() => toggleTask(index)} />
                  <span className={t.completed ? "line-through text-gray-500" : ""}>{t.text}</span>
                </div>
                <Button variant="destructive" size="sm" onClick={() => deleteTask(index)}>Delete</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
