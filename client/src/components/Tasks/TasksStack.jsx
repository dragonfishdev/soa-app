import { useState } from 'react';
import { Task } from './Task'

export const TASKS_TYPE = {
  NEW: {
    name: 'NEW',
    title: 'К выполнению',
    postfix: 'new',
  },
  DOING: {
    name: 'DOING',
    title: 'Выполняется',
    postfix: 'active',
  },
  COMPLETED: {
    name: 'COMPLETED',
    title: 'Завершено',
    postfix: 'completed',
  }
}

export const TasksStack = ({ type = TASKS_TYPE.NEW, items = [] }) => {
  const [tasks, setTasks] = useState(items);
  return (
    <div className={`task-card-stack task-card-stack_${type.postfix}`}>
      <div className="task-card-stack__title">{type.title}</div>
      <div className="task-card-stack__wrapper">
        {
          tasks.length ? tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id} 
              title={task.title}
              description={task.description} />
          )) : 'Пока нет задач'
        }
      </div>
    </div> 
  );
}