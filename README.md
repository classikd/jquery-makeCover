# jquery.makeCover

Small jQuery plugin which simulates background-size:cover with img tag

## Usage

#### 1: Required files
Link the jQuery library and the makeCover file :
```html
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="/js/jquery.makeCover.js"></script>
```

#### 2: HTML markup
Add the class to your image or in a wrapper div.
Note: The parent div of .cover must have overflow:hidden and a position:relative or absolute.
```html
<div style="width:300px; height:300px; overflow:hidden; position:relative">
  <div class="cover"><img src="image.jpg" alt="" /></div>
</div>
```

#### 3: Call the plugin
Call the plugin with the class defined in the html markup :
```html
<script>
$(document).ready(function(){
  $('.cover').makeCover();
});
</script>
```

## Options

Here's a list of available settings.


Attribute			| Type				| Default		| Description
---						| ---					| ---				| ---
`positionHorizontal`	| *String*		| `center`		| Horizontal position ('left', 'center' or 'right')
`positionVertical`	| *String*		| `middle`		| Vertical position ('top', 'middle' or 'bottom')
`beforeResize`	| *Function*		| `Empty function`		| Fires before the resize
`afterResize`	| *Function*		| `Empty function`		| Fires after the resize

##### Example :

```javascript
$('.foo').makeCover({
  'positionHorizontal': 'right',
  'afterResize': function(){ alert('Bonjour'); }
});
```

## License

Copyright (C) 2016  Mehdi Ittobane

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
