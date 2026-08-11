<template>
  <div
    ref="containerRef"
    class="home-page visible-scroll relative flex max-h-full flex-1 flex-col overflow-x-hidden"
    :style="{ scrollbarGutter: 'stable' }"
    @wheel="onScroll"
  >
    <HomeHeader ref="headerEl" class="sticky top-0 z-20" />
    <router-view v-slot="{ Component }">
      <transition name="fade-transition" mode="out-in" @after-enter="end" @leave="start">
        <component :is="Component" />
      </transition>
    </router-view>
    <HomeLogDialog />
    <HomeDropModpackDialog />
    <HomeLaunchMultiInstanceDialog />
    <HomeLaunchStatusDialog />
    <HomeInstanceInstallDialog />
    <HomeUnresolvedFilesDialog />
    <AppCollectionDialog />
  </div>
</template>

<script lang="ts" setup>
import { kInstance } from '@/composables/instance'
import { usePresence } from '@/composables/presence'
import { kCompact, useCompactScroll } from '@/composables/scrollTop'
import { useBlockSharedTooltip } from '@/composables/sharedTooltip'
import { injection } from '@/util/inject'
import { useElementBounding, useScroll } from '@vueuse/core'
import { useInstanceServerStatus } from '../composables/serverStatus'
import HomeHeader from './HomeHeader.vue'
import HomeInstanceInstallDialog from './HomeInstanceInstallDialog.vue'
import HomeLaunchMultiInstanceDialog from './HomeLaunchMultiInstanceDialog.vue'
import HomeUnresolvedFilesDialog from './HomeUnresolvedFilesDialog.vue'
import HomeLaunchStatusDialog from './HomeLaunchStatusDialog.vue'
import HomeLogDialog from './HomeLogDialog.vue'
import AppCollectionDialog from './AppCollectionDialog.vue'
import HomeDropModpackDialog from './HomeDropModpackDialog.vue'
import { useGamepadInnerNav } from '@/composables/gamepad'

const router = useRouter()
const HOME_GROUP = ['/', '/mods', '/resourcepacks', '/shaderpacks', '/save']
useGamepadInnerNav({
  handler: (dir) => {
    const cur = router.currentRoute.value.path
    const idx = HOME_GROUP.indexOf(cur)
    if (idx === -1) return
    const next = dir === 'next' ? (idx + 1) % HOME_GROUP.length : (idx - 1 + HOME_GROUP.length) % HOME_GROUP.length
    router.push(HOME_GROUP[next])
  },
  disabled: () => !HOME_GROUP.includes(router.currentRoute.value.path),
})

const removeAfterEach = router.afterEach((r) => {
  document.title = `SC Launcher - ${r.fullPath}`
  if (containerRef.value) containerRef.value.scrollTop = 0
})
onUnmounted(() => removeAfterEach())

const headerEl = ref(null as null | HTMLDivElement)
const { height } = useElementBounding(headerEl)
const hightTracker = inject('headerHeight', ref(0))
watch(height, (h) => { hightTracker.value = h }, { immediate: true })

const { isServer, instance } = injection(kInstance)
const { refreshIfStale } = useInstanceServerStatus(instance)
const containerRef = ref(null as null | HTMLDivElement)
onMounted(() => { if (isServer.value) refreshIfStale() })

const { t } = useI18n()
usePresence(computed(() => t('presence.instance', {
  instance: instance.value.name,
  minecraft: instance.value.runtime.minecraft || '',
  forge: instance.value.runtime.forge || '',
  fabric: instance.value.runtime.fabricLoader || '',
})))

const compact = injection(kCompact)
const onScroll = useCompactScroll(compact)
useBlockSharedTooltip()
const { arrivedState } = useScroll(containerRef)
provide('scroll', arrivedState)
provide('scrollElement', containerRef)
</script>

<style>
.v-dialog__content--active,.v-dialog { -webkit-app-region: no-drag; user-select: auto; }
.pointer * { cursor: pointer !important; }
</style>
