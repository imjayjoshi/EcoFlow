import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-muted-foreground/30">404</h1>
                <p className="mt-2 text-lg font-medium text-foreground">Page Not Found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/dashboard"
                    className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
