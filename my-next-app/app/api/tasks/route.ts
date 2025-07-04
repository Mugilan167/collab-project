import { NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET all tasks
export async function GET() {
  try {
    const tasks = await db.task.findMany()
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

// Create a new task
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title,description } = body

    const newTask = await db.task.create({
      data: {
        title,
        description
      },
    })

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
