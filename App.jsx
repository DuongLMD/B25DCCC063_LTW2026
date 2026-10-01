import React, { useState } from 'react';
import StudentList from './Studentlist';

const initialStudents = [
    { id: 1, name: 'Nguyễn Văn A', score: 8.5, className: 'D25CQCC03' },
    { id: 2, name: 'Trần Thị B', score: 4.0, className: 'D25CQCC03' },
    { id: 3, name: 'Lê Văn C', score: 9.0, className: 'D25CQCC03' }
];

const App = () => {
    const [students, setStudents] = useState(initialStudents);
    
    const [name, setName] = useState('');
    const [score, setScore] = useState('');
    const [className, setClassName] = useState('');
    
    const [filterType, setFilterType] = useState('ALL');
    
    const [errorMessage, setErrorMessage] = useState('');
    const handleAddStudent = (e) => {
        e.preventDefault();

        if (!name.trim() || !score || !className.trim()) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const numericScore = parseFloat(score);

        if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
            setErrorMessage('Điểm số không hợp lệ (phải từ 0 đến 10)!');
            return;
        }

        const newStudent = {
            id: students.reduce((maxId, student) => Math.max(maxId, student.id), 0) + 1,
            name: name.trim(),
            score: numericScore,
            className: className.trim()
        };

        setStudents([...students, newStudent]);

        setName('');
        setScore('');
        setClassName('');
        setErrorMessage('');
    };

    const handleDeleteStudent = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    const filteredStudents = students.filter((student) => {
        if (filterType === 'EXCELLENT') return student.score >= 8;
        if (filterType === 'FAILED') return student.score < 5;
        return true;
    });

    const totalStudents = students.length;
    const averageScore = totalStudents > 0
        ? (students.reduce((sum, student) => sum + student.score, 0) / totalStudents).toFixed(2)
        : 0;

    return (
        <div>
            <h2>Quản lý Điểm Sinh viên</h2>

            
            <form onSubmit={handleAddStudent} >
                <h3>Thêm Sinh Viên Mới</h3>
                {errorMessage}
                
                <div>
                    <label>Họ và tên: </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Nhập họ tên"
                    />
                </div>

                <div>
                    <label>Lớp: </label>
                    <input 
                        type="text" 
                        value={className} 
                        onChange={(e) => setClassName(e.target.value)} 
                        placeholder="Nhập lớp"
                    />
                </div>

                <div>
                    <label>Điểm số: </label>
                    <input 
                        type="number" 
                        step="0.1"
                        value={score} 
                        onChange={(e) => setScore(e.target.value)} 
                        placeholder="0 - 10"
                    />
                </div>

                <button type="submit" >
                    Thêm Sinh Viên
                </button>
            </form>

            <div>
                <h4>Thống kê toàn lớp:</h4>
                <p>Tổng số sinh viên: <strong>{totalStudents}</strong> | Điểm trung bình: <strong>{averageScore}</strong></p>
                
                <div>
                    <label>Bộ lọc danh sách: </label>
                    <button
                        onClick={() => setFilterType('ALL')}
                        >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilterType('EXCELLENT')}
                        >
                        Loại Giỏi (≥ 8.0)
                    </button>
                    <button 
                        onClick={() => setFilterType('FAILED')}
                        >
                        Trượt môn (&lt; 5.0)
                    </button>
                </div>
            </div>

            <StudentList students={filteredStudents} onDelete={handleDeleteStudent} />
        </div>
    );
};

export default App;