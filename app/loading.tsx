export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="animate-pulse">
        <div className="h-5 w-40 rounded-full bg-white/10" />
        <div className="mt-6 h-16 max-w-3xl rounded-[2rem] bg-white/10" />
        <div className="mt-4 h-8 max-w-2xl rounded-[2rem] bg-white/8" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <div className="h-72 rounded-[2rem] bg-white/8" />
          <div className="h-72 rounded-[2rem] bg-white/8" />
          <div className="h-72 rounded-[2rem] bg-white/8" />
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="h-80 rounded-[2rem] bg-white/8" />
          <div className="h-80 rounded-[2rem] bg-white/8" />
        </div>
      </div>
    </div>
  );
}
