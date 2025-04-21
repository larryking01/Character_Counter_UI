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





// function to count the number of characters in the text area.
function countCharacters() {
    let totalCharacters;
    let enteredText = textArea.value;
    let enteredTextNoSpaces = textArea.value.trim()
                              .replace(/\s/g, '');

    totalCharacters = excludeSpacesCheckbox.checked ? enteredTextNoSpaces.length : enteredText.length

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
function countNumberOfWords() {
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
    let characterLimit = parseInt(characterLimitInput.value);
    let enteredText = textArea.value;
    let enteredTextNoSpaces = textArea.value.trim()
                              .replace(/\s/g, '');
    let totalCharacters;
    let eightyPercent;


    totalCharacters = excludeSpacesCheckbox.checked ? enteredTextNoSpaces.length : enteredText.length
    eightyPercent = Math.floor( 0.8 * characterLimit );

    // console.log(`total characters = ${ totalCharacters }`);
    // console.log(`character limit = ${ characterLimit }`);
    // console.log(`eighty percent = ${ eightyPercent }`);

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
        textArea.classList.add("limit-exceeded");
        errorText.textContent = `Limit reached! Your text exceeds ${ characterLimit } characters.`;
    }

}












// adding the event handler to the text area.
textArea.addEventListener('input', function () {
    countCharacters();
    countNumberOfWords();
    countNumberOfSentences();
    calculateApproxReadingTime();
    checkCharacterLimit();
})


// adding event listeners to the checkbox
excludeSpacesCheckbox.addEventListener('change', function () {
    countCharacters();
})


// adding event listeners to the character limit checkbox 
characterLimitCheckbox.addEventListener('change', function () {
    toggleCharacterLimitInputVisible()
})


// adding event listeners to the character limit input
characterLimitInput.addEventListener('input', function () {
    console.log( characterLimitInput.value )
})