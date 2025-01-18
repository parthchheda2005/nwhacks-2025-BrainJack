package model;

// Represents the card class for a deck of cards
public class Card {

    // Stores the value of the card in blackjack
    private int value;

    // Stores the suite and number in string format
    private String suite;
    private String number;

    // Constructs a new card
    // REQUIRES: Suites must be one of: "Hearts", "Spaces", "Clover", "Diamonds"
    //           Number must be one of: "2" to "10", "J", "Q", "K"
    public Card(String suite, String number) {
        // Set the suite and number 
        this.suite = suite;
        this.number = number;

        // Set the value of the card
        switch (number) {
            case "A":
                this.value = 1;
                break;
            case "J":
            case "Q":
            case "K":
                this.value = 10;
                break;
            default: // number case
                this.value = Integer.parseInt(number);
                break;
        }
    }

    // Changes the value of A from: true: 1 -> 11, false: 11 -> 1
    // REQUIRES: the card must be an A
    public void changeValueOfA(boolean flag) {
        value = flag ? 11 : 1;
    }

    ///// GETTER METHODS /////
    
    public int getValue() { return value; }
    public String getSuite() { return suite; }
    public String getNumber() { return number; }
    
}
