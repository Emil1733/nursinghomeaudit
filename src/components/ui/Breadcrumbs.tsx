import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item":  `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nursinghomeaudit.com'}${item.href}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual Breadcrumb */}
      <ol className="flex flex-wrap items-center gap-3 mono-data text-[10px] font-black uppercase tracking-widest text-slate-400">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:text-ink transition-colors"
            title="Registry Home"
          >
            <Home size={12} strokeWidth={3} />
            <span>ROOT</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-3">
            <span className="text-slate-200">/</span>
            
            {index === items.length - 1 ? (
              <span className="text-ink line-clamp-1 max-w-[300px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-ink transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
