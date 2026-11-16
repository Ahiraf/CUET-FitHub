import React, { useEffect, useRef } from 'react';

function shape(ctx, color, outline) {
  ctx.fillStyle = color;
  ctx.fill(new Path2D(outline));
}

// Each leg follows a flat contact path along the belt and a raised return arc.
function leg(ctx, phase, hipY, far) {
  const cycle = (phase / (2 * Math.PI)) % 1;
  const stance = 0.44;
  const swing = Math.max(0, (cycle - stance) / (1 - stance));
  const lift = Math.sin(Math.PI * swing) ** 2;
  // Match belt velocity at both ends of the airborne return.
  const ease = swing * swing * (3 - 2 * swing);
  const travel = 64;
  const x = cycle < stance
    ? 28 - travel * cycle / stance
    : 28 - travel + travel * ease - travel * (1 - stance) / stance * (swing - ease);
  const beltTop = 270;
  const y = beltTop - 13 - 38 * lift - hipY;
  const length = Math.hypot(x, y);
  const bend = Math.sqrt(Math.max(0, 57 ** 2 - length ** 2 / 4));
  const kneeX = x / 2 + y * bend / length;
  const kneeY = y / 2 - x * bend / length;
  const skin = far ? '#c98a60' : '#e7ad7c';
  ctx.save();
  ctx.translate(188, hipY);
  ctx.save();
  ctx.rotate(Math.atan2(-kneeX, kneeY));
  shape(ctx, skin, 'M-10 0 Q-13 20 -6 54 Q0 65 7 55 L12 8Z');
  shape(ctx, far ? '#252b39' : '#32394a', 'M-13 -4 L13 -3 Q16 12 12 32 L-10 36 Q-15 17 -13 -4Z');
  ctx.restore();
  ctx.save();
  ctx.translate(kneeX, kneeY);
  ctx.rotate(Math.atan2(kneeX-x, y-kneeY));
  shape(ctx, skin, 'M-6 -3 Q-12 13 -7 27 L-4 57 L4 57 Q6 36 8 20 Q10 6 5 -3Z');
  ctx.restore();
  ctx.translate(x,y);
  ctx.rotate(.65 * lift);
  shape(ctx,'#cbd2d8','M-5 -6 L5 -6 L6 5 L-5 5Z');
  shape(ctx,'#222834','M-6 0 Q0 4 5 1 L11 4 Q20 2 21 7 Q21 12 -6 12 Q-9 8 -6 0Z');
  shape(ctx,'#c4cbd0','M-7 10 Q8 12 21 7 Q22 11 15 13 L-5 13 Q-7 13 -7 10Z');
  ctx.restore();
}

function arm(ctx, phase, far) {
  ctx.save();
  ctx.translate(190, 91);
  ctx.rotate(.32 + .54 * Math.cos(phase));
  shape(ctx,far ? '#c98a60' : '#e7ad7c',
    'M-8 0 Q-12 14 -14 30 Q-15 35 -10 38 L15 46 Q22 51 26 46 L26 41 Q25 37 18 38 L-2 28 Q4 16 7 4Z');
  shape(ctx, far ? '#2862bc' : '#3276dd',
    'M-10 -4 Q-7 -14 2 -12 Q12 -10 12 0 L8 16 L-13 13Z');
  ctx.restore();
}

function draw(ctx, time) {
  ctx.clearRect(0,0,480,350);
  shape(ctx,'#0c1527','M50 309 Q210 295 420 307 Q426 321 65 316Z');
  shape(ctx,'#8e99a5','M55 277 L391 277 L401 302 L55 302 Q49 294 55 277Z');
  shape(ctx,'#d1d4d8','M60 272 L378 272 L386 282 L58 282Z');
  shape(ctx,'#353b45','M60 270 L372 270 L373 276 L59 276Z');
  shape(ctx,'#333943','M64 301 H86 V308 H64Z M367 300 H393 V308 H367Z');
  shape(ctx,'#525c69','M302 278 Q304 256 342 253 Q379 248 392 267 L410 297 Q411 302 405 302 H333 Q312 301 302 278Z');
  shape(ctx,'#abaeb3','M282 143 Q331 184 344 268 L368 268 Q355 175 309 138Z');
  shape(ctx,'#626b76','M299 141 Q348 186 361 268 H368 Q354 178 309 138Z');
  shape(ctx,'#9098a3','M306 140 Q326 122 324 101 L332 96 Q333 125 314 143Z');
  shape(ctx,'#353941','M213 133 H266 Q277 124 304 123 Q321 122 326 143 Q329 153 319 153 L269 144 L262 141 H213Z');
  shape(ctx,'#a5adb7','M310 106 L334 63 Q337 59 342 64 L344 69 L322 111 Q317 116 310 106Z');
  shape(ctx,'#30343d','M310 108 Q305 106 308 100 L329 62 Q332 58 338 63 L316 107Z');

  const phase = .35 + time * 7;
  const bob = 1.9 * Math.sin(phase * 2);
  leg(ctx,phase+Math.PI,157+bob,true);
  ctx.save();
  ctx.translate(0,bob);
  arm(ctx,phase+Math.PI,true);
  ctx.restore();
  leg(ctx,phase,157+bob,false);
  ctx.save();
  ctx.translate(0,bob);
  shape(ctx,'#282f3d','M171 145 L201 148 L208 175 L188 180 L172 171Z');
  shape(ctx,'#3276dd','M183 73 Q192 68 205 75 Q218 82 213 99 Q207 121 204 150 Q188 154 168 148 Q173 126 173 108 Q170 83 183 73Z');
  arm(ctx,phase,false);
  shape(ctx,'#e7ad7c','M188 72 L192 60 Q186 50 191 39 Q198 26 212 35 Q219 39 218 49 L222 55 L218 56 Q219 67 210 66 L206 77 Q200 82 188 72Z');
  shape(ctx,'#49392e','M191 65 Q186 56 186 44 Q184 32 195 30 Q212 25 218 37 Q214 40 208 39 Q203 40 203 47 L199 50 Q194 44 194 51 L197 57Z');
  ctx.restore();
}

export default function TreadmillRunner() {
  const canvas = useRef(null);
  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    function render(now) {
      draw(ctx, motion.matches ? 0 : now / 1000);
      if (!motion.matches) frame = requestAnimationFrame(render);
    }
    function start() {
      cancelAnimationFrame(frame);
      render(performance.now());
    }
    start();
    motion.addEventListener('change', start);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener('change', start);
    };
  }, []);
  return <canvas ref={canvas} className="treadmill-scene" width="960" height="700" role="img" aria-label="Side-view illustration of a man running on a treadmill" />;
}
