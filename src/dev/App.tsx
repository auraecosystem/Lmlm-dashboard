import { useState } from "react";
import {
  Activity, Boxes, BrainCircuit, ChevronDown, CircleDot, Cpu, Database,
  GitBranch, Gauge, Layers3, Menu, Network, Play, Plus, Radio, Search,
  Server, Settings2, ShieldCheck, Sparkles, Terminal, Zap
} from "lucide-react";

type Model = {
  name: string; provider: string; status: "Online" | "Standby"; score: number;
  latency: string; tokens: string; capability: string;
};

const models: Model[] = [
  { name: "Llama 3.1 70B", provider: "NVIDIA NIM", status: "Online", score: 92, latency: "184 ms", tokens: "128K", capability: "Reasoning" },
  { name: "GPT-5.6 Luna", provider: "OpenAI", status: "Online", score: 87, latency: "221 ms", tokens: "256K", capability: "General" },
  { name: "Local CUDA", provider: "LMLM Runtime", status: "Standby", score: 74, latency: "96 ms", tokens: "32K", capability: "Fast / Private" },
];

function Stat({ icon: Icon, label, value, detail }: { icon: any; label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-line bg-panel/80 p-5 shadow-glow">
    <div className="flex items-center justify-between">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 text-cyan"><Icon size={18}/></div>
      <span className="text-[11px] font-medium uppercase tracking-[.18em] text-slate-500">{label}</span>
    </div>
    <div className="mt-5 text-2xl font-semibold tracking-tight text-white">{value}</div>
    <div className="mt-1 text-xs text-slate-500">{detail}</div>
  </div>;
}

function App() {
  const [active, setActive] = useState("Overview");
  const [running, setRunning] = useState(false);
  const nav = [
    ["Overview", Activity], ["Models", Boxes], ["Routing", Network], ["Script.god", Terminal],
    ["Memory", Database], ["Verification", ShieldCheck], ["Infrastructure", Server]
  ];

  return <div className="min-h-screen bg-[radial-gradient(circle_at_70%_-10%,rgba(101,76,190,.16),transparent_32%),radial-gradient(circle_at_20%_0%,rgba(55,197,232,.08),transparent_28%),#08111f] text-slate-200">
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-[#091321]/95 p-5 lg:block">
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/80 to-violet/80 text-ink shadow-lg"><BrainCircuit size={21}/></div>
        <div><div className="font-semibold tracking-wide text-white">LMLM</div><div className="text-[10px] uppercase tracking-[.2em] text-slate-500">Control Plane</div></div>
      </div>
      <div className="my-7 h-px bg-line"/>
      <div className="space-y-1">
        {nav.map(([label, Icon]) => <button key={label} onClick={() => setActive(label as string)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active === label ? "bg-slate-800/80 text-white" : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"}`}>
          <Icon size={17}/><span>{label as string}</span>{label === "Models" && <span className="ml-auto rounded-full bg-cyan/10 px-2 py-0.5 text-[10px] text-cyan">3</span>}
        </button>)}
      </div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-line bg-panel p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-300"><CircleDot size={12} className="fill-green text-green"/> System healthy</div>
        <div className="mt-2 text-[11px] text-slate-500">NIM cluster · 1 GPU node</div>
      </div>
    </aside>

    <main className="lg:ml-64">
      <header className="sticky top-0 z-20 border-b border-line bg-[#08111f]/85 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-slate-400"><Menu size={21}/></button>
            <div><div className="text-xs uppercase tracking-[.18em] text-slate-500">LMLM / {active}</div><h1 className="mt-1 text-xl font-semibold text-white">{active === "Overview" ? "Intelligence Orchestration" : active}</h1></div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2 text-xs text-slate-400"><Search size={14}/><span>Search runtime...</span><kbd className="ml-4 rounded bg-slate-800 px-1.5 py-0.5 text-[10px]">⌘ K</kbd></div>
            <button className="rounded-xl border border-line bg-panel p-2 text-slate-400"><Settings2 size={17}/></button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet to-cyan"/>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] p-5 md:p-8">
        <div className="mb-7 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div><div className="flex items-center gap-2 text-sm text-green"><span className="h-1.5 w-1.5 rounded-full bg-green"/> Operational</div><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">A model-agnostic control plane for routing tasks across NVIDIA NIM, cloud providers and local runtimes.</p></div>
          <button onClick={() => setRunning(!running)} className="flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-slate-200"><Play size={15} className={running ? "fill-ink" : ""}/>{running ? "Task running" : "Run task"}</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat icon={Cpu} label="Active Models" value="2 / 3" detail="1 model in standby"/>
          <Stat icon={Zap} label="Requests / min" value="1,284" detail="+18.6% from last hour"/>
          <Stat icon={Gauge} label="Avg Latency" value="184 ms" detail="p95 · 312 ms"/>
          <Stat icon={ShieldCheck} label="Verification" value="99.4%" detail="last 10,000 tasks"/>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-2xl border border-line bg-panel/80 p-6 shadow-glow">
            <div className="flex items-center justify-between"><div><h2 className="font-semibold text-white">Model routing</h2><p className="mt-1 text-xs text-slate-500">Capability matching · live scores</p></div><button className="rounded-lg border border-line p-2 text-slate-400"><ChevronDown size={15}/></button></div>
            <div className="mt-5 space-y-3">
              {models.map((m, i) => <div key={m.name} className="group rounded-xl border border-line bg-[#0a1423] p-4 transition hover:border-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${i === 0 ? "bg-cyan/10 text-cyan" : "bg-slate-800 text-slate-400"}`}><Cpu size={17}/></div><div className="min-w-0"><div className="truncate text-sm font-medium text-white">{m.name}</div><div className="text-[11px] text-slate-500">{m.provider} · {m.capability}</div></div></div>
                  <div className="flex items-center gap-4"><span className={`hidden text-[11px] sm:inline ${m.status === "Online" ? "text-green" : "text-slate-500"}`}>{m.status}</span><span className="text-sm font-semibold text-white">{m.score}</span></div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet" style={{width:`${m.score}%`}}/></div>
                <div className="mt-3 flex gap-5 text-[11px] text-slate-500"><span>Latency <b className="font-medium text-slate-300">{m.latency}</b></span><span>Context <b className="font-medium text-slate-300">{m.tokens}</b></span><span className="hidden sm:inline">Priority <b className="font-medium text-slate-300">{80-i*6}</b></span></div>
              </div>)}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-panel/80 p-6 shadow-glow">
            <div className="flex items-center justify-between"><div><h2 className="font-semibold text-white">Runtime topology</h2><p className="mt-1 text-xs text-slate-500">GOD Protocol → inference fabric</p></div><Radio size={17} className="text-cyan"/></div>
            <div className="mt-6 flex flex-col items-center gap-2">
              <Node icon={Sparkles} title="Script.god" sub="Policy · routing · coordination" active/>
              <Line/>
              <Node icon={GitBranch} title="GOD Protocol" sub="CONNECT · TASK · ROUTE · VERIFY"/>
              <Line/>
              <div className="grid w-full grid-cols-3 gap-2">
                <NodeSmall title="NVIDIA NIM" sub="Llama 70B" active/>
                <NodeSmall title="OpenAI" sub="GPT family"/>
                <NodeSmall title="Local" sub="CUDA runtime"/>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-slate-600"><Layers3 size={13}/> Kubernetes inference fabric</div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-line bg-panel/80 p-6 shadow-glow">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="font-semibold text-white">Script.god activity</h2><p className="mt-1 text-xs text-slate-500">Recent orchestration events</p></div><button className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-slate-400"><Plus size={14}/> Register model</button></div>
          <div className="mt-5 overflow-x-auto"><div className="min-w-[680px] divide-y divide-line/70">
            {[
              ["ROUTE", "reasoning task → nvidia-llama-3.1-70b", "184 ms", "2s ago", "success"],
              ["VERIFY", "response integrity · 4 checks passed", "42 ms", "18s ago", "success"],
              ["REGISTER", "model nvidia-llama-3.1-70b discovered", "61 ms", "2m ago", "success"],
              ["SYNC", "context state → memory layer", "28 ms", "4m ago", "success"]
            ].map(([type, task, time, when, status]) => <div key={when} className="grid grid-cols-[100px_1fr_90px_80px] items-center gap-4 py-3 text-xs"><span className="font-mono text-cyan">{type}</span><span className="text-slate-300">{task}</span><span className="text-slate-500">{time}</span><span className="text-right text-green">{status}</span></div>)}
          </div></div>
        </section>
      </div>
    </main>
  </div>;
}

function Node({ icon: Icon, title, sub, active=false }: {icon:any; title:string; sub:string; active?:boolean}) {
  return <div className={`w-full max-w-sm rounded-xl border ${active ? "border-cyan/30 bg-cyan/[.05]" : "border-line bg-[#0a1423]"} p-3 text-center`}><div className={`mx-auto flex w-fit items-center gap-2 text-sm font-medium ${active ? "text-cyan" : "text-slate-300"}`}><Icon size={15}/>{title}</div><div className="mt-1 text-[10px] text-slate-600">{sub}</div></div>;
}
function NodeSmall({title,sub,active=false}:{title:string;sub:string;active?:boolean}) {
  return <div className={`rounded-xl border ${active ? "border-cyan/30 bg-cyan/[.05]" : "border-line bg-[#0a1423]"} p-3 text-center`}><div className="text-[11px] font-medium text-slate-300">{title}</div><div className="mt-1 text-[9px] text-slate-600">{sub}</div></div>;
}
function Line(){ return <div className="h-4 w-px bg-gradient-to-b from-slate-700 to-cyan/40"/>; }

export default App;