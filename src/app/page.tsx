'use client';

import Image from 'next/image';
import { useState } from 'react';

const DISTANCE = 220;
const HEART_COUNT = 80;

type Offset = { x: number; y: number };

type Heart = {
  id: number;
  delay: number;
  left: number;
  top: number;
  duration: number;
  scale: number;
};

const generateHearts = (): Heart[] =>
  Array.from({ length: HEART_COUNT }).map((_, index) => ({
    id: index,
    delay: Math.random() * 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 6 + Math.random() * 4,
    scale: 0.8 + Math.random() * 0.8,
  }));

const NO_MESSAGES = [
  'Oi, y u click no!',
  'Bru stop 😭',
  'Come on pick yes 🙏',
  'No is not the right answer',
  'Try again pls 🤗',
  'U making me sad',
  'Say yes. say yes 💕',
  'Pretty pls?',
  'Nope is not an option!',
  'Why u do dis 😢',
  'C’mon, just say yes!',
  'You sure about that?',
  'My feelings 😔',
  'That’s not very yes of you',
  'But… why not? 🥺',
  'You’re breaking my heart 💔',
  'Let’s try yes this time?',
  // New ones below, with no "beg" or "pls"
  'No mi hurt!',
  'Oi wrong button!',
  'No? Weely?',
  '… but why?',
  'Mi did not expect that!',
  'No detected. Weeeeebooting emotions.',
  'You sure you clicked the wight won?',
  'Sadness level rising!',
  'System eh-wa: Expected yes.',
  'Mission failed. Try again?',
  'You just made a loui sad.',
];



const randomOffset = (): Offset => {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.round(Math.cos(angle) * DISTANCE),
    y: Math.round(Math.sin(angle) * DISTANCE),
  };
};

export default function Home() {
  const [noOffset, setNoOffset] = useState<Offset>({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [floatingHearts] = useState<Heart[]>(generateHearts);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 px-4">
      <div className="absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute text-4xl text-rose-400/70"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animation: `float ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
              transform: `scale(${heart.scale})`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md rounded-[32px] bg-white/90 p-8 text-center shadow-2xl backdrop-blur">
        <div className="mb-6 flex justify-center">
          <Image
            src={
              saidYes
                ? 'https://pdf6oe852d.ufs.sh/f/6QWljTiolAt8GZTC7FXnyBL7xvCHiMdW24qAI39pZUF8VgYE'
                : '/valentine.gif'
            }
            alt={saidYes ? 'Valentine photo' : 'Cute love animation'}
            width={260}
            height={260}
            className="rounded-3xl border-4 border-white shadow-lg object-cover"
            priority={!saidYes}
          />
        </div>

        <h1 className="text-3xl font-semibold text-rose-600 drop-shadow-sm">
          {saidYes
            ? 'Yaayy, mi pook is mi valentine 💞'
            : noClickCount === 0
              ? 'Bello, will u be mi valentine?'
              : NO_MESSAGES[(noClickCount - 1) % NO_MESSAGES.length]}
        </h1>

        {saidYes ? (
          <div className="mt-10 rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 p-4 text-white shadow-lg">
            <p className="text-lg font-semibold">NOW WUB MI BELLY</p>
          </div>
        ) : (
          <div className="relative mt-10 flex h-32 items-start justify-center gap-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSaidYes(true)}
                className="rounded-full bg-linear-to-r from-rose-500 to-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
              >
                Yes 💗
              </button>
              <button
                onClick={() => {
                  setNoClickCount((c) => c + 1);
                  setNoOffset(randomOffset());
                }}
                className="rounded-full border border-rose-300 bg-white/80 px-8 py-3 text-lg font-semibold text-rose-500 shadow hover:bg-white"
                style={{
                  transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                  transition: 'transform 0.2s ease',
                  position: 'relative',
                }}
              >
                No 🙈
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-120px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
