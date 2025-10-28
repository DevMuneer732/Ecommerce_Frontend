import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../../App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeChooserProvider } from '../../contexts/theme-chooser';

export const queryClient = new QueryClient();

describe('App', () => {
  it('renders headline', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeChooserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeChooserProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText('option 1')).toBeInTheDocument();
  });
});
