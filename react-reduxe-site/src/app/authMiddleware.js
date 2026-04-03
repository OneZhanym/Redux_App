// Middleware для кастомной валидации регистрации и логина
export const authMiddleware = store => next => action => {
  if (action.type === 'auth/registerUser') {
    const { username, password } = action.payload;
    // Кастомная валидация: логин 3-16 символов, пароль 6-32, только буквы/цифры
    const usernameValid = /^[a-zA-Z0-9_\-]{3,16}$/.test(username);
    const passwordValid = /^[a-zA-Z0-9!@#$%^&*()_\-]{6,32}$/.test(password);
    if (!usernameValid) {
      alert('Логин должен быть 3-16 символов, только буквы, цифры, _ или -');
      return; // Не пропускаем экшен дальше
    }
    if (!passwordValid) {
      alert('Пароль должен быть 6-32 символа, только буквы, цифры и спецсимволы');
      return;
    }
  }
  if (action.type === 'auth/loginUser') {
    const { username, password } = action.payload;
    if (!username || !password) {
      alert('Введите логин и пароль!');
      return;
    }
  }
  return next(action);
};
