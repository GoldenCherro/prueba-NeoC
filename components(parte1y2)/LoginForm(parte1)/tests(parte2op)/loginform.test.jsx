import { render, screen } from '@testing-library/react';
import React from 'react';
import LoginForm from '..';

jest.mock('../api/user.service');
describe('LoginForm', () => {
    it('renders a login form', () => {
        const { getByRole } = render(<LoginForm />);
 
        expect(getByRole('input', { name: /username/i})).toBeInTheDocument();
        expect(getByRole('input', { name: /password/i})).toBeInTheDocument();
        expect(getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('displays validation errors when fields are empty', () => {
        const { getByRole } = render(<LoginForm />);

        fireEvent.click(getByRole('button', { name: /login/i }));

        const usernameInput = getByRole('input', { name: /username/i});
        const passwordInput = getByRole('input', { name: /password/i});

        expect(usernameInput).toBeInvalid(); 
        expect(passwordInput).toBeInvalid();
    });

    it('shows loading state and submits form', async () => {
        doLogin.mockResolvedValueOnce({});
        const { getByRole, findByRole } = render(<LoginForm />);

        const usernameInput = getByRole('input', { name: /username/i});
        const passwordInput = getByRole('input', { name: /password/i});
      
        fireEvent.change(usernameInput, { target: { value: 'user' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
      
        expect(getByRole('button', { name: /loading/i })).toBeInTheDocument();
        
        await findByRole('button', { name: /login/i });

        expect(doLogin).toHaveBeenCalledWith('user', 'password');
      });

      it('submits form successfully when all fields are filled and calls doLogin', async () => {
        doLogin.mockResolvedValueOnce({});
        const username = 'user';
        const password = 'password';
        const { getByRole } = render(<LoginForm />);
        
        const usernameInput = getByRole('input', { name: /username/i});
        const passwordInput = getByRole('input', { name: /password/i});
      
        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(getByRole('button', { name: /login/i }));
      
        expect(doLogin).toHaveBeenCalledWith( username, password);
        expect(usernameInput).toBeValid();
        expect(passwordInput).toBeValid();
      });
});
