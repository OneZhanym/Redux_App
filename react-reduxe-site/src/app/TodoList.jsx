import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo, getTodoById, clearSelectedTodo } from './todosSlice';

const TodoList = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const { items, selectedTodo } = useSelector((state) => state.todos);

    const handleAdd = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    return (
        <div className="todo-container" style={{ 
            maxWidth: '1200px', 
            margin: '40px auto', 
            padding: '0 20px',
            boxSizing: 'border-box',
            clear: 'both' // Гарантирует, что флоат-элементы не будут накладываться
        }}>
            <div style={{ 
                background: 'var(--bg-color, #ffffff)', 
                color: 'var(--text-color, #333)',
                borderRadius: '12px', 
                padding: '24px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid var(--border-color, #eee)'
            }}>
                {selectedTodo ? (
                    /* Режим детального просмотра (GET ID / DETAIL) */
                    <div className="todo-detail">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h2 style={{ margin: 0 }}>Детали задачи</h2>
                            <button 
                                onClick={() => dispatch(clearSelectedTodo())}
                                style={{ 
                                    padding: '8px 16px', 
                                    cursor: 'pointer',
                                    backgroundColor: '#050505',
                                    border: 'none',
                                    borderRadius: '6px'
                                }}
                            >
                                ✕ Закрыть
                            </button>
                        </div>
                        <div style={{ padding: '15px', backgroundColor: 'var(--bg-alt, #f9f9f9)', borderRadius: '8px', lineHeight: '1.6' }}>
                            <p><strong>ID:</strong> <small>{selectedTodo.id}</small></p>
                            <p><strong>Текст:</strong> {selectedTodo.text}</p>
                            <p><strong>Статус:</strong> {selectedTodo.completed ? '✅ Выполнено' : '❌ В процессе'}</p>
                            <p><strong>Описание:</strong> {selectedTodo.description}</p>
                        </div>
                    </div>
                ) : (
                    /* Режим списка (READ) */
                    <div className="todo-list-view">
                        <h2 style={{ marginTop: 0 }}>Мой Список Задач</h2>
                        
                        <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                            <input 
                                style={{ 
                                    flex: 1, 
                                    padding: '10px', 
                                    borderRadius: '6px', 
                                    border: '1px solid var(--border-color, #ddd)',
                                    background: 'var(--input-bg, #fff)',
                                    color: 'var(--text-color, #000)'
                                }}
                                value={text} 
                                onChange={(e) => setText(e.target.value)} 
                                placeholder="Что нужно сделать?" 
                            />
                            <button type="submit" style={{ padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
                                Добавить
                            </button>
                        </form>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {items.map((todo) => (
                                <li key={todo.id} style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '12px',
                                    marginBottom: '10px',
                                    padding: '12px',
                                    background: 'var(--bg-color, #fff)',
                                    border: '1px solid var(--border-color, #eee)',
                                    borderRadius: '8px'
                                }}>
                                    <input 
                                        type="checkbox" 
                                        checked={todo.completed} 
                                        onChange={() => dispatch(toggleTodo(todo.id))}
                                    />
                                    <span style={{ 
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        flexGrow: 1,
                                        color: todo.completed ? '#888' : 'inherit'
                                    }}>
                                        {todo.text}
                                    </span>
                                    <button onClick={() => dispatch(getTodoById(todo.id))} style={{ padding: '5px 10px', cursor: 'pointer' }}>🔍 Инфо</button>
                                    <button onClick={() => dispatch(deleteTodo(todo.id))} style={{ color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer' }}>Удалить</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;