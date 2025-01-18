package model;

import java.util.HashSet;

// Represents the deck of 52 poker cards. Singleton because we only need one card deck to play. 
// Card aesthetics customization could be done in the front end
public class Deck {
    
    // Hashset stores the deck of cards. We chose a hashset because we don't care about the order.
    // Also, it has a faster runtime for lookup and retrieval
    private HashSet<PokerCard> deckOfCards;

    // Stores the instance of the Deck class
    private static Deck instance;

    // Private constructor constructs a new deck of 52 poker cards. 
    private Deck() {
        this.deckOfCards = new HashSet<>();
        
        // Create and iterate over numbers to create the cards, then store them in the hashset
        String[] suites = {"Diamonds", "Clover", "Hearts", "Spades"};
        String[] numbers = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"};

        for (String suite: suites) {
            for (String number: numbers) {
                deckOfCards.add(new PokerCard(suite, number));
            } 
        }
    }

    // Gets the instance of the Deck
    public static Deck getInstance() {
        if (instance == null) {
            instance = new Deck();
        }
        return instance;
    }

    ///// GETTER METHODS /////  
    
    public HashSet<PokerCard> getDeckOfCards() { return deckOfCards; }

}   
