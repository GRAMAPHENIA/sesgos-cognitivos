// app/niveles/[bias]/components/BiasLevelLoading.tsx

export function BiasLevelLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-amber-500 rounded-full animate-ping"></div>
        </div>
      </div>
      <p className="text-zinc-400">Cargando nivel...</p>
    </div>
  );
}
