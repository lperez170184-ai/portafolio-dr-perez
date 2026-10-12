import { useState, useEffect, useRef } from "react";

const NAV = ["Inicio","Sobre mí","Proyecto","Habilidades","Contacto"];

const SKILLS_CLINICAL = [
  { name:"Medicina General", pct:95, icon:"🩺" },
  { name:"Salud Ocupacional", pct:90, icon:"🏥" },
  { name:"Medicina Comunitaria", pct:88, icon:"👥" },
  { name:"Farmacología Pediátrica", pct:85, icon:"💊" },
  { name:"Educación Médica", pct:92, icon:"📚" },
];

const SKILLS_TECH = [
  { name:"React / JavaScript", pct:80, icon:"⚛️" },
  { name:"Diseño UI/UX Médico", pct:85, icon:"🎨" },
  { name:"PWA / Apps Móviles", pct:75, icon:"📱" },
  { name:"Git / GitHub", pct:70, icon:"🔧" },
  { name:"Vercel / Deploy", pct:72, icon:"🚀" },
];

const FEATURES = [
  { icon:"⚖️", title:"Cálculo por Peso y Edad", desc:"Dosificación automática según el peso en kg o libras y la edad en meses o años." },
  { icon:"💊", title:"+36 Medicamentos", desc:"Base de datos pediátrica completa organizada en 11 categorías terapéuticas." },
  { icon:"🍶", title:"Jarabes y Gotas", desc:"Volumen exacto en ml y número de gotas para cada presentación farmacéutica." },
  { icon:"📅", title:"Horario AM/PM", desc:"Esquema de tomas diarias con horarios sugeridos en formato 12 horas." },
  { icon:"📴", title:"Sin Internet", desc:"Funciona completamente offline como aplicación nativa instalable." },
  { icon:"🔢", title:"Dosis Dobles", desc:"Calcula dos medicamentos simultáneamente en una sola consulta." },
];

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimSection({ children, id, style }) {
  const ref = useRef();
  const vis = useInView(ref);
  return (
    <div id={id} ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(30px)", transition:"opacity .7s ease, transform .7s ease", ...style }}>
      {children}
    </div>
  );
}

