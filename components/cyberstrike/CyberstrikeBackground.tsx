"use client";

import React, { useEffect, useRef } from "react";

const VS =
  "attribute vec2 a;varying vec2 vUv;void main(){vUv=a*.5+.5;gl_Position=vec4(a,0.,1.);}";

const FS = [
  "#ifdef GL_FRAGMENT_PRECISION_HIGH",
  "precision highp float;",
  "#else",
  "precision mediump float;",
  "#endif",
  "uniform vec2 uRes,uCss,uM;uniform float uT,uMS,uCover,uSweep,uBeam,uBeamH,uBeamLen,uSurge,uTear,uStatic,uAmb,uRgb,uVH;uniform vec3 uRip[4];varying vec2 vUv;",
  "float h2(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",
  "float sq(float x){return x*x;}",
  "void main(){",
  " float asp=uCss.x/uCss.y;",
  " vec2 c=vUv*2.0-1.0;c*=1.0+0.045*dot(c,c)*uCover;vec2 uv=c*0.5+0.5;",
  " float outside=step(min(min(uv.x,uv.y),min(1.0-uv.x,1.0-uv.y)),0.0)*uCover;",
  " float ft=floor(uT*24.0);",
  " float band=floor(uv.y*30.0);",
  " float bn=h2(vec2(band,ft));",
  " float tOn=step(0.72,bn);",
  " float tx=(h2(vec2(band+9.0,ft))-0.5)*0.4*uTear*tOn;",
  " vec2 p=uv;p.x+=tx;",
  " vec2 d=uv-uM;d.x*=asp;float r=length(d);",
  " float fall=exp(-r*r*16.0)*uMS;",
  " p.x+=sin(uv.y*70.0+uT*9.0)*0.010*fall;",
  " float rip=0.0;",
  " for(int i=0;i<4;i++){vec2 dd=uv-uRip[i].xy;dd.x*=asp;float rr=length(dd);float a=uRip[i].z;float w=exp(-sq((rr-a*0.55)/0.045))*(1.0-a)*step(a,0.999);rip+=w;p+=dd/(rr+0.001)*w*0.015*vec2(1.0/asp,1.0);}",
  " float sp=uRgb*0.006+fall*0.02+rip*0.02;",
  " vec2 g=uRes*0.5;",
  " float nR=h2(floor((p+vec2(sp,0.0))*g)+ft*17.0);",
  " float nG=h2(floor(p*g)+ft*17.0+3.0);",
  " float nB=h2(floor((p-vec2(sp,0.0))*g)+ft*17.0+7.0);",
  " float dens=uStatic+fall*0.16+rip*0.35;",
  " vec3 st=smoothstep(vec3(1.0-dens),vec3(1.0),vec3(nR,nG,nB));",
  " st=mix(vec3(st.g),st,clamp(uRgb*0.25+fall*3.0+rip*3.0,0.0,1.0));",
  " float lines=uCss.y/4.0;",
  " float sl=0.5+0.5*sin((p.y+fall*0.003*sin(uv.x*18.0))*lines*6.2831);",
  " float by=fract(1.0-uT*0.05-uVH);",
  " float bd=uv.y-by;",
  " float bandM=exp(-bd*bd/0.00018);",
  " float bn2=h2(vec2(floor(p.x*uRes.x/5.0)+ft,floor(uv.y*uRes.y/2.0)));",
  " vec3 vhs=vec3(bandM*smoothstep(0.5,1.0,bn2)*0.75);",
  " float bh=uBeamH;",
  " float lm=1.0-smoothstep(uBeamLen*0.85,uBeamLen,abs(uv.x-0.5)*2.0);",
  " float y0=uv.y-0.5;",
  " vec3 beam=vec3(exp(-sq((y0-bh*0.8)/bh)),exp(-sq(y0/bh)),exp(-sq((y0+bh*0.8)/bh)))*lm;",
  " beam+=exp(-abs(y0)/(bh*14.0+0.003))*0.12*lm;",
  " beam*=uBeam;",
  " vec3 tb=vec3(step(0.8,bn)*step(0.5,h2(vec2(band,ft+3.0)))*uTear*0.28);",
  " vec3 intro=st*0.6*mix(0.55,1.0,sl)+vhs*0.6+beam+tb+vec3(uSurge);",
  " float vig=smoothstep(0.55,1.25,length(c));",
  " intro*=1.0-vig*0.7;",
  " intro=mix(intro,vec3(0.0),outside);",
  " float ad=uAmb*(0.2*(1.0-sl)+0.5*vig*vig);",
  " vec3 amb=st*uAmb*0.09+vhs*uAmb*0.1;",
  " float aA=clamp(ad+max(amb.r,max(amb.g,amb.b)),0.0,1.0);",
  " vec4 ambient=vec4(amb,aA);",
  " float blk=h2(floor(uv*uCss/12.0)+floor(uT*18.0));",
  " float blk2=h2(floor(uv*uCss/12.0)+floor(uT*18.0)+11.0);",
  " float x2=uv.x+(blk-0.5)*0.16+(h2(vec2(floor(uv.y*uCss.y/12.0),5.0))-0.5)*0.12;",
  " float dd2=x2-uSweep;",
  " vec4 col;",
  " if(dd2>0.0){col=vec4(intro,1.0);}",
  " else{",
  "  float t1=smoothstep(-0.16,0.0,dd2);",
  "  float on=step(1.0-t1*0.95,blk2);",
  "  vec3 nc=mix(vec3(0.92),vec3(0.43,0.95,1.0),step(0.82,blk));",
  "  nc=mix(nc,vec3(0.61,0.42,1.0),step(0.94,blk2));",
  "  col=mix(ambient,vec4(nc,1.0),on);",
  " }",
  " gl_FragColor=col;",
  "}",
].join("\n");

