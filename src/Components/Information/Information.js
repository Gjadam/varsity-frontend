import React from 'react'
import './Information.css'
import { PiChalkboardTeacherLight, PiBookLight, PiTimerLight, } from 'react-icons/pi'
import { LiaUniversitySolid } from 'react-icons/lia'
import InformationItem from './InformationItem'
export default function Information() {
  return (
    <div className="container">
    <div className='information'>
      <div className="information__right-side">
        <h1 className="information__right-side__title">مشاوره و پروژه های <span className='information__right-side__title__style'>برنامه نویسی</span> پروژه محور</h1>
        <div className="information__right-side__image__wrapper">
          <img src="/images/info/info-image.jpg" alt="" className="information__right-side__image" />
        </div>
      </div>
      <div className="information__left-side">
        <InformationItem icon={<PiChalkboardTeacherLight />} title={'مدرسان مجرب'} text={'مجموعه ما دارای مدرسان مجرب و و دوره های آموزشی با کیفیتی است که به شما کمک می کند مهارت های مورد نیاز برای رسیدن به موفقیت را پیدا کرده و پیشرفت کنید. با تیم ما متخصصان حوزه های مختلفی در اختیار شما قرار می گیرند که تجربه و دانش خود را با شما به اشتراک می گذارند.'} />
        <InformationItem icon={<PiBookLight />} title={'خودآموزی و یادگیری'} text={' با دوره های انلاین ما، امکانات و دسترسی آسان به دانش های جدید را در اختیار شما قرار می دهیم تا مسیر موفقیت خود را با اعتماد بنفس و قدرت جدیدی پیموده و به رشد و پیشرفت خود بپردازید.'} />
        <InformationItem icon={<PiTimerLight />} title={'کسب تجربه'} text={'با تمریناتی که در دوره‌ها انجام می‌دهید، می‌توانید تجربه‌ای قابل ارزیابی به دست آورید همچنین، با انجام تمرینات متنوع و متناسب با هدف خود، می‌توانید مهارت‌های جدیدی را یاد بگیرید و به‌صورت کامل به آن‌ها  تسلط پیدا کنید'} />
        <InformationItem icon={<LiaUniversitySolid />} title={'ورود به بازار کار'} text={'میتوانید با استفاده از تجارب مدرسین ما و همچنین تلاش خودتون طعم دلنشین بازار کار رو بچشین چون مدرسین و تیم پشتیبانی ما شمارو از صفر تا رسیدن به بازار کار راهنمایی میکنند'} />
      </div>
    </div>
    </div>
  )
}
