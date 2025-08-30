import { useMemo, useState, useEffect } from "react";
import "./App.css";
import ProvidersSlider from "./components/ProvidersSlider";
import { PROVIDERS } from "./data/providers";

/** */
const CITIES = ["الدار البيضاء", "الرباط", "فاس", "مراكش", "طنجة", "أكادير"];

export default function App() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  // تطبيق تيمة البداية حسب التخزين/النظام
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

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

  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="container nav__inner">
          <a href="#" className="brand">
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
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero hero--image fullbleed">
        <div className="hero__container container">
          <div className="hero__content">
            <h1>
              منصة رقمية للفنون والخدمات الثقافية{" "}
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

      {/* PROVIDERS — تحطّ فوق البحث */}
      <section id="providers" className="section">
        <div className="container">
          <div className="providers__head">
            <h2>مزودون بارزون قريباً منك</h2>
            <span className="pill">{results.length} نتيجة</span>
          </div>
          <ProvidersSlider items={results} />
        </div>
      </section>

      {/* SEARCH */}
      <section id="search" className="section section--tinted">
        <div className="container">
          <h2>ابحث بسرعة</h2>
          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="مثال: باتوكادا، مصور..."
              aria-label="نوع الخدمة"
            />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="المدينة"
            >
              <option value="">المدينة</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="price-filter">
              <label>السعر الأقصى</label>
              <input
                type="range"
                min={800}
                max={10000}
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
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <div>
            © {new Date().getFullYear()} Servis’Art.com — منصة للفنون والخدمات
            الثقافية.
          </div>
        </div>
      </footer>
    </>
  );
}

/* زر تبديل Light/Dark */
function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <button onClick={toggle} className="btn ghost" aria-label="تبديل النمط">
      {isDark ? "الوضع الفاتح" : "الوضع الداكن"}
    </button>
  );
}
