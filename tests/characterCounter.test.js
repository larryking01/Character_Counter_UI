// importing the functions
const {
    countCharacters,
    countNumberOfWords,
    countNumberOfSentences,
    calculateApproxReadingTime,
    checkCharacterLimit

} = require("../characterCounter.js")




// this series of related tests checks the logic for the character, word and sentence count.
// it takes into consideration both situations where spaces is allowed and disallowed.
describe("Text analysis: character, word, and sentence count with and without spaces", function () {
    let textArea;
    let excludeSpacesCheckbox;
    let characterCountText;
    let wordCountText;
    let sentenceCountText;


    // set up the needed DOM elements before each test.
    beforeEach( () => {
        // Mock text area
        textArea = document.createElement("textarea");
        textArea.value = "Coding is tough!";

        // Mock checkbox
        excludeSpacesCheckbox = document.createElement("input");
        excludeSpacesCheckbox.type = "checkbox";
        excludeSpacesCheckbox.checked = false;   // spaces are allowed

        // Mock character count display element
        characterCountText = document.createElement("h3");

        // Mock word count text
        wordCountText = document.createElement("h3");

        // Mock sentence count text
        sentenceCountText = document.createElement("h3");

    });


    // TESTS FOR CHARACTER COUNT
    // test 1:
    test("Counts characters including spaces when exclude spaces checkbox is unchecked", () => {
        countCharacters( textArea, excludeSpacesCheckbox, characterCountText );
        //"Coding is tough" has 16 characters including space and punctuation
        expect( characterCountText.textContent ).toBe("16");
    })


    // test 2: 
    test('Counts characters excluding spaces when exclude spaces checkbox is checked', () => {
        textArea.value = 'Coding is tough!';
        excludeSpacesCheckbox.checked = true;
        countCharacters( textArea, excludeSpacesCheckbox, characterCountText );
    
        // "Helloworld!" has 11 characters excluding space
        expect(characterCountText.textContent).toBe('14');
    });



    // TESTS FOR WORD COUNT
    // test 3:
    test('Counts single words correctly', () => {
        textArea.value = "Google";
        countNumberOfWords( textArea, wordCountText );
        expect( wordCountText.textContent ).toBe("01");
    })

    
    // test 4:
    test('Counts multiple words correctly', () => {
        textArea.value = 'Hello world this is test';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05');
    });


    // test 5
    test('Ignores multiple spaces between words', () => {
        textArea.value = 'Hello    world   this   is   test';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05');
    });


    // test 6
    test('Ignores leading and trailing spaces', () => {
        textArea.value = '   Hello world this is test   ';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05');
    });


    // test 7
    test('Returns 00 when input is empty or just spaces', () => {
        textArea.value = '     ';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('00');
    });


    // test 8
    test('Counts words correctly when special characters are present', () => {
        textArea.value = 'Hello @world! Are you ready?';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05'); 
    });



    // TESTE FOR SENTENCE COUNT 
    // test 9
    test('Counts single sentence with period correctly', () => {
        textArea.value = 'This is a test.';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('01');
    });


    // test 10.
    test('Counts multiple sentences with different punctuation correctly', () => {
        textArea.value = 'Hello! Are you okay? This is fine.';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('03');
    });


    // test 11
    test('Ignores trailing spaces and empty sentences', () => {
        textArea.value = 'Wow!   That was awesome.   ';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('02');
    });


    // test 12
    test('Counts sentences even with no space after punctuation', () => {
        textArea.value = 'Hi!How are you?Good.';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('03');
    });


    // test 13
    test('Returns 00 when input is empty or just spaces', () => {
        textArea.value = '   ';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('00');
    });

})





