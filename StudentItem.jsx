import React from 'react';
const StudentItem = ({ student, onDelete }) => {
    if (!student) return null;

    const { id, name, score, className } = student;

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{className}</td>
            <td>{score}</td>
            <td>
                <button type="button" onClick={() => onDelete?.(id)}>
                    Xóa
                </button>
            </td>
        </tr>
    );
};

export default StudentItem;