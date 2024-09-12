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
  data(){
    return {
      email: 'some-email@gmail.com',
      phone: '(XXX) XXX-XXXX',
      streetAddr: '123 Main Street',
      city: 'City',
      stateCode: 'State Code',
      postalCode: 'Zip/Postal Code'
    }
  },
  mounted() {
    const composerStore = useComposerStore();
    composerStore.composerAddress(this.composerId).then((data) => {
      this.email = data.email;
      this.phone = data.phone;
      this.streetAddr = data.address.streetAddr;
      this.city = data.address.city;
      this.stateCode = data.address.stateCode;
      this.postalCode = data.address.postalcode;
    });
  },
})
</script>

<template>
  <div class="contact-details">
    <h4>Contact Info</h4>

    <div>
      <div><span class="item-label">Phone Number</span>: {{phone}}</div>
      <div><span class="item-label">Email</span>: {{email}}</div>

      <h5 class="mt-3">Address</h5>

      <div>
        {{streetAddr}}<br />
        {{city}}, {{stateCode}}, {{postalCode}}
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
