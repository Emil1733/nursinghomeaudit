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
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            title="Home"
          >
            <Home size={14} />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-slate-300" />
            
            {index === items.length - 1 ? (
              <span className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-slate-900 transition-colors whitespace-nowrap"
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
