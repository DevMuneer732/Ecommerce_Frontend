import type { ReactNode } from 'react';

export const Content = ({ children }: { children: ReactNode }) => {
  return (
      <div className='min-h-screen'>{children}</div>
  );
};
