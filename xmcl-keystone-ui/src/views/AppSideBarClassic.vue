<template>
  <div
    v-if="!isHorizontal"
    data-testid="app-sidebar"
    role="navigation"
    aria-label="SC Launcher navigation"
    class="sidebar moveable z-10"
    :style="{ 'backdrop-filter': `blur(${blurSidebar}px)`, backgroundColor: sideBarColor }"
  >
    <div class="brand non-moveable" aria-label="SC Launcher">SC</div>
    <div class="sidebar__divider" />

    <nav class="sidebar__nav">
      <AppSideBarItem data-testid="nav-home" to="/dashboard" icon="home" :aria-label="t('Home')" />
      <AppSideBarItem data-testid="nav-instances" to="/instances" icon="grid_view" :aria-label="t('Instances')" />
      <AppSideBarItem data-testid="nav-mods" to="/mods" icon="extension" :aria-label="t('Mods')" />
      <AppSideBarItem data-testid="nav-store" to="/store" icon="store" :aria-label="t('Store')" />
      <AppSideBarItem data-testid="nav-accounts" to="/me" :aria-label="t('Accounts')">
        <PlayerAvatar
          class="overflow-hidden rounded-full"
          :src="gameProfile?.textures?.SKIN?.url"
          :dimension="32"
        />
      </AppSideBarItem>
    </nav>

    <div class="sidebar__spacer" />

    <nav class="sidebar__nav">
      <AppSideBarItem data-testid="nav-multiplayer" clickable icon="hub" :aria-label="t('Multiplayer')" @click="goMultiplayer" />
      <AppSideBarItem data-testid="nav-settings" to="/setting" icon="settings" :aria-label="t('Settings')" />
    </nav>
  </div>

  <div
    v-else
    data-testid="app-sidebar"
    role="navigation"
    aria-label="SC Launcher navigation"
    class="sidebar-horizontal moveable z-10 rounded-[0.75rem] flex flex-row items-center px-2 h-12 mx-2 my-2 elevation-4"
    :style="{ 'backdrop-filter': `blur(${blurSidebar}px)`, backgroundColor: sideBarColor }"
  >
    <div class="brand brand--horizontal non-moveable">SC</div>
    <v-divider vertical class="mx-2 h-6" />
    <nav class="flex flex-row items-center gap-1">
      <AppSideBarItem to="/dashboard" icon="home" :aria-label="t('Home')" />
      <AppSideBarItem to="/instances" icon="grid_view" :aria-label="t('Instances')" />
      <AppSideBarItem to="/mods" icon="extension" :aria-label="t('Mods')" />
      <AppSideBarItem to="/store" icon="store" :aria-label="t('Store')" />
      <AppSideBarItem to="/me" :aria-label="t('Accounts')">
        <PlayerAvatar class="overflow-hidden rounded-full" :src="gameProfile?.textures?.SKIN?.url" :dimension="28" />
      </AppSideBarItem>
    </nav>
    <div class="flex-grow" />
    <nav class="flex flex-row items-center gap-1">
      <AppSideBarItem clickable icon="hub" :aria-label="t('Multiplayer')" @click="goMultiplayer" />
      <AppSideBarItem to="/setting" icon="settings" :aria-label="t('Settings')" />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import PlayerAvatar from '@/components/PlayerAvatar.vue'
import { useInjectSidebarSettings } from '@/composables/sidebarSettings'
import { kTheme } from '@/composables/theme'
import { kUserContext } from '@/composables/user'
import { injection } from '@/util/inject'
import AppSideBarItem from './AppSideBarItem.vue'

const { blurSidebar, sideBarColor } = injection(kTheme)
const { gameProfile } = injection(kUserContext)
const { position } = useInjectSidebarSettings()
const isHorizontal = computed(() => position.value === 'top' || position.value === 'bottom')
const { t } = useI18n()

function goMultiplayer() {
  windowController.openMultiplayerWindow()
}
</script>

<style scoped>
.sidebar {
  min-width: 76px;
  width: 76px;
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--surface-menu-item-radius);
  padding: 12px 8px;
  overflow: hidden;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
}

.sidebar__spacer {
  flex: 1 1 auto;
  min-height: 16px;
}

.sidebar__divider {
  width: 34px;
  height: 1px;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.12);
}

.brand {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 900;
  letter-spacing: -1px;
  font-size: 17px;
  color: #fff;
  background: linear-gradient(145deg, #8d72ff, #5d43df);
  box-shadow: 0 8px 24px rgba(93, 67, 223, 0.28);
}

.brand--horizontal {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-size: 13px;
  flex-shrink: 0;
}
</style>
