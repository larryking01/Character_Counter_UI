// selecting the html elements of interest.
let textArea = document.querySelector(".text-area");
let characterCountText = document.querySelector(".count-number-text");
let wordCountText = document.querySelector(".word-number-text");
let sentenceCountText = document.querySelector(".sentence-number-text");
let approxReadingTimeText = document.querySelector(".approx-reading-time-text");
let excludeSpacesCheckbox = document.querySelector(".checkbox");
let characterLimitInput = document.querySelector(".character-limit-input");
let characterLimitCheckbox = document.querySelector(".character-limit-checkbox");
let errorText = document.querySelector(".error-text");
let letterDensityDiv = document.getElementById("letter-density-container")
let noDensityAvailableYetText = document.querySelector(".no-characters-found-text")
let toggleButton = document.querySelector(".theme-toggle-btn")
let themeIcon = document.querySelector(".theme-icon")
let siteLogo = document.querySelector(".site-logo")
let body = document.body;
let isDark;
// let darkMode;



// function to toggle light and dark theme
// isDark = body.classList.contains("light-theme")
function toggleTheme() {

    if( body.classList.contains('dark-theme')) {
        body.classList.replace("dark-theme", "light-theme")
        themeIcon.src = "../assets/images/icon-moon.svg"
        siteLogo.src = "../assets/images/logo-light-theme.svg"
    }
    else {
        body.classList.replace("light-theme", "dark-theme")
        themeIcon.src = "../assets/images/icon-sun.svg"
        siteLogo.src = "../assets/images/logo-dark-theme.svg"
    }


    // After switching the theme, rebuild the letter density view
    calculateLetterDensity()
}



// function to count the number of characters in the text area.
function countCharacters( ) {

    let totalCharacters;

    let enteredText = textArea.value;
    let enteredTextNoSpaces = textArea.value.trim()
                              .replace(/\s/g, '');

    totalCharacters = excludeSpacesCheckbox.checked ? 
                      enteredTextNoSpaces.length 
                      : enteredText.length

    let totalCharacterStringText = totalCharacters.toString()
    if( totalCharacterStringText.length < 2 ) {
        totalCharacterStringText = '0' + totalCharacterStringText
    }
    else {
        totalCharacterStringText = totalCharacterStringText
    }

    characterCountText.textContent = totalCharacterStringText
}



// function to calculate the number of words.
function countNumberOfWords( ) {
    let enteredText = textArea.value.trim();
    let enteredWords = enteredText.split(/\s+/).filter( word => word.length > 0 );

    let numberOfWords = enteredWords.length;
    let numberOfWordsStringText = numberOfWords.toString();

    if( numberOfWordsStringText.length < 2) {
        numberOfWordsStringText = '0' + numberOfWordsStringText
    }
    else {
        numberOfWordsStringText = numberOfWordsStringText
    }

    wordCountText.textContent = numberOfWordsStringText

}




// function to calculate the number of sentences.
function countNumberOfSentences() {
    let enteredText = textArea.value.trim()

    let sentences = enteredText.split(/(?<=[.!?])/)
                    .map( sentence => sentence.trim())
                    .filter( sentence => sentence.length > 0 );
    
    let numberOfSentences = sentences.length;
    let numberOfSentencesStringText = numberOfSentences.toString()

    if( numberOfSentencesStringText.length < 2 ) {
        numberOfSentencesStringText = "0" + numberOfSentencesStringText
    }
    else {
        numberOfSentencesStringText = numberOfSentencesStringText
    }

    sentenceCountText.textContent = numberOfSentencesStringText

}



// function to calculate the approx. reading time.
function calculateApproxReadingTime() {
    let avgWordsPerMin = 200;
    let enteredText = textArea.value.trim();
    let enteredWords = enteredText.split(/\s+/).filter( word => word.length > 0 );
    let numberOfWords = enteredWords.length;
    
    let approxReadingTime = Math.ceil( numberOfWords / avgWordsPerMin );
    approxReadingTimeText.textContent = `Approx. reading time: ${ approxReadingTime } min(s)`

}



