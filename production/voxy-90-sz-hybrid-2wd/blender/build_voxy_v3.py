"""
VOXY 90 Series S-Z Hybrid 2WD -- Definitive Master dry run, v3.

v1 (build_voxy.py) was two stacked boxes: correct dimensions, but it failed
the Quality Gate because it had none of Art Direction's Identity Elements --
no roofline character, no pillar rake, no character line, no front fascia
shape, no wheel arch stance.

v3 builds a single continuous body via a station loft (a fixed side-profile
silhouette lofted along the vehicle's length), which is what actually lets
the roofline and pillar rake exist as real geometry instead of being
implied. Everything else -- grille texture, panel gaps, badge detail -- is
still simplified, per Art Direction's "elements that may be simplified".

The camera, light, and background rig is intentionally byte-for-byte
identical to v1's (see Negative Examples in art-direction.md: do not change
the rig between vehicles or attempts). Only the vehicle geometry changed.

Run headless:
  blender --background --python build_voxy_v3.py
"""

import bpy
import bmesh
import math

# ---------------------------------------------------------------------------
# Locked dimensions (Definitive Master Policy) -- meters
# ---------------------------------------------------------------------------
LENGTH = 4.695
WIDTH = 1.730
HEIGHT = 1.895
WHEELBASE = 2.850
FRONT_TRACK = 1.500
REAR_TRACK = 1.515

# ---------------------------------------------------------------------------
# Shape Analysis values -- some sourced, some estimated (see 02-shape-analysis.md)
# ---------------------------------------------------------------------------
GROUND_CLEARANCE = 0.140
FRONT_OVERHANG = 0.740
REAR_OVERHANG = LENGTH - WHEELBASE - FRONT_OVERHANG
WHEEL_DIAMETER = 0.660
BELTLINE_RATIO = 0.60
SILL_HEIGHT = 0.400

REAR_AXLE_X = 0.0
FRONT_AXLE_X = WHEELBASE
FRONT_BUMPER_X = FRONT_AXLE_X + FRONT_OVERHANG
REAR_BUMPER_X = REAR_AXLE_X - REAR_OVERHANG
BELTLINE_Z = HEIGHT * BELTLINE_RATIO
WHEEL_RADIUS = WHEEL_DIAMETER / 2

BODY_HALF_WIDTH = WIDTH / 2
GREENHOUSE_HALF_WIDTH = (WIDTH - 0.13) / 2
GREENHOUSE_FRONT_X = FRONT_AXLE_X - 0.35
GREENHOUSE_REAR_X = REAR_BUMPER_X + 0.30


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for collection in [bpy.data.meshes, bpy.data.materials, bpy.data.lights, bpy.data.cameras]:
        for block in list(collection):
            if block.users == 0:
                collection.remove(block)


def make_material(name, color, roughness=0.35, metallic=0.0, emission=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*color, 1.0)
        bsdf.inputs["Emission Strength"].default_value = emission
    return mat


# ---------------------------------------------------------------------------
# Body -- a single continuous loft. Each station is (x, bottom_half_width,
# top_half_width, z_bottom, z_top). Varying z_top station-to-station is what
# produces the roofline (flat across the cabin, dropping to hood height at
# the front); varying top_half_width is what produces the cabin-narrower-
# than-body taper Art Direction calls a required Identity Element.
# ---------------------------------------------------------------------------
STATIONS = [
    # x,                        bw,                    tw,                    zb,          zt
    (REAR_BUMPER_X,              BODY_HALF_WIDTH * 0.95, BODY_HALF_WIDTH * 0.95, SILL_HEIGHT, HEIGHT * 0.90),
    (GREENHOUSE_REAR_X,          BODY_HALF_WIDTH,        GREENHOUSE_HALF_WIDTH,  SILL_HEIGHT, HEIGHT),
    (0.85,                       BODY_HALF_WIDTH,        GREENHOUSE_HALF_WIDTH,  SILL_HEIGHT, HEIGHT),
    (GREENHOUSE_FRONT_X,         BODY_HALF_WIDTH,        GREENHOUSE_HALF_WIDTH,  SILL_HEIGHT, HEIGHT),
    (FRONT_AXLE_X,               BODY_HALF_WIDTH,        BODY_HALF_WIDTH * 0.97, SILL_HEIGHT, BELTLINE_Z + 0.10),
    (FRONT_BUMPER_X - 0.30,      BODY_HALF_WIDTH * 0.95, BODY_HALF_WIDTH * 0.95, SILL_HEIGHT, BELTLINE_Z + 0.05),
    (FRONT_BUMPER_X,             BODY_HALF_WIDTH * 0.90, BODY_HALF_WIDTH * 0.90, SILL_HEIGHT, BELTLINE_Z + 0.05),
]


