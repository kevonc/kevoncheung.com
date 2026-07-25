export function normalizeTopicSlug(topic = '') {
  return topic.toLowerCase().trim().replace(/\s+/g, '-')
}
