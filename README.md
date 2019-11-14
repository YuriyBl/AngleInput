# AngleInput
Simple angle input, initialized by one code line.

You can hold *Shift* button to choose angle with accurancy of *15deg*

## How to use

1. Load library:
```
  <script src="yourProjectPath/AngleInput.js"></script>
```

2. Initialize input element:
```
  AngleInput('.angleInput', {size: '50px', color: 'whitesmoke'}, function(deg){
    document.querySelector('body').style.background = "linear-gradient("+deg+"deg, #C7EDED, #F0EC57)";
    document.querySelector('.result').innerHTML = deg+'deg';
  });
```
