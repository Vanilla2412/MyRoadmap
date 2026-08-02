<script setup>
import { useLanguage } from '../composables/useLanguage'

const { currentLang, setLang } = useLanguage()
</script>

<template>
  <div class="header-lang-toggle">
    <button
      type="button"
      :class="['lang-pill', { active: currentLang === 'ja' }]"
      title="日本語に切り替え"
      @click="setLang('ja')"
    >
      🇯🇵 JA
    </button>
    <button
      type="button"
      :class="['lang-pill', { active: currentLang === 'en' }]"
      title="Switch to English"
      @click="setLang('en')"
    >
      🇬🇧 EN
    </button>
  </div>
</template>

<style scoped>
.header-lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-divider, rgba(82, 82, 89, 0.2));
  border-radius: 9999px;
  padding: 2px;
  margin-left: 12px;
  margin-right: 8px;
  vertical-align: middle;
  height: 28px;
}

.lang-pill {
  border: none;
  background: transparent;
  color: var(--vp-c-text-2, #888);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
  cursor: pointer;
  line-height: 1.2;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 4px;
}

.lang-pill:hover {
  color: var(--vp-c-text-1, #111);
}

.lang-pill.active {
  background: var(--vp-c-brand-1, #3eaf7c);
  color: #ffffff;
  box-shadow: 0 1px 4px rgba(62, 175, 124, 0.3);
}
</style>
