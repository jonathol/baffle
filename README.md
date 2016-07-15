# Baffle

![image of baffle][baffle]
[baffle]: https://res.cloudinary.com/jonathol/image/upload/v1468624429/baffle_xen33v.png

[Live link][project]
[project]: https://jonathol.github.io/baffle/

Baffle is a web game inspired by Hasbro's Boggle. It is made with HTML, CSS, and JS.

## Instructions
You have 3 minutes to find as many words as you can according to the following rules:

  1. Letters must be adjacent (horizontally, vertically, or diagonally)
  2. Words must contain at least three letters
  3. No letter cube may be used more than once within a single word

To make a word, simply click on a letter and drag to the next letter.

## Features

### 3D buttons

To create a button that looks 3D, I gave it a box shadow.

![image of button][button]
[button]: https://res.cloudinary.com/jonathol/image/upload/v1468556023/button_e0v2zu.png

When a I hover over a button, I remove the shadow and shrink the size of the element while increasing the border by 1px.

![image of button hover][button_hover]
[button_hover]: https://res.cloudinary.com/jonathol/image/upload/v1468556023/button_hover_khymny.png

```
.dice {
  width: 80px;
  height: 80px;
  margin: 10px;
  border-radius: 40px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a49999;
  font-size: 30px;
  box-shadow: 12px 8px 10px black;
}

.dice:hover {
  cursor: pointer;
  width: 78px;
  height: 78px;
  margin: 10px;
  border-radius: 39px 39px;
  border: 1px solid rgba(56,56,56,.6);
  box-shadow: none;
}
```

### Modal

To create a modal, I had to split it up into two parts, the overlay and the display

Overlay:
```
.instruction-overlay {
  position: fixed;
  z-index:1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.7);
  visibility:visible;
}
```
Display:
```
.score-screen {
  width: 350px;
  height: 350px;
  background: #606060;
  color: ghostwhite;
  position: fixed;
  z-index:2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 5%;
  visibility:hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
```

## Future Featrues

- multiplayer
- high score
- different languages
