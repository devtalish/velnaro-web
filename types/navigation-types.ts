export interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  dropdown?: readonly { label: string; link: string }[];
}

export interface HireMeButtonProps {
  onClick?: () => void;
  full?: boolean;
}