function SkillBar({ name, pct, icon, color }) {
  const ref = useRef();
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontSize:13, fontWeight:600, color:"#1e293b" }}>{icon} {name}</span>
        <span style={{ fontSize:12, color:"#64748b", fontWeight:700 }}>{pct}%</span>
      </div>
      <div style={{ background:"#e2e8f0", borderRadius:20, height:8, overflow:"hidden" }}>
        <div style={{ width: vis?`${pct}%`:"0%", height:"100%", background:color, borderRadius:20, transition:"width 1.2s cubic-bezier(.4,0,.2,1)" }}/>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Inicio");
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", msg:"" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id) {
    const ids = { "Inicio":"inicio","Sobre mí":"sobremi","Proyecto":"proyecto","Habilidades":"habilidades","Contacto":"contacto" };
    const el = document.getElementById(ids[id]);
    if (el) el.scrollIntoView({ behavior:"smooth" });
    setActive(id);
  }

  function handleSend() {
    if (!form.name || !form.email || !form.msg) return;
    setSent(true);
    setForm({ name:"", email:"", msg:"" });
    setTimeout(() => setSent(false), 4000);
  }

  const card = { background:"white", borderRadius:16, padding:28, boxShadow:"0 4px 20px rgba(0,0,0,0.08)", border:"1px solid #e2e8f0" };
  const tag = { display:"inline-block", background:"#e0f2fe", color:"#0369a1", borderRadius:20, padding:"4px 14px", fontSize:11, fontWeight:700, marginBottom:8 };
  const btn = { display:"inline-block", padding:"12px 28px", borderRadius:30, background:"linear-gradient(135deg,#0ea5e9,#06b6d4)", color:"white", fontWeight:700, fontSize:14, border:"none", cursor:"pointer", boxShadow:"0 4px 14px rgba(14,165,233,0.35)", textDecoration:"none" };

  return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", background:"#f8fafc", color:"#1e293b", overflowX:"hidden" }}>

      {/* NAV */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background: scrolled?"rgba(255,255,255,0.97)":"transparent", backdropFilter: scrolled?"blur(12px)":"none", boxShadow: scrolled?"0 2px 20px rgba(0,0,0,0.08)":"none", transition:"all .3s", padding:"0 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", height:64 }}>
          <div style={{ fontSize:17, fontWeight:800, color: scrolled?"#0369a1":"white" }}>Dr. Luis Pérez</div>
          <div style={{ display:"flex", gap:4 }}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)} style={{ padding:"7px 13px", borderRadius:20, border:"none", background: active===n?"#0ea5e9":"transparent", color: active===n?"white": scrolled?"#374151":"white", fontWeight:600, fontSize:12, cursor:"pointer", transition:"all .2s" }}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div id="inicio" style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0c4a6e 0%,#0369a1 45%,#0284c7 70%,#06b6d4 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 24px 40px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-80, width:350, height:350, borderRadius:"50%", background:"rgba(6,182,212,0.1)" }}/>
        <div style={{ maxWidth:800, textAlign:"center", position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>
          <div style={{ width:110, height:110, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"3px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:52 }}>👨‍⚕️</div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:"#67e8f9", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:10 }}>Portafolio Profesional</div>
            <h1 style={{ fontSize:44, fontWeight:800, color:"white", margin:"0 0 8px", lineHeight:1.1, letterSpacing:"-1px" }}>Dr. Luis Pérez</h1>
            <p style={{ fontSize:18, color:"rgba(255,255,255,0.85)", margin:"0 0 4px" }}>Médico General · Desarrollador Digital</p>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>República Dominicana · Salud Ocupacional · Herramientas Médicas Digitales</p>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginTop:4 }}>
            <button onClick={() => scrollTo("Proyecto")} style={btn}>Ver Proyecto 💊</button>
            <button onClick={() => scrollTo("Contacto")} style={{ ...btn, background:"rgba(255,255,255,0.15)", boxShadow:"none", border:"1px solid rgba(255,255,255,0.3)" }}>Contactar 📬</button>
          </div>
          <div style={{ display:"flex", gap:36, marginTop:12, flexWrap:"wrap", justifyContent:"center" }}>
            {[["5+","Años clínicos"],["36+","Medicamentos"],["1","App publicada"],["100%","Open source"]].map(([n,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:24, fontWeight:800, color:"white" }}>{n}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOBRE MÍ */}
      <AnimSection id="sobremi">
        <div style={{ maxWidth:1000, margin:"0 auto", padding:"80px 24px" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={tag}>👤 Sobre mí</div>
            <h2 style={{ fontSize:32, fontWeight:800, color:"#0c4a6e", margin:"8px 0 12px" }}>Médico con visión digital</h2>
            <p style={{ color:"#64748b", maxWidth:580, margin:"0 auto", lineHeight:1.7 }}>Combino la práctica clínica con el desarrollo de herramientas digitales para mejorar la atención médica en la República Dominicana.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { icon:"🏥", title:"Medicina General", desc:"Más de 5 años atendiendo pacientes en consulta, con enfoque en medicina preventiva y comunitaria." },
              { icon:"⚙️", title:"Salud Ocupacional", desc:"Diseño de programas de salud laboral y evaluación de riesgos en empresas e instituciones." },
              { icon:"💻", title:"Desarrollo Digital", desc:"Creación de herramientas médicas accesibles para profesionales de la salud y pacientes." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ ...card, textAlign:"center" }}>
                <div style={{ fontSize:38, marginBottom:12 }}>{icon}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:"#0c4a6e", marginBottom:8 }}>{title}</h3>
                <p style={{ fontSize:12, color:"#64748b", lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* PROYECTO */}
      <AnimSection id="proyecto">
        <div style={{ background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)", padding:"80px 24px" }}>
          <div style={{ maxWidth:1000, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <div style={tag}>💊 Proyecto Destacado</div>
              <h2 style={{ fontSize:32, fontWeight:800, color:"#0c4a6e", margin:"8px 0 12px" }}>Dosis Pediátrica</h2>
              <p style={{ color:"#64748b", maxWidth:580, margin:"0 auto", lineHeight:1.7 }}>Calculadora médica gratuita para la dosificación de medicamentos pediátricos en jarabes y gotas según el peso y edad del paciente.</p>
            </div>
            {/* Banner app */}
            <div style={{ background:"linear-gradient(135deg,#0369a1,#06b6d4)", borderRadius:20, padding:40, textAlign:"center", marginBottom:28, boxShadow:"0 8px 30px rgba(3,105,161,0.3)" }}>
              <div style={{ fontSize:60, marginBottom:10 }}>💊</div>
              <h3 style={{ fontSize:24, fontWeight:800, color:"white", marginBottom:6 }}>Dosis Pediátrica v2.0</h3>
              <p style={{ color:"rgba(255,255,255,0.8)", marginBottom:20, fontSize:14 }}>Calculadora Médica Infantil · React PWA</p>
              <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
                {["React","PWA","Vite","Vercel","JavaScript","Offline"].map(t=>(
                  <span key={t} style={{ background:"rgba(255,255,255,0.2)", color:"white", borderRadius:20, padding:"4px 13px", fontSize:11, fontWeight:600 }}>{t}</span>
                ))}
              </div>
              <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <a href="https://dosis-pediatrica.vercel.app" target="_blank" rel="noreferrer" style={{ ...btn, background:"white", color:"#0369a1" }}>🌐 Ver App en Vivo</a>
                <a href="https://github.com/lperez170184-ai/dosis-pediatrica" target="_blank" rel="noreferrer" style={{ ...btn, background:"rgba(255,255,255,0.15)", boxShadow:"none", border:"1px solid rgba(255,255,255,0.35)", color:"white" }}>📂 GitHub</a>
              </div>
            </div>
            {/* Features */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:18 }}>
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} style={{ ...card, display:"flex", gap:12, alignItems:"flex-start", padding:20 }}>
                  <div style={{ fontSize:26, flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:"#0c4a6e", marginBottom:3 }}>{title}</div>
                    <div style={{ fontSize:11, color:"#64748b", lineHeight:1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Métricas */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              {[["36+","Medicamentos","💊"],["11","Categorías","📂"],["Gratis","Para todos","🆓"],["Offline","Sin internet","📴"]].map(([v,l,i])=>(
                <div key={l} style={{ ...card, textAlign:"center", padding:20 }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>{i}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:"#0369a1" }}>{v}</div>
                  <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimSection>

      {/* HABILIDADES */}
      <AnimSection id="habilidades">
        <div style={{ maxWidth:1000, margin:"0 auto", padding:"80px 24px" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={tag}>⚡ Habilidades</div>
            <h2 style={{ fontSize:32, fontWeight:800, color:"#0c4a6e", margin:"8px 0 12px" }}>Clínicas y Tecnológicas</h2>
            <p style={{ color:"#64748b" }}>Una combinación única de conocimiento médico y habilidades digitales.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
            <div style={card}>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#0c4a6e", marginBottom:20 }}>🩺 Habilidades Clínicas</h3>
              {SKILLS_CLINICAL.map(s => <SkillBar key={s.name} {...s} color="linear-gradient(90deg,#0369a1,#0284c7)"/>)}
            </div>
            <div style={card}>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#0c4a6e", marginBottom:20 }}>💻 Habilidades Tecnológicas</h3>
              {SKILLS_TECH.map(s => <SkillBar key={s.name} {...s} color="linear-gradient(90deg,#06b6d4,#10b981)"/>)}
            </div>
          </div>
        </div>
      </AnimSection>

      {/* CONTACTO */}
      <AnimSection id="contacto">
        <div style={{ background:"linear-gradient(135deg,#0c4a6e,#0369a1)", padding:"80px 24px" }}>
          <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
            <div style={{ ...tag, background:"rgba(255,255,255,0.15)", color:"white" }}>📬 Contacto</div>
            <h2 style={{ fontSize:32, fontWeight:800, color:"white", margin:"8px 0 12px" }}>¿Hablamos?</h2>
            <p style={{ color:"rgba(255,255,255,0.7)", marginBottom:32, lineHeight:1.7 }}>Si tienes preguntas sobre el proyecto, colaboraciones o herramientas digitales, escríbeme.</p>
            {sent ? (
              <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:16, padding:40, color:"white" }}>
                <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
                <div style={{ fontSize:18, fontWeight:700 }}>¡Mensaje enviado!</div>
                <div style={{ fontSize:13, opacity:.8, marginTop:6 }}>Te responderé pronto.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[["name","👤 Nombre completo","text"],["email","📧 Correo electrónico","email"]].map(([k,ph])=>(
                  <input key={k} type="text" placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} style={{ padding:"14px 18px", borderRadius:12, border:"none", background:"rgba(255,255,255,0.12)", color:"white", fontSize:14, outline:"none" }}/>
                ))}
                <textarea placeholder="💬 Tu mensaje..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} rows={4} style={{ padding:"14px 18px", borderRadius:12, border:"none", background:"rgba(255,255,255,0.12)", color:"white", fontSize:14, outline:"none", resize:"vertical", fontFamily:"inherit" }}/>
                <button onClick={handleSend} style={{ ...btn, background:"white", color:"#0369a1", padding:"14px", width:"100%" }}>Enviar mensaje 🚀</button>
              </div>
            )}
            <div style={{ display:"flex", gap:20, justifyContent:"center", marginTop:28, flexWrap:"wrap" }}>
              <a href="https://dosis-pediatrica.vercel.app" target="_blank" rel="noreferrer" style={{ color:"rgba(255,255,255,0.75)", fontSize:12, textDecoration:"none" }}>🌐 dosis-pediatrica.vercel.app</a>
              <a href="https://github.com/lperez170184-ai/dosis-pediatrica" target="_blank" rel="noreferrer" style={{ color:"rgba(255,255,255,0.75)", fontSize:12, textDecoration:"none" }}>📂 GitHub</a>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* FOOTER */}
      <div style={{ background:"#0c1a2e", padding:"24px", textAlign:"center" }}>
        <div style={{ fontSize:12, color:"#64748b" }}>© 2026 Dr. Luis Pérez · Médico General & Desarrollador Digital · República Dominicana</div>
        <div style={{ fontSize:11, color:"#334155", marginTop:5 }}>Construido con React · Desplegado en Vercel · 💊 Dosis Pediátrica</div>
      </div>
    </div>
  );
}
