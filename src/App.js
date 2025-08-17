import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Auth/Navbar';
import FormLogin from './components/Auth/FormLogin';
import { isAuthenticated } from './api/authAPI';
import TaskManagement from './components/Tasks/TaskManagement';

function App() {

  // const testTasks = [
  //   {
  //     id: 1,
  //     title: "Học React Hooks",
  //     description: "Hoàn thành bài học về useState và useEffect",
  //     status: "todo",
  //     priority: "high",
  //     dueDate: "2024-08-15"
  //   },
  //   {
  //     id: 2,
  //     title: "Setup JSON Server",
  //     description: "Cài đặt và cấu hình JSON Server cho project",
  //     status: "in-progress",
  //     priority: "medium",
  //     dueDate: "2024-08-10"
  //   },
  //   {
  //     id: 3,
  //     title: "Deploy ứng dụng",
  //     description: "Deploy lên Vercel hoặc Netlify",
  //     status: "completed",
  //     priority: "low",
  //     dueDate: "2024-08-05"
  //   },
  //   {
  //     id: 4,
  //     title: "Viết unit tests",
  //     description: "Tạo test cases cho các components",
  //     status: "todo",
  //     priority: "medium",
  //     dueDate: "2024-08-20"
  //   },
  //   {
  //     id: 5,
  //     title: "Optimize performance",
  //     description: "Cải thiện hiệu suất ứng dụng",
  //     status: "in-progress",
  //     priority: "high",
  //     dueDate: "2024-08-12"
  //   }
  // ];

  // const handleLogout = () => {
  //   alert('Log out');
  // };

  // const handleEdit = (task) => {
  //   console.log('Edit task:', task);
  // };

  // const handleDelete = (taskId) => {
  //   console.log('Delete task:', taskId);
  // };

  // const scrollRef = useRef(null);
  // const handleScrollFocus = () => {
  //   scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  //   scrollRef.current.focus();
  // };

  // const [isLoading, setIsLoading] = useState(false);
  // const handleLogin = async (formData) => {
  //   console.log('Login attempt:', formData);
  //   setIsLoading(true);

  //   // Simulate API call
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       setIsLoading(false);

  //       // Simulate success/failure
  //       if (formData.username === 'admin' && formData.password === 'password123') {
  //         console.log('Login successful!');
  //         resolve({ user: { username: 'admin' } });
  //       } else {
  //         reject(new Error('Username hoặc password không đúng'));
  //       }
  //     }, 2000);
  //   });
  // };

  // const [error, setError] = useState(null);
  // const [tasks, setTasks] = useState([]);



  const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TaskManagement />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated() ? '/tasks' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>



    // <div className="App" >

    //   <div>
    //     <button onClick={handleScrollFocus}>
    //       CLICK
    //     </button>
    //   </div>

    //   <Navbar
    //     isLoggedIn='true'
    //     user={{ username: 'Mary' }}
    //     onLogout={handleLogout}
    //   />

    //   <div>
    //     {testTasks.length > 0 && testTasks.map(item => (
    //       <TaskItem
    //         key={item.id}
    //         task={item}
    //         onEdit={handleEdit}
    //         onDelete={handleDelete}
    //       />
    //     ))}
    //   </div>

    //   <FormLogin onLogin={handleLogin} isLoading={isLoading} />

    //   <input ref={scrollRef}></input>

    // </div>
  );
}

export default App;