// related group of tests that check if a user is approaching the character limit,
// has hit the character limit or has exceeded the character limit and
// displays appropriate error messages in each case.
describe('Character limit feedback: approaching, reaching, and exceeding limits with appropriate messages', () => {
    let textArea, characterLimitInput, excludeSpacesCheckbox, errorText;

    beforeEach(() => {
        // Set up DOM elements
        textArea = document.createElement('textarea');

        characterLimitInput = document.createElement('input');
        characterLimitInput.type = 'number';

        excludeSpacesCheckbox = document.createElement('input');
        excludeSpacesCheckbox.type = 'checkbox';
        errorText = document.createElement('div');

        // Add necessary class manipulation methods
        textArea.classList = errorText.classList = {
            classes: [],
            add(className) { this.classes.push(className); },
            remove(className) { this.classes = this.classes.filter(c => c !== className); },
            contains(className) { return this.classes.includes(className); }
        };

        global.textArea = textArea;
        global.characterLimitInput = characterLimitInput;
        global.excludeSpacesCheckbox = excludeSpacesCheckbox;
        global.errorText = errorText;
    });


    // test 14.
    test('Does nothing when total characters are below 80% of limit', () => {
        textArea.value = 'Hello';
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('');
        expect(errorText.classList.contains('error-text')).toBe(true);
    });


    // test 15
    test('Shows "approaching limit" warning when character count is above 80% but below limit', () => {
        textArea.value = 'a'.repeat(85); // 85% of 100
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('You are approaching the maximum character limit');
        expect(errorText.classList.contains('show-error-text')).toBe(true);
    });



    // test 16.
    test('Shows "hit maximum limit" warning when total characters === limit', () => {
        textArea.value = 'a'.repeat(100);
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('You have hit the maximum limit of 100 characters');
        expect(textArea.classList.contains('limit-exceeded')).toBe(false);
    });


    // test 17
    test('Shows "limit exceeded" warning when total characters > limit', () => {
        textArea.value = 'a'.repeat(120);
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('Limit reached! Your text exceeds 100 characters.');
        expect(textArea.classList.contains('limit-exceeded')).toBe(true);
    });


    // test 18
    test('Correctly excludes spaces if checkbox is checked', () => {
        textArea.value = 'a a a a a'; // 9 characters with spaces, 5 without
        characterLimitInput.value = '6';
        excludeSpacesCheckbox.checked = true;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('You are approaching the maximum character limit');
    });

})



// this group of related tests checks if the approximate reading time function
// correctly calculates the estimated reading time for all cases.

describe('Approximate reading time calculation for various input lengths', () => {
    let textArea, approxReadingTimeText;

    beforeEach(() => {
        // Mock DOM elements
        textArea = document.createElement('textarea');
        approxReadingTimeText = document.createElement('div');

        // Make them globally available
        global.textArea = textArea;
        global.approxReadingTimeText = approxReadingTimeText;
    });


    // test 19
    test('Displays 1 minute for texts up to 200 words', () => {
        textArea.value = 'word '.repeat(200).trim();

        calculateApproxReadingTime( textArea, approxReadingTimeText );

        expect(approxReadingTimeText.textContent).toBe('Approx. reading time: 1 min(s)');
    });


    // test 20
    test('Displays 2 minutes for texts slightly above 200 words', () => {
        textArea.value = 'word '.repeat(201).trim();

        calculateApproxReadingTime(textArea, approxReadingTimeText);

        expect(approxReadingTimeText.textContent).toBe('Approx. reading time: 2 min(s)');
    });


    // tests 21
    test('Displays 0 minutes for empty input', () => {
        textArea.value = '   ';

        calculateApproxReadingTime(textArea, approxReadingTimeText);

        expect(approxReadingTimeText.textContent).toBe('Approx. reading time: 0 min(s)');
    });


    // test 22
    test('Handles special characters and whitespace correctly', () => {
        textArea.value = 'Hello!!   This... is,     spaced out??';

        calculateApproxReadingTime(textArea, approxReadingTimeText);

        // It should treat it as 6 words
        expect(approxReadingTimeText.textContent).toBe('Approx. reading time: 1 min(s)');
    });


    // test 23
    test('Displays correct reading time for long inputs (e.g. 1000 words)', () => {
        textArea.value = 'word '.repeat(1000).trim();

        calculateApproxReadingTime(textArea, approxReadingTimeText);

        expect(approxReadingTimeText.textContent).toBe('Approx. reading time: 5 min(s)');
    });
});


