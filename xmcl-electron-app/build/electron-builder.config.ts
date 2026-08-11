/* eslint-disable no-template-curly-in-string */
import { config as dotenv } from 'dotenv'
import type { Configuration } from 'electron-builder'

dotenv()

export const config = {
  productName: 'SC Launcher',
  appId: 'com.sc.launcher',
  directories: {
    output: 'build/output',
    buildResources: 'build',
    app: '.',
  },
  protocols: {
    name: 'SC Launcher',
    schemes: ['xmcl', 'sc-launcher'],
  },
  publish: [{
    provider: 'github',
    owner: 'viperxc24odmaker',
    repo: 'SMCLauncher',
  }],
  files: [{
    from: 'dist',
    to: '.',
    filter: ['**/*.js', '**/*.ico', '**/*.png', '**/*.webp', '**/*.svg', '*.node', '*.dll', '**/*.html', '**/*.css', '**/*.woff2', '**/*.wasm'],
  }, {
    from: '.',
    to: '.',
    filter: 'package.json',
  }],
  extraResources: [{
    from: 'main/agent-documents',
    to: 'agent-documents',
    filter: ['**/*.md'],
  }],
  artifactName: 'SC-Launcher-${version}-${platform}-${arch}.${ext}',
  dmg: {
    artifactName: 'SC-Launcher-${version}-${arch}.${ext}',
    contents: [
      { x: 410, y: 150, type: 'link', path: '/Applications' },
      { x: 130, y: 150, type: 'file' },
    ],
  },
  mac: {
    icon: 'icons/dark.icns',
    darkModeSupport: true,
    target: [{ target: 'dmg', arch: ['arm64', 'x64'] }],
    extendInfo: {
      NSMicrophoneUsageDescription: 'A Minecraft mod wants to access your microphone.',
      NSCameraUsageDescription: 'Please give us access to your camera',
      'com.apple.security.device.audio-input': true,
      'com.apple.security.device.camera': true,
    },
  },
  win: {
    certificateFile: undefined as string | undefined,
    publisherName: 'SC Launcher',
    icon: 'icons/dark.ico',
    electronLanguages: ['en-US'],
    target: [
      { target: 'nsis', arch: ['x64'] },
      { target: 'zip', arch: ['x64'] },
    ],
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'SC Launcher',
    artifactName: 'SC-Launcher-${version}-Setup.${ext}',
  },
  appx: {
    displayName: 'SC Launcher',
    applicationId: 'SCLauncher',
    identityName: 'SCLauncher',
    backgroundColor: 'transparent',
    publisher: process.env.PUBLISHER,
    publisherDisplayName: 'SC Launcher',
    setBuildNumber: true,
  },
  linux: {
    executableName: 'sc-launcher',
    electronLanguages: ['en-US'],
    desktop: {
      MimeType: 'x-scheme-handler/xmcl;x-scheme-handler/sc-launcher',
      StartupWMClass: 'sc-launcher',
    },
    category: 'Game',
    icon: 'icons/dark.icns',
    artifactName: 'SC-Launcher-${version}-${arch}.${ext}',
    target: [
      { target: 'deb', arch: ['x64', 'arm64'] },
      { target: 'rpm', arch: ['x64', 'arm64'] },
      { target: 'AppImage', arch: ['x64', 'arm64'] },
      { target: 'tar.xz', arch: ['x64', 'arm64'] },
      { target: 'pacman', arch: ['x64', 'arm64'] },
    ],
  },
  snap: { publish: ['github'] },
} satisfies Configuration
