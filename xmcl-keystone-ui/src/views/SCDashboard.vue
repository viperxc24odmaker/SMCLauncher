<template>
  <section class="sc-dashboard">
    <header class="dashboard-header">
      <div>
        <p class="eyebrow">SC LAUNCHER</p>
        <h1>Welcome back<span v-if="playerName">, {{ playerName }}</span>.</h1>
        <p class="subtitle">Everything you need to play Minecraft, without the clutter.</p>
      </div>
      <AppSideBarItem to="/me" class="profile-link" aria-label="Account">
        <PlayerAvatar class="overflow-hidden rounded-full" :src="gameProfile?.textures?.SKIN?.url" :dimension="34" />
      </AppSideBarItem>
    </header>

    <div class="dashboard-grid">
      <article class="hero-card">
        <div class="hero-copy">
          <p class="eyebrow">READY TO PLAY</p>
          <h2>{{ instance?.name || 'Minecraft' }}</h2>
          <p class="runtime">{{ minecraftVersion || 'No version selected' }}<span v-if="loader"> · {{ loader }}</span></p>
          <button class="play-button" :disabled="launchButton.loading" @click="launchButton.onClick()">
            <v-progress-circular v-if="launchButton.loading" indeterminate size="18" width="2" />
            <v-icon v-else size="21">play_arrow</v-icon>
            <span>{{ launchButton.loading ? 'Preparing…' : launchButton.text }}</span>
          </button>
        </div>
        <div class="hero-orb" aria-hidden="true" />
      </article>

      <article class="panel instance-panel">
        <div class="panel-title"><span>ACTIVE INSTANCE</span><RouterLink to="/instances">Manage</RouterLink></div>
        <div class="instance-row">
          <div class="instance-icon"><v-icon size="25">sports_esports</v-icon></div>
          <div class="instance-info">
            <strong>{{ instance?.name || 'Minecraft' }}</strong>
            <span>{{ minecraftVersion || 'Not installed' }} · {{ loader || 'Vanilla' }}</span>
          </div>
        </div>
        <div class="stats">
          <div><span>RAM</span><strong>{{ memory }} MB</strong></div>
          <div><span>STATUS</span><strong class="online">Ready</strong></div>
        </div>
      </article>

      <article class="panel quick-panel">
        <div class="panel-title"><span>QUICK ACTIONS</span></div>
        <RouterLink class="action" to="/instances"><v-icon>grid_view</v-icon><span>Manage instances</span><v-icon class="arrow">chevron_right</v-icon></RouterLink>
        <RouterLink class="action" to="/mods"><v-icon>extension</v-icon><span>Browse mods</span><v-icon class="arrow">chevron_right</v-icon></RouterLink>
        <RouterLink class="action" to="/store"><v-icon>store</v-icon><span>Browse modpacks</span><v-icon class="arrow">chevron_right</v-icon></RouterLink>
      </article>
    </div>

    <footer class="dashboard-footer">
      <span><i /> Services online</span>
      <span>SC Launcher</span>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import PlayerAvatar from '@/components/PlayerAvatar.vue'
import AppSideBarItem from './AppSideBarItem.vue'
import { kInstance } from '@/composables/instance'
import { kLaunchButton } from '@/composables/launchButton'
import { kUserContext } from '@/composables/user'
import { injection } from '@/util/inject'

const { instance } = injection(kInstance)
const launchButton = injection(kLaunchButton)
const { gameProfile } = injection(kUserContext)

const playerName = computed(() => gameProfile.value?.name || gameProfile.value?.username || '')
const minecraftVersion = computed(() => instance.value?.runtime?.minecraft || '')
const loader = computed(() => instance.value?.runtime?.fabricLoader || instance.value?.runtime?.forge || instance.value?.runtime?.quiltLoader || '')
const memory = computed(() => instance.value?.maxMemory || 2048)
</script>

