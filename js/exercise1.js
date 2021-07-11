// tick tick

//class
//data-element-name
//data-experimental
//data-meta
//data-selfclosing
//data-inline
//data-block
//link

document.addEventListener('DOMContentLoaded', function() {
    // lay gia tri cua cac the id
    var $searchInput = document.getElementById('finder-input');
    var $finderList = document.getElementById('finder-list');
    var $finderItems = document.querySelectorAll('.finder-item');
    var $finderCheckboxes = document.querySelectorAll('#finder-checkboxes input');
    var lights = {
        experimental: true,
        meta: true,
        selfClosing: true,
        inline: true,
        block: true,
    }
    var isFocused = false;
    var isSearching = false;
    var isModaling = false;
    var currentMatch = -1;
    var matches = initializeMatches($finderItems);

    if ($searchInput) {
        $searchInput.addEventListener('focus', function(event) {
            isFocused = true;
            isSearching = true;
        });

        $searchInput.addEventListener('blur', function(event) {
            isFocused = false;
            if (this.value === '') {
                globalReset();
            }
        });

        $searchInput.addEventListener('keyup', function(event) {
            var query = this.value.toLowerCase();
            isFocused = (this === document.activeElement);

            if (isFocused) {
                isSearching = true;

                if (query.length > 0) {
                    matches = [];
                    currentMatch = -1;
                    $finderList.classList.add('is-searching');
                    Array.prototype.forEach.call($finderItems, function($el, index) {
                        var elementName = $el.dataset.elementName;
                        var isMatch = highlightQuery($el, elementName, query);

                        if (isMatch && !$el.classList.contains('is-hidden')) {
                            matches.push({
                                DOMIndex: index,
                                elementName: elementName,
                            });
                        }
                    });
                } else {
                    $finderList.classList.remove('is-searching');
                    Array.prototype.forEach.call($finderItems, function($el) {
                        var $elName = $el.querySelector('.item-name');
                        $elName.innerHTML = $el.dataset.elementName;
                    });
                }
            }
        });

        Array.prototype.forEach.call($finderCheckboxes, function($el) {
            $el.addEventListener('change', function(event) {
                lights[this.name] = this.checked;
                changeLights();
            });
        });

        window.addEventListener('click', function(event) {
            if (!isFocused) {
                isSearching = false;
                cleanMenu($finderItems, false, true);
            }
        });

        window.addEventListener('keydown', function(event) {
            var key = event.code || event.key || false;

            switch (key) {
                case 'Enter':
                    if (isSearching && currentMatch > -1) {
                        event.preventDefault();
                        var elementName = matches[currentMatch].elementName;
                        var $target = document.getElementById(elementName);

                        if ($target) {
                            $target.scrollIntoView();
                        } else {
                            window.location = window.location.origin + '/element/' + elementName;
                        }
                    }
                    break;
                case 'Escape':
                    if (isModaling) {
                        closeModal();
                    } else {
                        isSearching = false;
                        globalReset();
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    if (isSearching) {
                        event.preventDefault();
                        if (isFocused) {
                            $searchInput.blur();
                        }
                        var increment = (key === 'ArrowDown');
                        currentMatch = navigateMenu($finderItems, matches, currentMatch, increment);

                        if (currentMatch === -1) {
                            $searchInput.focus();
                        }
                        break;
                    }
            }
        });

        function checkLights() {
            Array.prototype.forEach.call($finderCheckboxes, function($el) {
                lights[this.name] = this.checked;
            });
        }

        function changeLights() {
            Array.prototype.forEach.call($finderItems, function($el, index) {
                var hide = false;

                Object.keys(lights).forEach(function(key) {
                    // Check if we hide "experimental"
                    if (!lights[key]) {
                        hide = (hide) || ($el.dataset[key] == 'true');
                    }
                });

                if (hide) {
                    $el.classList.add('is-hidden');
                } else {
                    $el.classList.remove('is-hidden');
                }
            });
        }

        function globalReset() {
            isFocused = false;
            $searchInput.value = '';
            $searchInput.blur();
            currentMatch = -1;
            matches = initializeMatches($finderItems);
            $finderList.classList.remove('is-searching');
            cleanMenu($finderItems, true, true);
        }

        checkLights();
        changeLights();
    }

});
// load2s

window.carbonLoaded = false;

window.helloCarbon = function() {
    window.carbonLoaded = true;
}

document.addEventListener('DOMContentLoaded', function() {
    // load 2s
    var $hello = document.getElementById('hello');
    var $huggingFace = document.getElementById('huggingFace');
    var $carbon = document.getElementById('carbon');
    var $placeholder = document.getElementById('placeholder');

    setTimeout(function() {
        if (window.carbonLoaded) {
            $hello.style.minHeight = '218px';
            $huggingFace.style.display = 'none';
            $carbon.style.display = 'block';
        } else {
            $hello.style.minHeight = '0';
            $huggingFace.style.display = 'block';
            $carbon.style.display = 'none';
        }
        $placeholder.style.display = 'none';
    }, 2000);
});