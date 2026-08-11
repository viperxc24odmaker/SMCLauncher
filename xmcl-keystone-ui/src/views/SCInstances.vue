<template>
  <section class="instances-page">
    <header class="page-header">
      <div><p class="eyebrow">SC LAUNCHER</p><h1>Instances</h1><p>Keep every Minecraft setup separate, clean and easy to launch.</p></div>
      <button class="create" @click="showAddInstance()"><v-icon size="19">add</v-icon>Create instance</button>
    </header>

    <div v-if="instances.length" class="instance-grid">
      <button v-for="item in instances" :key="item.path" class="instance-card" :class="{ selected: item.path === selectedPath }" @click="select(item.path)">
        <div class="card-top"><div class="game-icon"><v-icon>sports_esports</v-icon></div><span v-if="item.path === selectedPath" class="active">ACTIVE</span></div>
        <h2>{{ item.name }}</h2>
        <p>{{ item.runtime.minecraft || 'No version installed' }}</p>
        <div class="tags"><span>{{ item.runtime.fabricLoader ? 'Fabric' : item.runtime.forge ? 'Forge' : item.runtime.quiltLoader ? 'Quilt' : 'Vanilla' }}</span><span>{{ item.maxMemory || 2048 }} MB</span></div>
        <div class="card-action"><span>{{ item.path === selectedPath ? 'Selected' : 'Select instance' }}</span><v-icon>arrow_forward</v-icon></div>
      </button>
    </div>
    <div v-else class="empty"><v-icon size="40">grid_view</v-icon><h2>No instances yet</h2><p>Create your first Minecraft instance to get started.</p><button class="create" @click="showAddInstance()">Create instance</button></div>
  </section>
</template>

<script lang="ts" setup>
import { useDialog } from '@/composables/dialog'
import { AddInstanceDialogKey } from '@/composables/instanceTemplates'
import { kInstances } from '@/composables/instances'
import { injection } from '@/util/inject'

const router = useRouter()
const { instances, path } = injection(kInstances)
const { show: showAddInstance } = useDialog(AddInstanceDialogKey)
const selectedPath = computed(() => path.value)

function select(instancePath: string) {
  path.value = instancePath
  router.push('/')
}
</script>

<style scoped>
.instances-page { min-height:100%; padding:42px 54px 40px; color:rgba(255,255,255,.94); background:radial-gradient(circle at 80% 0%,rgba(105,82,255,.11),transparent 32%),#0d1017; overflow:auto; }
.page-header { max-width:1160px; display:flex; align-items:flex-end; justify-content:space-between; gap:20px; margin-bottom:30px; }.eyebrow{margin:0 0 8px;color:#9c8aff;font-size:10px;font-weight:800;letter-spacing:.18em}.page-header h1{margin:0;font-size:34px;letter-spacing:-.04em}.page-header p:not(.eyebrow){margin:9px 0 0;color:#7b8494;font-size:13px}.create{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:11px;background:#8b70ff;color:#fff;padding:11px 16px;font-weight:750;cursor:pointer;box-shadow:0 10px 24px rgba(111,83,255,.22)}
.instance-grid{max-width:1160px;display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:16px}.instance-card{min-height:245px;text-align:left;color:inherit;border:1px solid rgba(255,255,255,.08);border-radius:17px;padding:19px;background:#12161f;cursor:pointer;transition:transform .15s,border-color .15s,background .15s}.instance-card:hover{transform:translateY(-2px);border-color:rgba(141,114,255,.4);background:#151a24}.instance-card.selected{border-color:rgba(141,114,255,.6);box-shadow:0 14px 40px rgba(65,45,150,.13)}.card-top{display:flex;justify-content:space-between;align-items:center}.game-icon{width:46px;height:46px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(145deg,#263a2d,#17241c);color:#85d49d}.active{font-size:9px;font-weight:800;letter-spacing:.12em;color:#65d99b}.instance-card h2{margin:20px 0 5px;font-size:16px}.instance-card p{margin:0;color:#737d8d;font-size:11px}.tags{display:flex;gap:7px;margin-top:16px}.tags span{padding:6px 8px;border:1px solid rgba(255,255,255,.07);border-radius:7px;color:#8992a2;font-size:9px}.card-action{display:flex;justify-content:space-between;align-items:center;margin-top:21px;padding-top:13px;border-top:1px solid rgba(255,255,255,.06);color:#aaa2ff;font-size:10px}.card-action .v-icon{font-size:17px}.empty{max-width:620px;margin:70px auto;text-align:center;padding:55px 25px;border:1px dashed rgba(255,255,255,.12);border-radius:18px;color:#7d8695}.empty h2{margin:14px 0 7px;color:#e8eaf0}.empty p{margin:0 0 20px;font-size:12px}
@media(max-width:700px){.instances-page{padding:30px 22px}.page-header{align-items:flex-start;flex-direction:column}.create{width:100%;justify-content:center}}
</style>
