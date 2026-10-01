import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def generate_assets():
    # 1. Load cropped logo
    im = Image.open('C:/Users/MANIKANTA/.gemini/antigravity-ide/brain/0b8f163a-df8b-4b66-b288-91da06f6bc56/cropped_logo_check.png').convert('RGBA')
    arr = np.array(im)
    w, h = im.size

    # Upscale 4x with Lanczos for sub-pixel anti-aliasing
    scale = 4
    up = cv2.resize(arr, (w*scale, h*scale), interpolation=cv2.INTER_LANCZOS4)
    h_up, w_up = up.shape[:2]
    alpha = up[:, :, 3]
    r = up[:, :, 0].astype(float)
    g = up[:, :, 1].astype(float)
    b = up[:, :, 2].astype(float)

    split_y = int(215 * scale)

    # NEXA SOLUTIONS mask
    navy_mask = np.zeros_like(alpha, dtype=np.uint8)
    navy_mask[split_y:, :] = (alpha[split_y:, :] > 80).astype(np.uint8) * 255

    # Top PMK masks
    top_alpha = alpha.copy()
    top_alpha[split_y:, :] = 0

    p_x = int(155 * scale)
    blue_mask = np.zeros_like(alpha, dtype=np.uint8)
    blue_mask[:split_y, :p_x] = (top_alpha[:split_y, :p_x] > 80).astype(np.uint8) * 255

    k_x = int(425 * scale)
    green_mask = np.zeros_like(alpha, dtype=np.uint8)
    green_mask[:split_y, k_x:] = (top_alpha[:split_y, k_x:] > 80).astype(np.uint8) * 255

    # M in middle
    m_alpha = top_alpha[:split_y, p_x:k_x]
    m_b = b[:split_y, p_x:k_x]
    m_g = g[:split_y, p_x:k_x]

    blue_mask[:split_y, p_x:k_x] = ((m_alpha > 80) & (m_b > m_g + 10)).astype(np.uint8) * 255
    green_mask[:split_y, p_x:k_x] = ((m_alpha > 80) & (m_g > m_b - 10)).astype(np.uint8) * 255

    # Signed Distance Field smoothing for crystal-clear vector-smooth edges
    def smooth_mask_dt(binary_mask, edge_blur=1.8):
        if np.sum(binary_mask) == 0:
            return np.zeros_like(binary_mask)
        dist_in = cv2.distanceTransform(binary_mask, cv2.DIST_L2, 5)
        inv_mask = cv2.bitwise_not(binary_mask)
        dist_out = cv2.distanceTransform(inv_mask, cv2.DIST_L2, 5)
        sdf = dist_in - dist_out
        alpha_smooth = np.clip((sdf / edge_blur + 0.5), 0.0, 1.0)
        return (alpha_smooth * 255).astype(np.uint8)

    navy_sdf = smooth_mask_dt(navy_mask, edge_blur=1.8)
    blue_sdf = smooth_mask_dt(blue_mask, edge_blur=1.8)
    green_sdf = smooth_mask_dt(green_mask, edge_blur=1.8)

    # LIGHT THEME COLORS (Exact sampled brand colors)
    # Royal Blue: #014FC9
    blue_color_light = np.array([1, 79, 201])
    # Vivid Lime Green: #70D051
    green_color_light = np.array([112, 208, 81])
    # Deep Brand Navy: #193779
    navy_color_light = np.array([25, 55, 121])

    # Build Light Logo
    logo_light = np.zeros((h_up, w_up, 4), dtype=np.uint8)
    for c in range(3):
        logo_light[:, :, c] = (
            (blue_sdf.astype(float)/255.0) * blue_color_light[c] +
            (green_sdf.astype(float)/255.0) * green_color_light[c] +
            (navy_sdf.astype(float)/255.0) * navy_color_light[c]
        ).clip(0, 255).astype(np.uint8)
    logo_light[:, :, 3] = np.maximum(navy_sdf, np.maximum(blue_sdf, green_sdf))

    # DARK THEME COLORS (Luminous Neon Cyberpunk Palette)
    # Electric Cyan: #00D2FF
    blue_color_dark = np.array([0, 210, 255])
    # Neon Lime: #34D399 / #22C55E
    green_color_dark = np.array([52, 211, 153])
    # Luminous White/Ice: #F1F5F9
    navy_color_dark = np.array([241, 245, 249])

    # Build Dark Logo
    logo_dark = np.zeros((h_up, w_up, 4), dtype=np.uint8)
    for c in range(3):
        logo_dark[:, :, c] = (
            (blue_sdf.astype(float)/255.0) * blue_color_dark[c] +
            (green_sdf.astype(float)/255.0) * green_color_dark[c] +
            (navy_sdf.astype(float)/255.0) * navy_color_dark[c]
        ).clip(0, 255).astype(np.uint8)
    logo_dark[:, :, 3] = np.maximum(navy_sdf, np.maximum(blue_sdf, green_sdf))

    # Add 40px padding for clean dropshadow
    pad = 40
    def add_padding(img_arr):
        padded = np.zeros((h_up + pad*2, w_up + pad*2, 4), dtype=np.uint8)
        padded[pad:pad+h_up, pad:pad+w_up] = img_arr
        return Image.fromarray(padded)

    pil_logo_light = add_padding(logo_light)
    pil_logo_dark = add_padding(logo_dark)

    # Save high-res PNGs
    pil_logo_light.save('public/logo.png', optimize=True)
    pil_logo_light.save('public/logo-hires.png', optimize=True)
    pil_logo_dark.save('public/logo-dark-hires.png', optimize=True)
    print("Saved 2492x1216 logo.png, logo-hires.png, and logo-dark-hires.png!")

    # 2. Composite Light Hero Scene
    bg_light = Image.open('public/hero-bg-light.jpg').convert('RGBA')
    w_bg, h_bg = bg_light.size
    cx, cy = int(w_bg * 0.716), int(h_bg * 0.455)

    # Subtle glowing circular frosted glass disc (radius 104px)
    disc_r = 104
    disc_light = Image.new('RGBA', (disc_r*2, disc_r*2), (0,0,0,0))
    draw_l = ImageDraw.Draw(disc_light)
    for r_i in range(disc_r, 0, -1):
        ratio = r_i / disc_r
        alpha_val = int(240 * (1.0 - ratio**3.2))
        draw_l.ellipse([disc_r - r_i, disc_r - r_i, disc_r + r_i, disc_r + r_i], fill=(255, 255, 255, alpha_val))
    disc_light = disc_light.filter(ImageFilter.GaussianBlur(3.0))

    # Scaled logo for light scene (width: 156px)
    target_w = 156
    target_h = int(target_w * (pil_logo_light.size[1] / pil_logo_light.size[0]))
    logo_light_comp = pil_logo_light.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Subtle soft shadow
    shadow_l = Image.new('RGBA', (target_w + 16, target_h + 16), (0,0,0,0))
    s_alpha = np.array(logo_light_comp)[:, :, 3]
    s_mask = Image.fromarray((s_alpha * 0.25).astype(np.uint8))
    shadow_l.paste(Image.new('RGBA', (target_w, target_h), (0, 30, 80, 255)), (8, 9), s_mask)
    shadow_l = shadow_l.filter(ImageFilter.GaussianBlur(2.0))

    bg_light.paste(disc_light, (cx - disc_r, cy - disc_r), disc_light)
    bg_light.paste(shadow_l, (cx - target_w//2 - 8, cy - target_h//2 - 8), shadow_l)
    bg_light.paste(logo_light_comp, (cx - target_w//2, cy - target_h//2), logo_light_comp)

    # Save light scene with max quality and 0 subsampling
    bg_light.convert('RGB').save('public/hero-scene-light.jpg', quality=98, subsampling=0)
    print("Saved public/hero-scene-light.jpg!")

    # 3. Composite Dark Hero Scene
    bg_dark = Image.open('public/hero-bg-dark.jpg').convert('RGBA')
    # Soft glowing dark disc (radius 104px)
    disc_dark = Image.new('RGBA', (disc_r*2, disc_r*2), (0,0,0,0))
    draw_d = ImageDraw.Draw(disc_dark)
    for r_i in range(disc_r, 0, -1):
        ratio = r_i / disc_r
        alpha_val = int(180 * (1.0 - ratio**3.0))
        # Deep blue-tinted core with soft cyan glow
        draw_d.ellipse([disc_r - r_i, disc_r - r_i, disc_r + r_i, disc_r + r_i], fill=(4, 15, 30, alpha_val))
    disc_dark = disc_dark.filter(ImageFilter.GaussianBlur(3.0))

    logo_dark_comp = pil_logo_dark.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Dark neon cyan/emerald glow behind logo
    glow_d = Image.new('RGBA', (target_w + 32, target_h + 32), (0,0,0,0))
    d_alpha = np.array(logo_dark_comp)[:, :, 3]
    d_mask = Image.fromarray((d_alpha * 0.55).astype(np.uint8))
    glow_d.paste(Image.new('RGBA', (target_w, target_h), (0, 210, 255, 255)), (16, 16), d_mask)
    glow_d = glow_d.filter(ImageFilter.GaussianBlur(6.0))

    bg_dark.paste(disc_dark, (cx - disc_r, cy - disc_r), disc_dark)
    bg_dark.paste(glow_d, (cx - target_w//2 - 16, cy - target_h//2 - 16), glow_d)
    bg_dark.paste(logo_dark_comp, (cx - target_w//2, cy - target_h//2), logo_dark_comp)

    # Save dark scene with max quality and 0 subsampling
    bg_dark.convert('RGB').save('public/hero-scene-dark.jpg', quality=98, subsampling=0)
    print("Saved public/hero-scene-dark.jpg!")

if __name__ == '__main__':
    generate_assets()
