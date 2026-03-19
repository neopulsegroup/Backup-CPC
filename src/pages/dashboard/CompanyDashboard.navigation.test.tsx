import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import CompanyDashboard from './CompanyDashboard';

vi.mock('@/components/layout/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    profile: { name: 'Empresa', role: 'company', email: 'acme@teste.com' },
    user: { uid: 'u-company', email: 'acme@teste.com', displayName: 'Empresa' },
  }),
}));

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => {
    const translations: Record<string, string> = {
      'company.menu.title': 'Menu Empresa',
      'company.menu.overview': 'Visão geral',
      'company.menu.offers': 'Ofertas',
      'company.menu.applications': 'Candidaturas',
      'company.menu.new_offer': 'Nova Oferta',
      'company.menu.candidates': 'Candidatos',
      'company.menu.profile': 'Perfil',
      'company.menu.messages': 'Mensagens',
      'company.menu.sections.settings': 'Definições',
      'company.menu.sections.messages': 'Mensagens',
      'company.profile.title': 'Perfil da Empresa',
      'company.messages.title': 'Conversas',
    };

    return {
      language: 'pt',
      t: {
        get: (k: string, vars?: Record<string, unknown>) => {
          const template = translations[k] ?? k;
          if (!vars) return template;
          return Object.entries(vars).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)), template);
        },
      },
    };
  },
}));

vi.mock('./company/CreateJobPage', () => ({
  default: () => <div>Criar oferta</div>,
}));

vi.mock('./company/MyJobsPage', () => ({
  default: () => <div>Minhas ofertas</div>,
}));

vi.mock('./company/JobApplicationsPage', () => ({
  default: () => <div>Candidaturas da oferta</div>,
}));

vi.mock('./company/CandidateProfilePage', () => ({
  default: () => <div>Perfil do candidato</div>,
}));

describe('CompanyDashboard - navegação e estrutura', () => {
  it('renderiza sidebar, seções extra e marca item ativo ao navegar', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/empresa/ofertas']}>
        <Routes>
          <Route path="/dashboard/empresa/*" element={<CompanyDashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Menu Empresa')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Definições')).toBeInTheDocument();
    expect(screen.getByText('Mensagens', { selector: 'p' })).toBeInTheDocument();

    expect(screen.getByText('Minhas ofertas')).toBeInTheDocument();
    const offersLink = screen.getByRole('link', { name: 'Ofertas' });
    expect(offersLink.className).toContain('bg-primary');

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Nova Oferta' }));

    await waitFor(() => {
      expect(screen.getByText('Criar oferta')).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: 'Nova Oferta' }).className).toContain('bg-primary');
    expect(screen.getByRole('link', { name: 'Ofertas' }).className).not.toContain('bg-primary');

    await user.click(screen.getByRole('link', { name: 'Perfil' }));
    expect(await screen.findByRole('heading', { name: 'Perfil da Empresa' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Perfil' }).className).toContain('bg-primary');

    await user.click(screen.getByRole('link', { name: 'Mensagens' }));
    expect(await screen.findByRole('heading', { name: 'Conversas' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mensagens' }).className).toContain('bg-primary');
  });
});