// function to toggle character limit input visible or hidden.
function toggleCharacterLimitInputVisible() {
    characterLimitInput.classList.toggle("character-limit-input");
}



function checkCharacterLimit() {
    let characterLimit = Math.round(characterLimitInput.value);
    let enteredText = textArea.value;
    let enteredTextNoSpaces = textArea.value.trim().replace(/\s/g, '');
    let totalCharacters;
    let eightyPercent;


    totalCharacters = excludeSpacesCheckbox.checked ? enteredTextNoSpaces.length : enteredText.length
    eightyPercent = Math.floor( 0.8 * characterLimit );

    if( totalCharacters < eightyPercent || totalCharacters === eightyPercent ) {
        textArea.classList.remove("limit-exceeded");
        errorText.classList.remove("show-error-text");
        errorText.classList.add("error-text");
    }
    else if( totalCharacters > eightyPercent && totalCharacters < characterLimit ) {
        textArea.classList.remove("limit-exceeded");
        errorText.classList.remove("error-text");
        errorText.classList.add("show-error-text");
        errorText.innerHTML = `
                                <span>
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 1.34375C3.71875 1.34375 1.09375 3.99609 1.09375 7.25C1.09375 10.5312 3.71875 13.1562 7 13.1562C10.2539 13.1562 12.9062 10.5312 12.9062 7.25C12.9062 3.99609 10.2266 1.34375 7 1.34375ZM7 0.46875C10.7188 0.46875 13.7812 3.53125 13.7812 7.25C13.7812 10.9961 10.7188 14.0312 7 14.0312C3.25391 14.0312 0.21875 10.9961 0.21875 7.25C0.21875 3.53125 3.25391 0.46875 7 0.46875ZM6.01562 9.875H6.34375V6.59375H6.01562C5.82422 6.59375 5.6875 6.45703 5.6875 6.26562V6.04688C5.6875 5.88281 5.82422 5.71875 6.01562 5.71875H7.32812C7.49219 5.71875 7.65625 5.88281 7.65625 6.04688V9.875H7.98438C8.14844 9.875 8.3125 10.0391 8.3125 10.2031V10.4219C8.3125 10.6133 8.14844 10.75 7.98438 10.75H6.01562C5.82422 10.75 5.6875 10.6133 5.6875 10.4219V10.2031C5.6875 10.0391 5.82422 9.875 6.01562 9.875ZM7 3.3125C7.46484 3.3125 7.875 3.72266 7.875 4.1875C7.875 4.67969 7.46484 5.0625 7 5.0625C6.50781 5.0625 6.125 4.67969 6.125 4.1875C6.125 3.72266 6.50781 3.3125 7 3.3125Z" fill="#FE8159"/>
                                    </svg>
                                    <span class="specific-error-text">You are approaching the maximum character limit</span>
                                </span>
                                `;
    }
    else if( totalCharacters === characterLimit ) {
        textArea.classList.remove("limit-exceeded");
        errorText.innerHTML = `
                                <span>
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 1.34375C3.71875 1.34375 1.09375 3.99609 1.09375 7.25C1.09375 10.5312 3.71875 13.1562 7 13.1562C10.2539 13.1562 12.9062 10.5312 12.9062 7.25C12.9062 3.99609 10.2266 1.34375 7 1.34375ZM7 0.46875C10.7188 0.46875 13.7812 3.53125 13.7812 7.25C13.7812 10.9961 10.7188 14.0312 7 14.0312C3.25391 14.0312 0.21875 10.9961 0.21875 7.25C0.21875 3.53125 3.25391 0.46875 7 0.46875ZM6.01562 9.875H6.34375V6.59375H6.01562C5.82422 6.59375 5.6875 6.45703 5.6875 6.26562V6.04688C5.6875 5.88281 5.82422 5.71875 6.01562 5.71875H7.32812C7.49219 5.71875 7.65625 5.88281 7.65625 6.04688V9.875H7.98438C8.14844 9.875 8.3125 10.0391 8.3125 10.2031V10.4219C8.3125 10.6133 8.14844 10.75 7.98438 10.75H6.01562C5.82422 10.75 5.6875 10.6133 5.6875 10.4219V10.2031C5.6875 10.0391 5.82422 9.875 6.01562 9.875ZM7 3.3125C7.46484 3.3125 7.875 3.72266 7.875 4.1875C7.875 4.67969 7.46484 5.0625 7 5.0625C6.50781 5.0625 6.125 4.67969 6.125 4.1875C6.125 3.72266 6.50781 3.3125 7 3.3125Z" fill="#FE8159"/>
                                    </svg>
                                    <span class="specific-error-text">You have hit the maximum limit of ${ characterLimit } characters</span>
                                </span>
                              `;    

    }
    else {
        if(!isNaN( characterLimit )) {
            textArea.classList.add("limit-exceeded");
            errorText.innerHTML = `
                                    <span>
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 1.34375C3.71875 1.34375 1.09375 3.99609 1.09375 7.25C1.09375 10.5312 3.71875 13.1562 7 13.1562C10.2539 13.1562 12.9062 10.5312 12.9062 7.25C12.9062 3.99609 10.2266 1.34375 7 1.34375ZM7 0.46875C10.7188 0.46875 13.7812 3.53125 13.7812 7.25C13.7812 10.9961 10.7188 14.0312 7 14.0312C3.25391 14.0312 0.21875 10.9961 0.21875 7.25C0.21875 3.53125 3.25391 0.46875 7 0.46875ZM6.01562 9.875H6.34375V6.59375H6.01562C5.82422 6.59375 5.6875 6.45703 5.6875 6.26562V6.04688C5.6875 5.88281 5.82422 5.71875 6.01562 5.71875H7.32812C7.49219 5.71875 7.65625 5.88281 7.65625 6.04688V9.875H7.98438C8.14844 9.875 8.3125 10.0391 8.3125 10.2031V10.4219C8.3125 10.6133 8.14844 10.75 7.98438 10.75H6.01562C5.82422 10.75 5.6875 10.6133 5.6875 10.4219V10.2031C5.6875 10.0391 5.82422 9.875 6.01562 9.875ZM7 3.3125C7.46484 3.3125 7.875 3.72266 7.875 4.1875C7.875 4.67969 7.46484 5.0625 7 5.0625C6.50781 5.0625 6.125 4.67969 6.125 4.1875C6.125 3.72266 6.50781 3.3125 7 3.3125Z" fill="#FE8159"/>
                                        </svg>
                                        <span class="specific-error-text">Limit reached! Your text exceeds ${ characterLimit } characters.</span>
                                    </span>
                                `;    
            textArea.value = textArea.value.slice(0, characterLimit ) // trim to max
        }
        else {
            // do nothing
        }
    }

}



