import { useMemo, useState } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Building2,
  Briefcase,
  Check,
  CirclePlus,
  EllipsisVertical,
  MapPin,
  MessagesSquare,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
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
import CandidatesPage from './company/CandidatesPage';
import CompanyApplicationsPage from './company/CompanyApplicationsPage';

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

function CompanyProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground">
          <span>{t.get('company.profile.breadcrumbs.settings')}</span>
          <span className="text-muted-foreground/60">›</span>
          <span className="text-primary">{t.get('company.profile.breadcrumbs.companyProfile')}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">{t.get('company.profile.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t.get('company.profile.description')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="cpc-card p-6">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground text-center">{t.get('company.profile.logoSection')}</p>
            <div className="mt-6">
              <div className="mx-auto h-40 w-40 rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 flex items-center justify-center">
                <div className="h-24 w-24 rounded-xl bg-background shadow-sm border" />
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                {t.get('company.profile.logoRecommendation')}
              </p>
              <button type="button" className="mt-4 w-full text-sm font-medium text-primary hover:underline">
                {t.get('company.profile.changeLogo')}
              </button>
            </div>
          </div>

          <div className="cpc-card p-6 bg-primary/5 border-primary/10">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold">{t.get('company.profile.accountVerification.title')}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.get('company.profile.accountVerification.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="cpc-card p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center">
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-lg">{t.get('company.profile.legalInfoTitle')}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-widest text-muted-foreground">{t.get('company.profile.labels.legalName')}</label>
              <Input defaultValue="Empresa Inovação Digital, Lda" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-widest text-muted-foreground">{t.get('company.profile.labels.taxId')}</label>
              <Input defaultValue="500 000 000" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold tracking-widest text-muted-foreground">{t.get('company.profile.labels.activityArea')}</label>
              <Input defaultValue="Tecnologia e Software" />
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="font-semibold text-lg">{t.get('company.profile.contactLocationTitle')}</p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold tracking-widest text-muted-foreground">{t.get('company.profile.labels.fiscalAddress')}</label>
              <Input defaultValue="Avenida da Liberdade, nº 100, 4º Esq" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-widest text-muted-foreground">{t.get('company.profile.labels.phone')}</label>
              <Input defaultValue="+351 910 000 000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-widest text-muted-foreground">{t.get('company.profile.labels.corporateEmail')}</label>
              <Input defaultValue="geral@empresa.pt" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold tracking-widest text-muted-foreground">{t.get('company.profile.labels.notes')}</label>
              <Textarea placeholder={t.get('company.profile.placeholders.notes')} className="min-h-28" />
            </div>
          </div>

          <div className="mt-10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <Button variant="outline">{t.get('company.profile.actions.cancel')}</Button>
            <Button>
              <Check className="h-4 w-4 mr-2" />
              {t.get('company.profile.actions.saveChanges')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type CompanyConversation = {
  id: string;
  name: string;
  subtitle: string;
  lastMessage: string;
  timeLabel: string;
  unread?: boolean;
};

function CompanyMessagesPage() {
  const { t } = useLanguage();

  const conversations: CompanyConversation[] = useMemo(
    () => [
      {
        id: 'c1',
        name: 'Maria Oliveira',
        subtitle: 'Candidata para Gestora de Produto',
        lastMessage: 'Olá, confirmo a minha disponibilidade…',
        timeLabel: '10:45',
        unread: true,
      },
      {
        id: 'c2',
        name: 'João Santos',
        subtitle: 'Técnico CPC - Manutenção',
        lastMessage: 'O relatório semanal já foi submetido no…',
        timeLabel: '09:12',
      },
      {
        id: 'c3',
        name: 'Ana Soares',
        subtitle: 'Candidata para UX Designer',
        lastMessage: 'Gostaria de agendar a entrevista técnica?',
        timeLabel: 'Ontem',
      },
      {
        id: 'c4',
        name: 'Pedro Martins',
        subtitle: 'Técnico de Redes',
        lastMessage: 'A configuração está concluída com suce…',
        timeLabel: 'Ontem',
      },
    ],
    []
  );

  const [activeConversationId, setActiveConversationId] = useState(conversations[0]?.id ?? 'c1');
  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? conversations[0];

  return (
    <div className="cpc-card overflow-hidden">
      <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] min-h-[640px]">
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight">{t.get('company.messages.title')}</h1>
            <span className="text-xs font-semibold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              {t.get('company.messages.newCount', { count: 4 })}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <button type="button" className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">
              {t.get('company.messages.filters.all')}
            </button>
            <button type="button" className="px-4 py-2 rounded-full bg-muted text-sm hover:bg-muted/80">
              {t.get('company.messages.filters.candidates')}
            </button>
            <button type="button" className="px-4 py-2 rounded-full bg-muted text-sm hover:bg-muted/80">
              {t.get('company.messages.filters.technicians')}
            </button>
          </div>

          <div className="mt-6 space-y-2">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setActiveConversationId(conversation.id)}
                  className={`w-full text-left rounded-2xl px-4 py-4 transition-colors ${
                    isActive ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-muted/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {conversation.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold truncate">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground shrink-0">{conversation.timeLabel}</span>
                      </div>
                      <p className="text-sm text-primary truncate mt-0.5">{conversation.subtitle}</p>
                      <div className="flex items-center justify-between gap-3 mt-1">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unread ? (
                          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l bg-muted/20">
          <div className="p-6 bg-background border-b">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-11 w-11 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {activeConversation?.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{activeConversation?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {activeConversation?.subtitle} <span className="mx-1">•</span> {t.get('company.messages.onlineNow')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-10 w-10 rounded-xl border bg-background hover:bg-muted flex items-center justify-center"
                  aria-label={t.get('company.messages.aria.videoCall')}
                >
                  <Video className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  className="h-10 w-10 rounded-xl border bg-background hover:bg-muted flex items-center justify-center"
                  aria-label={t.get('company.messages.aria.call')}
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  className="h-10 w-10 rounded-xl border bg-background hover:bg-muted flex items-center justify-center"
                  aria-label={t.get('company.messages.aria.moreOptions')}
                >
                  <EllipsisVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center">
              <span className="text-xs font-semibold tracking-widest text-muted-foreground bg-background px-4 py-2 rounded-full border">
                {t.get('company.messages.today')}
              </span>
            </div>

            <div className="flex items-start gap-3 max-w-2xl">
              <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-muted-foreground">MO</span>
              </div>
              <div className="rounded-3xl bg-background border px-6 py-4 text-sm leading-relaxed">
                {t.get('company.messages.sample.message1')}
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-2xl ml-auto justify-end">
              <div className="rounded-3xl bg-primary text-primary-foreground px-6 py-4 text-sm leading-relaxed">
                {t.get('company.messages.sample.message2')}
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-2xl">
              <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-muted-foreground">MO</span>
              </div>
              <div className="rounded-3xl bg-background border px-6 py-4 text-sm leading-relaxed">
                {t.get('company.messages.sample.message3')}
              </div>
            </div>
          </div>

          <div className="p-6 bg-background border-t">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="h-11 w-11 rounded-2xl bg-muted hover:bg-muted/80 flex items-center justify-center"
                aria-label={t.get('company.messages.aria.add')}
              >
                <CirclePlus className="h-5 w-5 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="h-11 w-11 rounded-2xl bg-muted hover:bg-muted/80 flex items-center justify-center"
                aria-label={t.get('company.messages.aria.emoji')}
              >
                <Smile className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="relative flex-1">
                <Input
                  placeholder={t.get('company.messages.messagePlaceholder')}
                  className="h-12 rounded-full pl-12 pr-14 bg-muted/30 border-muted"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                    aria-label={t.get('company.messages.aria.send')}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyHome() {
  const { t } = useLanguage();

  const stats = [
    { label: t.get('company.home.stats.activeOffers'), value: 3, icon: Briefcase },
    { label: t.get('company.home.stats.receivedApplications'), value: 12, icon: FileText },
    { label: t.get('company.home.stats.viewedCandidates'), value: 8, icon: Eye },
    { label: t.get('company.home.stats.hires'), value: 2, icon: CheckCircle },
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Auxiliar de Limpeza',
      location: 'Lisboa',
      applications: 5,
      status: 'active',
      postedDate: '25 Nov',
    },
    {
      id: 2,
      title: 'Operador de Armazém',
      location: 'Sintra',
      applications: 4,
      status: 'active',
      postedDate: '20 Nov',
    },
    {
      id: 3,
      title: 'Assistente Administrativo',
      location: 'Lisboa',
      applications: 3,
      status: 'in_review',
      postedDate: '15 Nov',
    },
  ];

  const recentCandidates = [
    { id: 1, name: 'Maria Silva', position: 'Auxiliar de Limpeza', date: '02 Dez', status: 'new' },
    { id: 2, name: 'Ahmed Hassan', position: 'Operador de Armazém', date: '01 Dez', status: 'viewed' },
    { id: 3, name: 'Ana Pereira', position: 'Auxiliar de Limpeza', date: '30 Nov', status: 'in_analysis' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-700';
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'viewed':
      case 'in_analysis':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    return t.get(`company.status.${status}`);
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
              {t.get('company.home.activeJobsTitle')}
            </h2>
            <Link to="/dashboard/empresa/ofertas" className="text-sm text-primary hover:underline">
              {t.get('company.common.viewAll')}
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
                    {job.location} • {t.get('company.home.applicationsCount', { count: job.applications })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                    {getStatusLabel(job.status)}
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
              {t.get('company.home.recentApplicationsTitle')}
            </h2>
            <Link to="/dashboard/empresa/candidatos" className="text-sm text-primary hover:underline">
              {t.get('company.common.viewAll')}
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
                    {getStatusLabel(candidate.status)}
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
              <h3 className="text-lg font-semibold">{t.get('company.home.promo.title')}</h3>
              <p className="opacity-90 text-sm">
                {t.get('company.home.promo.description')}
              </p>
            </div>
            <Link to="/dashboard/empresa/nova-oferta">
              <Button variant="hero-outline" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                {t.get('company.home.promo.cta')}
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
  const { language, t } = useLanguage();
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
    return isGeneric ? (derivedFromEmail || t.get('company.menu.user_fallback')) : rawName;
  })();

  const locale = language === 'en' ? 'en-GB' : language === 'es' ? 'es-ES' : 'pt-PT';
  const longDateFormatter = new Intl.DateTimeFormat(locale);

  const sidebarItemsMain = [
    { to: '/dashboard/empresa', label: t.get('company.menu.overview'), icon: TrendingUp },
    { to: '/dashboard/empresa/ofertas', label: t.get('company.menu.offers'), icon: Briefcase },
    { to: '/dashboard/empresa/candidaturas', label: t.get('company.menu.applications'), icon: FileText },
    { to: '/dashboard/empresa/nova-oferta', label: t.get('company.menu.new_offer'), icon: Plus },
    { to: '/dashboard/empresa/candidatos', label: t.get('company.menu.candidates'), icon: Users },
  ];

  const sidebarItemsProfile = [{ to: '/dashboard/empresa/perfil', label: t.get('company.menu.profile'), icon: Building2 }];
  const sidebarItemsMessages = [{ to: '/dashboard/empresa/mensagens', label: t.get('company.menu.messages'), icon: MessagesSquare }];

  return (
    <Layout>
      <div className="cpc-section">
        <div className="cpc-container">
          <div className="grid lg:grid-cols-[250px_minmax(0,1fr)] gap-6">
            <aside className="cpc-card p-4 h-fit lg:sticky lg:top-24">
              <div className="mb-4 px-2">
                <p className="text-sm text-muted-foreground">{t.get('company.menu.title')}</p>
                <p className="font-semibold">{displayName}</p>
              </div>

              <nav className="space-y-1">
                {sidebarItemsMain.map((item) => (
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

                <div className="pt-4 mt-4 border-t">
                  <p className="px-2 text-xs font-semibold tracking-widest text-muted-foreground">{t.get('company.menu.sections.settings')}</p>
                  <div className="mt-2 space-y-1">
                    {sidebarItemsProfile.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t">
                  <p className="px-2 text-xs font-semibold tracking-widest text-muted-foreground">{t.get('company.menu.sections.messages')}</p>
                  <div className="mt-2 space-y-1">
                    {sidebarItemsMessages.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </nav>
            </aside>

            <div>
              {isHome ? (
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                      {t.get('company.dashboard.welcome')}{' '}
                      <span className="text-primary">{displayName}</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.get('company.dashboard.summary', { date: longDateFormatter.format(new Date()) })}
                    </p>
                  </div>
                  <Link to="/dashboard/empresa/nova-oferta" className="shrink-0">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      {t.get('company.menu.new_offer')}
                    </Button>
                  </Link>
                </div>
              ) : null}

              <Routes>
                <Route index element={<CompanyHome />} />
                <Route path="nova-oferta" element={<CreateJobPage />} />
                <Route path="ofertas" element={<MyJobsPage />} />
                <Route path="candidaturas" element={<CompanyApplicationsPage />} />
                <Route path="perfil" element={<CompanyProfilePage />} />
                <Route path="mensagens" element={<CompanyMessagesPage />} />
                <Route path="ofertas/:jobId/candidaturas" element={<JobApplicationsPage />} />
                <Route
                  path="candidatos"
                  element={<CandidatesPage />}
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
