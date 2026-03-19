import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Users,
  FileText,
  Plus,
  ChevronRight,
  Eye,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

// Sub-pages
import CreateJobPage from './company/CreateJobPage';
import MyJobsPage from './company/MyJobsPage';
import JobApplicationsPage from './company/JobApplicationsPage';
import CandidateProfilePage from './company/CandidateProfilePage';

function normalizeText(value?: string | null): string {
  if (!value) return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function deriveNameFromEmail(email?: string | null): string {
  if (!email) return '';
  const local = email.split('@')[0] ?? '';
  const parts = local.split(/[._-]+/g).filter(Boolean);
  if (parts.length === 0) return '';
  return parts
    .map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
    .join(' ');
}

function CompanyHome() {
  const stats = [
    { label: 'Ofertas Ativas', value: 3, icon: Briefcase },
    { label: 'Candidaturas Recebidas', value: 12, icon: FileText },
    { label: 'Candidatos Visualizados', value: 8, icon: Eye },
    { label: 'Contratações', value: 2, icon: CheckCircle },
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Auxiliar de Limpeza',
      location: 'Lisboa',
      applications: 5,
      status: 'Ativa',
      postedDate: '25 Nov',
    },
    {
      id: 2,
      title: 'Operador de Armazém',
      location: 'Sintra',
      applications: 4,
      status: 'Ativa',
      postedDate: '20 Nov',
    },
    {
      id: 3,
      title: 'Assistente Administrativo',
      location: 'Lisboa',
      applications: 3,
      status: 'Em revisão',
      postedDate: '15 Nov',
    },
  ];

  const recentCandidates = [
    { id: 1, name: 'Maria Silva', position: 'Auxiliar de Limpeza', date: '02 Dez', status: 'Novo' },
    { id: 2, name: 'Ahmed Hassan', position: 'Operador de Armazém', date: '01 Dez', status: 'Visualizado' },
    { id: 3, name: 'Ana Pereira', position: 'Auxiliar de Limpeza', date: '30 Nov', status: 'Em análise' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa':
        return 'bg-green-100 text-green-700';
      case 'Em revisão':
        return 'bg-yellow-100 text-yellow-700';
      case 'Novo':
        return 'bg-blue-100 text-blue-700';
      case 'Visualizado':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="cpc-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs tracking-widest text-muted-foreground font-semibold">{stat.label}</p>
              <p className="text-2xl font-bold leading-tight mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6">
        {/* Active Jobs */}
        <div className="cpc-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Ofertas Ativas
            </h2>
            <Link to="/dashboard/empresa/ofertas" className="text-sm text-primary hover:underline">
              Ver todas
            </Link>
          </div>

          <div className="space-y-3">
            {activeJobs.map((job) => (
              <Link
                key={job.id}
                to="/dashboard/empresa/ofertas"
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.location} • {job.applications} candidaturas
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="cpc-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Candidaturas Recentes
            </h2>
            <Link to="/dashboard/empresa/candidatos" className="text-sm text-primary hover:underline">
              Ver todas
            </Link>
          </div>

          <div className="space-y-3">
            {recentCandidates.map((candidate) => (
              <Link
                key={candidate.id}
                to={`/dashboard/empresa/candidatos/${candidate.id}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-medium">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="cpc-card p-6 xl:col-span-2 cpc-gradient-bg text-primary-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Encontre os melhores candidatos</h3>
              <p className="opacity-90 text-sm">
                Publique ofertas e aceda a uma bolsa de candidatos qualificados e motivados
              </p>
            </div>
            <Link to="/dashboard/empresa/nova-oferta">
              <Button variant="hero-outline" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Criar Oferta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CompanyDashboard() {
  const location = useLocation();
  const { profile, user } = useAuth();
  const { language } = useLanguage();
  const isHome = location.pathname === '/dashboard/empresa' || location.pathname === '/dashboard/empresa/';

  const displayName = (() => {
    const rawName = typeof profile?.name === 'string' ? profile.name.trim() : '';
    const rawEmail = typeof profile?.email === 'string' ? profile.email.trim() : '';
    const authEmail = typeof user?.email === 'string' ? user.email.trim() : '';
    const email = rawEmail || authEmail;
    const derivedFromEmail = deriveNameFromEmail(email);
    const normalizedName = normalizeText(rawName);
    const normalizedRole = normalizeText(profile?.role ?? null);
    const isGeneric =
      normalizedName.length === 0 ||
      normalizedName === normalizedRole ||
      ['empresa', 'company', 'utilizador', 'user', 'admin'].includes(normalizedName);
    return isGeneric ? (derivedFromEmail || 'Utilizador') : rawName;
  })();

  const locale = language === 'en' ? 'en-GB' : language === 'es' ? 'es-ES' : 'pt-PT';
  const longDateFormatter = new Intl.DateTimeFormat(locale);

  const sidebarItems = [
    { to: '/dashboard/empresa', label: 'Visão geral', icon: TrendingUp },
    { to: '/dashboard/empresa/ofertas', label: 'Ofertas', icon: Briefcase },
    { to: '/dashboard/empresa/candidaturas', label: 'Candidaturas', icon: FileText },
    { to: '/dashboard/empresa/nova-oferta', label: 'Nova Oferta', icon: Plus },
    { to: '/dashboard/empresa/candidatos', label: 'Candidatos', icon: Users },
  ];

  return (
    <Layout>
      <div className="cpc-section">
        <div className="cpc-container">
          <div className="grid lg:grid-cols-[250px_minmax(0,1fr)] gap-6">
            <aside className="cpc-card p-4 h-fit lg:sticky lg:top-24">
              <div className="mb-4 px-2">
                <p className="text-sm text-muted-foreground">Menu Empresa</p>
                <p className="font-semibold">{displayName}</p>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/dashboard/empresa'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </aside>

            <div>
              {isHome ? (
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                      Bem-vindo(a), <span className="text-primary">{displayName}</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Resumo do seu painel em {longDateFormatter.format(new Date())}
                    </p>
                  </div>
                  <Link to="/dashboard/empresa/nova-oferta" className="shrink-0">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Oferta
                    </Button>
                  </Link>
                </div>
              ) : null}

              <Routes>
                <Route index element={<CompanyHome />} />
                <Route path="nova-oferta" element={<CreateJobPage />} />
                <Route path="ofertas" element={<MyJobsPage />} />
                <Route path="candidaturas" element={<MyJobsPage />} />
                <Route path="ofertas/:jobId/candidaturas" element={<JobApplicationsPage />} />
                <Route
                  path="candidatos"
                  element={<div className="cpc-card p-8 text-center text-sm text-muted-foreground">Em breve.</div>}
                />
                <Route path="candidatos/:candidateId" element={<CandidateProfilePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