// function to calculate the letter densities
function calculateLetterDensity ( ) {
    let text = textArea.value.toUpperCase().replace(/[^A-Z]/g, ''); // keep only A-Z letters
    let totalLetters = text.length;

    const frequencyMap = {} // the frequency map object.

    // count occurrences of each letter
    for ( const letter of text ) {
        frequencyMap[letter] = ( frequencyMap[letter] || 0 ) + 1;
    }

    // console.log(`frequency map = ${ frequencyMap }`)

    letterDensityDiv.innerHTML = ""; // clearing existing bars.

    const letters = Object.keys( frequencyMap ).sort();
    const showLimit = 5;

    letters.forEach(( letter, index ) => {
        const count = frequencyMap[letter];
        const percentage = ((count / totalLetters ) * 100 ).toFixed( 1 );

        let bar = document.createElement('div')
        bar.className = "letter-density-display-div"

        let label = document.createElement("span")
        label.className = "letter-density-info-text"
        label.textContent = letter

        let barContainer = document.createElement("div")
        barContainer.className = "density-bar-parent-div"

        const progress = document.createElement("div")
        progress.className = "density-bar-child-div"
        progress.style.width = `${ percentage }%`
        progress.title = `${ percentage }%`

        const percentLabel = document.createElement("span")
        percentLabel.className = "letter-density-info-text"
        percentLabel.textContent = `${ count } (${ percentage }%)`

        barContainer.appendChild( progress )
        bar.appendChild( label )
        bar.appendChild( barContainer )
        bar.appendChild( percentLabel )

        // hide bars beyond the first 5 initially
        if( index >= showLimit ) {
            bar.style.display = "none";
            bar.classList.add("extra-bar");
        }

        letterDensityDiv.appendChild( bar )

    });

    // add show more or show less toggle if needed
    if( letters.length > showLimit ) {
        const toggleDiv = document.createElement("div")
        toggleDiv.className = "see-more-density-div"
        toggleDiv.innerHTML = body.classList.contains("light-theme") ?
                            `
                               <span>
                                    <span>See more</span>
                                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="#12131A"/>
                                    </svg>
                               </span>
                            `
                                :

                            `   <span>
                                    <span>See More</span>
                                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="#E4E4EF"/>
                                    </svg>
                                </span>
                            `


        let expanded = false

        toggleDiv.addEventListener("click", function () {
            expanded = !expanded

            const extraBars = document.querySelectorAll('.extra-bar');
            extraBars.forEach(bar => {
              bar.style.display = expanded ? 'flex' : 'none';
            });

            toggleDiv.innerHTML = expanded ?
                body.classList.contains("light-theme") ?
                    `
                    <span>
                    <span>See less</span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.25 0.65625L10.875 5.21875C11.0312 5.375 11.0312 5.625 10.875 5.75L10.25 6.375C10.125 6.53125 9.875 6.53125 9.71875 6.375L6 2.6875L2.25 6.375C2.09375 6.53125 1.875 6.53125 1.71875 6.375L1.09375 5.75C0.9375 5.625 0.9375 5.375 1.09375 5.21875L5.71875 0.65625C5.875 0.5 6.09375 0.5 6.25 0.65625Z" fill="#12131A"/>
                    </svg>
                    </span>
                    `
                    :
                    `
                    <span>
                    <span>See less</span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.25 0.65625L10.875 5.21875C11.0312 5.375 11.0312 5.625 10.875 5.75L10.25 6.375C10.125 6.53125 9.875 6.53125 9.71875 6.375L6 2.6875L2.25 6.375C2.09375 6.53125 1.875 6.53125 1.71875 6.375L1.09375 5.75C0.9375 5.625 0.9375 5.375 1.09375 5.21875L5.71875 0.65625C5.875 0.5 6.09375 0.5 6.25 0.65625Z" fill="#E4E4EF"/>
                    </svg>
                    </span>
                    `
                : 
                body.classList.contains("light-theme") ?
                `
                <span>
                <span>See more</span>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="#12131A"/>
                </svg>
                </span>
                `
                :
                `
                <span>
                <span>See more</span>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="#E4E4EF"/>
                </svg>
                </span>
                `
              
        })

        letterDensityDiv.appendChild(toggleDiv)
    }

}



// toggle no density text
function toggleNoDensityAvailableYet () {
    let text = textArea.value;

    if( text.length > 0 ) {
        noDensityAvailableYetText.classList.add("hide-no-characters-found-text")
    }
    else {
        noDensityAvailableYetText.classList.remove("hide-no-characters-found-text")
    }
}






// adding the event handler to the text area.
if( textArea ) {
    textArea.addEventListener('input', function () {
        countCharacters( );
        countNumberOfWords();
        countNumberOfSentences();
        calculateApproxReadingTime();
        checkCharacterLimit();
        calculateLetterDensity();
        toggleNoDensityAvailableYet();
    })
}


// adding event listeners to the checkbox
if( excludeSpacesCheckbox ) {
    excludeSpacesCheckbox.addEventListener('change', function () {
        countCharacters(textArea, excludeSpacesCheckbox, characterCountText);
    })
}


// adding event listeners to the character limit checkbox 
if ( characterLimitCheckbox ) {
    characterLimitCheckbox.addEventListener('change', function () {
        toggleCharacterLimitInputVisible()
    })
}


// adding event listeners to toggle button
if( toggleButton ) {
    toggleButton.addEventListener("click", function () {
        toggleTheme()
    })
}

