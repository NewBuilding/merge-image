/* eslint-disable */
// GIF 解码器 photopea 上抠的

const UGIF = (function () {
  const a = (function () {
    let j; let F; let c; let b; let H = 0; let k = 0; let Z = 0; let P = 0; const l = function () {
      const R = j >>> 3; const i = F[R + 2] << 16 | F[R + 1] << 8 | F[R]; const M = i >>> (j & 7) & (1 << k) - 1;
      j += k; return M;
    }; const e = new Uint32Array(4096 * 4); let V = 0; const W = function (R) {
      if (R == V) return; V = R; Z = 1 << R; P = Z + 1; for (let i = 0;
        i < P + 1; i++) { e[4 * i] = e[4 * i + 3] = i; e[4 * i + 1] = 65535; e[4 * i + 2] = 1; }
    }; const G = function (R) { k = R + 1; H = P + 1; }; const Q = function (R) {
      let i = R << 2; const M = e[i + 2]; let v = b + M - 1;
      while (i != 65535) { c[v--] = e[i]; i = e[i + 1]; }b += M;
    }; const L = function (R, i) {
      const M = H << 2; const v = R << 2; e[M] = e[(i << 2) + 3]; e[M + 1] = v;
      e[M + 2] = e[v + 2] + 1; e[M + 3] = e[v + 3]; H++; if (H == 1 << k && k != 12)k++;
    }; const s = function (R, i, M, v, t, q) {
      j = i << 3; F = R; c = v; b = t;
      const g = i + M << 3; let r = 0; let p = 0; W(q); G(q); while (j < g && (r = l()) != P) {
        if (r == Z) { G(q); r = l(); if (r == P) break; Q(r); } else if (r < H) {
          Q(r);
          L(p, r);
        } else { L(p, p); Q(H - 1); }p = r;
      } return b;
    }; return s;
  }()); let O; let f; let E = new Uint8Array(128); const B = function () { return O[f++]; }; const A = function () {
    const j = O[f + 1] << 8 | O[f];
    f += 2; return j;
  }; const U = function () { while (O[f] != 0)f += 1 + O[f]; f++; }; const d = function (j) {
    O = new Uint8Array(j); f = 6; const F = A(); const c = A(); var b = B(); const H = B(); const k = B(); const Z = b >>> 7; const P = b >>> 4 & 7; const X = b >>> 3 & 1; var l = b >>> 0 & 7; const m = f; let e = 0; let V; let W = 0; let G = 0; let C = 0; let z = 260;
    if (Z == 1)f += 3 * (1 << l + 1); const T = []; while (f < O.length) {
      const Q = B(); if (Q == 33) {
        const L = B(); if (L == 249) {
          const s = B(); var b = B();
          W = b >>> 2 & 7; G = A(); z = B(); if ((b & 1) == 0)z = 260; B();
        } else if (L == 254) { U(); } else if (L == 255) { U(); } else throw L;
      } else if (Q == 44) {
        const R = A(); const i = A(); var M = A(); var v = A(); const t = B(); const q = t >>> 7;
        C = t >>> 6 & 1; if (q == 1) { var l = t >>> 0 & 7; e = f; f += 3 * (1 << l + 1); }V = {
          x: R, y: i, a: M, O: v, f: W, delay: G, B: z, A: e == 0 ? m : e, U: C,
        };
        T.push(V); e = 0;
      } else if (Q <= 8) {
        var M = V.a; var v = V.O; const S = M * v; let Y = 0; if (E.length < S * 1.2)E = new Uint8Array(~~(S * 1.3));
        while (f < O.length && O[f] != 0) { const J = B(); for (let g = 0; g < J; g++)E[Y + g] = O[f + g]; Y += J; f += J; } if (f >= O.length) {
          alert('Some frames are damaged.');
          T.pop(); break;
        }B(); V.d = new Uint8Array(S); const r = a(E, 0, Y, V.d, 0, Q);
      } else if (Q == 59) break; else throw Q;
    } return {
      width: F, height: c, data: O, frames: T,
    };
  };
  function D(j, F, O, c, b, H, k, Z) {
    for (let P = 0; P < k; P++) {
      const X = b[H + P]; if (X != Z) {
        const l = F + P << 2; const m = c + X * 3; j[l] = O[m];
        j[l + 1] = O[m + 1]; j[l + 2] = O[m + 2]; j[l + 3] = 255;
      }
    }
  } const w = function (j) {
    const F = j.frames; const c = j.width; const b = j.height; const H = new Uint8Array(c * b * 4); let k; const Z = []; const O = j.data;
    for (let P = 0; P < F.length; P++) {
      const X = F[P]; const l = X.x; const m = X.y; const e = X.a; const T = X.O; const V = X.f; if (V == 3) {
        if (k == null)k = H.slice(0);
        else k.set(H);
      } const W = []; if (X.U == 1) {
        for (var G = 0; G < T; G += 8)W.push(G); for (var G = 4; G < T; G += 8)W.push(G); for (var G = 2;
          G < T; G += 4)W.push(G); for (var G = 1; G < T; G += 2)W.push(G);
      } const C = X.d; const z = X.A; const Q = X.B; const L = X.U; for (var G = 0; G < T; G++) {
        const s = L == 0 ? G : W[G];
        D(H, (s + m) * c + l, O, z, C, G * e, e, Q);
      }Z.push(H.slice(0).buffer); if (V < 2) {} else if (V == 2) {
        for (var G = 0; G < T; G++) {
          const R = ((m + G) * c + l) * 4;
          H.fill(0, R, R + e * 4);
        }
      } else if (V == 3)H.set(k);
    } return Z;
  }; return { decode: d, toRGBA8: w };
}());

export default UGIF;
