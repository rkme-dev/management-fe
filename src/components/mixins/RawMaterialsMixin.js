export default {
  computed: {
    rawMaterialsType() {
      return [
        {
          value: 'preform',
          label: 'Preform',
        },
        {
          value: 'bottle_cap',
          label: 'Bottle Cap',
        },
        {
          value: 'bottle_label',
          label: 'Bottle Label',
        },
        {
          value: 'blown_bottle',
          label: 'Blown Bottle',
        },
      ]
    }
  },
}