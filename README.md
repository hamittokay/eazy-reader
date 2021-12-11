# eazy-reader

<div style="text-align: center">
  <img width="64" height="auto" src="./docs/icon.png"/>
</div>

A tiny little widget that improves your online reading experience.

Feel free to add this into your blog or docs site so your users can focus on what
they are reading.

# Installation

```js
<script src="eazy-reader.js"></script>
<script>
  new EazyReader();
</script>
```

# Demo

The magic starts happening after the user clicks on the icon on the right bottom of your page.

<div style="text-align: center">
  <img src="./docs/demo.png" height="auto"/>
</div>

## Then the focus mode is activated.

<div style="text-align: center">
  <img src="./docs/demo-2.png" height="auto"/>
</div>

### Focus mode can be disabled by pressing the `ESC` key.

# Options

```js
new EazyReader({
  /*
    Controls the backdrop blur

    @type {Boolean}
    default: true
  */
  blur: true,

  /*
    Controls the intensity of backdrop blur
    
    @type {Number}
    default: 5
  */
  blurIntensity: 5,

  /*
    The height of the background filter

    @type {Number}
    default: 150
  */
  lensHeight: 150,

  /*
    The opacity of the background filter.

    @type {Number}
    default: 0.8
  */
  lensOpacity: 0.8,
});
```
