import { useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { TASKS_TYPE } from "../components/Tasks"
import { Task } from "../components/Tasks/Task";
import { Loader } from "../components/Loader";

export const TasksPage = () => {
  const { loading, request } = useHttp();
  const [tasks, setTasks] = useState([]);
 
  const fetchTasks = useCallback(async () => {
    try {
      const fetched = await request('/api/tasks');
      setTasks(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return <Loader />
  }

  
  const tasksByType = {}
  Object.values(TASKS_TYPE).forEach((val) => {
    tasksByType[val.name] = {
      ...val,
      items: tasks.filter((task) => task.status === val.name),
    }
  });
  
  console.log(tasksByType);
  return (
    <div className="tasks-container">
      {
        Object.values(tasksByType).map((type) => (
          <div
            key={type.name}
            className={`task-card-stack task-card-stack_${type.postfix}`}>
            <div className="task-card-stack__title">{type.title}</div>
            <div className="task-card-stack__wrapper">
              {
                type.items.length
                  ? type.items.map((task) => (
                  <Task
                    key={task.id}
                    id={task.id} 
                    title={task.title}
                    description={task.description} />
                ))
                  : 'Пока нет задач'
              }
            </div>
          </div>  
        ))
      }
    </div>
      
  )
}