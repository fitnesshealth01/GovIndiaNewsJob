import React from 'react';

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onNavigate?: (path: string) => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * Accessible, SEO-friendly NavLink component.
 * Always renders a standard <a href="..."> element for crawlers, search engines,
 * middle-clicks, right-clicks, and AdSense preview mode.
 * On standard left-click without modifier keys, it calls onNavigate() to maintain SPA performance.
 */
export const NavLink: React.FC<NavLinkProps> = ({
  href,
  onNavigate,
  children,
  className,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Only intercept internal links on plain primary button (left-click) without modifier keys
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (
      isInternal &&
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey
    ) {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(href);
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default NavLink;
