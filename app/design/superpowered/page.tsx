/* PUSH REQUESTS: file exceeds 150-line limit per explicit design brief —
   all sections inlined in one page file as instructed. */
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Nav from '@/components/global/Nav'
import Footer from '@/components/global/Footer'
import TariffSection from '@/components/ui/TariffSection'

// ── Shared layout constants ────────────────────────────────────────────────
const PX = {
  paddingLeft:  'clamp(20px,15vw,220px)',
  paddingRight: 'clamp(20px,15vw,220px)',
} satisfies CSSProperties

const PY = {
  paddingTop:    'clamp(40px,6vw,90px)',
  paddingBottom: 'clamp(40px,6vw,90px)',
} satisfies CSSProperties

const SEC = { ...PX, ...PY } satisfies CSSProperties
const DIV = 'rgba(255,255,255,0.3)' // white divider

// ── Circular text ring ─────────────────────────────────────────────────────
type RingProps = { text: string; diameter: number; fontSize: number; anim: string }
function LetterRing({ text, diameter, fontSize, anim }: RingProps) {
  const chars = text.split('')
  const n     = chars.length
  return (
    <div style={{ position: 'relative', width: diameter, height: diameter, animation: anim }}>
      {chars.map((ch, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          transformOrigin: '50% 50%',
          transform: `rotate(${(i / n) * 360}deg)`,
        }}>
          <span style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            fontSize, fontWeight: 500, color: '#fff',
            fontFamily: "'Unica 77 LL Cyr', sans-serif",
            lineHeight: 1, display: 'block',
          }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────
const INTRO_ROWS = [
  'актуальная программа и навыки, которые нужны сильным работодателям',
  '5+ разноплановых работ в портфолио, включая веб- или мобильное приложение',
  'продуктовый ux, ui c ai и 3d — на самом высоком уровне в одном курсе',
  'design engineering — разрабатываем прототип для главного проекта и осваиваем полный цикл создания продукта',
  'четкий, живой и экспертный фидбэк: отзывы, разборы от арт-директоров, продакт-менеджеров, hr и разработчиков',
  'тестовые задания и практика вайтборда от ведущих it компаний',
  'живое комьюнити: регулярные бесплатные групповые проекты и неформальные встречи',
]

const SEASON_PTS = [
  { title: 'продукт',                  desc: 'делаем акцент на эмоциональных и социальных JTBD и user flows' },
  { title: 'дизайн-концепт и рутина',  desc: 'строим пользовательский опыт вокруг эмоции' },
  { title: 'AI, микроанимации и 3D',   desc: 'усиливаем выбранную эмоцию в интерфейсе с помощью дополнительных инструментов' },
  { title: 'design engineering',       desc: 'разрабатываем прототип продукта, который построен на функциональности и эмоции' },
]

const PROGRAM = [
  {
    label: 'теория для практики:',
    items: ['figma — не база, а advanced', 'графический дизайн в интерфейсах', 'работа в продуктовой команде', 'дизайн интерфейсов — детальная база', 'дизайн-системы, анимация', 'работа с графикой в AI и 3D', 'презентация проекта', 'тестовые задания и практика whiteboard'],
  },
  {
    label: 'общая теория по ux/ui:',
    items: ['профессия ux/ui дизайнера', 'personal developement plan продакт-дизайнера', 'soft навыки', 'как устроиться на работу в сильную команду'],
  },
  {
    label: 'обязательно нужен:',
    items: ['опыт работы в figma'],
  },
]

const GRAD = ['российский бигтех', 'международные стартапы', 'сильный и независимый фриланс']

const REVIEWS = [
  { name: 'екатерина киричук',      role: 'associate product designer',         text: 'я хотела получить позицию продакт-дизайнера — и у меня это получилось ещё в середине потока :D прежде всего, курс помог мне справиться с синдромом самозванца — было круто оказаться в сообществе классных ребят потока. рекомендую, но приготовьтесь к тому, что придётся очень много работать!' },
  { name: 'александра юшина',       role: 'коммуникационный дизайнер в РБК',    text: 'давно следила за курсами миши розова, коллеги также рекомендовали wannabe. начало потока superpowered ux/ui совпало с моим уходом из компании: я переехала в другую страну и хотела расти в карьере, поэтому логично было перейти из коммуникаций в ux/ui.' },
  { name: 'александр гурин',        role: 'ux/ui designer',                      text: 'на интенсив я пришёл с желанием систематизировать знания в ux/ui и попробовать себя в 3d — и получил даже больше, чем ожидал. с самого начала было ощущение вовлечённости: крутой темп, интересные задания, живые лекции и огромное количество практики.' },
  { name: 'бикеханум абдурахманова', role: 'ux/ui designer',                     text: 'я ставила цель углубить и укрепить знания в ux/ui на практике, чтобы качественно и быстро выполнять задачи на работе. мне это удалось, и меня повысили с позиции графического дизайнера до ux/ui-дизайнера.' },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function SuperpoweredPage() {
  return (
    <main style={{ backgroundColor: '#000' }}>
      {/* CSS keyframes for rotating rings */}
      <style>{`
        @keyframes ring-cw  { to { transform: rotate(360deg);  } }
        @keyframes ring-ccw { to { transform: rotate(-360deg); } }
      `}</style>

      <Nav />

      {/* ── S1 Hero — rotating circles + pill card ───────────────────── */}
      <section style={{ ...PX, paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48, overflow: 'hidden' }}>
        {/* Three concentric spinning rings */}
        <div style={{ position: 'relative', width: 770, height: 770 }}>
          {/* Outer 770px · SUPERPOWERED · 146px · 20s CW */}
          <LetterRing text="SUPERPOWERED" diameter={770} fontSize={146} anim="ring-cw 20s linear infinite" />
          {/* Middle 536px · 30s CCW — centered: offset (770-536)/2 = 117 */}
          <div style={{ position: 'absolute', top: 117, left: 117 }}>
            <LetterRing text="WE DON'T BORING SHIT" diameter={536} fontSize={116} anim="ring-ccw 30s linear infinite" />
          </div>
          {/* Inner 358px · 25s CW — centered: offset (770-358)/2 = 206 */}
          <div style={{ position: 'absolute', top: 206, left: 206 }}>
            <LetterRing text="WE BOARDING SENIORS" diameter={358} fontSize={76} anim="ring-cw 25s linear infinite" />
          </div>
        </div>

        {/* White pill CTA card */}
        <div style={{ background: '#fff', borderRadius: 90, padding: 3, width: '100%', maxWidth: 900 }}>
          <div style={{ padding: '24px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="text-body" style={{ color: '#000', fontWeight: 700, textAlign: 'center' }}>
              новые тарифы и система обучения
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <p className="text-body" style={{ color: '#000', flex: 1 }}>эксклюзивная группа с лидером / от 7 383₽/месяц</p>
              <p className="text-body" style={{ color: '#000', flex: 1 }}>группа с арт-директором / от 4 806₽/месяц</p>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#tariff" className="text-body" style={{ background: '#000', color: '#fff', borderRadius: 90, padding: '10px 32px', textDecoration: 'none', fontWeight: 500 }}>
                участвовать
              </a>
              <a href="#" className="text-body" style={{ color: '#000', textDecoration: 'underline' }}>задать вопрос</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── S2 Course intro list ─────────────────────────────────────── */}
      {/* PUSH REQUESTS: paddingTop/Bottom 70px — non-standard; spec requires exact 70px */}
      <section style={{ ...PX, paddingTop: 70, paddingBottom: 70 }}>
        <p style={{ fontSize: 'clamp(56px,8vw,120px)', fontWeight: 500, color: '#fff', letterSpacing: '-6px', lineHeight: 0.85, marginBottom: 24, fontFamily: "'Unica 77 LL Cyr', sans-serif" }}>
          superpowered ux/ui
        </p>
        <p className="text-h3" style={{ color: '#fff', marginBottom: 48 }}>
          курс для junior+ и middle ux/ui и product дизайнеров
        </p>
        {INTRO_ROWS.map((row, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            borderTop:    i === 0 ? `1px solid ${DIV}` : undefined,
            borderBottom: `1px solid ${DIV}`,
            padding: '16px 0',
          }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="text-h3" style={{ color: '#000' }}>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <p className="text-h3" style={{ color: '#fff' }}>{row}</p>
          </div>
        ))}
      </section>

      {/* ── S3 Instructor bio — Даша Щербакова ──────────────────────── */}
      <section style={{ ...SEC, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p className="text-h2" style={{ color: '#fff' }}>
            привет!<br />курс веду я,<br />даша щербакова
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p className="text-body" style={{ color: '#fff' }}>
            lead product designer с опытом в бизнесах любого масштаба — от крупного e-commerce до b2b saas-стартапов. работала с яндекс, сбером, тинькофф и международными командами.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>регулярно рассказываю о курсе и дизайне:</p>
            <a href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>телеграм-канал super ux/ui</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>выступаю с докладами:</p>
            {[
              'мастер-класс про метрики продукта',
              'как и в каких ситуациях использовать UX-исследование с прототипом',
              'что мешает продакт-менеджеру строить работу с дизайнером',
            ].map((l, i) => <a key={i} href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>{l}</a>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>можно посмотреть мои работы:</p>
            {['dribbble', 'showreel'].map((l, i) => <a key={i} href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>{l}</a>)}
          </div>
          <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden' }}>
            <Image
              src="/images/persons/dasha-shcherbakova.webp"
              alt="Даша Щербакова"
              fill
              sizes="(min-width:768px) 45vw, 90vw"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </div>
      </section>

      {/* ── S4 Season theme — эмоций ─────────────────────────────────── */}
      <section style={{ ...SEC }}>
        <p className="text-h1" style={{ color: '#fff', marginBottom: 16 }}>
          в этом полугодии создаем дизайн на основе{' '}
          <em style={{ fontStyle: 'italic', fontSize: 'clamp(40px,4vw,57px)' }}>эмоций</em>
        </p>
        <p className="text-h3" style={{ color: '#fff', marginBottom: 48 }}>
          живем сезонами — каждые полгода добавляем новый смысловой слой в программу
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: 'clamp(180px,33vw,464px)', flexShrink: 0 }}>
            <p className="text-h3" style={{ color: '#fff' }}>практика:</p>
          </div>
          <div style={{ flex: 1, minWidth: 280, borderLeft: `2px solid ${DIV}`, paddingLeft: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {SEASON_PTS.map((p, i) => (
              <div key={i}>
                <p className="text-h3" style={{ color: '#fff' }}>{p.title}</p>
                <p className="text-body" style={{ color: '#fff' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5 Course program (4571-14284) ───────────────────────────── */}
      <section style={{ ...SEC, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p className="text-h1" style={{ color: '#fff' }}>основная программа курса</p>
          <p className="text-h3" style={{ color: '#fff' }}>рассчитана на 3 месяца, учёбе нужно посвящать около 10–15 часов в неделю</p>
        </div>
        {PROGRAM.map((block, bi) => (
          <div key={bi} style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {bi > 0 && <div style={{ height: 1, background: DIV }} />}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ width: 'clamp(180px,33vw,464px)', flexShrink: 0 }}>
                <p className="text-h3" style={{ color: '#fff' }}>{block.label}</p>
              </div>
              <div style={{ flex: 1, minWidth: 280, borderLeft: `2px solid ${DIV}`, paddingLeft: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {block.items.map((item, ii) => (
                  <p key={ii} className="text-h3" style={{ color: '#fff' }}>{item}</p>
                ))}
                {bi === 2 && (
                  <p className="text-body" style={{ color: '#fff', opacity: 0.7 }}>
                    мы не объясняем основы figma на этом курсе. тех, кто неуверенно себя в ней чувствует, ждём на интенсиве{' '}
                    <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>t-shaped</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── S6 Portfolio showcase (4571-14336) — placeholder ─────────── */}
      <div style={{ background: '#0d0d1a', height: 560, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-h3" style={{ color: 'rgba(255,255,255,0.2)' }}>работы студентов</p>
      </div>

      {/* ── S7 Misha Rozov masterclasses bio (4571-14337) ────────────── */}
      <section style={{ ...SEC, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <p className="text-h2" style={{ color: '#fff', flex: 1, minWidth: 280 }}>
          внутри курса — мастер-классы миши розова
        </p>
        <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p className="text-body" style={{ color: '#fff' }}>
            основал топ3-студию pinkman. за 7 лет студия заработала больше 1 миллиарда рублей. клиенты — Британская Школа Дизайна, BestDoctor, Нетология, Яндекс, Mercedes, Nike, Skoda, McDonald's, СберБанк, ВТБ и другие
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>основал wannabe и передал свой опыт и навыки &gt;2000 человек. уровень удовлетворенности курсами 95%+</p>
            <a href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>все отзывы на потоки курсов</a>
          </div>
          <p className="text-body" style={{ color: '#fff' }}>
            выступает на мероприятиях и входит в жюри: Дизайн-выходные, G8, РИФ, RIW, Tagline, Design Line и другие
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>имеет актуальный и редкий скиллсет, больше 50 наград на разных конкурсах</p>
            <a href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>стрим по дизайну</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>регулярно пишет о дизайне, мышлении, отношении к работе в телеграм-канале wannabe like kozov</p>
            <a href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>телеграм-канал Wannabe like Rozov</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>с командой студии сделал пэк из 1000 3d-иконок, и получил Product of the Day на Product Hunt</p>
            <a href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>пэк 3d-иконок</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="text-body" style={{ color: '#fff' }}>на Behance можно посмотреть актуальные проекты</p>
            <a href="#" className="text-body" style={{ color: '#fff', textDecoration: 'underline' }}>портфолио проектов на Behance</a>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden' }}>
            <Image
              src="/images/persons/misha-rozov.webp"
              alt="Миша Розов"
              fill
              sizes="(min-width:768px) 45vw, 90vw"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </div>
      </section>

      {/* ── S8 Portfolio pics 2×2 (4571-14366) ──────────────────────── */}
      <section style={{ ...PX, paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280, height: 552, background: '#d6e0ec', borderRadius: 11, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="text-small" style={{ color: '#7c7c7c' }}>case study</p>
          </div>
          <div style={{ flex: 1, minWidth: 280, height: 552, background: '#d7e7d3', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="text-small" style={{ color: '#7c7c7c' }}>case study</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280, height: 542, background: '#1e1e2e', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="text-small" style={{ color: 'rgba(255,255,255,0.2)' }}>case study</p>
          </div>
          <div style={{ flex: 1, minWidth: 280, height: 542, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p className="text-h3" style={{ color: '#fff' }}>твоя работа</p>
              <p className="text-h3" style={{ color: '#fff' }}>после курса</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── S9 Graduates help (4571-14380) ───────────────────────────── */}
      <section style={{ ...PX, paddingTop: 90, paddingBottom: 90 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderTop: `2px solid ${DIV}`, borderBottom: `2px solid ${DIV}`, padding: '16px 0 32px' }}>
            <p className="text-h1" style={{ color: '#fff' }}>помощь выпускникам</p>
          </div>
          <div style={{ borderBottom: `2px solid ${DIV}`, padding: '16px 0 20px' }}>
            <p className="text-h3" style={{ color: '#fff' }}>
              в рамках курса открыт ultra power club для нанимающих lead и head дизайнеров. они имеют эксклюзивный доступ к резюме и портфолио выпустившихся супер-пуперов и могут пригласить их в свои команды
            </p>
          </div>
          <div style={{ borderBottom: `2px solid ${DIV}`, height: 112 }} />
          <div style={{ borderBottom: `2px solid ${DIV}`, padding: '16px 0 32px' }}>
            <p className="text-h2" style={{ color: '#fff' }}>выпускники уже работают здесь</p>
          </div>
          {GRAD.map((label, i) => (
            <div key={i} style={{ borderBottom: `2px solid ${DIV}`, padding: '16px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="text-h3" style={{ color: '#000' }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="text-h3" style={{ color: '#fff' }}>{label}</p>
            </div>
          ))}
          <div style={{ borderBottom: `2px solid ${DIV}`, padding: '16px 0 20px' }}>
            <p className="text-h3" style={{ color: '#fff' }}>мы общаемся с работодателями и готовим программу по их требованиям</p>
          </div>
          <div style={{ height: 112 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
            <p className="text-h3" style={{ color: '#fff', textAlign: 'center' }}>
              для выпускников, которые хотят продолжать делать новые концепты и оставаться в ритме после курса, есть продлёнка — регулярные задания, фидбэк и сильная дизайнерская среда
            </p>
            <a href="#" className="text-body" style={{ border: '2px solid #fff', borderRadius: 30, padding: '8px 70px 12px', color: '#fff', textDecoration: 'none' }}>
              перейти
            </a>
          </div>
        </div>
      </section>

      {/* ── S10 Email capture (4571-14403) — white bg ────────────────── */}
      <section style={{ ...PX, paddingTop: 90, paddingBottom: 90, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
        <p className="text-h1" style={{ color: '#000', textAlign: 'center' }}>узнайте больше в рассылке</p>
        <p className="text-body" style={{ color: '#000', textAlign: 'center', maxWidth: 610 }}>
          всего 5 писем: для кого интенсив + программа обучения + разбор работ учеников + продуктовый дизайн + знакомство с арт-директором. подпишитесь, чтобы узнать больше о «superpowered senior ux/ui»
        </p>
        <div style={{ width: '100%', maxWidth: 610, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ borderBottom: '2px solid rgba(0,0,0,0.3)', padding: 12 }}>
            <p className="text-body" style={{ color: '#000', opacity: 0.6 }}>mike@gmail.com</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              style={{ background: '#000', color: '#fff', borderRadius: 30, padding: '8px 30px 12px', border: 'none', cursor: 'pointer', width: '100%' }}
              className="text-body"
            >
              получить письма
            </button>
            <p className="text-small" style={{ color: '#666', textAlign: 'center' }}>
              нажимая кнопку,{' '}
              <a href="https://wannabe.ru/legal/oferta" style={{ color: '#666' }}>я принимаю условия оферты</a>
              {' '}и соглашаюсь на{' '}
              <a href="https://wannabe.ru/legal/policy" style={{ color: '#666' }}>обработку персональных данных</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── S11 Art directors team (4571-14446) ──────────────────────── */}
      <section style={{ ...PX, paddingTop: 90, paddingBottom: 180, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p className="text-h1" style={{ color: '#fff' }}>команда арт-директоров</p>
          <p className="text-h3" style={{ color: '#fff' }}>
            наша команда — ученики, которые закончили один из курсов wannabe с выдающимися результатами и обучены нашей методологии. они помогают студентам на курсе
          </p>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280, height: 420, background: '#1a1a2e', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="text-small" style={{ color: 'rgba(255,255,255,0.2)' }}>фото арт-директора</p>
          </div>
          <div style={{ flex: 1, minWidth: 280, height: 420, background: '#1a2a1e', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="text-small" style={{ color: 'rgba(255,255,255,0.2)' }}>фото арт-директора</p>
          </div>
        </div>
      </section>

      {/* ── S12 Art direction demo (4571-14458) ──────────────────────── */}
      <section style={{ ...PX, paddingBottom: 180, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <p className="text-h1" style={{ color: '#fff' }}>как проходит арт-дирекшн</p>
        {/* Video preview card */}
        <div style={{ border: `2px solid ${DIV}`, padding: 24 }}>
          <div style={{ aspectRatio: '574 / 325', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#e5e5e5', borderRadius: 13, width: 58, height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden="true">
                <path d="M0 0L22 13L0 26V0Z" fill="#000" />
              </svg>
            </div>
          </div>
        </div>
        {/* CTA form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p className="text-h3" style={{ color: '#fff' }}>проверь, подходит ли тебе формат</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, borderBottom: `2px solid ${DIV}`, padding: 12 }}>
              <p className="text-body" style={{ color: '#fff', opacity: 0.6 }}>ваше имя</p>
            </div>
            <div style={{ flex: 1, minWidth: 200, borderBottom: `2px solid ${DIV}`, padding: 12 }}>
              <p className="text-body" style={{ color: '#fff', opacity: 0.6 }}>mike@gmail.com</p>
            </div>
          </div>
          <a href="#" className="text-body" style={{ border: '2px solid #fff', borderRadius: 30, padding: '10px 30px 15px', color: '#fff', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
            полная версия фидбека
          </a>
        </div>
      </section>

      {/* ── S13 Student reviews (4571-14472) ─────────────────────────── */}
      <section style={{ ...PX, paddingBottom: 90, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <p className="text-h1" style={{ color: '#fff' }}>отзывы учеников, которые проходили разные версии курса</p>
        {([REVIEWS.slice(0, 2), REVIEWS.slice(2, 4)] as typeof REVIEWS[]).map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'stretch' }}>
            {row.map((r, ci) => (
              <div key={ci} style={{ flex: 1, minWidth: 280, border: `2px solid ${DIV}`, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 48 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                  {/* Avatar placeholder — real photos come from Figma localhost only */}
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#2a2a3e', flexShrink: 0 }} />
                  <div>
                    <p className="text-body" style={{ color: '#fff', opacity: 0.6 }}>{r.name}</p>
                    <p className="text-body" style={{ color: '#fff', opacity: 0.6 }}>{r.role}</p>
                  </div>
                  <p className="text-body" style={{ color: '#fff', overflow: 'hidden', maxHeight: 200 }}>{r.text}</p>
                </div>
                <button style={{ border: '2px solid #fff', borderRadius: 30, background: 'transparent', color: '#fff', padding: '8px 30px 12px', cursor: 'pointer', width: '100%' }} className="text-body">
                  читать полностью
                </button>
              </div>
            ))}
          </div>
        ))}
      </section>

      <TariffSection />
      <Footer />
    </main>
  )
}
