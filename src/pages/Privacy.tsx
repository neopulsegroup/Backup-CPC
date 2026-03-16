import { Layout } from '@/components/layout/Layout';

export default function Privacy() {
  const updatedAt = new Intl.DateTimeFormat('pt-PT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  return (
    <Layout>
      <section className="cpc-gradient-bg text-primary-foreground py-20">
        <div className="cpc-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-xl opacity-90">Plataforma CPC</p>
        </div>
      </section>

      <section className="cpc-section">
        <div className="cpc-container">
          <div className="max-w-4xl mx-auto cpc-card p-8">
            <p className="text-sm text-muted-foreground mb-8">Última atualização: {updatedAt}</p>

            <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A proteção dos dados pessoais é uma prioridade para a Plataforma CPC. Esta Política de Privacidade explica como recolhemos,
              utilizamos, armazenamos e protegemos os dados pessoais dos utilizadores da plataforma.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Plataforma CPC é um sistema digital destinado a apoiar processos de capacitação, integração socioprofissional e ligação ao
              emprego, incluindo o acesso a conteúdos formativos, agendamento de sessões de apoio técnico e ligação entre migrantes e entidades
              empregadoras.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">Esta política está em conformidade com:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>Regulamento (UE) 2016/679 — Regulamento Geral sobre a Proteção de Dados (RGPD / GDPR)</li>
              <li>legislação nacional aplicável em matéria de proteção de dados</li>
              <li>princípios de transparência e responsabilidade no tratamento de dados pessoais.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ao utilizar a Plataforma CPC, o utilizador aceita as práticas descritas nesta política.
            </p>

            <h2 className="text-2xl font-bold mb-4">2. Responsável pelo tratamento de dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">O responsável pelo tratamento de dados pessoais é:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>Praticus – Formação e Serviços de Apoio às Empresas, Lda.</li>
              <li>NIF: 503 650 498</li>
              <li>Rua Francisco Carqueja, 179, 2.º Dto, 4350-185 Porto</li>
              <li>
                <a className="text-primary underline underline-offset-4" href="mailto:porto@oportoforte.com">
                  porto@oportoforte.com
                </a>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-2">Encarregado de Proteção de Dados (DPO)</p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Email:{' '}
              <a className="text-primary underline underline-offset-4" href="mailto:porto@oportoforte.com">
                porto@oportoforte.com
              </a>
            </p>

            <h2 className="text-2xl font-bold mb-4">3. Finalidade do tratamento de dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Os dados pessoais são recolhidos e tratados para permitir o funcionamento e prestação dos serviços disponibilizados pela Plataforma
              CPC. As principais finalidades incluem:
            </p>

            <h3 className="text-xl font-semibold mb-3">Gestão de contas de utilizador</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>criação e gestão de contas de utilizadores</li>
              <li>autenticação e acesso à plataforma</li>
              <li>gestão de perfis (migrantes, equipa CPC e empresas)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Triagem inicial e acompanhamento</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>avaliação inicial de necessidades</li>
              <li>orientação para serviços de apoio</li>
              <li>acompanhamento técnico por mediadores, juristas ou psicólogos</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Capacitação e formação</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>acesso a trilhas formativas</li>
              <li>registo de progresso em conteúdos educativos</li>
              <li>avaliação de aprendizagem</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Agendamento de serviços</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>marcação e gestão de sessões de apoio</li>
              <li>comunicação entre utilizadores e equipa CPC</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Inserção socioprofissional</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>criação de perfil profissional</li>
              <li>candidatura a oportunidades de emprego</li>
              <li>ligação entre migrantes e entidades empregadoras</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Comunicação e notificações</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>envio de notificações relacionadas com a conta</li>
              <li>lembretes de sessões e atividades</li>
              <li>comunicação institucional relacionada com o projeto</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Melhoria da plataforma</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-8">
              <li>análise de utilização</li>
              <li>melhoria da experiência do utilizador</li>
              <li>monitorização do desempenho do sistema.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">4. Categorias de dados pessoais recolhidos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dependendo da utilização da plataforma, podem ser recolhidos diferentes tipos de dados pessoais.
            </p>

            <h3 className="text-xl font-semibold mb-3">Dados de identificação</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>nome</li>
              <li>endereço de email</li>
              <li>número de telefone</li>
              <li>país de origem</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Dados de perfil e integração</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>idioma</li>
              <li>competências profissionais</li>
              <li>interesses profissionais</li>
              <li>experiência de trabalho</li>
              <li>formação</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Dados relacionados com a triagem inicial</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>situação laboral</li>
              <li>situação habitacional</li>
              <li>necessidades de apoio</li>
              <li>interesses formativos</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Dados de utilização da plataforma</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>progresso nas trilhas formativas</li>
              <li>histórico de sessões e agendamentos</li>
              <li>candidaturas a oportunidades de emprego</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Dados técnicos</h3>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>endereço IP</li>
              <li>tipo de navegador</li>
              <li>dispositivo utilizado</li>
              <li>dados de navegação na plataforma</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Sempre que possível, apenas são recolhidos os dados estritamente necessários para a prestação do serviço.
            </p>

            <h2 className="text-2xl font-bold mb-4">5. Base legal para o tratamento de dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O tratamento de dados pessoais na Plataforma CPC baseia-se nas seguintes bases legais previstas no RGPD:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-8">
              <li>Execução de um serviço solicitado pelo utilizador (Artigo 6.º, n.º 1, alínea b)</li>
              <li>Consentimento do utilizador (Artigo 6.º, n.º 1, alínea a)</li>
              <li>Cumprimento de obrigações legais (Artigo 6.º, n.º 1, alínea c)</li>
              <li>Interesse legítimo (Artigo 6.º, n.º 1, alínea f)</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">6. Partilha de dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Os dados pessoais podem ser partilhados apenas quando necessário para a execução das finalidades descritas. Os dados podem ser
              partilhados com:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>
                <span className="font-medium text-foreground">Equipa CPC</span> — Mediadores, técnicos, juristas, psicólogos e gestores de caso
                responsáveis pelo acompanhamento dos utilizadores.
              </li>
              <li>
                <span className="font-medium text-foreground">Entidades empregadoras</span> — Apenas quando o utilizador decide candidatar-se a
                oportunidades de emprego.
              </li>
              <li>
                <span className="font-medium text-foreground">Prestadores de serviços tecnológicos</span> — Fornecedores de infraestrutura
                digital, alojamento, ferramentas de comunicação ou análise.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Todos os prestadores de serviços estão sujeitos a acordos de confidencialidade e proteção de dados. Os dados não são vendidos nem
              utilizados para fins comerciais externos.
            </p>

            <h2 className="text-2xl font-bold mb-4">7. Transferências internacionais de dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sempre que dados pessoais sejam tratados fora do Espaço Económico Europeu (EEE), serão aplicadas salvaguardas adequadas, conforme
              previsto no RGPD, incluindo:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-8">
              <li>decisões de adequação da Comissão Europeia</li>
              <li>cláusulas contratuais-tipo</li>
              <li>mecanismos equivalentes de proteção de dados.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">8. Período de conservação dos dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Os dados pessoais são conservados apenas pelo período necessário para cumprir as finalidades para as quais foram recolhidos. Em
              geral:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-8">
              <li>dados de contas de utilizador são mantidos enquanto a conta estiver ativa</li>
              <li>dados relacionados com o projeto podem ser mantidos pelo período exigido por normas de auditoria de financiamento europeu</li>
              <li>após esse período, os dados serão eliminados ou anonimizados.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">9. Segurança dos dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Plataforma CPC implementa medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>acesso não autorizado</li>
              <li>perda ou destruição acidental</li>
              <li>alteração indevida</li>
              <li>divulgação não autorizada.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">Estas medidas incluem:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-8">
              <li>controlo de acesso por perfil de utilizador</li>
              <li>sistemas de autenticação segura</li>
              <li>proteção da infraestrutura tecnológica</li>
              <li>monitorização de segurança.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">10. Direitos dos titulares dos dados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Nos termos do RGPD, os utilizadores têm os seguintes direitos:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-4">
              <li>direito de acesso aos seus dados pessoais</li>
              <li>direito de retificação de dados incorretos</li>
              <li>direito ao apagamento dos dados (&quot;direito a ser esquecido&quot;)</li>
              <li>direito à limitação do tratamento</li>
              <li>direito de oposição ao tratamento</li>
              <li>direito à portabilidade dos dados</li>
              <li>direito de retirar o consentimento a qualquer momento.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Para exercer estes direitos, o utilizador pode contactar a entidade responsável através dos contactos indicados nesta política.
            </p>

            <h2 className="text-2xl font-bold mb-4">11. Reclamações</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Os utilizadores têm o direito de apresentar reclamação junto da autoridade de controlo competente em matéria de proteção de dados.
              Em Portugal, a autoridade competente é:
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Comissão Nacional de Proteção de Dados (CNPD){' '}
              <a className="text-primary underline underline-offset-4" href="https://www.cnpd.pt" target="_blank" rel="noreferrer">
                https://www.cnpd.pt
              </a>
            </p>

            <h2 className="text-2xl font-bold mb-4">12. Alterações à Política de Privacidade</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Esta Política de Privacidade pode ser atualizada periodicamente para refletir alterações legais, técnicas ou operacionais. Sempre
              que ocorrerem alterações relevantes, os utilizadores serão informados através da plataforma ou por outros meios adequados.
            </p>

            <h2 className="text-2xl font-bold mb-4">13. Contactos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Para qualquer questão relacionada com esta Política de Privacidade ou com o tratamento de dados pessoais, pode contactar:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed">
              <li>Praticus – Formação e Serviços de Apoio às Empresas, Lda. NIF: 503 650 498</li>
              <li>Rua Francisco Carqueja, 179, 2.º Dto, 4350-185 Porto</li>
              <li>
                <a className="text-primary underline underline-offset-4" href="mailto:porto@oportoforte.com">
                  porto@oportoforte.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
