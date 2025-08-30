import React, { useMemo, useState } from "react";
import "./App.css";

type Provider = {
  id: number;
  name: string;
  role: string;
  city: string;
  price: number;
  rating: number;
  tags: string[];
  image: string;
};

const CITIES = ["الدار البيضاء", "الرباط", "فاس", "مراكش", "طنجة", "أكادير"];

const CATEGORIES = [
  { k: "music", label: "موسيقيون", emoji: "🎸" },
  { k: "theatre", label: "فرق مسرح", emoji: "🎭" },
  { k: "photo", label: "مصورون", emoji: "📷" },
  { k: "design", label: "مصممون", emoji: "🎨" },
  { k: "audio", label: "تقنيو الصوت", emoji: "🎚️" },
  { k: "light", label: "إضاءة", emoji: "💡" },
  { k: "dance", label: "راقصون", emoji: "🩰" },
  { k: "deco", label: "ديكور/سينوغرافيا", emoji: "🧱" },
  { k: "dj", label: "DJ", emoji: "🎧" },
  { k: "mc", label: "MC/منشّط", emoji: "🎤" },
  { k: "calli", label: "خط/رسم", emoji: "✒️" },
];

const PROVIDERS: Provider[] = [
  {
    id: 1,
    name: "Batucada Casa",
    role: "فرقة إيقاع شارع (باتوكادا)",
    city: "الدار البيضاء",
    price: 3500,
    rating: 4.8,
    tags: ["إيقاع", "عرض حي", "كرنفال"],
    image:
      "https://www.hespress.com/files/2018/06/mawzine_Groupe_Soleil_Farkat_Ashems4_315739424.jpg",
  },
  {
    id: 2,
    name: "Noor Light Design",
    role: "مصمم إضاءة مسرح",
    city: "الرباط",
    price: 2200,
    rating: 4.6,
    tags: ["DMX", "Moving Heads", "LED PAR"],
    image:
      "https://www.ledyilighting.com/wp-content/uploads/2024/06/Stage-Lighting-11.jpg",
  },
  {
    id: 3,
    name: "SawtPro FOH",
    role: "مهندس صوت مباشر",
    city: "مراكش",
    price: 2700,
    rating: 4.7,
    tags: ["FOH", "Monitors", "EQ/Mix"],
    image: "https://ampedstudio.com/wp-content/uploads/2021/12/sound-engineering.jpg",
  },
  {
    id: 4,
    name: "Masrah Décor",
    role: "سينوغرافيا/ديكور",
    city: "فاس",
    price: 4200,
    rating: 4.5,
    tags: ["Backdrops", "Props", "Montage"],
    image:
      "https://atitheatre.ae/wp-content/uploads/2017/02/%D9%85%D9%86-%D8%A7%D9%84%D8%A7%D8%B1%D8%B4%D9%8A%D9%81-%D8%A7%D9%84%D9%85%D8%B3%D8%B1%D8%AD%D9%8A.jpg",
  },
  {
    id: 5,
    name: "Studio Lens",
    role: "تصوير فوتوغرافي وفيديو",
    city: "طنجة",
    price: 1800,
    rating: 4.4,
    tags: ["Photo", "Aftermovie", "Reels"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdZCS7wR0mciHjvQF_8T2dnQ2dI0aPdPU3A&s",
  },
];

const StarRating: React.FC<{ value: number }> = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <span className="stars" aria-label={`تقييم ${value} من 5`}>
      {stars.map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`star ${value >= s - 0.25 ? "full" : value >= s - 0.75 ? "half" : ""}`}
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="stars__num">{value.toFixed(1)}</span>
    </span>
  );
};

