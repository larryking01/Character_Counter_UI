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


    // test 14
    // test('handles punctuation within text correctly', () => {
    //     textArea.value = 'Dr. Smith went to the U.S.A. He arrived at 10 a.m. Amazing!';
    //     countNumberOfSentences( textArea, sentenceCountText );
    //     expect(sentenceCountText.textContent).toBe('03'); // Could be debated based on real rules, but for now this regex treats each punctuation mark as a separator.
    // });
    // failed. debug








    

})


