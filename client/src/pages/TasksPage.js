import { useCallback, useEffect, useRef, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { Task } from "../components/Tasks/Task";
import { Loader } from "../components/Loader";

const TASKS_TYPE = {
  NEW: {
    name: 'NEW',
    title: 'К выполнению',
    postfix: 'new',
    index: 0,
  },
  DOING: {
    name: 'DOING',
    title: 'Выполняется',
    postfix: 'active',
    index: 1,
  },
  COMPLETED: {
    name: 'COMPLETED',
    title: 'Завершено',
    postfix: 'completed',
    index: 2,
  }
}

export const TasksPage = () => {
  const { loading, request } = useHttp();
  const [tasks, setTasks] = useState({});
  const dragItem = useRef();
  const dragOverItem = useRef();
 
  const fetchTasks = useCallback(async () => {
    try {
      const fetched = await request('/api/tasks');
      const tasksByType = {}
      Object.values(TASKS_TYPE).forEach((val) => {
        tasksByType[val.name] = {
          ...val,
          items: fetched.filter((task) => task.status === val.name),
        }
      });
      setTasks(tasksByType);
    } catch (e) {}
  }, [request]);
  
  const dragStart = useCallback((e, type, position) => {
    dragItem.current = { type, position }
  }, []);
  
  const dragEnter = useCallback((e, type) => {
    dragOverItem.current = type
  }, []);
  
  const drop = useCallback(async (e) => {
    if (dragItem.current.type === dragOverItem.current.name) {
      return;
    }
    const task = tasks[dragItem.current.type].items[dragItem.current.position];
    const newTask = await request(`/api/tasks/${task.id}/status`, 'PUT', { status: dragOverItem.current.index });
    const copyTasks = { ...tasks };
    copyTasks[task.status].items.splice(dragItem.current.position, 1)
    copyTasks[dragOverItem.current.name].items.push(newTask)
    dragItem.current = null;
    dragOverItem.current = null;
    setTasks(copyTasks);
  }, [tasks, request])
  
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return <Loader />
  }
  
  return (
    <div className="tasks-container">
      {
        Object.values(tasks).map((type) => (
          <div
            key={type.name}
            className={`task-card-stack task-card-stack_${type.postfix}`}
            onDragEnter={(e) => dragEnter(e, type)}
            onDragEnd={drop}>
              <div className="task-card-stack__title">{type.title}</div>
              <div className="task-card-stack__wrapper">
                {
                  type.items.length
                    ? type.items.map((task, index) => (
                    <Task
                      key={task.id}
                      id={task.id} 
                      title={task.title}
                      description={task.description}
                      onDragStart={(e) => dragStart(e, type.name, index)} />
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