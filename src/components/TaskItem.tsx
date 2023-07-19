import React, { useEffect, useRef, useState } from 'react';

import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Task, TasksListProps } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import pencilIcon from '../assets/icons/pencil/pencil.png';
import Icon from 'react-native-vector-icons/Feather';

export interface EditTaskParams {
  id: number;
  newTitle: string;
}

interface TaskItemProps extends Omit<TasksListProps, 'tasks'> {
  index: number;
  data: Task;
}

function TaskItem({
  data,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(data.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTitle(data.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ id: data.id, newTitle });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(data.id)}
        >
          <View
            testID={`marker-${index}`}
            style={data.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {data.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={data.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity testID={`x-${index}`} onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`pencil-${index}`}
            onPress={handleStartEditing}
          >
            <Image source={pencilIcon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(data.id)}
        >
          <Image style={{ opacity: isEditing ? 0.2 : 1 }} source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
