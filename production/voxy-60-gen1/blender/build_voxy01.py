"""
VOXY 1st Generation (60 Series, 2001) -- Testing Matrix scenario 1 verification:
same vehicle, different generation. This is the first build meant to be
compared against the 90-series VOXY under Consistency Test.

Reuses, unchanged, from build_voxy_v3.py: the station-loft body technique
(build_body_loft), add_box, add_wheel, and the camera/light/space rig
(build_rig, configure_render). Unlike the NOAH run, this vehicle has its
own, different dimension lock (see 01-reference-collection.md), so the
shared module's dimension constants and STATIONS are overridden here
before calling its functions, rather than reused as-is.

build_rig() now takes vehicle_center_x and target_z as explicit
parameters rather than reading them off the module -- the first version
of this script instead patched shared.FRONT_BUMPER_X, shared.REAR_BUMPER_X,
and shared.CAMERA_TARGET_Z directly, which is exactly the implementation
gap that surfaced when this generation's real dimensions turned out to
differ from the 90-series'. That gap was in build_voxy_v3.py's
implementation, not in Production Tooling's design; it has been fixed
there, and this script now just passes this generation's own values in.

Run headless:
  blender --background --python build_voxy01.py
"""

import bpy
import math
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "voxy-90-sz-hybrid-2wd", "blender"))
import build_voxy_v3 as shared  # noqa: E402

# ---------------------------------------------------------------------------
# This generation's own dimension lock candidate (see 01-reference-collection.md)
# -- meters. Deliberately NOT the 90-series' values.
# ---------------------------------------------------------------------------
shared.LENGTH = 4.625
shared.WIDTH = 1.695
shared.HEIGHT = 1.850
shared.WHEELBASE = 2.825
shared.FRONT_TRACK = 1.480  # unverified tier -- see Reference Collection
shared.REAR_TRACK = 1.470   # unverified tier

SILL_HEIGHT = 0.38
BELTLINE_RATIO = 0.52  # lower than the 90-series' 0.60 -- taller glass area, per Shape Analysis
BELTLINE_Z = shared.HEIGHT * BELTLINE_RATIO

REAR_AXLE_X = 0.0
FRONT_AXLE_X = shared.WHEELBASE
FRONT_OVERHANG = 0.72
REAR_OVERHANG = (shared.LENGTH - shared.WHEELBASE) - FRONT_OVERHANG
FRONT_BUMPER_X = FRONT_AXLE_X + FRONT_OVERHANG
REAR_BUMPER_X = REAR_AXLE_X - REAR_OVERHANG

BODY_HALF_WIDTH = shared.WIDTH / 2
GREENHOUSE_HALF_WIDTH = (shared.WIDTH - 0.05) / 2  # minimal taper -- "closer to vertical sides throughout"
GREENHOUSE_FRONT_X = FRONT_AXLE_X - 0.15  # short run to the windshield base -- a steeper, more upright rake
GREENHOUSE_REAR_X = REAR_BUMPER_X + 0.30

shared.STATIONS = [
    (REAR_BUMPER_X,          BODY_HALF_WIDTH * 0.97, BODY_HALF_WIDTH * 0.97, SILL_HEIGHT, shared.HEIGHT * 0.95),
    (GREENHOUSE_REAR_X,      BODY_HALF_WIDTH,        GREENHOUSE_HALF_WIDTH,  SILL_HEIGHT, shared.HEIGHT),
    (0.85,                   BODY_HALF_WIDTH,        GREENHOUSE_HALF_WIDTH,  SILL_HEIGHT, shared.HEIGHT),
    (GREENHOUSE_FRONT_X,     BODY_HALF_WIDTH,        GREENHOUSE_HALF_WIDTH,  SILL_HEIGHT, shared.HEIGHT),
    (FRONT_AXLE_X,           BODY_HALF_WIDTH,        BODY_HALF_WIDTH * 0.98, SILL_HEIGHT, BELTLINE_Z + 0.15),
    (FRONT_BUMPER_X - 0.25,  BODY_HALF_WIDTH * 0.97, BODY_HALF_WIDTH * 0.97, SILL_HEIGHT, BELTLINE_Z + 0.10),
    (FRONT_BUMPER_X,         BODY_HALF_WIDTH * 0.92, BODY_HALF_WIDTH * 0.92, SILL_HEIGHT, BELTLINE_Z + 0.10),
]
shared.BELTLINE_Z = BELTLINE_Z
shared.WHEEL_RADIUS = 0.29  # smaller-diameter wheels, per Shape Analysis


