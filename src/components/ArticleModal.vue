<template>
  <transition name="modal" appear>
    <section class="modal">
      <div class="modal__window">
        <slot class="modal__title">
          <slot name="title" ></slot>
        </slot>
        </div>
        <div class="modal__content">
          <slot name="content" ></slot>
        </div>
        <div class="modal__footer">
          <slot name="footer" ></slot>
        </div>
      <div class="modal__overlay" @click.self="$emit('close')"></div>
    </section>
  </transition>
</template>

<script>
export default {

}
</script>

<style>
.black-bg {
    width: 100%; height:100%;
    background: rgba(0,0,0,0.5);
    position: fixed; padding: 20px;
  }
  .white-bg {
    width: 100%; background: white;
    border-radius: 8px;
    padding: 20px;
  } 
</style>