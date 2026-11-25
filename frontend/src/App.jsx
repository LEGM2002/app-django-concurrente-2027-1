import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const API = `${import.meta.env.VITE_API_URL}/supercomputadoras/`;

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
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "registro" : "registros"}
          </p>
          <Button onClick={() => setForm(VACIO)}>
            <Plus />
            Agregar
          </Button>
        </div>

        {/* Tabla con los datos de las supercomputadoras */}
        <div className="rounded-lg border border-slate-300 bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-slate-200">
              <TableRow className="border-slate-300 hover:bg-transparent">
                {CAMPOS.map((c) => (
                  <TableHead
                    key={c.key}
                    className={`px-4 text-xs uppercase tracking-wider text-slate-500 ${
                      c.type === "number" ? "text-right" : ""
                    }`}
                  >
                    {c.label}
                  </TableHead>
                ))}
                <TableHead className="px-4" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((s) => (
                <TableRow key={s.id} className="hover:bg-slate-100">
                  {CAMPOS.map((c) => (
                    <TableCell
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
                    </TableCell>
                  ))}
                  <TableCell className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setForm(s)}
                      title="Editar"
                      aria-label={`Editar ${s.nombre}`}
                      className="text-slate-500"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeletePopUp(s)}
                      title="Borrar"
                      aria-label={`Borrar ${s.nombre}`}
                      className="ml-1 text-slate-500 hover:bg-red-100 hover:text-red-800"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={CAMPOS.length + 1}
                    className="py-10 text-center text-slate-400"
                  >
                    Sin registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Formulario para agregar o editar una supercomputadora */}
      <Dialog open={!!form} onOpenChange={(open) => !open && cerrarModal()}>
        <DialogContent className="sm:max-w-lg">
          {form && (
            <form onSubmit={guardar} className="grid gap-5">
              <DialogHeader>
                <DialogTitle>
                  {form.id ? "Editar" : "Agregar"} supercomputadora
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Datos de la supercomputadora
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                {CAMPOS.map((c) => (
                  <div
                    key={c.key}
                    className={`grid gap-1.5 ${c.type === "text" ? "col-span-2" : ""}`}
                  >
                    <Label htmlFor={c.key} className="pl-1 text-slate-600">
                      {c.label}
                    </Label>
                    <Input
                      id={c.key}
                      required
                      type={c.type}
                      step="any"
                      min={c.type === "number" ? 0 : undefined}
                      value={form[c.key]}
                      aria-invalid={!!errores?.[c.key]}
                      onChange={(e) =>
                        setForm({ ...form, [c.key]: e.target.value })
                      }
                    />
                    {errores?.[c.key] && (
                      <span className="text-xs text-destructive">
                        {errores[c.key][0]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={cerrarModal}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Popup en caso de querer eliminar una supercomputadora */}
      <AlertDialog
        open={!!deletePopUp}
        onOpenChange={(open) => !open && setDeletePopUp(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar supercomputadora</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro que quieres eliminar{" "}
              <span className="font-medium text-slate-900">
                {deletePopUp?.nombre}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarBorrar}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
