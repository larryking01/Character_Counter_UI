// writing the function to update the character count in real-time.
// grabbing all the target elements from the DOM.
let textArea = document.querySelector('.text-area');
let characterCountDisplay = document.querySelector('.count-number-text');
let wordCountDisplay = document.querySelector('.word-number-text');
let sentenceCountDisplay = document.querySelector('.sentence-number-text');
let spacingCheckbox = document.querySelector('.checkbox');
let characterLimitCheckbox = document.querySelector('.character-limit-checkbox');
let characterLimitInputBox = document.querySelector('.character-limit-input');
let errorTextElement = document.querySelector('.error-text');
let densityContainer = document.getElementById('letter-density-container');
const toggleBtn = document.getElementById('toggle-density-btn');
let approxReadingTime = document.querySelector('.approx-reading-time-text');



let showingAll = false;








function UpdateCounts() {

    // console.log( characterLimitInputBox.value );

    const typedText = textArea.value;  // get the value of all text in the text area
    let characterCount;  // get length of text in text area
    let characterLimit = isNaN(characterLimitInputBox.value ) ? Infinity : parseInt(characterLimitInputBox.value, 10); // get the value of the character limit input box and convert it to a number. If the value is not a number, set it to Infinity.

    // calculating 20% of the typed characters.
    let twentyPercent;

    // calculating the approximate reading time.
    const approxText = textArea.value.trim();
    const approxWordCount = approxText.replace(/\s/g, '').length;
    const wordsPerMinute = 200;
    const timeInMinutes = Math.ceil( approxWordCount/wordsPerMinute );

    if( approxWordCount === 0 ) {
        approxReadingTime.textContent = "Approx. reading time: 0 min";
    }
    else {
        approxReadingTime.textContent = `Approx. reading time: ${ timeInMinutes } min(s)`
    }

    // console.log('approx text = ', approxText.length );
    // console.log('approx word count no spaces = ', approxWordCount );
    // console.log('time in minutes = ', timeInMinutes );
    


    // if( textArea.value.length === characterLimit ) {
    //     textArea.style.b
    // }


    if( textArea.value.length > characterLimit ) {
        textArea.value = textArea.value.substring(0, characterLimit); // limit the text area to the specified character limit
    }


    if( typedText.length < characterLimit) {
        // errorTextElement.textContent = "You are approaching the specified character limit";
        errorTextElement.classList.remove("show-error-text");
        errorTextElement.classList.add("error-text")

    }


    if( spacingCheckbox.checked ) {
        let textNoSpaces = typedText.replace(/\s/g, ''); // remove all whitespace characters
        twentyPercent = Math.ceil( characterLimit * 0.2 );

        // console.log('character limit = ', characterLimit );
        // console.log('textNoSpaces = ', textNoSpaces.length );
        // console.log('ten percent = ', twentyPercent);
        // console.log('difference = ', characterLimit - textNoSpaces.length);

        if( characterLimit - textNoSpaces.length === twentyPercent ) {
            errorTextElement.textContent = "You are approaching the specified character limit";
            errorTextElement.classList.remove("error-text")
            errorTextElement.classList.add("show-error-text")
        }
        else if( characterLimit - textNoSpaces.length === 0 ) {
            alert('Maximum character limit reached');
            errorTextElement.textContent = "You have reached maximum character limit";
            errorTextElement.classList.remove("error-text")
            errorTextElement.classList.add("show-error-text")
        }
        else {
            // do nothing
        }
    }
    else {

        let textNoSpaces = typedText;
        twentyPercent = Math.ceil( characterLimit * 0.2 );
        let difference = characterLimit - textNoSpaces.length;

        // console.log('character limit = ', characterLimit );
        // console.log('textNoSpaces = ', textNoSpaces.length );
        // console.log('ten percent = ', twentyPercent);
        // console.log('difference = ', difference);

        if( difference === twentyPercent) {
            errorTextElement.textContent = "You are approaching the specified character limit";
            errorTextElement.classList.remove("error-text")
            errorTextElement.classList.add("show-error-text")
        }
        else if( difference === 0 ) {
            alert('Maximum character limit reached');
            errorTextElement.textContent = "You have reached maximum character limit";
            errorTextElement.classList.remove("error-text")
            errorTextElement.classList.add("show-error-text")
        }
        else {
            // do nothing
        }
        
    }

    // character count logic
    if( spacingCheckbox.checked ) {
        // remove all whitespace before counting
        const textWithoutSpaces = typedText.replace(/\s/g, ''); // remove all whitespace characters
        characterCount = textWithoutSpaces.length;
    }
    else {
        // count all characters including spaces
        characterCount = typedText.length; // count all characters including spaces
    }

    // word count logic
    const trimmedText = typedText.trim(); // remove leading and trailing spaces
    const wordArray = trimmedText === "" ? [] : trimmedText.split(/\s+/); // split by whitespace
    const wordCount = wordArray.length; // count the words


    // sentence count logic
    const sentenceArray = typedText
        .split(/[.!?]+/) // split by sentence-ending punctuation
        .map(sentence => sentence.trim()) // trim whitespace from each sentence
        .filter( sentence => sentence.length > 0 ); // filter out empty sentences

    const sentenceCount = sentenceArray.length; // count the sentences



    // getting the letter densities.
    const density = textArea.value;
    const totalCharacters = density.length;

    // count the number of letters in the text area
    const letterCounts = {};

    for ( let character of density.toUpperCase()) {
        if( character.match(/[A-Z]/) ) {
            letterCounts[character] = (letterCounts[character] || 0) + 1; // increment the count for each letter
        }

        // console.log( letterCounts );
    }


    const letters = Object.keys(letterCounts);

    densityContainer.innerHTML = ""; // clear the previous letter density data

    // calculate the letter density for each letter
    letters.forEach((letter, index) => {
        const count = letterCounts[letter];
        const percentage = ((count / totalCharacters) * 100).toFixed(2); // calculate the percentage of each letter
        // console.log( `${letter}: ${percentage}%` ); // log the letter density to the console

        const letterBar = document.createElement('div'); // create a new div element for each letter density
        letterBar.className = "letter-bar";

        if (!showingAll && index >= 5) {
            letterBar.classList.add('hidden');
          }

        letterBar.innerHTML = `
            <div class="letter-density-display-div">
                <h3 class="letter-density-info-text">${ letter }</h3>

                <div class="density-bar-parent-div">
                    <div class="density-bar-child-div"></div>
                </div>

                <h3 class="letter-density-info-text">${ count } (${ percentage }%)</h3>
            </div>
        `; // set the inner HTML of the letter bar div

        densityContainer.appendChild(letterBar); // append the letter bar div to the letter density container
    


    // Show or hide toggle button
    toggleBtn.style.display = letters.length > 5 ? 'inline-block' : 'none';
    toggleBtn.textContent = showingAll ? 'See less' : 'See more';

    });




    // updating the DOM by the individual target elements.
    characterCountDisplay.textContent = characterCount;
    wordCountDisplay.textContent = wordCount;
    sentenceCountDisplay.textContent = sentenceCount
    
}




