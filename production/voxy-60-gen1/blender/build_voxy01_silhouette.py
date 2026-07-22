"""
Recognition Test rig for VOXY 1st Generation -- same technique as the
90-series and NOAH silhouette scripts.

Run headless:
  blender --background --python build_voxy01_silhouette.py
"""

import bpy
import importlib.util
import os

spec = importlib.util.spec_from_file_location(
    "build_voxy01", os.path.join(os.path.dirname(__file__), "build_voxy01.py")
)
voxy01 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(voxy01)


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
        light.energy = 0


def main():
    voxy01.shared.clear_scene()
    voxy01.build_vehicle()
    vehicle_center_x = (voxy01.FRONT_BUMPER_X + voxy01.REAR_BUMPER_X) / 2
    voxy01.shared.build_rig(vehicle_center_x, voxy01.BELTLINE_Z)
    voxy01.shared.configure_render()
    flatten_to_silhouette()

    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "render"))
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "voxy_gen1_v1_silhouette.png")
    bpy.context.scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"RENDER_WRITTEN:{out_path}")


if __name__ == "__main__":
    main()
