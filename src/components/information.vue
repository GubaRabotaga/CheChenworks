<template>
  <div class="card" tabindex="0">
    <span class="card__infoicon">
      <i class="fa fa-info"></i>
    </span>
    <h1 class="card__title">This is a title</h1>
    <p class="card__description">
      Lorem ipsum dolor sit amet and this is all the lorem ipsum text I remember
    </p>

    <p class="card__credits">
      Thanks
      <a
        class="card__reference"
        href="https://www.youtube.com/channel/UCVyRiMvfUNMA1UPlDPzG5Ow"
        >Gary Simon</a
      >
      for the inspiration
    </p>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
@import "@/assets/style.scss";
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  display: grid;

  place-content: center;
  align-items: center;

  font-family: "nunito", sans-serif;
  background-color: #0099ff;
}
.card {
  position: relative;

  padding: 42px 32px;

  clip-path: circle(5% at 95% 11%);
  transition: all ease-in-out 0.3s;
  background-color: #ffffff;

  &__infoicon {
    position: absolute;

    top: 10px;
    right: 28px;

    font-size: 1.4em;
    color: #000000;
    transition: ease-out 0.3s;
  }
  &__title {
    margin: 0;

    font-size: 3em;
    line-height: 1.8;
  }
  &__description {
    margin: 0;

    font-size: 1.1em;
    line-height: 1.6;
  }
  &__credits {
    margin: 0;
    padding: 4px 0;

    font-size: 1.1em;
  }
  &__reference {
    display: inline-block;

    border-bottom: 1px solid transparent;
    color: #0099ff;
    text-decoration: none;
    transition: ease-in 0.3s;
    &:hover {
      border-bottom-color: #0099ff;
    }
  }

  &:hover,
  &:focus {
    clip-path: circle(75%);
    border-radius: 20px;
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.12),
      0px 3px 18px rgba(0, 0, 0, 0.08);
    background: #ffffff;

    outline: none;
    .card__infoicon {
      opacity: 0;
    }
  }
  &:focus {
    box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.12),
      0px 3px 18px rgba(0, 0, 0, 0.08), 0px 0px 0px 4px rgba(0, 0, 0, 0.2);
  }
}
</style>
