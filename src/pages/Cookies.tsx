import { Layout } from '@/components/layout/Layout';

export default function Cookies() {
  const updatedAt = new Intl.DateTimeFormat('pt-PT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  return (
    <Layout>
      <section className="cpc-gradient-bg text-primary-foreground py-20">
        <div className="cpc-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Cookies</h1>
          <p className="text-xl opacity-90">Plataforma CPC</p>
        </div>
      </section>

      <section className="cpc-section">
        <div className="cpc-container">
          <div className="max-w-4xl mx-auto cpc-card p-8">
            <p className="text-sm text-muted-foreground mb-8">Última atualização: {updatedAt}</p>

            <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A presente Política de Cookies explica como a Plataforma CPC utiliza cookies e tecnologias semelhantes quando os
              utilizadores acedem ao website ou utilizam os serviços digitais disponibilizados através da plataforma.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">Esta política é elaborada em conformidade com:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>o Regulamento (UE) 2016/679 – Regulamento Geral sobre a Proteção de Dados (RGPD / GDPR)</li>
              <li>a Diretiva 2002/58/CE (Diretiva ePrivacy), relativa à privacidade nas comunicações eletrónicas</li>
              <li>a legislação nacional aplicável em matéria de proteção de dados.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ao utilizar a Plataforma CPC, os utilizadores poderão consentir na utilização de determinados cookies, conforme
              descrito nesta política.
            </p>

            <h2 className="text-2xl font-bold mb-4">2. O que são cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cookies são pequenos ficheiros de texto armazenados no dispositivo do utilizador (computador, tablet ou smartphone)
              quando visita um website ou utiliza uma plataforma digital.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Estes ficheiros permitem que o sistema reconheça o dispositivo do utilizador e recorde determinadas informações sobre
              a sua utilização da plataforma, como preferências, sessão ativa ou configurações de navegação.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">Os cookies podem ser classificados de acordo com:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-8">
              <li>a sua origem (cookies próprios ou de terceiros)</li>
              <li>a sua duração (cookies de sessão ou persistentes)</li>
              <li>a sua finalidade.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">3. Tipos de cookies utilizados pela Plataforma CPC</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A Plataforma CPC utiliza as seguintes categorias de cookies:
            </p>

            <h3 className="text-xl font-semibold mb-3">3.1 Cookies Estritamente Necessários</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Estes cookies são indispensáveis para o funcionamento da plataforma e não podem ser desativados nos sistemas da
              plataforma. Permitem, por exemplo:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>autenticação e gestão de sessão após login</li>
              <li>acesso às áreas reservadas da plataforma</li>
              <li>funcionamento seguro do sistema</li>
              <li>navegação entre páginas e funcionalidades</li>
              <li>gestão de agendamentos e serviços da plataforma</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sem estes cookies, algumas funcionalidades essenciais da plataforma não poderão ser disponibilizadas.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Base legal: Artigo 6.º, n.º 1, alínea f) do RGPD – interesse legítimo, associado ao funcionamento técnico do serviço
              solicitado pelo utilizador.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.2 Cookies de Desempenho e Estatística</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Estes cookies permitem recolher informações sobre a forma como os utilizadores utilizam a plataforma. A informação
              recolhida pode incluir:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>páginas mais visitadas</li>
              <li>tempo de permanência nas páginas</li>
              <li>erros ou dificuldades de navegação</li>
              <li>padrões de utilização da plataforma</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Estes dados são utilizados exclusivamente para fins estatísticos e para melhorar o funcionamento e a experiência de
              utilização da plataforma. Sempre que possível, estes dados são tratados de forma anonimizada ou agregada.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Base legal: consentimento do utilizador (Artigo 6.º, n.º 1, alínea a) do RGPD).
            </p>

            <h3 className="text-xl font-semibold mb-3">3.3 Cookies de Personalização</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Estes cookies permitem recordar preferências do utilizador e adaptar a experiência de utilização da plataforma. Podem
              ser utilizados para:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>guardar preferências de idioma</li>
              <li>adaptar conteúdos ao perfil do utilizador</li>
              <li>apresentar trilhas formativas recomendadas</li>
              <li>melhorar a navegação dentro da plataforma</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Base legal: consentimento do utilizador (Artigo 6.º, n.º 1, alínea a) do RGPD).
            </p>

            <h3 className="text-xl font-semibold mb-3">3.4 Cookies de Terceiros</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Algumas funcionalidades da Plataforma CPC podem integrar serviços fornecidos por terceiros, tais como:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>plataformas de vídeo ou conteúdos formativos</li>
              <li>ferramentas de análise de utilização</li>
              <li>sistemas de comunicação ou suporte</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Estes serviços podem instalar cookies próprios no dispositivo do utilizador. A Plataforma CPC não controla diretamente a
              forma como estes cookies são utilizados por terceiros. Recomenda-se que os utilizadores consultem as respetivas políticas de
              privacidade dessas entidades.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Base legal: consentimento do utilizador (Artigo 6.º, n.º 1, alínea a) do RGPD).
            </p>

            <h2 className="text-2xl font-bold mb-4">4. Duração dos cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Os cookies utilizados na Plataforma CPC podem ter diferentes períodos de duração:
            </p>
            <h3 className="text-lg font-semibold mb-2">Cookies de sessão</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              São temporários e permanecem ativos apenas durante a sessão de navegação. São eliminados automaticamente quando o utilizador
              fecha o navegador.
            </p>
            <h3 className="text-lg font-semibold mb-2">Cookies persistentes</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Permanecem armazenados no dispositivo do utilizador durante um período definido ou até serem eliminados manualmente.
            </p>

            <h2 className="text-2xl font-bold mb-4">5. Gestão de consentimento</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nos termos do RGPD e da Diretiva ePrivacy, os cookies que não sejam estritamente necessários apenas serão utilizados após o
              consentimento explícito do utilizador.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ao aceder pela primeira vez à Plataforma CPC, o utilizador poderá:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>aceitar todos os cookies</li>
              <li>rejeitar cookies não essenciais</li>
              <li>configurar as suas preferências de cookies.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              O utilizador pode alterar as suas preferências a qualquer momento através das configurações de cookies disponibilizadas na
              plataforma.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Como gerir ou desativar cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Os utilizadores podem controlar ou eliminar cookies através das definições do navegador de internet. A maioria dos navegadores
              permite:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>visualizar os cookies armazenados</li>
              <li>eliminar cookies existentes</li>
              <li>bloquear cookies futuros</li>
              <li>definir preferências para determinados websites.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A desativação de alguns cookies pode afetar o funcionamento correto da plataforma.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Informações adicionais sobre a gestão de cookies podem ser consultadas em:{' '}
              <a className="text-primary underline underline-offset-4" href="https://www.allaboutcookies.org" target="_blank" rel="noreferrer">
                https://www.allaboutcookies.org
              </a>
            </p>

            <h2 className="text-2xl font-bold mb-4">7. Proteção de dados pessoais</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sempre que os cookies possam envolver o tratamento de dados pessoais, esse tratamento será realizado em conformidade com o
              Regulamento Geral sobre a Proteção de Dados (RGPD) e com a Política de Privacidade da Plataforma CPC.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Os dados recolhidos através de cookies não serão utilizados para identificar diretamente os utilizadores, exceto quando necessário
              para o funcionamento do serviço solicitado.
            </p>

            <h2 className="text-2xl font-bold mb-4">8. Direitos dos utilizadores</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Nos termos do RGPD, os utilizadores têm o direito de:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>aceder aos seus dados pessoais</li>
              <li>solicitar a retificação de dados incorretos</li>
              <li>solicitar a eliminação dos seus dados</li>
              <li>limitar o tratamento dos seus dados</li>
              <li>opor-se ao tratamento quando aplicável</li>
              <li>retirar o consentimento previamente dado.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              O exercício destes direitos pode ser solicitado através dos contactos indicados na Política de Privacidade da plataforma.
            </p>

            <h2 className="text-2xl font-bold mb-4">9. Alterações à política de cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              A Plataforma CPC pode atualizar esta Política de Cookies sempre que necessário para refletir alterações legais, técnicas ou
              operacionais. Sempre que forem feitas alterações relevantes, os utilizadores serão informados através da plataforma.
            </p>

            <h2 className="text-2xl font-bold mb-4">10. Contactos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Para qualquer questão relacionada com esta Política de Cookies ou com o tratamento de dados pessoais, os utilizadores podem
              contactar:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed">
              <li>Praticus – Formação e Serviços de Apoio às Empresas, Lda. NIF: 503 650 498</li>
              <li>
                <a className="text-primary underline underline-offset-4" href="mailto:porto@oportoforte.com">
                  porto@oportoforte.com
                </a>
              </li>
              <li>Rua Francisco Carqueja, 179, 2.º Dto, 4350-185 Porto</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
