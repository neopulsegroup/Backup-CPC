import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, BookOpen, Clock, Edit } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fetchMigrantProfile, type MigrantProfileDoc, type MigrantProfileResponse } from '@/api/migrantProfile';
import { updateUserProfile } from '@/integrations/firebase/auth';
import { updateDocument } from '@/integrations/firebase/firestore';

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MigrantProfileResponse | null>(null);
  const [saving, setSaving] = useState(false);

  const [edit, setEdit] = useState<{
    name: string;
    phone: string;
    birthDate: string;
    nationality: string;
    currentLocation: string;
    arrivalDate: string;
    resumeUrl: string;
    professionalTitle: string;
    professionalExperience: string;
    skills: string;
    languagesList: string;
    mainNeeds: string;
    contactPreference: 'email' | 'phone';
  }>({
    name: '',
    phone: '',
    birthDate: '',
    nationality: '',
    currentLocation: '',
    arrivalDate: '',
    resumeUrl: '',
    professionalTitle: '',
    professionalExperience: '',
    skills: '',
    languagesList: '',
    mainNeeds: '',
    contactPreference: 'email',
  });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchMigrantProfile(user.uid);
        if (cancelled) return;
        const userKey = (user as unknown as { id?: string }).id || user.uid;
        const extrasRaw =
          localStorage.getItem(`profileExtras:${userKey}`) ||
          localStorage.getItem(`profileExtras:${user.uid}`) ||
          localStorage.getItem(`profileExtras:${String(userKey)}`);
        const extras = (() => {
          if (!extrasRaw) return null;
          try {
            return JSON.parse(extrasRaw) as Partial<MigrantProfileDoc>;
          } catch {
            return null;
          }
        })();

        setData(res);
        const p = res.profile;
        const merged: MigrantProfileDoc | null = p
          ? {
              ...p,
              birthDate: p.birthDate || extras?.birthDate || null,
              nationality: p.nationality || extras?.nationality || null,
              currentLocation: p.currentLocation || extras?.currentLocation || null,
              arrivalDate: p.arrivalDate || extras?.arrivalDate || null,
              resumeUrl: p.resumeUrl || extras?.resumeUrl || null,
              professionalTitle: p.professionalTitle || extras?.professionalTitle || null,
              professionalExperience: p.professionalExperience || extras?.professionalExperience || null,
              skills: p.skills || extras?.skills || null,
              languagesList: p.languagesList || extras?.languagesList || null,
              mainNeeds: p.mainNeeds || extras?.mainNeeds || null,
              contactPreference: p.contactPreference || extras?.contactPreference || null,
            }
          : null;

        if (p && extras) {
          const shouldMigrate =
            (!p.birthDate && extras.birthDate) ||
            (!p.nationality && extras.nationality) ||
            (!p.currentLocation && extras.currentLocation) ||
            (!p.arrivalDate && extras.arrivalDate) ||
            (!p.resumeUrl && extras.resumeUrl) ||
            (!p.professionalTitle && extras.professionalTitle) ||
            (!p.professionalExperience && extras.professionalExperience) ||
            (!p.skills && extras.skills) ||
            (!p.languagesList && extras.languagesList) ||
            (!p.mainNeeds && extras.mainNeeds) ||
            (!p.contactPreference && extras.contactPreference);

          if (shouldMigrate) {
            void updateDocument('profiles', user.uid, {
              birthDate: merged?.birthDate || null,
              nationality: merged?.nationality || null,
              currentLocation: merged?.currentLocation || null,
              arrivalDate: merged?.arrivalDate || null,
              resumeUrl: merged?.resumeUrl || null,
              professionalTitle: merged?.professionalTitle || null,
              professionalExperience: merged?.professionalExperience || null,
              skills: merged?.skills || null,
              languagesList: merged?.languagesList || null,
              mainNeeds: merged?.mainNeeds || null,
              contactPreference: merged?.contactPreference || null,
            });
          }
        }

        setEdit({
          name: merged?.name || res.userProfile?.name || '',
          phone: merged?.phone || '',
          birthDate: merged?.birthDate || '',
          nationality: merged?.nationality || '',
          currentLocation: merged?.currentLocation || '',
          arrivalDate: merged?.arrivalDate || '',
          resumeUrl: merged?.resumeUrl || '',
          professionalTitle: merged?.professionalTitle || '',
          professionalExperience: merged?.professionalExperience || '',
          skills: merged?.skills || '',
          languagesList: merged?.languagesList || '',
          mainNeeds: merged?.mainNeeds || '',
          contactPreference: (merged?.contactPreference as 'email' | 'phone') || 'email',
        });
      } catch (err: unknown) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : '';
        if (msg === 'PERMISSION_DENIED') {
          setError('Sem permissões para carregar o perfil. Termine a sessão e volte a iniciar.');
          return;
        }
        if (msg === 'PROFILE_READ_FAILED') {
          setError('Não foi possível carregar os dados do perfil.');
          return;
        }
        setError('Não foi possível carregar os dados do perfil.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const sessionsSorted = useMemo(() => {
    return (data?.sessions || []).slice().sort((a, b) => b.scheduled_date.localeCompare(a.scheduled_date));
  }, [data?.sessions]);

  const progressSorted = useMemo(() => {
    return (data?.progress || []).slice().sort((a, b) => (b.progress_percent || 0) - (a.progress_percent || 0));
  }, [data?.progress]);

  const profileDoc: MigrantProfileDoc | null = data?.profile || null;
  const triage = data?.triage || null;

  async function save() {
    if (!user) return;
    setSaving(true);
    try {
      await updateDocument('profiles', user.uid, {
        name: edit.name,
        phone: edit.phone || null,
        birthDate: edit.birthDate || null,
        nationality: edit.nationality || null,
        currentLocation: edit.currentLocation || null,
        arrivalDate: edit.arrivalDate || null,
        resumeUrl: edit.resumeUrl || null,
        professionalTitle: edit.professionalTitle || null,
        professionalExperience: edit.professionalExperience || null,
        skills: edit.skills || null,
        languagesList: edit.languagesList || null,
        mainNeeds: edit.mainNeeds || null,
        contactPreference: edit.contactPreference || null,
      });

      await updateUserProfile(user.uid, { name: edit.name });

      await refreshProfile();
      const res = await fetchMigrantProfile(user.uid);
      setData(res);
    } catch {
      setError('Não foi possível guardar as alterações do perfil.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="py-12 text-center text-muted-foreground">Precisa de iniciar sessão.</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!profileDoc) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Perfil não encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 grid lg:grid-cols-3 gap-6">
        <div className="cpc-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" />
              Perfil
            </h2>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback>{(edit.name || profileDoc.email || 'U').slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={edit.name} onChange={(e) => setEdit((s) => ({ ...s, name: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={edit.phone} onChange={(e) => setEdit((s) => ({ ...s, phone: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profileDoc.email || ''} disabled className="mt-1" />
            </div>
            <div>
              <Label htmlFor="birthDate">Data de nascimento</Label>
              <Input id="birthDate" type="date" value={edit.birthDate} onChange={(e) => setEdit((s) => ({ ...s, birthDate: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="nationality">Nacionalidade</Label>
              <Input id="nationality" value={edit.nationality} onChange={(e) => setEdit((s) => ({ ...s, nationality: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="currentLocation">Localização atual</Label>
              <Input id="currentLocation" value={edit.currentLocation} onChange={(e) => setEdit((s) => ({ ...s, currentLocation: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="arrivalDate">Data de chegada</Label>
              <Input id="arrivalDate" type="date" value={edit.arrivalDate} onChange={(e) => setEdit((s) => ({ ...s, arrivalDate: e.target.value }))} className="mt-1" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{profileDoc.email}</div>
            <Button onClick={save} disabled={saving}>{saving ? 'A guardar…' : 'Guardar alterações'}</Button>
          </div>
        </div>

        <div className="cpc-card p-6">
          <h2 className="font-semibold mb-4">Documentos</h2>
          <div className="space-y-3">
            <div>
              <Label htmlFor="resumeUrl">Link do currículo (URL)</Label>
              <Input id="resumeUrl" value={edit.resumeUrl} onChange={(e) => setEdit((s) => ({ ...s, resumeUrl: e.target.value }))} className="mt-1" placeholder="https://..." />
            </div>
            {edit.resumeUrl ? (
              <a href={edit.resumeUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                Abrir currículo
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">Sem currículo registado.</p>
            )}
          </div>
        </div>

        <div className="cpc-card p-6">
          <h2 className="font-semibold mb-4">Configurações</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="language">Idioma</Label>
              <Select value={language} onValueChange={(v) => setLanguage(v as typeof language)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contactPreference">Preferência de contacto</Label>
              <Select value={edit.contactPreference} onValueChange={(v) => setEdit((s) => ({ ...s, contactPreference: v as 'email' | 'phone' }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="cpc-card p-6">
          <h2 className="font-semibold mb-4">Status Migratório</h2>
          {triage ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Situação legal</span>
                <span>{triage.legal_status || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Situação laboral</span>
                <span>{triage.work_status || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nível de idioma</span>
                <span>{triage.language_level || '—'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Urgências</span>
                <div>{(triage.urgencies || []).length ? (triage.urgencies || []).join(', ') : '—'}</div>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Interesses</span>
                <div>{(triage.interests || []).length ? (triage.interests || []).join(', ') : '—'}</div>
              </div>
              <div className="pt-2">
                <Link to="/triagem" className="text-primary hover:underline">Atualizar dados de triagem</Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Triagem não encontrada.</p>
          )}
        </div>

        <div className="cpc-card p-6">
          <h2 className="font-semibold mb-4">Perfil Profissional</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="professionalTitle">Título profissional</Label>
              <Input id="professionalTitle" value={edit.professionalTitle} onChange={(e) => setEdit((s) => ({ ...s, professionalTitle: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="professionalExperience">Experiência</Label>
              <Textarea id="professionalExperience" value={edit.professionalExperience} onChange={(e) => setEdit((s) => ({ ...s, professionalExperience: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="skills">Competências</Label>
              <Textarea id="skills" value={edit.skills} onChange={(e) => setEdit((s) => ({ ...s, skills: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="languagesList">Idiomas</Label>
              <Input id="languagesList" value={edit.languagesList} onChange={(e) => setEdit((s) => ({ ...s, languagesList: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="mainNeeds">Necessidades principais</Label>
              <Textarea id="mainNeeds" value={edit.mainNeeds} onChange={(e) => setEdit((s) => ({ ...s, mainNeeds: e.target.value }))} className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="cpc-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Histórico de Marcações
            </h2>
            <Link to="/dashboard/migrante/sessoes" className="text-sm text-primary hover:underline">Ver todas</Link>
          </div>
          {sessionsSorted.length ? (
            <div className="space-y-3">
              {sessionsSorted.slice(0, 5).map((s) => (
                <div key={s.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{s.session_type}</p>
                    <p className="text-sm text-muted-foreground">Status: {s.status || '—'}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">{new Date(s.scheduled_date).toLocaleDateString('pt-PT')}</p>
                    <p className="text-muted-foreground">{s.scheduled_time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sem marcações registadas.</p>
          )}
        </div>

        <div className="cpc-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Histórico de Trilhas
            </h2>
            <Link to="/dashboard/migrante/trilhas" className="text-sm text-primary hover:underline">Ver todas</Link>
          </div>
          {progressSorted.length ? (
            <div className="space-y-4">
              {progressSorted.slice(0, 6).map((p) => {
                const t = data?.trails?.[p.trail_id];
                const percent = p.progress_percent || 0;
                const total = t?.modules_count || 0;
                const completed = p.modules_completed || 0;
                return (
                  <Link key={p.id || p.trail_id} to={`/dashboard/migrante/trilhas/${p.trail_id}`} className="block p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{t?.title || p.trail_id}</p>
                      <span className="text-xs text-muted-foreground">
                        {completed}/{total} módulos
                      </span>
                    </div>
                    <Progress value={percent} className="h-2" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Ainda não iniciou nenhuma trilha.</p>
          )}
        </div>
      </div>
    </>
  );
}
