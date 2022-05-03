// src/components/Header/index.tsx
import { devDependencies } from '../../../package.json';
import logoSrc from '@assets/imgs/vite.png';
import { ReactComponent as ReactLogo } from '@assets/icons/logo.svg';

export function Header() {
  return (
    <div className="p-20px text-center">
      <img className="m-auto mb-4" src={logoSrc} alt="" />
      <h1 className="font-bold text-2xl mb-2">
        vite version: {devDependencies.vite}
      </h1>
      <ReactLogo />
    </div>
  );
}
