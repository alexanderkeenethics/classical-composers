<script>
import {defineComponent} from 'vue'
import { useComposerStore } from '@/stores/composers';

export default defineComponent({
  name: "ContactData",
  props:{
    composerId: {
      type: Number,
      required: true
    }
  },
  state:{
    email: '',
    phone: '',
    streetAddr: '',
    city: '',
    stateCode: '',
    postalCode: ''
  },
  mounted() {
    useComposerStore.composerAddress(this.composerId).then((data) => {
      Object.keys(this.state).forEach(key=>{
        this.state[key] = data[key]
      });
    });
  },
})
</script>

<template>
  <div class="contact-details">
    <h4>Contact Info</h4>

    <div>
      <div><span class="item-label">Phone Number</span>: (XXX) XXX-XXXX</div>
      <div><span class="item-label">Email</span>: some-email@gmail.com</div>

      <h5 class="mt-3">Address</h5>

      <div>
        123 Main Street<br />
        City, State Code, Zip/Postal Code
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