toggleBtn.addEventListener('click', () => {
    showingAll = !showingAll;
    const bars = document.querySelectorAll('.letter-bar');
  
    bars.forEach((bar, index) => {
      if (index >= 5) {
        bar.classList.toggle('hidden', !showingAll);
      }
    });
  
    toggleBtn.textContent = showingAll ? 'See less' : 'See more';
  });




// toggle character limit input visibility on/off
function ToggleCharacterLimitInput() {
    if( characterLimitCheckbox.checked ) {
        characterLimitInputBox.classList.remove('character-limit-input');
        characterLimitInputBox.classList.add('show-character-limit-input');
    }
    else {
        characterLimitInputBox.classList.remove('show-character-limit-input');
        characterLimitInputBox.classList.add('character-limit-input');
    }
}



// displaying warning message when user approaches limit.
function CheckBoxInitialValue () {
    // console.log( textArea.value.length );
    // console.log( characterLimitInputBox.value );
    // if( textArea.value.length > characterLimit ) {
    //     textArea.value = textArea.value.substring(0, characterLimit); // limit the text area to the specified character limit
    // }

}



// adding an event listener to the text-area to listen for input events
textArea.addEventListener('input', UpdateCounts );

// adding an event listener to the checkbox to listen for change events
spacingCheckbox.addEventListener('change', UpdateCounts );

// toggling the character limit input element
characterLimitCheckbox.addEventListener('change', ToggleCharacterLimitInput )

// adding 
characterLimitInputBox.addEventListener('input', CheckBoxInitialValue)