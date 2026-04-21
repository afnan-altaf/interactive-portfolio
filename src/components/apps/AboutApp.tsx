import { Window } from "../os/Window";

export function AboutApp() {
  return (
    <Window id="about" title="About.txt" defaultWidth={720} defaultHeight={540} defaultX={50} defaultY={50}>
      <div className="p-8 flex flex-col md:flex-row gap-8 items-start h-full overflow-auto">
        <div className="w-full md:w-1/3 shrink-0">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-lg relative group">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEim1NaBNhrwZRfeLYEdRrRP-DZhXCLthd-ZW8ao8gERyfD7w5F7cEyOAm2zAHD1hw14cI_gXYEdeQveCUJ1CoeharQFfRSVnvnsT9Z1qvIOhFVuIWg_4Ts0QCSka6AQjYQF7xLvVbTrIg94DiilZhkS6qpggWsyRbIphom-zpVj_FZfVydE42o4am4sLcip/s1024/WhatsApp%20Image%202025-12-11%20at%205.05.47%20PM.jpeg"
              alt="Afnan Altaf"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          </div>
          <div className="mt-6 space-y-3 font-mono text-sm text-muted-foreground">
            <div><span className="text-primary font-bold">STATUS:</span> Available for work</div>
            <div><span className="text-primary font-bold">LOCATION:</span> Soan Garden, Islamabad</div>
            <div><span className="text-primary font-bold">CNIC:</span> 38401-9886927-5</div>
            <div><span className="text-primary font-bold">FOCUS:</span> Blogging / Web / E-Services</div>
            <div><span className="text-primary font-bold">LANGUAGES:</span> Punjabi · Urdu · English</div>
          </div>
        </div>

        <div className="w-full md:w-2/3 prose prose-sm md:prose-base dark:prose-invert">
          <h1 className="text-4xl font-bold tracking-tight mb-2 mt-0">Afnan Altaf</h1>
          <p className="text-sm font-mono text-primary mb-6">Freelancer · Blogger · Site Builder</p>
          <p className="text-lg text-muted-foreground lead">
            I am a talented, ambitious and hardworking individual, with broad skills and experience across blogging, digital services, store advertising, and web building.
          </p>
          <div className="h-px w-full bg-border my-6"></div>
          <p>
            Based in Soan Garden, Islamabad, I work with local stores and online sellers to grow their digital presence — launching shops on Daraz.pk, running social media marketing, managing WordPress sites, and selling e-services.
          </p>
          <p>
            I am currently self-employed as an E-Services Seller, collaborating with local stores in Miani, Sargodha. I also keep sharpening my technical skills with Udemy courses in web development, JavaScript, React, HTML, CSS, digital marketing, SEO, and WordPress.
          </p>
          <h3>Skills</h3>
          <ul>
            <li>Blogger — <span className="text-primary">★★★★★</span></li>
            <li>Store Advertiser — <span className="text-primary">★★★★★</span></li>
            <li>E-Services Seller — <span className="text-primary">★★★★★</span></li>
            <li>Site Builder — <span className="text-primary">★★★★★</span></li>
          </ul>
          <h3>Education</h3>
          <ul>
            <li>Second Year — Go. Miani (in pending)</li>
            <li>First Year — Gc. Miani (completed)</li>
            <li>Matriculation — Govt. High School Miani (completed)</li>
            <li>Basic Computer Course — K.B.V.T.II, 2021</li>
          </ul>
          <p className="text-sm">
            <a
              href="https://github.com/afnan-altaf/Portfolio/releases/download/Self/Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-5 py-2 rounded-full bg-primary text-primary-foreground no-underline font-bold hover:opacity-90 transition-opacity"
            >
              Download CV
            </a>
          </p>
        </div>
      </div>
    </Window>
  );
}
