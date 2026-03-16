import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { COOKIE_CONSENT_OPEN_SETTINGS_EVENT, defaultCookieConsentCategories, needsCookieConsentPrompt, readCookieConsent, writeCookieConsent } from '@/lib/cookieConsent';
import { ChevronDown } from 'lucide-react';

type Preferences = {
  analytics: boolean;
  personalization: boolean;
  externalServices: boolean;
};

type AccordionSectionId = 'necessary' | 'analytics' | 'personalization' | 'externalServices';

function getInitialPreferences(): Preferences {
  const existing = readCookieConsent();
  if (!existing) {
    const defaults = defaultCookieConsentCategories();
    return {
      analytics: defaults.analytics,
      personalization: defaults.personalization,
      externalServices: defaults.externalServices,
    };
  }

  return {
    analytics: existing.analytics,
    personalization: existing.personalization,
    externalServices: existing.externalServices,
  };
}

function CookieAccordionSection({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: AccordionSectionId;
  title: string;
  open: boolean;
  onToggle: (id: AccordionSectionId) => void;
  children: React.ReactNode;
}) {
  const contentId = `cookie-consent-section-${id}`;

  return (
    <div className="rounded-lg border border-border overflow-hidden min-w-0">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => onToggle(id)}
      >
        <span className="font-medium text-foreground">{title}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        id={contentId}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed whitespace-normal break-words">{children}</div>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(() => getInitialPreferences());
  const [multiMode, setMultiMode] = useState(false);
  const [openSections, setOpenSections] = useState<AccordionSectionId[]>([]);

  const accordionSections = useMemo(() => {
    return [
      { id: 'necessary' as const, title: 'Cookies Estritamente Necessários' },
      { id: 'analytics' as const, title: 'Cookies de Desempenho e Estatística' },
      { id: 'personalization' as const, title: 'Cookies de Personalização' },
      { id: 'externalServices' as const, title: 'Cookies de Serviços Externos' },
    ];
  }, []);

  const bannerTitle = 'Utilizamos cookies para melhorar a sua experiência';
  const bannerDescription = useMemo(() => {
    return (
      <>
        A Plataforma CPC utiliza cookies essenciais para garantir o funcionamento do sistema e cookies opcionais para melhorar a experiência de
        navegação, analisar a utilização da plataforma e personalizar conteúdos. Pode aceitar todos os cookies, rejeitar os cookies opcionais ou
        configurar as suas preferências. Para mais informações, consulte a nossa{' '}
        <Link className="text-primary underline underline-offset-4" to="/cookies">
          Política de Cookies
        </Link>{' '}
        e{' '}
        <Link className="text-primary underline underline-offset-4" to="/privacidade">
          Política de Privacidade
        </Link>
        .
      </>
    );
  }, []);

  const openPreferences = () => {
    setPreferences(getInitialPreferences());
    setDialogOpen(true);
  };

  const acceptAll = () => {
    writeCookieConsent({ analytics: true, personalization: true, externalServices: true });
    setShowBanner(false);
    setDialogOpen(false);
  };

  const rejectOptional = () => {
    writeCookieConsent({ analytics: false, personalization: false, externalServices: false });
    setShowBanner(false);
    setDialogOpen(false);
  };

  const savePreferences = () => {
    writeCookieConsent(preferences);
    setShowBanner(false);
    setDialogOpen(false);
  };

  useEffect(() => {
    setShowBanner(needsCookieConsentPrompt());
  }, []);

  useEffect(() => {
    const onOpen = () => openPreferences();
    window.addEventListener(COOKIE_CONSENT_OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    setMultiMode(false);
    setOpenSections([]);
  }, [dialogOpen]);

  const toggleSection = (id: AccordionSectionId) => {
    if (multiMode) {
      setMultiMode(false);
      setOpenSections([id]);
      return;
    }

    setOpenSections((prev) => (prev.includes(id) ? [] : [id]));
  };

  const allExpanded = openSections.length === accordionSections.length;
  const toggleExpandAll = () => {
    if (allExpanded) {
      setMultiMode(false);
      setOpenSections([]);
      return;
    }

    setMultiMode(true);
    setOpenSections(accordionSections.map((s) => s.id));
  };
  const bannerVisible = showBanner && !dialogOpen;

  return (
    <>
      {bannerVisible && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="cpc-container py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="font-semibold text-foreground">{bannerTitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{bannerDescription}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="secondary" onClick={rejectOptional}>
                  Rejeitar cookies opcionais
                </Button>
                <Button variant="outline" onClick={openPreferences}>
                  Configurar preferências
                </Button>
                <Button onClick={acceptAll}>Aceitar todos</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[90vw] max-w-[600px] max-h-[80vh] overflow-hidden p-0 flex flex-col">
          <div className="p-4 pb-2">
            <DialogHeader className="flex flex-row items-center justify-between space-y-0 text-left">
              <DialogTitle>Preferências de Cookies</DialogTitle>
              <Button variant="ghost" size="sm" onClick={toggleExpandAll}>
                {allExpanded ? 'Recolher tudo' : 'Expandir tudo'}
              </Button>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-normal break-words">
                Pode escolher quais os tipos de cookies que autoriza na Plataforma CPC. Alguns cookies são essenciais para o funcionamento do
                sistema e não podem ser desativados.
              </p>

              <div className="space-y-3">
                <CookieAccordionSection
                  id="necessary"
                  title="Cookies Estritamente Necessários"
                  open={openSections.includes('necessary')}
                  onToggle={toggleSection}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-medium text-foreground">Sempre ativos</p>
                      <p className="text-sm text-muted-foreground">Estado: Ativo (não pode ser desativado)</p>
                    </div>
                    <Switch checked disabled aria-label="Cookies estritamente necessários (sempre ativos)" />
                  </div>
                  <div className="mt-4 space-y-3">
                    <p>Estes cookies são essenciais para o funcionamento da plataforma e permitem funcionalidades básicas como:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>login e autenticação</li>
                      <li>navegação segura</li>
                      <li>acesso às áreas reservadas</li>
                      <li>gestão de sessões</li>
                      <li>utilização das funcionalidades principais da plataforma.</li>
                    </ul>
                    <p>Sem estes cookies, a plataforma não pode funcionar corretamente.</p>
                  </div>
                </CookieAccordionSection>

                <CookieAccordionSection
                  id="analytics"
                  title="Cookies de Desempenho e Estatística"
                  open={openSections.includes('analytics')}
                  onToggle={toggleSection}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-medium text-foreground">Controlo</p>
                      <p className="text-sm text-muted-foreground">Ativar / Desativar</p>
                    </div>
                    <Switch
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, analytics: checked }))}
                      aria-label="Cookies de desempenho e estatística"
                    />
                  </div>
                  <div className="mt-4 space-y-3">
                    <p>Estes cookies ajudam-nos a compreender como os utilizadores interagem com a plataforma. Permitem analisar, por exemplo:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>páginas mais visitadas</li>
                      <li>tempo de permanência</li>
                      <li>desempenho do sistema</li>
                      <li>eventuais erros técnicos.</li>
                    </ul>
                    <p>As informações recolhidas são agregadas e utilizadas apenas para melhorar a plataforma.</p>
                  </div>
                </CookieAccordionSection>

                <CookieAccordionSection
                  id="personalization"
                  title="Cookies de Personalização"
                  open={openSections.includes('personalization')}
                  onToggle={toggleSection}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-medium text-foreground">Controlo</p>
                      <p className="text-sm text-muted-foreground">Ativar / Desativar</p>
                    </div>
                    <Switch
                      checked={preferences.personalization}
                      onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, personalization: checked }))}
                      aria-label="Cookies de personalização"
                    />
                  </div>
                  <div className="mt-4 space-y-3">
                    <p>Estes cookies permitem adaptar a experiência de navegação às preferências do utilizador. Podem ser utilizados para:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>guardar idioma preferido</li>
                      <li>apresentar conteúdos relevantes</li>
                      <li>recomendar trilhas formativas</li>
                      <li>melhorar a experiência de utilização.</li>
                    </ul>
                  </div>
                </CookieAccordionSection>

                <CookieAccordionSection
                  id="externalServices"
                  title="Cookies de Serviços Externos"
                  open={openSections.includes('externalServices')}
                  onToggle={toggleSection}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-medium text-foreground">Controlo</p>
                      <p className="text-sm text-muted-foreground">Ativar / Desativar</p>
                    </div>
                    <Switch
                      checked={preferences.externalServices}
                      onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, externalServices: checked }))}
                      aria-label="Cookies de serviços externos"
                    />
                  </div>
                  <div className="mt-4 space-y-3">
                    <p>Algumas funcionalidades da plataforma podem integrar serviços externos, como:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>plataformas de vídeo para conteúdos formativos</li>
                      <li>ferramentas de comunicação</li>
                      <li>ferramentas de análise de utilização.</li>
                    </ul>
                    <p>Estes serviços podem utilizar cookies próprios.</p>
                  </div>
                </CookieAccordionSection>
              </div>
            </div>
          </div>

          <div className="p-4 pt-0">
            <DialogFooter className="gap-2 sm:gap-3">
              <Button variant="secondary" onClick={rejectOptional}>
                Rejeitar opcionais
              </Button>
              <Button variant="outline" onClick={acceptAll}>
                Aceitar todos
              </Button>
              <Button onClick={savePreferences}>Guardar preferências</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
