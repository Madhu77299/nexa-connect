import cv2
import numpy as np
from PIL import Image

def build_vector_svg():
    im = Image.open('public/logo.png').convert('RGBA')
    scale = 4
    w, h = im.size[0] * scale, im.size[1] * scale
    im_scaled = im.resize((w, h), Image.Resampling.LANCZOS)
    arr_scaled = np.array(im_scaled)

    alpha = arr_scaled[:, :, 3]
    r = arr_scaled[:, :, 0].astype(int)
    g = arr_scaled[:, :, 1].astype(int)
    b = arr_scaled[:, :, 2].astype(int)

    split_y = int(218 * scale)
    navy_mask = np.zeros_like(alpha, dtype=np.uint8)
    navy_mask[split_y:, :] = ((alpha[split_y:, :] > 120) & (b[split_y:, :] > 35) & (r[split_y:, :] < 85)).astype(np.uint8) * 255

    top_alpha = alpha.copy()
    top_alpha[split_y:, :] = 0

    blue_mask = np.zeros_like(alpha, dtype=np.uint8)
    blue_mask = ((top_alpha > 120) & (b > g + 15)).astype(np.uint8) * 255

    green_mask = np.zeros_like(alpha, dtype=np.uint8)
    green_mask = ((top_alpha > 120) & (g > b + 15)).astype(np.uint8) * 255

    # Gentle morphological smoothing
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    navy_clean = cv2.morphologyEx(navy_mask, cv2.MORPH_CLOSE, kernel)
    blue_clean = cv2.morphologyEx(blue_mask, cv2.MORPH_CLOSE, kernel)
    green_clean = cv2.morphologyEx(green_mask, cv2.MORPH_CLOSE, kernel)

    def get_path_d(mask, epsilon=1.2):
        contours, hierarchy = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
        if not contours:
            return ''
        d_list = []
        for c in contours:
            approx = cv2.approxPolyDP(c, epsilon, True)
            if len(approx) < 3:
                continue
            pts = approx.reshape(-1, 2)
            d_list.append(f'M {pts[0][0]} {pts[0][1]} ' + ' '.join([f'L {p[0]} {p[1]}' for p in pts[1:]]) + ' Z')
        return ' '.join(d_list)

    path_blue = get_path_d(blue_clean, 1.2)
    path_green = get_path_d(green_clean, 1.2)
    path_navy = get_path_d(navy_clean, 1.0)

    svg_light = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" fill="none">
  <path fill-rule="evenodd" fill="#0055FF" d="{path_blue}" />
  <path fill-rule="evenodd" fill="#10B981" d="{path_green}" />
  <path fill-rule="evenodd" fill="#003380" d="{path_navy}" />
</svg>'''

    svg_dark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" fill="none">
  <defs>
    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#00D2FF" flood-opacity="0.6"/>
    </filter>
    <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#10B981" flood-opacity="0.6"/>
    </filter>
  </defs>
  <path fill-rule="evenodd" fill="#00D2FF" filter="url(#cyanGlow)" d="{path_blue}" />
  <path fill-rule="evenodd" fill="#10B981" filter="url(#greenGlow)" d="{path_green}" />
  <path fill-rule="evenodd" fill="#E2E8F0" d="{path_navy}" />
</svg>'''

    with open('public/logo-vector-light.svg', 'w') as f:
        f.write(svg_light)

    with open('public/logo-vector-dark.svg', 'w') as f:
        f.write(svg_dark)

    print('Generated public/logo-vector-light.svg and dark.svg!')

if __name__ == '__main__':
    build_vector_svg()
