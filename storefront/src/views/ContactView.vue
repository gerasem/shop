<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import Header from '@/components/content/Header.vue'
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue'
import Input from '@/components/form/Input.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import { useToastStore } from '@/stores/ToastStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import Button from '@/components/form/Button.vue'
import Textarea from '@/components/form/Textarea.vue'

const { t } = useI18n()
const toastStore = useToastStore()
const loaderStore = useLoaderStore()

const userData = reactive<{
  name: string
  email: string
  comment: string
}>({
  name: '',
  email: '',
  comment: '',
})

const dataProtectionAccepted = ref<boolean>(false)

const formRef = ref<HTMLFormElement | null>(null)
const isFormValid = ref<boolean>(true)
const formSent = ref<boolean>(false)

const handleSubmit = async () => {
  const form = formRef.value
  if (form?.checkValidity()) {
    console.log('Form is valid')
    isFormValid.value = true
    formSent.value = true
    console.log('Contact form sent successful')
  } else {
    form?.reportValidity()
    isFormValid.value = false
    toastStore.addError(`Please fill all required fields`)
  }
}

useSeoMeta({
  title: 'Contact',
})
</script>

<template>
  <CategoryTitleNarrow />

  <main class="container is-fluid">
    <Header :level="1">Contact</Header>

    <div class="columns">
      <div class="column">
        <form
          ref="formRef"
          @submit.prevent="handleSubmit()"
          novalidate
          :class="{ 'is-invalid': !isFormValid }"
          class="block"
        >
          <div class="columns">
            <div class="column">
              <Input
                v-model:input="userData.name"
                :label="t('Name')"
                name="name"
                required
              />
            </div>

            <div class="column">
              <Input
                v-model:input="userData.email"
                :label="t('Email')"
                name="email"
                required
                type="email"
              />
            </div>
          </div>

          <Textarea
            v-model:textarea="userData.comment"
            :placeholder="`${t('Your message')} *`"
            name="comment"
            required
          ></Textarea>

          <Checkbox
            class="mt-3"
            v-model="dataProtectionAccepted"
            label="Agree to Data Protection"
            name="data-protection"
            required
          />

          <Button
            type="submit"
            icon="EnvelopeArrowUp"
            class="mt-4 is-fullwidth"
            :class="{
              'is-loading': loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.SEND_CONTACT_FORM),
              'is-light': !isFormValid,
              'is-primary': isFormValid,
            }"
            >{{ t('Send') }}</Button
          >
        </form>
      </div>
      <div class="column"></div>
    </div>
  </main>
</template>

<style scoped lang="scss">
form {
  --invalid-border-color: inherit;
  --invalid-placeholder-color: rgb(214, 217, 224);

  &.is-invalid {
    --invalid-border-color: #ff3860;
    --invalid-placeholder-color: #ff3860;
  }
}
</style>
