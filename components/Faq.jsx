export default function Faq({ faqs }) {
  return (
    <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {faqs.map((f, i) => (
        <details key={i} className="group p-5" open={i === 0}>
          <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">
            {f.q}
          </summary>
          <p className="mt-2 text-slate-700">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
