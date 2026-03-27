import React from 'react'

const PX: React.CSSProperties = { paddingLeft: 'clamp(20px,15vw,220px)', paddingRight: 'clamp(20px,15vw,220px)' }
const PY: React.CSSProperties = { paddingTop: 'clamp(40px,6vw,90px)', paddingBottom: 'clamp(40px,6vw,90px)' }

type FAQItem = { number: string; question: string; answer: string }

const DEFAULTS: FAQItem[] = [
  { number: '01', question: 'нужен ли опыт для участия?', answer: 'Да — этот курс для дизайнеров с базой. Мы работаем на уровне мидл и выше.' },
  { number: '02', question: 'как проходит обучение?', answer: 'Видео-лекции + живые эфиры + практика с проверкой арт-директоров. Всё в личном кабинете.' },
  { number: '03', question: 'есть ли сертификат?', answer: 'Да, выдаём сертификат wannabe по завершении финального проекта.' },
  { number: '04', question: 'что если не успею?', answer: 'Доступ к материалам остаётся навсегда. Можно пересмотреть в любое время.' },
]

export default function CourseFAQ({ heading = 'FAQ', items = DEFAULTS }: { heading?: string; items?: FAQItem[] }) {
  return (
    <section style={{ background: '#eaeaea', ...PX, ...PY }}>
      <p className="text-h2" style={{ color: '#1c1a31', margin: '0 0 48px' }}>{heading}</p>

      <div>
        {items.map((item, i) => (
          <div key={item.number}>
            {i > 0 && <div style={{ height: 1, background: '#cacaca', margin: 0 }} />}
            <div style={{ display: 'flex', gap: 48, padding: '24px 0', flexWrap: 'wrap' }}>
              <div style={{ minWidth: 200, flex: '0 0 clamp(200px,30vw,454px)', display: 'flex', gap: 24 }}>
                <span className="text-small" style={{ color: '#7c7c7c', flexShrink: 0, paddingTop: 2 }}>{item.number}</span>
                <p className="text-body" style={{ color: '#7c7c7c', margin: 0 }}>{item.question}</p>
              </div>
              <p className="text-body" style={{ color: '#1c1a31', margin: 0, flex: 1, minWidth: 200 }}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
