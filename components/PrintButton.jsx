"use client";

// Native browser print (Ctrl/Cmd+P) → "Save as PDF". Geen PDF-lib nodig.
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 print:hidden"
    >
      Print or save as PDF
    </button>
  );
}
