export default function Footer() {
  return (
    <div
      className="mt-auto mb-2 mx-2 bg-amber-200 p-3 text-center pt-6 pb-10 rounded-2xl font-mono">
      <div
        className="w-60 mt-2 p-1 ml-auto">
        Contact Me here
      </div>
      <a
        href="mailto:ur.dev6@gmail.com"
        rel="noopener noreferrer"
        className="w-60 block mt-2 p-3 ml-auto rounded-2xl bg-amber-300 hover:bg-amber-500 transition-all">
        ur.dev6@gmail.com
      </a>
      <a
        href="https://www.github.com/Sweet-Poision"
        rel="noopener noreferrer"
        className="w-60 mt-2 block p-3 ml-auto rounded-2xl bg-amber-300 hover:bg-amber-500 transition-all">
        Github/Sweet-Poision
      </a>
    </div>
  )
}
