import React, { useRef } from "react";
import type { Provider } from "../data/providers";

/* نجوم بتقييمات نصفية */
const StarRating: React.FC<{ value: number }> = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <span className="stars" aria-label={`تقييم ${value} من 5`}>
      {stars.map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`star ${value >= s ? "full" : value >= s - 0.5 ? "half" : ""}`}
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="stars__num">{value.toFixed(1)}</span>
    </span>
  );
};

export default function ProvidersSlider({ items }: { items: Provider[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9);
    const atStart = el.scrollLeft <= 2;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;

    if (dir === "next") {
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });         // loop → البداية
      } else {
        el.scrollBy({ left: delta, behavior: "smooth" });
      }
    } else {
      if (atStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" }); // loop → النهاية
      } else {
        el.scrollBy({ left: -delta, behavior: "smooth" });
      }
    }
  };
/*t*/
  if (!items.length) return <div className="empty">لا توجد نتائج حالياً.</div>;

  return (
    <div className="slider">
      <button
        className="slider__btn slider__btn--prev"
        aria-label="السابق"
        onClick={() => scrollByAmount("prev")}
      >
        ‹
      </button>

      {/* نخلي مسار السلايدر LTR باش السحب بالأزرار طبيعي، والمحتوى داخل الكارد RTL عادي */}
      <div className="slider__track" ref={trackRef} dir="ltr">
        {items.map((p) => (
          <article key={p.id} className="card provider provider--card" dir="rtl">
            <div className="provider__thumb">
              <img src={p.image} alt={p.name} className="provider__img" loading="lazy" />
            </div>
            <div className="provider__meta">
              <h3 className="provider__title">{p.name}</h3>
              <div className="provider__role">{p.role}</div>
              <div className="provider__info">
                <span className="tag">{p.city}</span>
                <span className="tag price">{p.price.toLocaleString()} MAD</span>
                <StarRating value={p.rating} />
              </div>
              <div className="provider__cta">
                <a href="#contact" className="btn small">اطلب عرض</a>
                <a href="#contact" className="btn outline small">تواصل</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        className="slider__btn slider__btn--next"
        aria-label="التالي"
        onClick={() => scrollByAmount("next")}
      >
        ›
      </button>

      <div className="slider__fade slider__fade--start" />
      <div className="slider__fade slider__fade--end" />
    </div>
  );
}
