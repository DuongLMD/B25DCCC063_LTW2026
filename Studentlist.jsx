import React from 'react';
import StudentItem from './StudentItem';

const StudentList = ({ students, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Họ và Tên</th>
                    <th>Lớp</th>
                    <th>Điểm</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {students.length > 0 ? (
                    students.map((student) => (
                        <StudentItem key={student.id} student={student} onDelete={onDelete} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" >Không có sinh viên nào.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default StudentList;