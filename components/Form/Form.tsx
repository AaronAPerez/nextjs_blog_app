'use client';

import { useState } from 'react';
import { Button } from '../Button/Button';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface FormData {
  email: string;
  password: string;
}

export const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  useKeyboardNavigation({
    onEnter: () => {
      // Handle enter key press
    },
    onEscape: () => {
      // Handle escape key press
    }
  });

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-4"
      role="form"
      aria-label="Login form"
    >
      <div>
        <label 
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300"
          aria-required="true"
        />
      </div>

      <div>
        <label 
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300"
          aria-required="true"
        />
      </div>

      <Button
        variant="primary"
        aria-label="Submit login form"
      >
        Submit
      </Button>
    </form>
  );
};