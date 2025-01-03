uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
varying vec2 vUv;

float scanline(vec2 uv) {
  return sin(iResolution.y * uv.y * 0.7 - iTime * 10.0);
}

float slowscan(vec2 uv) {
  return sin(iResolution.y * uv.y * 0.02 + iTime * 6.0);
}

vec2 colorShift(vec2 uv) {
  return vec2(
    uv.x,
    uv.y + sin(iTime) * 0.02
  );
}

float noise(vec2 uv) {
  return clamp(texture(iChannel1, uv.xy + iTime * 6.0).r +
    texture(iChannel1, uv.xy - iTime * 4.0).g, 0.96, 1.0);
}

vec2 crt(vec2 coord, float bend) {
  coord = (coord - 0.5) * 2.0;
  coord *= 0.5;
  coord.x *= 1.0 + pow((abs(coord.y) / bend), 2.0);
  coord.y *= 1.0 + pow((abs(coord.x) / bend), 2.0);
  coord = (coord / 1.0) + 0.5;
  return coord;
}

vec2 colorshift(vec2 uv, float amount, float rand) {
  return vec2(
    uv.x,
    uv.y + amount * rand
  );
}

vec2 scandistort(vec2 uv) {
  float scan1 = clamp(cos(uv.y * 2.0 + iTime), 0.0, 1.0);
  float scan2 = clamp(cos(uv.y * 2.0 + iTime + 4.0) * 10.0, 0.0, 1.0);
  float amount = scan1 * scan2 * uv.x;
  uv.x -= 0.05 * mix(texture(iChannel1, vec2(uv.x, amount)).r * amount, amount, 0.9);
  return uv;
}

float vignette(vec2 uv) {
  uv = (uv - 0.5) * 0.98;
  return clamp(pow(cos(uv.x * 3.1415), 1.2) * pow(cos(uv.y * 3.1415), 1.2) * 50.0, 0.0, 1.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord.xy / iResolution.xy;
  vec2 sd_uv = scandistort(uv);
  vec2 crt_uv = crt(sd_uv, 2.0);
  vec4 color;
  vec4 rand = texture(iChannel1, vec2(iTime * 0.01, iTime * 0.02));
  color.r = texture(iChannel0, crt(colorshift(sd_uv, 0.025, rand.r), 2.0)).r;
  color.g = texture(iChannel0, crt(colorshift(sd_uv, 0.01, rand.g), 2.0)).g;
  color.b = texture(iChannel0, crt(colorshift(sd_uv, 0.024, rand.b), 2.0)).b;
  vec4 scanline_color = vec4(scanline(crt_uv));
  vec4 slowscan_color = vec4(slowscan(crt_uv));
  fragColor = mix(color, mix(scanline_color, slowscan_color, 0.5), 0.05) *
    vignette(uv) *
    noise(uv);
}

void main() {
  mainImage(gl_FragColor, vUv * iResolution.xy);
}
