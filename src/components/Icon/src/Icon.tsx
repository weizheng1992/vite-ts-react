import React, { useRef, useCallback, useEffect, CSSProperties, useMemo } from 'react';
import Iconify from '@purge-icons/generated';
import { isString } from '/@/utils/is';
import './index.less';

interface Props {
  icon: string;
  color?: string;
  size?: string | number;
}
const Icon: React.FC<Props> = ({ icon, color, size }: Props) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const getIcon = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    const svg = Iconify.renderSVG(icon, {});
    if (svg) {
      el.textContent = '';
      el.appendChild(svg);
    } else {
      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = icon;
      el.textContent = '';
      el.appendChild(span);
    }
  }, [icon]);

  useEffect(() => {
    getIcon();
  }, [getIcon]);

  const getWrapStyle: CSSProperties = useMemo(() => {
    let fs = size;
    if (isString(size)) {
      fs = parseInt(size, 10);
    }

    return {
      fontSize: `${fs}px`,
      color: color,
      display: 'inline-flex',
    };
  }, [color, size]);
  return <span ref={elRef} className="app-iconify anticon" style={getWrapStyle} />;
};
export default Icon;
