#!/usr/bin/env python3
"""Compose the N3DC 1200×630 share card: night-ops plate + code-drawn lockup."""

from PIL import Image, ImageDraw, ImageFont

FONTS = "/workspace/.grok/fonts"
ART = "/workspace/.grok/og-art-cropped.jpg"
OUT = "/workspace/.grok/og-composed.png"

INK = (232, 238, 246, 255)  # #e8eef6
CYAN = (90, 160, 200, 240)  # #5aa0c8
SHADOW = (7, 11, 18, 210)  # #070b12

W, H = 1200, 630


def font(name, size):
    return ImageFont.truetype(f"{FONTS}/{name}", size)


def text_size(draw, text, fnt):
    b = draw.textbbox((0, 0), text, font=fnt)
    return b[2] - b[0], b[3] - b[1]


def draw_centered(draw, cx, y, text, fnt, fill, shadow=None, passes=5):
    w, h = text_size(draw, text, fnt)
    x = cx - w / 2
    if shadow:
        for d in range(passes, 0, -1):
            draw.text((x, y + d * 0.55), text, font=fnt, fill=shadow)
    draw.text((x, y), text, font=fnt, fill=fill)
    return w, h


def draw_tracked(draw, cx, y, text, fnt, fill, tracking, shadow=None, passes=5):
    widths = [text_size(draw, ch, fnt)[0] for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    h = max(text_size(draw, ch, fnt)[1] for ch in text)
    x = cx - total / 2
    for i, ch in enumerate(text):
        if shadow:
            for d in range(passes, 0, -1):
                draw.text((x, y + d * 0.55), ch, font=fnt, fill=shadow)
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += widths[i] + tracking
    return total, h


def main():
    img = Image.open(ART).convert("RGBA")

    # Cool residual amber in the plate toward navy / cyan.
    grade = Image.new("RGBA", (W, H), (12, 26, 46, 40))
    img = Image.alpha_composite(img, grade)

    # Soft top scrim so the lockup sits on navy, not on lidar bloom.
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    px = scrim.load()
    for y in range(0, 250):
        a = int(125 * (1 - y / 250) ** 1.15)
        for x in range(W):
            px[x, y] = (7, 11, 18, a)
    img = Image.alpha_composite(img, scrim)

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    f_title = font("IBMPlexSans-Bold.ttf", 120)
    f_sub = font("IBMPlexSans-Medium.ttf", 26)
    cx = W / 2

    title_y = 62
    tw, th = draw_tracked(
        d,
        cx,
        title_y,
        "N3DC",
        f_title,
        INK,
        tracking=14,
        shadow=SHADOW,
        passes=6,
    )

    sub_y = title_y + th + 10
    draw_centered(
        d,
        cx,
        sub_y,
        "National 3D Cadastre  ·  3D ULPIN",
        f_sub,
        CYAN,
        shadow=(7, 11, 18, 180),
        passes=4,
    )

    img = Image.alpha_composite(img, overlay)
    img.convert("RGB").save(OUT, "PNG")
    print("wrote", OUT, "title_w", tw, "title_h", th)


if __name__ == "__main__":
    main()
