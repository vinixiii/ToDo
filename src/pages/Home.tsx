import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { EditTaskParams, Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const hasAlreadyTask = tasks.some((task) => task.title === newTaskTitle);

    if (!hasAlreadyTask) {
      setTasks((oldState) => [...oldState, newTask]);
    } else {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome.'
      );
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const foundTask = updatedTasks.find((task) => task.id === id);

    if (!foundTask) return;

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleEditTask({ id, newTitle }: EditTaskParams) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const foundTask = updatedTasks.find((task) => task.id === id);

    if (!foundTask) return;

    foundTask.title = newTitle;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks((oldState) => oldState.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
