﻿jQuery.labelize
==============


This plugin allows to turn an input element into a non-input one (e.g. div, span), and turn it back into input on click.  

Usage:
------
  
```
<input type="text" id="textInput" value="This is an example of labelize" />

<script type="text/javascript">
    $(function () {
        $("input").labelize({"element":"div", "class":"labelized",  "event":"dblclick"});
    });

```
Upon double-clicking on span text it will turn back into original input field.
Blur or hit enter to return back to span and save changes, or hit esc to cancel changes.

All parameters are optional. Shown are default values.  
	element: type of an element that will be created to replace input field.  
	class: a class name applied to created element.  
	event: one of the jQuery's event names that will trigger the swap. dblclick and click make most sense.  


To see it in action go to the demo page: http://etcoding.com/page/RightClickMenu-jQuery-plugin.aspx 