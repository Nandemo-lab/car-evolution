"""
NOAH 90 Series S-Z Hybrid 2WD -- Production Tooling / Art Direction
generalization check, not a new product vehicle.

This script reuses, unchanged: the station-loft body technique, the
dimension constants (confirmed identical to VOXY via NOAH's own official
spec sheet -- see 01-reference-collection.md), and the camera/light/space
rig from build_voxy_v3.py. Only the front fascia -- the part Shape
Analysis identified as NOAH-specific -- is different code.

If Production Tooling and Art Direction are actually vehicle-agnostic
principles rather than VOXY-specific instructions, this file should need
to differ from build_voxy_v3.py only in the fascia section below, and the
rig/body plumbing should carry over by import, not by being retyped.

Run headless:
  blender --background --python build_noah.py
"""

import bpy
import math
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "voxy-90-sz-hybrid-2wd", "blender"))
import build_voxy_v3 as shared  # noqa: E402  -- the shared rig + body loft this run verifies


def build_vehicle():
    body_mat = shared.make_material("BodyPaint", (0.12, 0.12, 0.14), roughness=0.2, metallic=0.7)
    glass_mat = shared.make_material("Glass", (0.008, 0.010, 0.012), roughness=0.05, metallic=0.1)
    grille_mat = shared.make_material("GrilleZone", (0.03, 0.03, 0.03), roughness=0.4)
    chrome_mat = shared.make_material("ChromeTrim", (0.85, 0.85, 0.86), roughness=0.05, metallic=1.0)
    headlight_mat = shared.make_material("Headlight", (1.0, 0.95, 0.85), emission=1.6)
    wheel_mat = shared.make_material("Wheel", (0.04, 0.04, 0.04), roughness=0.55)
    arch_mat = shared.make_material("ArchTrim", (0.05, 0.05, 0.06), roughness=0.4, metallic=0.3)
    skid_mat = shared.make_material("SkidPlate", (0.55, 0.55, 0.55), roughness=0.35, metallic=0.6)

    shared.build_body_loft(body_mat, glass_mat)

    front_x = shared.FRONT_BUMPER_X

    # Grille -- narrower and more centered than VOXY's, with visible
    # body-color fascia around it rather than filling the width edge to edge.
    shared.add_box(
        "Grille_Zone",
        front_x - 0.01, front_x + 0.03,
        -0.38, 0.38,
        0.48, 0.85,
        grille_mat,
    )
    # Chrome accent strip -- trim, not an illuminated bar, spanning
    # headlight to headlight across the grille's top edge.
    shared.add_box(
        "Chrome_Strip",
        front_x - 0.01, front_x + 0.03,
        -0.66, 0.66,
        0.83, 0.87,
        chrome_mat,
    )
    # Headlights -- slim, conventional corner units, angled toward the grille.
    for side in (1, -1):
        obj = shared.add_box(
            f"Headlight_{'L' if side > 0 else 'R'}",
            front_x - 0.02, front_x + 0.04,
            side * 0.50, side * 0.68,
            0.66, 0.86,
            headlight_mat,
        )
        obj.rotation_euler = (0, 0, math.radians(-10 * side))
    # Lower skid-plate insert -- an element VOXY's S-Z doesn't carry.
    shared.add_box(
        "Skid_Plate",
        front_x - 0.01, front_x + 0.035,
        -0.60, 0.60,
        0.40, 0.47,
        skid_mat,
    )

    for side, y in (("L", 1), ("R", -1)):
        shared.add_wheel(f"Wheel_Front_{side}", shared.FRONT_AXLE_X, y * shared.FRONT_TRACK / 2, wheel_mat, arch_mat)
        shared.add_wheel(f"Wheel_Rear_{side}", shared.REAR_AXLE_X, y * shared.REAR_TRACK / 2, wheel_mat, arch_mat)


def main():
    shared.clear_scene()
    build_vehicle()
    # Same camera, same light, same space as VOXY -- NOAH shares its exact
    # dimension lock, confirmed independently (see 01-reference-collection.md),
    # so the shared module's own vehicle-center and beltline values are
    # correct here too.
    vehicle_center_x = (shared.FRONT_BUMPER_X + shared.REAR_BUMPER_X) / 2
    shared.build_rig(vehicle_center_x, shared.BELTLINE_Z)
    shared.configure_render()

    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "render"))
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "noah_sz_hybrid_2wd_v1.png")
    bpy.context.scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"RENDER_WRITTEN:{out_path}")


if __name__ == "__main__":
    main()
