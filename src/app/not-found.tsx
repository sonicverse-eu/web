import Link from "next/link";

export default function NotFound() {
	return (
		<main className="min-h-[70vh] flex flex-col items-center justify-center bg-(--bg) text-(--text) px-4 md:px-8">
			<div className="container flex flex-col items-center py-16">
				<h1 className="text-6xl font-bold mb-4 tracking-tight" style={{color: "var(--brand)"}}>404</h1>
				<h2 className="text-2xl font-semibold mb-2">Page not found</h2>
				<p className="mb-8 text-lg text-(--muted) max-w-xl text-center">
					Sorry, the page you’re looking for doesn’t exist or has moved.
				</p>
				<Link href="/" className="button-primary">
					Go back home
				</Link>
			</div>
		</main>
	);
}
