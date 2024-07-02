import { describe, expect, it } from 'vitest';

import { loginSchema } from './login-form.schema';

describe('login form schema', () => {
  describe('password validation', () => {
    it('throws a corresponding error on password with length less then 8', () => {
      const loginObj = { email: 'test@test.com', password: '111Aa' };
      expect(() => loginSchema.parse(loginObj)).toThrow(/Password must be at least 8 characters long/i);
    });

    it('throws a corresponding error on password without upper case letters', () => {
      const loginObj = { email: 'test@test.com', password: '1111aaaa' };
      expect(() => loginSchema.parse(loginObj)).toThrow(/Password must contain at least one uppercase letter/i);
    });

    it('throws a corresponding error on password without lower case letters', () => {
      const loginObj = { email: 'test@test.com', password: '1111AAAA' };
      expect(() => loginSchema.parse(loginObj)).toThrow(/Password must contain at least one lowercase letter/i);
    });

    it('throws a corresponding error on password without numbers', () => {
      const loginObj = { email: 'test@test.com', password: 'AAAAaaaa' };
      expect(() => loginSchema.parse(loginObj)).toThrow(/Password must contain at least one number/i);
    });

    it('throws a corresponding error on password with trailing whitespaces', () => {
      const loginObj = { email: 'test@test.com', password: '11111111 ' };
      expect(() => loginSchema.parse(loginObj)).toThrow(/Password must not contain leading or trailing whitespace/i);
      loginObj.password = ' 11111111';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Password must not contain leading or trailing whitespace/i);
      loginObj.password = ' 11111111 ';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Password must not contain leading or trailing whitespace/i);
    });
  });
  describe('email validation', () => {
    it('throws a corresponding error on poorly formatted email', () => {
      const loginObj = { email: 'test', password: '1111AAaa' };
      expect(() => loginSchema.parse(loginObj)).toThrow(/Email address must be properly formatted/i);
      loginObj.email = 'test@test';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Email address must be properly formatted/i);
      loginObj.email = 'test@test.';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Email address must be properly formatted/i);
      loginObj.email = 'test@test@test';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Email address must be properly formatted/i);
      loginObj.email = 'test@test.com ';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Email address must be properly formatted/i);
      loginObj.email = ' test@test.com';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Email address must be properly formatted/i);
      loginObj.email = ' test@test.com ';
      expect(() => loginSchema.parse(loginObj)).toThrow(/Email address must be properly formatted/i);
    });
  });
  describe('valid login info', () => {
    it('validates login info without error', () => {
      const loginObj = { email: 'test@test.com', password: '1111AAaa' };
      expect(() => loginSchema.parse(loginObj)).not.toThrow();
    });
  });
});
