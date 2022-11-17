import { shallowRef } from '@vue/composition-api'

// eslint-disable-next-line import/prefer-default-export
export const salesStatusColors = () => {
  const statusColors = {
    Posted: 'success',
    'For Review': 'error',
  }

  return shallowRef(statusColors)
}
