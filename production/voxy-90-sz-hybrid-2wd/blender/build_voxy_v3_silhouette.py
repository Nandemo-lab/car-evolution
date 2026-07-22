"""
Recognition Test rig for VOXY v3 -- renders the same geometry and the same
camera/light position as build_voxy_v3.py, but with every material
replaced by a single flat, unlit black, against a bright background.

This exists to actually perform Art Direction's Recognition Test ("with
color and material removed -- a single flat silhouette") rather than
eyeballing the colored render and assuming the answer.

Run headless:
  blender --background --python build_voxy_v3_silhouette.py
"""

import bpy
import importlib.util
import os

spec = importlib.util.spec_from_file_location(
    "build_voxy_v3", os.path.join(os.path.dirname(__file__), "build_voxy_v3.py")
)
v3 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v3)


def flatten_to_silhouette():
    silhouette_mat = bpy.data.materials.new("Silhouette")
    silhouette_mat.use_nodes = True
    bsdf = silhouette_mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (0, 0, 0, 1)
    bsdf.inputs["Emission Color"].default_value = (0, 0, 0, 1)
    bsdf.inputs["Emission Strength"].default_value = 0.0
    bsdf.inputs["Roughness"].default_value = 1.0

    for obj in bpy.data.objects:
        if obj.type != "MESH" or obj.name == "Floor":
            continue
        obj.data.materials.clear()
        obj.data.materials.append(silhouette_mat)
        for poly in obj.data.polygons:
            poly.material_index = 0

    world = bpy.data.worlds["World"]
    bg = world.node_tree.nodes["Background"]
    bg.inputs["Color"].default_value = (0.92, 0.92, 0.93, 1.0)
    bg.inputs["Strength"].default_value = 1.4

    floor = bpy.data.objects.get("Floor")
    if floor:
        floor.hide_render = True

    for light in bpy.data.lights:
        light.energy = 0  # the point is silhouette-against-bright-field, not shaded relief


def main():
    v3.clear_scene()
    v3.build_vehicle()
    vehicle_center_x = (v3.FRONT_BUMPER_X + v3.REAR_BUMPER_X) / 2
    v3.build_rig(vehicle_center_x, v3.BELTLINE_Z)
    v3.configure_render()
    flatten_to_silhouette()

    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "render"))
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "voxy_sz_hybrid_2wd_v3_silhouette.png")
    bpy.context.scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"RENDER_WRITTEN:{out_path}")


if __name__ == "__main__":
    main()
