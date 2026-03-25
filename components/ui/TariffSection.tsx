'use client'
import { useState } from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }
const CENTER: React.CSSProperties = { textAlign: 'center', marginBottom: 48 }
const TWO_COL: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 24, maxWidth: 1000, margin: '0 auto' }

function FCard({ children, bg }: { children: React.ReactNode; bg: string }) {
  return <div style={{ background: bg, borderRadius: 12, padding: 24, marginBottom: 16 }}>{children}</div>
}

function Toggle({ biz, onChange }: { biz: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="toggle-pill" style={{ width: '100%', alignSelf: 'stretch' }}>
      {(['как физическое лицо', 'как юр.лицо *'] as const).map((label, i) => (
        <button key={label} onClick={() => onChange(i === 1)}
          className={`toggle-opt${(i === 1) === biz ? ' active' : ''}`}
          style={{ padding: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: (i === 1) === biz ? '#fff' : '#000' }}>
          {label}
        </button>
      ))}
    </div>
  )
}

function PriceCard({ badge, price, installLabel, fullPrice, includes, border = false }: {
  badge: string; price: string; installLabel: string; fullPrice: string;
  includes: string[]; border?: boolean
}) {
  const [biz, setBiz] = useState(false)
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginTop: 24, border: border ? '1px solid #000' : 'none' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="text-small" style={{ color: '#000', border: '1px solid #000', borderRadius: 40, padding: '4px 16px', display: 'inline-block', alignSelf: 'flex-start' }}>{badge}</span>
          <div>
            <p className="text-h3" style={{ color: '#000', margin: 0 }}>{price}</p>
            <p className="text-small" style={{ color: '#000', margin: '4px 0 0' }}>{installLabel}</p>
          </div>
          <p className="text-h4" style={{ color: '#000', margin: 0 }}>{fullPrice}</p>
        </div>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span className="text-small" style={{ color: '#000', border: '1px solid #000', borderRadius: 40, padding: '4px 16px', display: 'inline-block', alignSelf: 'flex-start', marginBottom: 16 }}>включено в тариф:</span>
          {includes.map((item, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: 1, background: '#cacaca', margin: '4px 0' }} />}
              <p className="text-small" style={{ color: '#000', margin: 0 }}>✓ {item}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
        <div style={{ flex: 1 }}>
          <Toggle biz={biz} onChange={setBiz} />
        </div>
        <div style={{ flex: 1, display: 'flex', gap: 16, alignItems: 'stretch' }}>
          <button className="btn-green" style={{ flex: 1 }}>выбрать</button>
          <button className="btn-circle">♡</button>
        </div>
      </div>
    </div>
  )
}

// ── Tariff 01 ─────────────────────────────────────────────────────────────────
function Tariff01() {
  const workshops = ['продажи','самопрезентация','публичные выступления','работа со стейкхолдерами','лидерство','самопродвижение','предпринимательство']
  return (
    <section style={{ background: '#000', color: '#fff', ...PX, ...PY }}>
      <div style={CENTER}>
        <p className="text-h4" style={{ margin: '0 0 16px' }}>тариф 01</p>
        <h2 className="text-h2" style={{ color: '#fff', margin: '0 0 16px' }}>дизайн-лидер</h2>
        <p className="text-h4" style={{ margin: 0 }}>научу создавать концепты мирового уровня,<br />работать со стратегией, стейкхолдерами и командой</p>
      </div>
      <div style={TWO_COL}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ background: '#4b4b4b', borderRadius: 12, aspectRatio: '1/1', width: '100%', marginBottom: 16 }} />
          <p className="text-h4" style={{ margin: '0 0 16px' }}>эксклюзивная группа со мной</p>
          <p className="text-body" style={{ margin: '0 0 16px' }}>только 20 человек</p>
          <div style={{ height: 8, background: '#4b4b4b', borderRadius: 4, overflow: 'hidden', marginBottom: 4 }}>
            <div style={{ width: '35%', height: '100%', background: '#4ef968', borderRadius: 4 }} />
          </div>
          <p className="text-small" style={{ color: '#ff6225', margin: 0 }}>осталось 13 мест</p>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p className="text-h4" style={{ margin: '0 0 16px' }}>+ к основной программе:</p>
          <FCard bg="#4ef968">
            <p className="text-h4" style={{ color: '#000', margin: '0 0 16px' }}>воркшопы каждую неделю:</p>
            {workshops.map((item, i) => (
              <div key={item}>
                {i > 0 && <div style={{ height: 1, background: '#000', margin: '4px 0' }} />}
                <p className="text-h4" style={{ color: '#000', margin: 0 }}>{item}</p>
              </div>
            ))}
          </FCard>
          {['расскажу о деньгах в дизайне: кто сколько зарабатывает, как поднять и защитить свою стоимость',
            'персонально поработаю с каждым и возьму лучших в проекты unknw и pinkman',
            'по итогам курса сделаю ревью и рекомендацию в linkedin',
          ].map(t => <FCard key={t} bg="#4ef968"><p className="text-h4" style={{ margin: 0, color: '#000' }}>{t}</p></FCard>)}
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <PriceCard badge="с 13 марта вырастет до 105 000 ₽" price="9 450₽ в месяц" installLabel="рассрочка на 10 мес"
          fullPrice="94 500₽ полная стоимость"
          includes={['учёба в группе 2,5 месяца','доступ к контенту интенсива на 6 месяцев','10 фидбэков от миши розова — еженедельно по расписанию']} />
      </div>
    </section>
  )
}