interface CyberstrikeBackgroundProps {
  className?: string;
}

export default function CyberstrikeBackground({ className }: CyberstrikeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let rafId: number | null = null;

    const rm =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // WebGL Canvas Ambient Loop
    let gl: WebGLRenderingContext | null = null;
    const U: Record<string, WebGLUniformLocation | null> = {};
    const rip = new Float32Array(12);
    const ripT = [0, 0, 0, 0];
    let ripI = 0;
    let scale = 1;

    rip[2] = rip[5] = rip[8] = rip[11] = 1;

    const S = {
      cover: 0,
      sweep: 3,
      beam: 0,
      beamH: 0.002,
      beamLen: 1,
      surge: 0,
      tear: 0,
      stat: 0.012,
      amb: 1,
      rgb: 0.3,
      vh: 0,
      ms: 0,
    };

    const P = { x: 0.5, y: 0.5, has: false, last: 0, down: false, vx: 0, vy: 0 };
    const X = { x: 0.5, y: 0.5 };
    let T = 0;
    let pulseT = 0;
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;

    const clamp = (x: number, a: number, b: number) =>
      Math.max(a, Math.min(b, x));

    const setP = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      P.vx = x - P.x;
      P.vy = y - P.y;
      P.x = x;
      P.y = y;
      P.has = true;
      P.last = T;
    };

    const addRipple = (x: number, y: number) => {
      rip[ripI * 3] = x;
      rip[ripI * 3 + 1] = y;
      rip[ripI * 3 + 2] = 0;
      ripT[ripI] = T;
      ripI = (ripI + 1) % 4;
    };

    const handlePointerMove = (e: PointerEvent) => setP(e);
    const handlePointerDown = (e: PointerEvent) => {
      setP(e);
      P.down = true;
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("input") ||
        target?.closest("textarea") ||
        target?.closest("select") ||
        target?.closest("label")
      ) {
        return;
      }
      addRipple(P.x, P.y);
    };
    const handlePointerUp = () => {
      P.down = false;
    };
    const handlePointerLeave = () => {
      P.has = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    const initGL = () => {
      if (!canvas) return false;
      try {
        gl = canvas.getContext("webgl", {
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        if (!gl) return false;

        const sh = (t: number, s: string) => {
          if (!gl) throw new Error("no gl");
          const o = gl.createShader(t);
          if (!o) throw new Error("shader create failed");
          gl.shaderSource(o, s);
          gl.compileShader(o);
          if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) {
            const err = gl.getShaderInfoLog(o);
            gl.deleteShader(o);
            throw new Error(err || "compile error");
          }
          return o;
        };

        const p = gl.createProgram();
        if (!p) return false;
        gl.attachShader(p, sh(gl.VERTEX_SHADER, VS));
        gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return false;
        gl.useProgram(p);

        const b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
          gl.STATIC_DRAW
        );
        const a = gl.getAttribLocation(p, "a");
        gl.enableVertexAttribArray(a);
        gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

        [
          "uRes",
          "uCss",
          "uM",
          "uT",
          "uMS",
          "uCover",
          "uSweep",
          "uBeam",
          "uBeamH",
          "uBeamLen",
          "uSurge",
          "uTear",
          "uStatic",
          "uAmb",
          "uRgb",
          "uVH",
          "uRip",
        ].forEach((n) => {
          if (gl) U[n] = gl.getUniformLocation(p, n);
        });
        return true;
      } catch {
        return false;
      }
    };

    const resize = () => {
      if (!canvas || !gl) return;
      scale = clamp(Math.min(window.devicePixelRatio || 1, 1.5), 0.75, 1.5);
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    if (!rm && canvas) {
      const ok = initGL();
      if (ok) {
        resize();
        window.addEventListener("resize", resize);
      }
    }

    const ambient = (dt: number) => {
      const sp = Math.hypot(P.vx, P.vy) * 60;
      P.vx *= 0.88;
      P.vy *= 0.88;
      const targetMS = P.has ? clamp(sp * 0.18 + (P.down ? 0.35 : 0.08), 0, 0.7) : 0;
      S.ms += (targetMS - S.ms) * 0.08;

      const idle = (T - P.last) / 1000;
      let tx = P.x;
      let ty = P.y;
      if (!P.has || idle > 2.2) {
        const t = T / 1000;
        tx = 0.5 + Math.sin(t * 0.35) * 0.28 + Math.cos(t * 0.77) * 0.08;
        ty = 0.5 + Math.cos(t * 0.29) * 0.22 + Math.sin(t * 0.61) * 0.06;
      }
      X.x += (tx - X.x) * 0.05;
      X.y += (ty - X.y) * 0.05;

      const sy = window.scrollY;
      const scrollV = Math.abs(sy - lastY) / Math.max(16, dt);
      lastY = sy;
      if (scrollV > 0.35) {
        pulseT = Math.min(1, pulseT + scrollV * 0.04);
      }
      pulseT *= 0.93;

      S.rgb = 0.25 + clamp(sp, 0, 2) * 0.6 + pulseT * 4;
      S.stat = 0.012 + pulseT * 0.12;
    };

    const draw = () => {
      if (!gl || !canvas) return;
      gl.uniform2f(U.uRes!, canvas.width, canvas.height);
      gl.uniform2f(U.uCss!, window.innerWidth, window.innerHeight);
      gl.uniform2f(U.uM!, X.x, X.y);
      gl.uniform1f(U.uT!, T / 1000);
      gl.uniform1f(U.uMS!, S.ms);
      gl.uniform1f(U.uCover!, S.cover);
      gl.uniform1f(U.uSweep!, S.sweep);
      gl.uniform1f(U.uBeam!, S.beam);
      gl.uniform1f(U.uBeamH!, S.beamH || 0.002);
      gl.uniform1f(U.uBeamLen!, S.beamLen || 1);
      gl.uniform1f(U.uSurge!, S.surge);
      gl.uniform1f(U.uTear!, S.tear);
      gl.uniform1f(U.uStatic!, S.stat);
      gl.uniform1f(U.uAmb!, S.amb);
      gl.uniform1f(U.uRgb!, S.rgb);
      gl.uniform1f(U.uVH!, S.vh);
      gl.uniform3fv(U.uRip!, rip);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let last = 0;
    let fc = 0;
    const frame = (now: number) => {
      if (disposed) return;
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(50, now - last || 16);
      last = now;
      T += dt;
      if (fc++ & 1) return;
      ambient(dt * 2);
      for (let r = 0; r < 4; r++) {
        const a = rip[r * 3 + 2];
        if (a < 1) {
          const newA = (T - ripT[r]) / 1100;
          rip[r * 3 + 2] = Math.min(1, newA);
        }
      }
      if (gl) draw();
    };

    if (!rm) {
      rafId = requestAnimationFrame((n) => {
        last = n;
        frame(n);
      });
    }

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="crt" aria-hidden="true" />
      <canvas id="fx" ref={canvasRef} aria-hidden="true" className={className} />
    </>
  );
}
