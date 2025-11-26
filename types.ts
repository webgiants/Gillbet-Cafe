export interface MenuItemData {
  name: string;
  price: string;
  desc: string;
  tags: string[];
  image: string;
}

export interface ReviewData {
  id: number;
  author: string;
  handle: string;
  text: string;
  rating: number;
}

export interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}