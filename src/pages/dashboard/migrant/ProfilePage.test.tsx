import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import ProfilePage from './ProfilePage';

const mockFetchMigrantProfile = vi.fn();
const mockUpdateDocument = vi.fn();
const mockUpdateUserProfile = vi.fn();
const mockRefreshProfile = vi.fn();
const stableUser = { uid: 'u1' };

vi.mock('@/api/migrantProfile', () => ({
  fetchMigrantProfile: (...args: unknown[]) => mockFetchMigrantProfile(...args),
}));

vi.mock('@/integrations/firebase/firestore', () => ({
  updateDocument: (...args: unknown[]) => mockUpdateDocument(...args),
}));

vi.mock('@/integrations/firebase/auth', () => ({
  updateUserProfile: (...args: unknown[]) => mockUpdateUserProfile(...args),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: stableUser, refreshProfile: mockRefreshProfile }),
}));

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({ language: 'pt', setLanguage: vi.fn() }),
}));

describe('ProfilePage (dashboard/migrante)', () => {
  it('mostra loading e depois renderiza dados vindos da base de dados', async () => {
    mockFetchMigrantProfile.mockResolvedValueOnce({
      userProfile: { email: 'ana@exemplo.com', name: 'Ana', role: 'migrant', createdAt: null, updatedAt: null },
      profile: { id: 'u1', name: 'Ana', email: 'ana@exemplo.com', phone: '+351900000000' },
      triage: { id: 'u1', userId: 'u1', legal_status: 'regularized', work_status: 'employed', language_level: 'basic', urgencies: ['legal'], interests: ['it'] },
      sessions: [{ id: 's1', migrant_id: 'u1', session_type: 'mediador', scheduled_date: '2026-01-01', scheduled_time: '10:00', status: 'pending' }],
      progress: [{ id: 'p1', user_id: 'u1', trail_id: 't1', progress_percent: 50, modules_completed: 1, completed_at: null }],
      trails: { t1: { id: 't1', title: 'Trilha 1', modules_count: 3 } },
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(document.querySelector('.animate-spin')).not.toBeNull();

    expect(await screen.findByText('Perfil')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveValue('ana@exemplo.com');
    expect(screen.getByText('Status Migratório')).toBeInTheDocument();
    expect(screen.getByText('Histórico de Marcações')).toBeInTheDocument();
    expect(screen.getByText('Histórico de Trilhas')).toBeInTheDocument();
  });

  it('mostra estado de não encontrado quando o perfil não existe', async () => {
    mockFetchMigrantProfile.mockResolvedValueOnce({
      userProfile: { email: 'ana@exemplo.com', name: 'Ana', role: 'migrant', createdAt: null, updatedAt: null },
      profile: null,
      triage: null,
      sessions: [],
      progress: [],
      trails: {},
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    expect(await screen.findByText('Perfil não encontrado.')).toBeInTheDocument();
  });

  it('mostra erro quando a API falha', async () => {
    mockFetchMigrantProfile.mockRejectedValueOnce(new Error('boom'));
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    expect(await screen.findByText('Não foi possível carregar os dados do perfil.')).toBeInTheDocument();
  });

  it('guarda alterações no Firestore', async () => {
    const user = userEvent.setup();
    mockFetchMigrantProfile.mockResolvedValueOnce({
      userProfile: { email: 'ana@exemplo.com', name: 'Ana', role: 'migrant', createdAt: null, updatedAt: null },
      profile: { id: 'u1', name: 'Ana', email: 'ana@exemplo.com', phone: null },
      triage: null,
      sessions: [],
      progress: [],
      trails: {},
    });

    mockUpdateDocument.mockResolvedValueOnce(undefined);
    mockUpdateUserProfile.mockResolvedValueOnce(undefined);
    mockRefreshProfile.mockResolvedValueOnce(undefined);
    mockFetchMigrantProfile.mockResolvedValueOnce({
      userProfile: { email: 'ana@exemplo.com', name: 'Ana Maria', role: 'migrant', createdAt: null, updatedAt: null },
      profile: { id: 'u1', name: 'Ana Maria', email: 'ana@exemplo.com', phone: null },
      triage: null,
      sessions: [],
      progress: [],
      trails: {},
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );
    await screen.findByText('Perfil');

    await user.clear(screen.getByLabelText('Nome'));
    await user.type(screen.getByLabelText('Nome'), 'Ana Maria');
    await user.click(screen.getByRole('button', { name: 'Guardar alterações' }));

    await waitFor(() => {
      expect(mockUpdateDocument).toHaveBeenCalledWith('profiles', 'u1', expect.objectContaining({ name: 'Ana Maria' }));
      expect(mockUpdateUserProfile).toHaveBeenCalledWith('u1', expect.objectContaining({ name: 'Ana Maria' }));
    });
  });
});
