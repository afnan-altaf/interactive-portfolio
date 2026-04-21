import { Window } from "../os/Window";
import { Award, ExternalLink } from "lucide-react";

const CERTIFICATES = [
  { id: 1, url: "https://www.udemy.com/certificate/UC-3fdc01d7-e268-48c8-aa6a-4a42c2bff53b/" },
  { id: 2, url: "https://www.udemy.com/certificate/UC-f53bd0ad-adbc-4e43-a406-7acfa3d48f13/" },
  { id: 3, url: "https://www.udemy.com/certificate/UC-8ab9a44f-d979-44b9-b238-dcdaae3a2bb8/" },
  { id: 4, url: "https://www.udemy.com/certificate/UC-9afb9c0a-e77c-4009-b008-73f4a12afee4/" },
  { id: 5, url: "https://www.udemy.com/certificate/UC-71fe1cc7-d2dd-42dd-82ad-f12ff08e3834/" },
  { id: 6, url: "https://www.udemy.com/certificate/UC-62337db5-024e-404c-a260-e8b99016e24d/" },
  { id: 7, url: "https://www.udemy.com/certificate/UC-6d0472f4-804a-40a5-a54f-ec7a8f16f37f/" },
  { id: 8, url: "https://www.udemy.com/certificate/UC-d0877f1c-cc2a-473f-8bb3-7692a30aef2c/" },
  { id: 9, url: "https://www.udemy.com/certificate/UC-96055554-8d6f-41c3-9a3a-2ee526cad227/" },
  { id: 10, url: "https://www.udemy.com/certificate/UC-02dcae19-8de6-4e96-bbe0-bbb2f66584e5/" },
  { id: 11, url: "https://www.udemy.com/certificate/UC-74d9f195-7f25-4354-ab87-92538ff7ccf3/" },
  { id: 12, url: "https://www.udemy.com/certificate/UC-65a9efdc-fcc0-4e0b-a1bc-59106ee488d4" },
  { id: 13, url: "https://www.udemy.com/certificate/UC-b74282bf-d8ac-482d-9857-38ee78d85e14" },
];

const TOPICS = [
  "Web Development Bootcamp",
  "JavaScript Essentials",
  "React Fundamentals",
  "HTML & CSS",
  "Digital Marketing",
  "SEO Foundations",
  "WordPress",
  "Social Media Marketing",
  "Content Strategy",
  "Freelancing",
];

export function WritingApp() {
  return (
    <Window id="writing" title="Certifications.md" defaultWidth={620} defaultHeight={720} defaultX={300} defaultY={50}>
      <div className="p-0 h-full flex flex-col bg-card">
        <div className="p-6 border-b border-border bg-muted/30">
          <h2 className="text-2xl font-bold font-mono tracking-tight text-primary">/var/log/certifications</h2>
          <p className="text-sm text-muted-foreground mt-2">13 Udemy certifications across web development, digital marketing & more.</p>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <section>
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Topics covered</h3>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <span key={t} className="px-3 py-1 text-xs font-mono bg-background border border-border rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Certificates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATES.map((c) => (
                <a
                  key={c.id}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/60 hover:bg-primary/5 transition-all"
                >
                  <Award className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-bold">Certificate {c.id}</div>
                    <div className="text-xs text-muted-foreground truncate">udemy.com</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </section>

          <section className="pt-2">
            <p className="text-xs text-muted-foreground font-mono">
              Each link opens the original Udemy certificate in a new tab.
            </p>
          </section>
        </div>
      </div>
    </Window>
  );
}
