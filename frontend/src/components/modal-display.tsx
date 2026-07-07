import type { ReactNode } from "react";


interface Props {
  children: ReactNode
}

export default function ModalDisplay({ children }: Props) {
  return (
    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-screen h-svh bg-black/50">
      {children}
    </div>
  );
}