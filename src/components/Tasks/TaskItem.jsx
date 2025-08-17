import React from 'react'
import '../../styles/TaskItem.css';

export default function TaskItem({ task={title: 'Default title', status:'todo', description: 'Description', priority:'low'}, onEdit, onDelete }) {
    const handleEdit = () => {
        onEdit(task);
    };

    const handleDelete = () => {
        if (window.confirm(`Do you want to delete task "${task.title}"?`)) {
            onDelete(task.id);
        }
    };

    // Helper function để format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };
    // Helper function để get status display text
    const getStatusText = (status) => {
        const statusMap = {
            'todo': 'UNDONE',
            'in-progress': 'DOING',
            'completed': 'DONE',
            'default': 'DEFAULT'
        };
        return statusMap[status] || statusMap.default;
    };

    // Helper function để get priority display text
    const getPriorityText = (priority) => {
        const priorityMap = {
            'low': 'LOW',
            'medium': 'MEDIUM',
            'high': 'HIGH',
            'default': 'DEFAULT'
        };
        return priorityMap[priority] || priorityMap.default;
    };

    return (
        <div className="task-item">
            <div className="task-info">
                <h4 className="task-title">{task?.title || 'No title'}</h4>

                {task?.description && (
                    <p className="task-description">{task?.description}</p>
                )}

                <div className="task-meta">
                    <span className={`task-status task-status--${task?.status || 'default'}`}>
                        {getStatusText(task?.status || 'default')}
                    </span>

                    <span className={`task-priority task-priority--${task?.priority || 'default'}`}>
                        Priority: {getPriorityText(task?.priority || 'default')}
                    </span>

                    <span className="task-due-date">
                        Deadline: {formatDate(task?.dueDate)}
                    </span>
                </div>
            </div>

            <div className="task-actions">
                <button
                    className="edit-btn"
                    onClick={handleEdit}
                    title="Edit task"
                >Fix
                </button>

                <button
                    className="delete-btn"
                    onClick={handleDelete}
                    title="Delete task"
                >Delete
                </button>
            </div>
        </div>
    );
}
