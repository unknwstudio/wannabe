import CourseHero from '@/components/course/CourseHero'
import CourseFeatures from '@/components/course/CourseFeatures'
import CourseAuthor from '@/components/course/CourseAuthor'
import CourseGuests from '@/components/course/CourseGuests'
import CourseChoiceGuide from '@/components/course/CourseChoiceGuide'
import CourseHowItWorks from '@/components/course/CourseHowItWorks'
import CourseReviews from '@/components/course/CourseReviews'
import CourseEmailCapture from '@/components/course/CourseEmailCapture'
import CourseInstallment from '@/components/course/CourseInstallment'
import CourseCorporate from '@/components/course/CourseCorporate'
import CourseFAQ from '@/components/course/CourseFAQ'

export default function NextLevelConceptsPage() {
  return (
    <main>
      <CourseHero
        speakerAvatar="/images/persons/misha-rozov.webp"
        speakerName="Миша Розов"
        priceLabel="от 29 900 ₽"
        priceNote="старт 22 апреля · 6 недель"
      />
      <CourseFeatures />
      <CourseAuthor />
      <CourseGuests />
      <CourseChoiceGuide />
      <CourseHowItWorks />
      <CourseReviews />
      <CourseEmailCapture />
      <CourseInstallment
        description="никаких банков и процентов — оплата напрямую через платформу"
      />
      <CourseCorporate />
      <CourseFAQ />
    </main>
  )
}