<style scoped>
.sc-dashboard { min-height: 100%; padding: 42px 54px 28px; color: rgba(255,255,255,.94); background: radial-gradient(circle at 82% 4%, rgba(105,82,255,.14), transparent 34%), #0d1017; overflow: auto; }
.dashboard-header { display:flex; align-items:center; justify-content:space-between; gap:24px; margin-bottom:34px; }
.eyebrow { margin:0 0 9px; font-size:11px; font-weight:800; letter-spacing:.18em; color:#9c8aff; }
h1 { margin:0; font-size:34px; line-height:1.1; letter-spacing:-.035em; }
.subtitle { margin:10px 0 0; color:#7e8797; font-size:14px; }
.profile-link { width:44px; height:44px; display:grid; place-items:center; border:1px solid rgba(255,255,255,.1); border-radius:13px; background:rgba(255,255,255,.035); }
.dashboard-grid { display:grid; grid-template-columns:minmax(0,1.6fr) minmax(280px,.8fr); gap:18px; max-width:1160px; }
.hero-card { min-height:370px; grid-row:span 2; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.09); border-radius:22px; padding:38px; display:flex; align-items:flex-end; background:linear-gradient(135deg,#17142a,#11151e 68%); box-shadow:0 24px 70px rgba(0,0,0,.22); }
.hero-copy { position:relative; z-index:2; max-width:560px; }
.hero-copy h2 { margin:0; font-size:48px; line-height:1; letter-spacing:-.045em; }
.runtime { margin:12px 0 0; color:#8992a2; font-size:14px; }
.play-button { margin-top:27px; min-width:178px; height:49px; padding:0 20px; border:0; border-radius:13px; display:inline-flex; align-items:center; justify-content:center; gap:9px; background:#8b70ff; color:white; font-weight:800; cursor:pointer; box-shadow:0 12px 30px rgba(111,83,255,.28); transition:transform .15s, filter .15s; }
.play-button:hover:not(:disabled) { transform:translateY(-1px); filter:brightness(1.08); }
.play-button:disabled { cursor:wait; opacity:.8; }
.hero-orb { position:absolute; width:360px; height:360px; right:-100px; top:-90px; border-radius:50%; background:radial-gradient(circle,rgba(137,111,255,.35),rgba(96,68,210,.05) 62%,transparent 70%); filter:blur(4px); }
.panel { border:1px solid rgba(255,255,255,.08); border-radius:18px; padding:21px; background:rgba(18,22,31,.78); box-shadow:0 15px 40px rgba(0,0,0,.12); }
.panel-title { display:flex; justify-content:space-between; align-items:center; margin-bottom:17px; font-size:10px; font-weight:800; letter-spacing:.14em; color:#727b8b; }
.panel-title a { color:#9d8cff; text-decoration:none; letter-spacing:0; font-size:11px; }
.instance-row { display:flex; align-items:center; gap:13px; }
.instance-icon { width:48px; height:48px; border-radius:13px; display:grid; place-items:center; background:linear-gradient(145deg,#273a2c,#17251c); color:#8bd6a3; }
.instance-info strong { display:block; font-size:14px; }.instance-info span { display:block; margin-top:5px; color:#717b8b; font-size:11px; }
.stats { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:18px; padding-top:15px; border-top:1px solid rgba(255,255,255,.07); }.stats span { display:block; color:#687282; font-size:9px; letter-spacing:.1em; }.stats strong { display:block; margin-top:4px; font-size:12px; }.online { color:#62d99a; }
.quick-panel { padding-bottom:10px; }.action { display:flex; align-items:center; gap:12px; min-height:48px; padding:0 10px; color:#d7dbe3; text-decoration:none; border-radius:11px; font-size:12px; }.action:hover { background:rgba(255,255,255,.05); }.action .arrow { margin-left:auto; color:#5e6878; }.action > .v-icon:first-child { color:#9a89ff; }
.dashboard-footer { max-width:1160px; display:flex; justify-content:space-between; margin-top:20px; color:#596273; font-size:10px; }.dashboard-footer i { display:inline-block; width:6px; height:6px; margin-right:6px; border-radius:50%; background:#55d993; box-shadow:0 0 9px rgba(85,217,147,.7); }
@media (max-width:900px) { .sc-dashboard{padding:30px 24px}.dashboard-grid{grid-template-columns:1fr}.hero-card{grid-row:auto;min-height:330px}.quick-panel{display:none} }
</style>
