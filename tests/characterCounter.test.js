// importing the functions
const {
    countCharacters,
    countNumberOfWords,
    countNumberOfSentences,
    calculateApproxReadingTime,
    calculateLetterDensity,
    toggleCharacterLimitInputVisible,
    toggleNoDensityAvailableYet,
    checkCharacterLimit

} = require("../characterCounter.js")




// test 1: checking to see if the number of characters updates correctly
// in real-time taking into consideration when spaces are allowed or disallowed.
// describe is like a label to group related tests together
describe("Check character count logic for when spacing is allowed or not", function () {
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
    // test 1: checking if the character count logic works as expected
    test("Counts characters including spaces when checkbox is unchecked", () => {
        countCharacters( textArea, excludeSpacesCheckbox, characterCountText );
        //"Coding is tough" has 16 characters including space and punctuation
        expect( characterCountText.textContent ).toBe("16");
    })


    // test 2: 
    test('counts characters excluding spaces when checkbox is checked', () => {
        textArea.value = 'Coding is tough!';
        excludeSpacesCheckbox.checked = true;
        countCharacters( textArea, excludeSpacesCheckbox, characterCountText );
    
        // "Helloworld!" has 11 characters excluding space
        expect(characterCountText.textContent).toBe('14');
    });


    // TESTS FOR WORD COUNT
    // test 3:
    test('counts single words correctly', () => {
        textArea.value = "Google";
        countNumberOfWords( textArea, wordCountText );
        expect( wordCountText.textContent ).toBe("01");
    })

    
    // test 4:
    test('counts multiple words correctly', () => {
        textArea.value = 'Hello world this is test';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05');
    });


    // test 5
    test('ignores multiple spaces between words', () => {
        textArea.value = 'Hello    world   this   is   test';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05');
    });


    // test 6
    test('ignores leading and trailing spaces', () => {
        textArea.value = '   Hello world this is test   ';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05');
    });


    // test 7
    test('returns 00 when input is empty or just spaces', () => {
        textArea.value = '     ';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('00');
    });


    // test 8
    test('counts words correctly when special characters are present', () => {
        textArea.value = 'Hello @world! Are you ready?';
        countNumberOfWords( textArea, wordCountText );
        expect(wordCountText.textContent).toBe('05'); 
    });



    // TESTE FOR SENTENCE COUNT 
    // test 9
    test('counts single sentence with period correctly', () => {
        textArea.value = 'This is a test.';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('01');
    });


    // test 10.
    test('counts multiple sentences with different punctuation correctly', () => {
        textArea.value = 'Hello! Are you okay? This is fine.';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('03');
    });


    // test 11
    test('ignores trailing spaces and empty sentences', () => {
        textArea.value = 'Wow!   That was awesome.   ';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('02');
    });


    // test 12
    test('counts sentences even with no space after punctuation', () => {
        textArea.value = 'Hi!How are you?Good.';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('03');
    });


    // test 13
    test('returns 00 when input is empty or just spaces', () => {
        textArea.value = '   ';
        countNumberOfSentences( textArea, sentenceCountText );
        expect(sentenceCountText.textContent).toBe('00');
    });

})






describe('checkCharacterLimit', () => {
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
    test('does nothing when total characters are below 80% of limit', () => {
        textArea.value = 'Hello';
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('');
        expect(errorText.classList.contains('error-text')).toBe(true);
    });


    // test 15
    test('shows "approaching limit" warning when character count is above 80% but below limit', () => {
        textArea.value = 'a'.repeat(85); // 85% of 100
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('You are approaching the maximum character limit');
        expect(errorText.classList.contains('show-error-text')).toBe(true);
    });



    // test 16.
    test('shows "hit maximum limit" warning when total characters === limit', () => {
        textArea.value = 'a'.repeat(100);
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('You have hit the maximum limit of 100 characters');
        expect(textArea.classList.contains('limit-exceeded')).toBe(false);
    });


    // test 17
    test('shows "limit exceeded" warning when total characters > limit', () => {
        textArea.value = 'a'.repeat(120);
        characterLimitInput.value = '100';
        excludeSpacesCheckbox.checked = false;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('Limit reached! Your text exceeds 100 characters.');
        expect(textArea.classList.contains('limit-exceeded')).toBe(true);
    });


    // test 18
    test('correctly excludes spaces if checkbox is checked', () => {
        textArea.value = 'a a a a a'; // 9 characters with spaces, 5 without
        characterLimitInput.value = '6';
        excludeSpacesCheckbox.checked = true;

        checkCharacterLimit( textArea, characterLimitInput, errorText, excludeSpacesCheckbox )

        expect(errorText.textContent).toBe('You are approaching the maximum character limit');
    });









})