// ── Tariff 02 ─────────────────────────────────────────────────────────────────
function Tariff02() {
  const standards = ['это выпускники wannabe, которые знают и исповедуют наш подход','работают на высоких позициях в лучших компаниях','имеют опыт не менее 5 лет в профессии','прошли тот же путь, что предстоит тебе']
  return (
    <section style={{ background: '#eaeaea', color: '#000', ...PX, ...PY }}>
      <div style={CENTER}>
        <p className="text-h4" style={{ margin: '0 0 16px' }}>тариф 02</p>
        <h2 className="text-h2" style={{ margin: '0 0 16px' }}>мастерская</h2>
        <p className="text-h4" style={{ margin: 0 }}>арт-директор проведет группу от начала<br />до результата и поможет сделать кейс мирового уровня</p>
      </div>
      <div style={TWO_COL}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ background: '#7c7c7c', borderRadius: 12, aspectRatio: '1/1', width: '100%', marginBottom: 16 }} />
          <p className="text-h4" style={{ margin: '0 0 4px' }}>илья мещеряков</p>
          <p className="text-small" style={{ color: '#7c7c7c', margin: '0 0 16px' }}>арт-директор тарифа</p>
          <p className="text-body" style={{ margin: '0 0 16px' }}>в каждой группе только 20 человек</p>
          <div style={{ height: 8, background: '#cacaca', borderRadius: 4, overflow: 'hidden', marginBottom: 4 }}>
            <div style={{ width: '55%', height: '100%', background: '#4ef968', borderRadius: 4 }} />
          </div>
          <p className="text-small" style={{ color: '#ff6225', margin: 0 }}>осталось 9 мест</p>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          {['живой фидбек — каждую неделю от арт-директора группы','разбираем не только учебные, но и реальные рабочие проекты','воркшоп с арт-директором — раз в месяц','работа в небольшом чате, мотивация и поддержка',
          ].map(t => <FCard key={t} bg="#8f67ff"><p className="text-h4" style={{ margin: 0, color: '#cacaca' }}>{t}</p></FCard>)}
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: '24px auto 0', background: '#fff', borderRadius: 12, padding: 24 }}>
        <p className="text-h3" style={{ color: '#000', margin: '0 0 16px' }}>стандарты арт-директора по методологии wannabe:</p>
        {standards.map((item, i) => (
          <div key={item}>
            {i > 0 && <div style={{ height: 1, background: '#8f67ff', margin: '16px 0' }} />}
            <p className="text-h4" style={{ color: '#000', margin: 0 }}><span style={{ color: '#4ef968' }}>● </span>{item}</p>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <PriceCard badge="с 13 марта вырастет до 69 600 ₽" price="6 264₽ в месяц" installLabel="рассрочка на 10 мес"
          fullPrice="62 640₽ полная стоимость"
          includes={['учёба в группе 2,5 месяца','доступ к контенту интенсива на 6 месяцев','10 фидбэков от арт-директоров — еженедельно по расписанию']} />
      </div>
    </section>
  )
}

// ── Tariff 03 ─────────────────────────────────────────────────────────────────
function Tariff03() {
  return (
    <section style={{ background: '#fff', color: '#000', ...PX, ...PY }}>
      <div style={CENTER}>
        <p className="text-h4" style={{ margin: '0 0 16px' }}>тариф 03</p>
        <h2 className="text-h2" style={{ margin: '0 0 16px' }}>в своём темпе</h2>
        <p className="text-h4" style={{ margin: 0 }}>сделаешь кейс мирового уровня в удобном для тебя темпе</p>
      </div>
      <div style={{ maxWidth: 500, margin: '0 auto 24px' }}>
        <FCard bg="#eaeaea">
          <p className="text-h4" style={{ margin: 0 }}>смотришь материалы и выполняешь задания, когда есть ресурс</p>
        </FCard>
        <FCard bg="#eaeaea">
          <p className="text-h4" style={{ margin: '0 0 16px' }}>4 фидбек-сессии в течение 4 месяцев от арт-директоров wannabe</p>
          <p className="text-small" style={{ margin: 0 }}>каждую сессию ведет разный арт-директор</p>
        </FCard>
      </div>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <PriceCard badge="скидки и промокоды на этот тариф не действуют" price="2 422₽ в месяц"
          installLabel="рассрочка на 10 мес" fullPrice="24 225₽ полная стоимость" border
          includes={['старт 31 марта','4 фидбэка в течение 4 месяцев от арт-директоров — 1 раз в месяц','доступ к контенту интенсива на 4 месяца с первого дня учёбы']} />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span className="text-small" style={{ background: '#8f67ff', color: '#fff', borderRadius: 40, padding: '16px 24px', display: 'inline-block' }}>
            тестовый запуск только в марте — судьба тарифа зависит от вашего фидбэка
          </span>
        </div>
      </div>
    </section>
  )
}

export default function TariffSection() {
  return <><Tariff01 /><Tariff02 /><Tariff03 /></>
}
