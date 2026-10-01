import cv2
import numpy as np
from PIL import Image

def generate_svg():
    im = Image.open('public/logo.png').convert('RGBA')
    # Upscale 4x for high-precision subpixel contour tracing
    scale = 4
    w, h = im.size[0] * scale, im.size[1] * scale
    im_scaled = im.resize((w, h), Image.Resampling.LANCZOS)
    arr = np.array(im_scaled)

    alpha = arr[:, :, 3]
    r = arr[:, :, 0].astype(int)
    g = arr[:, :, 1].astype(int)
    b = arr[:, :, 2].astype(int)

    split_y = int(218 * scale)
    navy_mask = np.zeros_like(alpha, dtype=np.uint8)
    navy_mask[split_y:, :] = ((alpha[split_y:, :] > 120) & (b[split_y:, :] > 35) & (r[split_y:, :] < 85)).astype(np.uint8) * 255

    top_alpha = alpha.copy()
    top_alpha[split_y:, :] = 0

    blue_mask = np.zeros_like(alpha, dtype=np.uint8)
    blue_mask = ((top_alpha > 120) & (b > g + 15)).astype(np.uint8) * 255

    green_mask = np.zeros_like(alpha, dtype=np.uint8)
    green_mask = ((top_alpha > 120) & (g > b + 15)).astype(np.uint8) * 255

    # Gentle gaussian blur + threshold to eliminate any single-pixel raster steps and produce super smooth curves
    def smooth_mask(mask, ksize=5, sigma=1.2):
        blurred = cv2.GaussianBlur(mask, (ksize, ksize), sigma)
        _, thresh = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)
        return thresh

    blue_smooth = smooth_mask(blue_mask, 5, 1.2)
    green_smooth = smooth_mask(green_mask, 5, 1.2)
    navy_smooth = smooth_mask(navy_mask, 5, 1.0)

    def mask_to_svg_d(mask, epsilon=1.2):
        contours, hierarchy = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
        if not contours:
            return ''
        d_parts = []
        for c in contours:
            approx = cv2.approxPolyDP(c, epsilon, True)
            if len(approx) < 3:
                continue
            pts = approx.reshape(-1, 2)
            d_parts.append(f"M {pts[0][0]} {pts[0][1]} " + " ".join([f"L {p[0]} {p[1]}" for p in pts[1:]]) + " Z")
        return " ".join(d_parts)

    blue_d = mask_to_svg_d(blue_smooth, 1.1)
    green_d = mask_to_svg_d(green_smooth, 1.1)
    navy_d = mask_to_svg_d(navy_smooth, 0.9)

    # Light SVG
    svg_light = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" fill="none">
  <g id="pmk-logo">
    <path id="blue-elements" fill-rule="evenodd" fill="#0055FF" d="{blue_d}" />
    <path id="green-elements" fill-rule="evenodd" fill="#10B981" d="{green_d}" />
    <path id="navy-text" fill-rule="evenodd" fill="#003380" d="{navy_d}" />
  </g>
</svg>'''

    # Dark SVG (luminous cyan & emerald with crisp ice-white typography)
    svg_dark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" fill="none">
  <defs>
    <filter id="darkGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#00D2FF" flood-opacity="0.45"/>
    </filter>
  </defs>
  <g id="pmk-logo-dark" filter="url(#darkGlow)">
    <path id="blue-elements" fill-rule="evenodd" fill="#00D2FF" d="{blue_d}" />
    <path id="green-elements" fill-rule="evenodd" fill="#22C55E" d="{green_d}" />
    <path id="navy-text" fill-rule="evenodd" fill="#F8FAFC" d="{navy_d}" />
  </g>
</svg>'''

    with open('public/pmk-logo-light.svg', 'w') as f:
        f.write(svg_light)

    with open('public/pmk-logo-dark.svg', 'w') as f:
        f.write(svg_dark)

    print(f"SVG generated successfully! Size: {w}x{h}")

if __name__ == '__main__':
    generate_svg()
