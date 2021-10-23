<template>
  <div class="logo-eddie-lin">
    <div class="eddie">EDDIE</div>
    <div class="lin">LIN</div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap");
$back: white;
.logo-eddie-lin {
  background: $fore;
  border: 5px solid $fore;
  font-weight: bolder;
  font-family: "Oswald", sans-serif;

  .eddie {
    display: inline-block;
    background: $back;
    color: $fore;
    padding: 0 2px;
    transition: all 0.3s ease-in-out;
  }
  .lin {
    display: inline-block;
    color: $back;
    padding: 0 2px;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    .eddie {
      background: $fore;
      color: $back;
    }
    .lin {
      background: $back;
      color: $fore;
    }
  }
}
</style>
