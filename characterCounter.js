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





// function to count the number of characters in the text area.
function countCharacters( textArea, excludeSpacesCheckbox, characterCountText ) {
    if (!textArea || !excludeSpacesCheckbox || !characterCountText) return;

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
function countNumberOfWords( textArea, wordCountText ) {
    if (!textArea || !wordCountText) return;

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
function countNumberOfSentences( textArea, sentenceCountText ) {
    if (!textArea || !sentenceCountText) return;

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
function calculateApproxReadingTime( textArea, approxReadingTimeText ) {
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



function checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox ) {
    if (!textArea || !characterLimitInput || !errorText || !excludeSpacesCheckbox ) return;

    let characterLimit = parseInt(characterLimitInput.value);
    let enteredText = textArea.value;
    let enteredTextNoSpaces = textArea.value.trim()
                              .replace(/\s/g, '');
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
        errorText.textContent = "You are approaching the maximum character limit";
    }
    else if( totalCharacters === characterLimit ) {
        textArea.classList.remove("limit-exceeded");
        errorText.textContent = `You have hit the maximum limit of ${ characterLimit } characters`;
    }
    else {
        if(!isNaN( characterLimit )) {
            textArea.classList.add("limit-exceeded");
            errorText.textContent = `Limit reached! Your text exceeds ${ characterLimit } characters.`;
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
        toggleDiv.textContent = "See More ▼"

        let expanded = false

        toggleDiv.addEventListener("click", function () {
            expanded = !expanded

            const extraBars = document.querySelectorAll('.extra-bar');
            extraBars.forEach(bar => {
              bar.style.display = expanded ? 'flex' : 'none';
            });

            toggleDiv.textContent = expanded ? 'See Less ▲' : 'See More ▼';
                  
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
        countCharacters( textArea, excludeSpacesCheckbox, characterCountText );
        countNumberOfWords( textArea, wordCountText );
        countNumberOfSentences( textArea, sentenceCountText );
        calculateApproxReadingTime( textArea, approxReadingTimeText);
        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )
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



// exporting the functions to facilitate testing
module.exports = {
    countCharacters,
    countNumberOfWords,
    countNumberOfSentences,
    calculateApproxReadingTime,
    calculateLetterDensity,
    toggleCharacterLimitInputVisible,
    toggleNoDensityAvailableYet,
    checkCharacterLimit
}