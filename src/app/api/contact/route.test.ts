import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

// Mock Resend
const mockSendEmail = vi.fn().mockResolvedValue({ data: { id: 'mock-email-id' }, error: null });

vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = {
      send: mockSendEmail,
    };
  },
}));

// Mock the email template
vi.mock('./emailTemplate', () => ({
  generateContactEmailHTML: vi.fn().mockResolvedValue('<html>Mock Email</html>'),
}));

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendEmail.mockResolvedValue({ data: { id: 'mock-email-id' }, error: null });
    process.env.RESEND_API_KEY = 'test-api-key';
    process.env.CONTACT_EMAIL = 'test@example.com';
  });

  it('returns 400 for missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        // missing email, subject, message
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing required fields');
  });

  it('returns 200 and sends email on success', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        subject: 'estate-planning',
        message: 'I need help with estate planning',
        preferredContact: 'email',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.messageId).toBe('mock-email-id');
  });

  it('includes [TEST] prefix in non-production environments', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'estate-planning',
        message: 'Test message',
      }),
    });

    await POST(request);

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining('[TEST]'),
      })
    );

    process.env.NODE_ENV = originalEnv;
  });

  it('returns 500 if email service fails', async () => {
    mockSendEmail.mockResolvedValueOnce({
      data: null,
      error: { message: 'Email service error' },
    });

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'estate-planning',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to send email');
  });

  it('handles JSON parsing errors gracefully', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'invalid json',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Internal server error');
  });
});

