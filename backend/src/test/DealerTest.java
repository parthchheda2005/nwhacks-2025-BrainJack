package test;

import model.Dealer;
import model.Deck;
import model.PokerCard;

import static org.junit.Assert.*;

import org.junit.Test;

// Tests the dealer subclass
public class DealerTest {

    Deck deck;

    // Tests the dealer subclass. 
    @Test 
    public void dealerTest() {
        deck = new Deck();
        Dealer dealer = new Dealer();
        dealer.addCard(new PokerCard("Diamonds", "2"));
        dealer.addCard(new PokerCard("Diamonds", "4"));
        dealer.addCard(new PokerCard("Diamonds", "3")); 
        assertEquals(9, dealer.getScore());
        assertEquals(0, dealer.getId());

        dealer.playTurn(deck);

        assertTrue(dealer.getScore() >= 17);

    }


}
