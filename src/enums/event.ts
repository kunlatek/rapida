export enum EventEnum {
    /**
     * Window events
     */
    OnAfterPrint = 'onafterprint',
    OnBeforePrint = 'onbeforeprint',
    OnBeforeUnload = 'onbeforeunload',
    OnError = 'onerror',
    OnHashChange = 'onhashchange',
    OnLoad = 'onload',
    OnMessage = 'onmessage',
    OnOffline = 'onoffline',
    OnOnline = 'ononline',
    OnPageHide = 'onpagehide',
    OnPageShow = 'onpageshow',
    OnPopState = 'onpopstate',
    OnResize = 'onresize',
    OnStorage = 'onstorage',
    OnUnload = 'onunload',
    /**
     * Form events
     */
    OnBlur = 'onblur', // Fires the moment that the element loses focus
    OnChange = 'onchange', // Fires the moment when the value of the element is changed
    OnContextMenu = 'oncontextmenu', // Script to be run when a context menu is triggered
    OnFocus = 'onfocus', // Fires the moment when the element gets focus
    OnInput = 'oninput', // Script to be run when an element gets user input
    OnInvalid = 'oninvalid', // Script to be run when an element is invalid
    onReset = 'onreset', // Fires when the Reset button in a form is clicked
    OnSearch = 'onsearch', // Fires when the user writes something in a search field (for <input="search">)
    OnSelect = 'onselect', // Fires after some text has been selected in an element
    OnSubmit = 'onsubmit', // Fires when a form is submitted
    /**
     * Keyboard events
     */
    OnKeyDown = 'onkeydown',
    OnKeyPress = 'onkeypress',
    OnKeyUp = 'onkeyup',
    /**
     * Mouse events
     */
    OnClick = 'onclick',
    OnDoubleClick = 'ondblclick',
    OnMouseDown = 'onmousedown',
    OnMouseMove = 'onmousemove',
    OnMouseOut = 'onmouseout',
    OnMouseOver = 'onmouseover',
    OnMouseUp = 'onmouseup',
    OnWheel = 'onwheel',
    /**
     * Drag events
     */
    OnDrag = 'ondrag',
    OnDragEnd = 'ondragend',
    OnDragEnter = 'ondragenter',
    OnDragLeave = 'ondragleave',
    OnDragOver = 'ondragover',
    OnDragStart = 'ondragstart',
    OnDrop = 'ondrop',
    OnScroll = 'onscroll',
    /**
     * Clipoard events
     */
    OnCopy = 'oncopy',
    OnCut = 'oncut',
    OnPaste = 'onpaste',
    /**
     * Media events
     */
    // TODO
    /**
     * Micellaneous events
     */
    OnToggle = 'ontoggle',
}