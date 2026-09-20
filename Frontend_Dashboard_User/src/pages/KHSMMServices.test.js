import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import KHSMMServices from './KHSMMServices';
import { listProducts } from '../api';

jest.mock('../api', () => ({
  listProducts: jest.fn(),
  fullUrl: (p) => p,
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { shop_id: 7 } }),
}));

describe('KHSMMServices', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    root.unmount();
    container.remove();
    jest.clearAllMocks();
  });

  it('shows paid Facebook and Telegram service packages', async () => {
    listProducts.mockResolvedValue([
      {
        id: 1,
        name: 'Facebook Followers 1000',
        description: 'Boost Facebook page reach',
        price: 12,
        sale_price: null,
        images: ['https://example.com/fb.png'],
        metadata: { is_khsmm_service: true, service_platform: 'facebook', service_type: 'followers' },
      },
      {
        id: 2,
        name: 'Telegram Members 500',
        description: 'Fast Telegram channel growth',
        price: 8,
        sale_price: null,
        images: [],
        metadata: { is_khsmm_service: true, service_platform: 'telegram', service_type: 'members' },
      },
    ]);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <KHSMMServices />
        </MemoryRouter>
      );
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(container.textContent).toContain('Facebook');
    expect(container.textContent).toContain('Telegram');
    expect(container.textContent).toContain('Paid only');
  });
});
