// Contain all custom types we want to use for this app

export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer: string
}

export type EventStatus = 'active' | 'pending' | 'closed' | 'canceled'

type TaskType = 'personal' | 'work' | 'miscellaneous'

export interface TodoItem {
  label: string
  type: TaskType
  isComplete: boolean
}