import { useState } from 'react';

export default function Form() {
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
    nameError: false,
    emailError: false,
    passwordError: false,
  });

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
    setError((prevError) => ({ ...prevError, nameError: false, message: '' }));
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setError((prevError) => ({ ...prevError, emailError: false, message: '' }));
  };

  // Handling the password change
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setSubmitted(false);
    setError((prevError) => ({ ...prevError, passwordError: false, message: '' }));

    // Password strength validation
    const isStrongPassword =
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[a-z]/.test(newPassword) &&
      /\d/.test(newPassword) &&
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword);

    if (!isStrongPassword) {
      setError({
        status: true,
        message:
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        passwordError: true,
      });
    }
  };

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || !isValidEmail(email)) {
      setError({
        status: true,
        message: 'Please enter valid information for all fields.',
        nameError: name === '',
        emailError: !isValidEmail(email),
        passwordError: password === '',
      });
    } else {
      setSubmitted(true);
      setError({ status: false, message: '', nameError: false, emailError: false, passwordError: false });
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div className={`success ${submitted ? '' : 'hidden'}`}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div className="flex flex-col text-red-500">
        {error.status && (
          <>
            {error.message && <p className="mb-2">{error.message}</p>}
            {error.nameError && <p>Name is required</p>}
            {error.emailError && <p>Enter a valid email address</p>}
            {error.passwordError && (
              <p>
                Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.
              </p>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center w-64">
        {/* Labels and inputs for form data */}
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          onChange={handleName}
          className={`border border-gray-300 p-2 mb-4 ${error.nameError ? 'border-red-500' : ''}`}
          value={name}
          type="text"
          placeholder="Enter your name"
        />

        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          onChange={handleEmail}
          className={`border border-gray-300 p-2 mb-4 ${error.emailError ? 'border-red-500' : ''}`}
          value={email}
          type="email"
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          onChange={handlePassword}
          className={`border border-gray-300 p-2 mb-4 ${error.passwordError ? 'border-red-500' : ''}`}
          value={password}
          type="password"
          placeholder="Enter your password"
        />

        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
}
