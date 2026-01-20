import { siteConfig, footer } from "@/constants/content";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-2.png" alt="Money Tracker" className="w-8 h-8" />
              <span className="font-bold text-xl text-white">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{footer.description}</p>
            <div className="flex gap-4">
              {footer.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={item.name}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
