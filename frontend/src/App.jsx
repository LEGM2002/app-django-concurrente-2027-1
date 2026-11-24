import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const API = "http://localhost:8000/api/supercomputadoras/";

const CAMPOS = [
  { key: "nombre", label: "Nombre", type: "text" },
  { key: "pais", label: "País de origen", type: "text" },
  { key: "cores", label: "Cores", type: "number" },
  { key: "ram_tb", label: "RAM (TB)", type: "number" },
  { key: "almacenamiento_tb", label: "Almacenamiento (TB)", type: "number" },
  { key: "teraflops", label: "TeraFLOPS", type: "number" },
  { key: "sistema_operativo", label: "Sistema operativo", type: "text" },
];

const VACIO = Object.fromEntries(CAMPOS.map((c) => [c.key, ""]));

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [deletePopUp, setDeletePopUp] = useState(null);
  const [errores, setErrores] = useState(null);

  const fetchDatos = () => fetch(API).then((r) => r.json()).then(setItems);

  useEffect(() => {
    fetchDatos();
  }, []);

  const cerrarModal = () => {
    setForm(null);
    setErrores(null);
  };

  const guardar = async (e) => {
    e.preventDefault();
    const r = await fetch(form.id ? `${API}${form.id}/` : API, {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!r.ok) return setErrores(await r.json());
    cerrarModal();
    fetchDatos();
  };

  const confirmarBorrar = async () => {
    await fetch(`${API}${deletePopUp.id}/`, { method: "DELETE" });
    setDeletePopUp(null);
    fetchDatos();
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800">
      <header className="bg-slate-900">
        <div className="mx-auto flex-col max-w-6xl px-6 py-4">
          <h1 className="text-3xl font-semibold tracking-tight text-white pt-4">
            Proyecto final - Supercomputadoras
          </h1>
          <h3 className="text-lg font-medium tracking-tight text-white py-4">
            Computación Concurrente <br></br> Equipo 1
          </h3>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {items.length} {items.length === 1 ? "registro" : "registros"}
            </p>
          </div>
          <button
            onClick={() => setForm(VACIO)}
            className="inline-flex items-center gap-2 cursor-pointer rounded-md bg-slate-800 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>

        {/* Tabla con los datos de las supercomputadoras */}
        <div className="overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-300 bg-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                {CAMPOS.map((c) => (
                  <th
                    key={c.key}
                    className={`px-4 py-3 font-medium ${c.type === "number" ? "text-right" : ""}`}
                  >
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((s) => (
                <tr key={s.id} className="transition-colors hover:bg-slate-100">
                  {CAMPOS.map((c) => (
                    <td
                      key={c.key}
                      className={`px-4 py-3 ${
                        c.type === "number"
                          ? "text-right tabular-nums text-slate-700"
                          : c.key === "nombre"
                          ? "font-medium text-slate-900"
                          : "text-slate-600"
                      }`}
                    >
                      {c.type === "number" ? s[c.key].toLocaleString() : s[c.key]}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      onClick={() => setForm(s)}
                      title="Editar"
                      aria-label={`Editar ${s.nombre}`}
                      className="rounded p-1.5 text-slate-500 transition-colors cursor-pointer hover:bg-slate-200 hover:text-slate-800"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeletePopUp(s)}
                      title="Borrar"
                      aria-label={`Borrar ${s.nombre}`}
                      className="ml-1 rounded p-1.5 text-slate-500 transition-colors cursor-pointer hover:bg-red-100 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={CAMPOS.length + 1} className="px-4 py-10 text-center text-slate-400">
                    Sin registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Formulario para agregar o editar una supercomputadora */}
      {form && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 p-4">
          <form
            onSubmit={guardar}
            className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h3 className="font-semibold text-slate-900">
                {form.id ? "Editar" : "Agregar"} supercomputadora
              </h3>
              <button
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar"
                className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 py-5">
              {CAMPOS.map((c) => (
                <label
                  key={c.key}
                  className={`block text-sm ${c.type === "text" ? "col-span-2" : ""}`}
                >
                  <span className="mb-1 pl-1 text-left block font-medium text-slate-600">
                    {c.label}
                  </span>
                  <input
                    required
                    type={c.type}
                    step="any"
                    min={c.type === "number" ? 0 : undefined}
                    value={form[c.key]}
                    onChange={(e) =>
                      setForm({ ...form, [c.key]: e.target.value })
                    }
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                  {errores?.[c.key] && (
                    <span className="mt-1 block text-xs text-red-600">
                      {errores[c.key][0]}
                    </span>
                  )}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-3">
              <button
                type="button"
                onClick={cerrarModal}
                className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-slate-800 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Popup en caso de querer eliminar una supercomputadora */}
      {deletePopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h3 className="font-semibold text-slate-900">Eliminar supercomputadora</h3>
              <button
                type="button"
                onClick={() => setDeletePopUp(null)}
                aria-label="Cerrar"
                className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="px-6 py-5 text-sm text-slate-600">
              ¿Estás seguro que quieres eliminar{" "}
              <span className="font-medium text-slate-900">{deletePopUp.nombre}</span>?
            </p>

            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-3">
              <button
                type="button"
                onClick={() => setDeletePopUp(null)}
                className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarBorrar}
                className="rounded-md bg-slate-800 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}