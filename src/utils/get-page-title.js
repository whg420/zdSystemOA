import defaultSettings from '@/settings'

const title = defaultSettings.title || '卓达物业内部管理系统zd-system-admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
