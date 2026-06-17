import { resultTiers } from './data'

export function getTier(score) {
  return resultTiers.find((t) => score >= t.range[0] && score <= t.range[1])
}
