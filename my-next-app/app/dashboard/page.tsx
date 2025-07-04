// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'

type Task = {
  id: string
  title: string
  description: string
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTasks(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    setLoading(true)
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })

    if (res.ok) {
      setTitle('')
      setDescription('')
      fetchTasks() // refresh task list
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border px-3 py-2 mb-2 rounded"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-2 border p-2 rounded">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