def build_body_loft(paint_material, glass_material):
    """6-vertex rings (bottom/beltline/top, mirrored left-right) so the
    beltline itself is real geometry -- the edge between the paint tier and
    the glass tier is Art Direction's required character line, not an
    applied decal. Stations with no cabin (hood, nose) collapse the
    beltline and top rings together, so no glass tier is created there.
    """
    bm = bmesh.new()
    rings = []
    for (x, bw, tw, zb, zt) in STATIONS:
        zm = min(BELTLINE_Z, zt)
        bl = bm.verts.new((x, -bw, zb))
        ml = bm.verts.new((x, -bw, zm))
        tl = bm.verts.new((x, -tw, zt))
        tr = bm.verts.new((x, tw, zt))
        mr = bm.verts.new((x, bw, zm))
        br = bm.verts.new((x, bw, zb))
        rings.append((bl, ml, tl, tr, mr, br))

    def quad(a, b, c, d, material_index):
        f = bm.faces.new((a, b, c, d))
        f.material_index = material_index
        return f

    PAINT, GLASS = 0, 1
    for i in range(len(rings) - 1):
        bl0, ml0, tl0, tr0, mr0, br0 = rings[i]
        bl1, ml1, tl1, tr1, mr1, br1 = rings[i + 1]
        quad(bl0, ml0, ml1, bl1, PAINT)   # lower-left flank
        quad(ml0, tl0, tl1, ml1, GLASS)   # upper-left flank
        quad(tl0, tr0, tr1, tl1, PAINT)   # roof / hood
        quad(tr0, mr0, mr1, tr1, GLASS)   # upper-right flank
        quad(mr0, br0, br1, mr1, PAINT)   # lower-right flank
        quad(br0, bl0, bl1, br1, PAINT)   # floor

    rear = bm.faces.new(rings[0])
    rear.material_index = PAINT
    front = bm.faces.new(tuple(reversed(rings[-1])))
    front.material_index = PAINT

    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))

    mesh = bpy.data.meshes.new("Body")
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new("Body", mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(paint_material)
    obj.data.materials.append(glass_material)

    bevel_mod = obj.modifiers.new("Bevel", "BEVEL")
    bevel_mod.width = 0.025
    bevel_mod.segments = 2
    subsurf_mod = obj.modifiers.new("Smooth", "SUBSURF")
    subsurf_mod.levels = 1
    subsurf_mod.render_levels = 1
    return obj


def add_box(name, x_min, x_max, y_min, y_max, z_min, z_max, material, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add()
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = ((x_max - x_min) / 2, (y_max - y_min) / 2, (z_max - z_min) / 2)
    obj.location = ((x_max + x_min) / 2, (y_max + y_min) / 2, (z_max + z_min) / 2)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        m = obj.modifiers.new("Bevel", "BEVEL")
        m.width = bevel
        m.segments = 2
    obj.data.materials.append(material)
    return obj


def add_wheel(name, x, y, tire_mat, arch_mat):
    bpy.ops.mesh.primitive_cylinder_add(radius=WHEEL_RADIUS, depth=0.235, location=(x, y, WHEEL_RADIUS))
    tire = bpy.context.active_object
    tire.name = name
    tire.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    tire.data.materials.append(tire_mat)

    # Arch rim -- a thin torus standing in for a modeled wheel-arch cutout.
    # Deferred boolean cutting for reliability in a headless script; see
    # production report for this trade-off.
    bpy.ops.mesh.primitive_torus_add(
        location=(x, y, WHEEL_RADIUS),
        major_radius=WHEEL_RADIUS + 0.05,
        minor_radius=0.025,
        major_segments=24,
        minor_segments=8,
    )
    arch = bpy.context.active_object
    arch.name = f"{name}_Arch"
    arch.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    arch.data.materials.append(arch_mat)
    return tire, arch


def build_vehicle():
    body_mat = make_material("BodyPaint", (0.14, 0.19, 0.24), roughness=0.25, metallic=0.6)
    glass_mat = make_material("Glass", (0.008, 0.010, 0.012), roughness=0.05, metallic=0.1)
    grille_mat = make_material("GrilleZone", (0.02, 0.02, 0.02), roughness=0.5)
    light_mat = make_material("LightBar", (1.0, 1.0, 1.0), emission=2.0)
    headlight_mat = make_material("Headlight", (1.0, 0.95, 0.85), emission=1.6)
    wheel_mat = make_material("Wheel", (0.04, 0.04, 0.04), roughness=0.55)
    arch_mat = make_material("ArchTrim", (0.05, 0.05, 0.06), roughness=0.4, metallic=0.3)

    build_body_loft(body_mat, glass_mat)

    front_x = FRONT_BUMPER_X
    # Grille zone -- per Shape Analysis, the grille fills most of the lower
    # fascia width and sits low, not a small centered patch.
    add_box(
        "Grille_Zone",
        front_x - 0.01, front_x + 0.03,
        -0.62, 0.62,
        0.45, 0.82,
        grille_mat,
    )
    # Light bar -- full-width strip at the hood/grille boundary
    add_box(
        "Light_Bar",
        front_x - 0.01, front_x + 0.03,
        -0.70, 0.70,
        0.84, 0.92,
        light_mat,
    )
    # Headlight clusters -- per Shape Analysis, low and wide, set into the
    # grille itself rather than a conventional upper-fender position.
    for side in (1, -1):
        obj = add_box(
            f"Headlight_{'L' if side > 0 else 'R'}",
            front_x - 0.02, front_x + 0.04,
            side * 0.62, side * 0.80,
            0.55, 0.75,
            headlight_mat,
        )
        obj.rotation_euler = (0, 0, math.radians(-6 * side))

    for side, y in (("L", 1), ("R", -1)):
        add_wheel(f"Wheel_Front_{side}", FRONT_AXLE_X, y * FRONT_TRACK / 2, wheel_mat, arch_mat)
        add_wheel(f"Wheel_Rear_{side}", REAR_AXLE_X, y * REAR_TRACK / 2, wheel_mat, arch_mat)


# ---------------------------------------------------------------------------
# Shared rig -- identical to v1. Do not tune per vehicle (art-direction.md,
# Negative Examples). Only CAMERA_AZIMUTH_DEG / CAMERA_ELEVATION_DEG /
# CAMERA_DISTANCE / CAMERA_LENS_MM and the light setup are the fixed rig --
# these never change per vehicle. Where the rig points (vehicle_center_x,
# target_z) is NOT part of the fixed rig; it depends on the vehicle being
# rendered, so build_rig() takes it as a parameter rather than reading it
# off this module. Reading it off the module is exactly what caused the
# 1st-generation VOXY run to silently aim the camera at the 90-series'
# vehicle center and beltline height until caught before rendering.
# ---------------------------------------------------------------------------
CAMERA_AZIMUTH_DEG = 35
CAMERA_ELEVATION_DEG = 16
CAMERA_DISTANCE = 11.0
CAMERA_LENS_MM = 50


def build_rig(vehicle_center_x, target_z):
    floor_mat = make_material("Floor", (0.10, 0.10, 0.11), roughness=0.9)
    bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, 0))
    floor = bpy.context.active_object
    floor.name = "Floor"
    floor.data.materials.append(floor_mat)

    world = bpy.data.worlds["World"]
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs["Color"].default_value = (0.05, 0.055, 0.06, 1.0)
    bg.inputs["Strength"].default_value = 0.6

    az = math.radians(CAMERA_AZIMUTH_DEG)
    el = math.radians(CAMERA_ELEVATION_DEG)
    cam_x = vehicle_center_x + math.cos(az) * math.cos(el) * CAMERA_DISTANCE
    cam_y = math.sin(az) * math.cos(el) * CAMERA_DISTANCE
    cam_z = math.sin(el) * CAMERA_DISTANCE + target_z

    bpy.ops.object.camera_add(location=(cam_x, cam_y, cam_z))
    camera = bpy.context.active_object
    camera.name = "MasterCamera"
    camera.data.lens = CAMERA_LENS_MM

    direction = (vehicle_center_x - cam_x, 0 - cam_y, target_z - cam_z)
    rot_quat = __import__("mathutils").Vector(direction).to_track_quat("-Z", "Y")
    camera.rotation_euler = rot_quat.to_euler()
    bpy.context.scene.camera = camera

    bpy.ops.object.light_add(type="AREA", location=(-3.5, 4.5, 5.5))
    key_light = bpy.context.active_object
    key_light.name = "KeyLight"
    key_light.data.energy = 2400
    key_light.data.size = 4.0
    key_light.data.color = (1.0, 0.98, 0.95)


def configure_render():
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.render.resolution_x = 1750
    scene.render.resolution_y = 1000
    scene.render.image_settings.file_format = "PNG"
    scene.eevee.taa_render_samples = 64


def main():
    clear_scene()
    build_vehicle()
    vehicle_center_x = (FRONT_BUMPER_X + REAR_BUMPER_X) / 2
    build_rig(vehicle_center_x, BELTLINE_Z)
    configure_render()

    import os
    out_dir = os.path.abspath(os.path.join(os.path.dirname(bpy.data.filepath or __file__), "..", "render"))
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "voxy_sz_hybrid_2wd_v3.png")
    bpy.context.scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"RENDER_WRITTEN:{out_path}")


if __name__ == "__main__":
    main()
