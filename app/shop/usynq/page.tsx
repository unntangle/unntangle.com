/**
 * Legacy redirect page.
 *
 * The uSYNQ products listing used to live here at /shop/usynq. It moved to
 * /usynq/products so the products page sits under the same /usynq brand
 * namespace as the marketing page (/usynq).
 *
 * The site middleware (middleware.ts) already 308-redirects requests for
 * /shop/usynq* to /usynq/products*, so this page never actually renders in
 * normal operation. We keep this file as a defence-in-depth fallback in
 * case the middleware is ever bypassed (e.g. on a static export, or if the
 * matcher config changes), and as a clear marker that the route has moved.
 *
 * NOTE: This file can be safely deleted once the redirect has been live in
 * production for long enough to drain any stale bookmarks/external links.
 */
import { redirect } from 'next/navigation';

export default function LegacyUsynqShopRedirect() {
    redirect('/usynq/products');
}
