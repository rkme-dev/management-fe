import { shallowRef } from '@vue/composition-api'

export function customerTypes() {
  const types = [
    'Distributor',
    'Regular',
    'Regular - Kiosk',
    'Regular - BWS',
    'Regular - HORECA',
    'Regular - MiniGrocery',
    'Regular - Grocery',
    'Regular - Store'
  ]

  return shallowRef(types)
}