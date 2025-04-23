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

} = require("./characterCounter.js")




// test 1: checking to see if the number of characters updates correctly
// in real-time taking into consideration when spaces are allowed or disallowed.
// describe is like a label to group related tests together
describe("Check character count logic for when spacing is allowed or not", function () {
    let textArea;
    let excludeSpacesCheckbox;
    let characterCountText;
    let wordCountText;


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

    });


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
    
    













    

})