export default function App() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const results = useMemo(() => {
    const nq = q.trim().toLowerCase();
    return PROVIDERS.filter((p) => {
      const okQ =
        !nq ||
        p.name.toLowerCase().includes(nq) ||
        p.role.toLowerCase().includes(nq) ||
        p.tags.some((t) => t.toLowerCase().includes(nq));
      const okCity = !city || p.city === city;
      const okPrice = p.price <= maxPrice;
      return okQ && okCity && okPrice;
    });
  }, [q, city, maxPrice]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document
      .getElementById("providers")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setQ("");
    setCity("");
    setMaxPrice(10000);
  };

  return (
    <>
      {/* Navbar */}
      <header className="nav">
        <div className="container nav__inner">
          <a href="#" className="brand" aria-label="Servis’Art.com">
            Servis’<span className="brand-accent">Art</span>
          </a>
          <nav className="nav__links">
            <a href="#providers">المزودون</a>
            <a href="#pricing" className="btn ghost">
              التسعير
            </a>
            <a href="#contact" className="btn">
              أنشر خدمتي
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO (جديد بخلفية صورة ونص صغير + زر ابدأ الآن) */}
        <section className="hero hero--image fullbleed">

          <div className="container hero__container">
            <div className="hero__content">
              <h1>
                <span>منصة رقمية للفنون والخدمات الثقافية</span>{" "}
                <span className="txt-gradient">Servis’Art.com</span>
              </h1>
              <p className="hero__sub">
                اربط بين الفنانين/التقنيين والعملاء بسهولة وبشكل موثوق.
              </p>
              <a href="#providers" className="btn hero__btn">
                ابدأ الآن
              </a>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <section id="search" className="section section--tinted">
          <div className="container">
            <h2>ابحث بسرعة</h2>
            <form className="search" onSubmit={onSearch} aria-label="بحث عن مقدّمي خدمات">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="مثال: باتوكادا، مصوّر…"
              />
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">المدينة</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="price-filter">
                <label htmlFor="price">السعر الأقصى</label>
                <input
                  id="price"
                  type="range"
                  min={0}
                  max={20000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <span className="price-filter__value">
                  {maxPrice.toLocaleString()} MAD
                </span>
              </div>
              <button className="btn" type="submit">
                بحث
              </button>
              <button className="btn outline" type="button" onClick={resetFilters}>
                مسح الفلاتر
              </button>
            </form>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="section">
          <div className="container">
            <h2>الفئات الشائعة</h2>
            <div className="cats">
              {CATEGORIES.map((c) => (
                <a
                  key={c.k}
                  href="#providers"
                  className="chip"
                  onClick={(e) => {
                    e.preventDefault();
                    setQ(c.label);
                  }}
                >
                  <span className="chip__emoji">{c.emoji}</span>
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PROVIDERS */}
        <section id="providers" className="section">
          <div className="container">
            <div className="providers__head">
              <h2>مزودون بارزون قريباً منك</h2>
              <span className="pill">{results.length} نتيجة</span>
            </div>

            {results.length === 0 ? (
              <div className="empty">
                لا توجد نتائج مطابقة.{" "}
                <button className="btn small" onClick={resetFilters}>
                  مسح الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid cards-3">
                {results.map((p) => (
                  <article key={p.id} className="card provider">
                    <div className="provider__thumb">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="provider__img"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="provider__meta">
                      <h3 className="provider__title">{p.name}</h3>
                      <div className="provider__role">{p.role}</div>
                      <div className="provider__info">
                        <span className="tag">{p.city}</span>
                        <span className="tag price">
                          {p.price.toLocaleString()} MAD
                        </span>
                        <StarRating value={p.rating} />
                      </div>
                      <div className="tags">
                        {p.tags.map((t, i) => (
                          <span key={i} className="tag ghost">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div className="provider__cta">
                        <a href="#contact" className="btn small">
                          اطلب عرض
                        </a>
                        <a href="#contact" className="btn outline small">
                          تواصل
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PRICING (مختصر) */}
        <section id="pricing" className="section">
          <div className="container">
            <h2>التسعير</h2>
            <p className="lead">Freemium + PRO.</p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section cta">
          <div className="container narrow">
            <h2>تواصل معنا</h2>
            <form
              className="card form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("تم الإرسال 👌");
              }}
            >
              <input placeholder="الإسم الكامل" required />
              <input type="email" placeholder="البريد الإلكتروني" required />
              <textarea rows={4} placeholder="صف الخدمة المطلوبة" required />
              <button className="btn" type="submit">
                أرسل الطلب
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
