import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-container">
      <div className="not-found-code">404</div>
      <h2
        className="text-xl font-semibold mb-2"
        style={{ color: 'var(--white)', fontFamily: "'Inter', -apple-system, sans-serif" }}
      >
        Page not found
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--gray-400)', maxWidth: '400px' }}>
        This route doesn&apos;t exist. Maybe you mistyped the URL, or this page was moved.
        Try the terminal if you&apos;re feeling adventurous.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link href="/easter" className="btn">
          Open Terminal
        </Link>
      </div>
    </main>
  );
}
