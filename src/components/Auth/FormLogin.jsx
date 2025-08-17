import React, { useState } from 'react';
import { login } from '../../api/authAPI';
import ErrorMessage from '../Common/ErrorMessage';
import '../../styles/FormLogin.css';

function FormLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formState, setFormState] = useState({ isSubmitting: false, error: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username.trim().length < 3) {
      setFormState({ ...formState, error: 'Username at least 3 characters' });
      return;
    }
    if (formData.password.length < 6) {
      setFormState({ ...formState, error: 'Password at least 6 characters' });
      return;
    }

    setFormState({ isSubmitting: true, error: null });
    try {
      await login(formData);
      window.location.href = '/tasks';
    } catch (err) {
      setFormState({ isSubmitting: false, error: err.message });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Log in</h2>
        {formState.error && <ErrorMessage message={formState.error} />}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Username</label>
            <input
              name="username"
              placeholder="Fill in username"
              value={formData.username}
              onChange={handleInputChange}
              autoFocus
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Fill in password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
















































































































// import React, { useState, useRef, useEffect } from 'react'
// import '../../styles/FormLogin.css';
// import ErrorMessage from '../Common/ErrorMessage';
// import LoadingSpinner from '../Common/LoadingSpinner';
// import LoadingScreen from '../Common/LoadingScreen';

// export default function FormLogin({ onLogin, isLoading }) {

//     // Nếu người dùng nhấn vào retry thì xóa thanh ErrorMessage và focus lại thẻ input username.
//     const handleRetry = () => {
//         setSubmitError('');
//         if (usernameRef.current) {
//             passwordRef.current.focus();
//         }
//     };

//     // Nếu người dùng nhấn vào dismiss thì biến submitError sẽ rỗng và xóa thanh ErrorMessage.
//     const handleDismiss = () => {
//         setSubmitError('');
//     };

//     // useRef để focus trực tiếp vào input.
//     const usernameRef = useRef(null);
//     const passwordRef = useRef(null);

//     // useEffect để tự động chạy một lần duy nhất khi thẻ input được focus.
//     useEffect(() => {
//         if (usernameRef.current) {
//             usernameRef.current.focus();
//         }
//     }, []);

//     // useState của lỗi khi validate và lỗi khi gửi form
//     const [errors, setErrors] = useState({})
//     const [submitError, setSubmitError] = useState('');

//     // Kiểm tra điều kiện username & password. Nếu không hợp lệ thì biến errors sẽ được truyền vào câu thông báo lỗi. Trả về true nếu không có lỗi.
//     const validateForm = () => {

//         let newErrors = {};

//         if (!username.trim()) {
//             newErrors.username = 'Please fill in username.';
//         } else if (username.trim().length < 3) {
//             newErrors.username = 'Username must be at least 3 characters';
//         }

//         if (!password.trim()) {
//             newErrors.password = 'Please fill in password.';
//         } else if (password.trim().length < 8) {
//             newErrors.password = 'Password must be at least 8 characters';
//         }

//         setErrors(newErrors);

//         return Object.keys(newErrors).length === 0;
//     }

//     // Khi nhấn vào nút submit

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             await onLogin(username);
//         } catch (error) {
//             setSubmitError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
//             if (usernameRef.current) {
//                 usernameRef.current.focus();
//             }
//         }
//     };

//     // Thay đổi của username khi có event handling
//     const [username, setUsername] = useState('');
//     const handleInputUsernameChange = (event) => {
//         // Lấy username từ input
//         const value = event.target.value;
//         setUsername(value);

//         // Nếu đang có lỗi thì xóa lỗi khi người dùng gõ.
//         if (errors.username) {
//             setErrors('');
//         }

//         // Nếu trước đó có lỗi submit thì cũng xóa luôn.
//         if (submitError) {
//             setSubmitError('');
//         }
//     }

//     // Thay đổi của username khi có event password
//     const [password, setPassword] = useState('');
//     const handleInputPasswordChange = (event) => {
//         // Lấy username từ input
//         const value = event.target.value;
//         setPassword(value);

//         // Nếu đang có lỗi thì xóa lỗi khi người dùng gõ.
//         if (errors.password) {
//             setErrors('');
//         }

//         // Nếu trước đó có lỗi submit thì cũng xóa luôn.
//         if (submitError) {
//             setSubmitError('');
//         }
//     }

//     // Sau 3s sẽ hiện login form
//     const [hasLoading, setHasLoading] = useState(isLoading);
//     useEffect(() => {
//         if (hasLoading) {
//             const timer = setTimeout(() => {
//                 setHasLoading(false);
//             }, 3000);
//             // Phòng trường hợp component bị xóa khỏi giao diện trước khi setTimeout kịp chạy.
//             return () => clearTimeout(timer);
//         }
//     }, [hasLoading]);

//     return (
//         <div>
//             {hasLoading ? (
//                 <>
//                     <LoadingScreen />
//                 </>
//             ) : (

//                 <div className="login-form-container">
//                     <form className="login-form" onSubmit={handleSubmit}>
//                         <h2 className="login-title">LOGIN</h2>

//                         {submitError && (
//                             <ErrorMessage
//                                 message='ERROR!!!'
//                                 onDismiss={handleDismiss}
//                                 onRetry={handleRetry}
//                             />
//                         )}

//                         {/* Hiển thị chỗ nhập username */}
//                         <div className="form-field">
//                             <label htmlFor="username" className="form-label">Username: </label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 value={username}
//                                 placeholder="Fill in username"
//                                 className={`form-input ${errors.username ? 'form-input--error' : ''}`}
//                                 onChange={handleInputUsernameChange}
//                                 ref={usernameRef}
//                                 disabled={hasLoading}
//                             />
//                         </div>

//                         {/* Hiển thị chỗ nhập password */}
//                         <div className="form-field">
//                             <label htmlFor="password" className="form-label">Password: </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={password}
//                                 placeholder="Fill in password"
//                                 className={`form-input ${errors.password ? 'form-input--error' : ''}`}
//                                 onChange={handleInputPasswordChange}
//                                 ref={passwordRef}
//                                 disabled={hasLoading}
//                             />
//                         </div>

//                         {/* Nút submit */}
//                         <button type="submit" className="submit-btn" disabled={hasLoading}>
//                             {hasLoading ? (
//                                 <>
//                                     <LoadingSpinner size='large' />
//                                     <span>Logging in...</span>
//                                 </>
//                             ) : (
//                                 'Log in'
//                             )}
//                         </button>

//                     </form>
//                 </div>
//             )}
//         </div>
//     )
// }