def build_vehicle():
    body_mat = shared.make_material("BodyPaint", (0.62, 0.63, 0.65), roughness=0.3, metallic=0.5)  # silver, matching the reference photo
    glass_mat = shared.make_material("Glass", (0.02, 0.03, 0.035), roughness=0.1, metallic=0.2)
    grille_mat = shared.make_material("GrilleZone", (0.05, 0.05, 0.05), roughness=0.4)
    chrome_mat = shared.make_material("ChromeTrim", (0.85, 0.85, 0.86), roughness=0.05, metallic=1.0)
    headlight_mat = shared.make_material("Headlight", (0.9, 0.92, 0.95), emission=1.2)
    foglamp_mat = shared.make_material("FogLamp", (1.0, 0.92, 0.75), emission=1.0)
    wheel_mat = shared.make_material("Wheel", (0.06, 0.06, 0.06), roughness=0.55)
    arch_mat = shared.make_material("ArchTrim", (0.5, 0.5, 0.5), roughness=0.4, metallic=0.5)

    shared.build_body_loft(body_mat, glass_mat)

    front_x = FRONT_BUMPER_X

    # Grille -- narrow, centered three-slat chrome grille, much narrower
    # than either the 90-series or NOAH's, per Shape Analysis.
    shared.add_box("Grille_Zone", front_x - 0.01, front_x + 0.03, -0.28, 0.28, 0.55, 0.90, grille_mat)
    for i, z in enumerate((0.62, 0.72, 0.82)):
        shared.add_box(f"Grille_Slat_{i}", front_x + 0.01, front_x + 0.035, -0.27, 0.27, z, z + 0.03, chrome_mat)

    # Chrome strip -- at the grille's LOWER edge, the opposite position
    # from NOAH's top-mounted strip.
    shared.add_box("Chrome_Strip", front_x - 0.01, front_x + 0.03, -0.30, 0.30, 0.52, 0.56, chrome_mat)

    # Headlights -- angular, mounted high at the fascia's outer corners.
    for side in (1, -1):
        obj = shared.add_box(
            f"Headlight_{'L' if side > 0 else 'R'}",
            front_x - 0.02, front_x + 0.04,
            side * 0.50, side * 0.75,
            0.75, 0.98,
            headlight_mat,
        )
        obj.rotation_euler = (0, 0, math.radians(-12 * side))

    # Fog lamps -- small and round, low in the bumper corners.
    for side in (1, -1):
        bpy.ops.mesh.primitive_cylinder_add(
            radius=0.05, depth=0.04, location=(front_x + 0.01, side * 0.60, 0.46)
        )
        obj = bpy.context.active_object
        obj.name = f"FogLamp_{'L' if side > 0 else 'R'}"
        obj.rotation_euler = (0, math.radians(90), 0)
        obj.data.materials.append(foglamp_mat)

    for side, y in (("L", 1), ("R", -1)):
        shared.add_wheel(f"Wheel_Front_{side}", FRONT_AXLE_X, y * shared.FRONT_TRACK / 2, wheel_mat, arch_mat)
        shared.add_wheel(f"Wheel_Rear_{side}", REAR_AXLE_X, y * shared.REAR_TRACK / 2, wheel_mat, arch_mat)


def main():
    shared.clear_scene()
    build_vehicle()
    # Same camera, same light, same space as every other build -- only this
    # generation's own vehicle_center_x and beltline height are passed in.
    vehicle_center_x = (FRONT_BUMPER_X + REAR_BUMPER_X) / 2
    shared.build_rig(vehicle_center_x, BELTLINE_Z)
    shared.configure_render()

    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "render"))
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "voxy_gen1_v1.png")
    bpy.context.scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"RENDER_WRITTEN:{out_path}")


if __name__ == "__main__":
    main()
