package test;

import model.Dealer;
import model.Deck;
import model.PokerCard;

import static org.junit.Assert.*;

import org.junit.Test;

// Tests the dealer subclass
public class DealerTest {

    // Tests the dealer subclass. 
    @Test 
    public void dealerTest() {
        Dealer dealer = new Dealer();
        dealer.addCard(new PokerCard("Diamonds", "2"));
        dealer.addCard(new PokerCard("Diamonds", "4"));
        dealer.addCard(new PokerCard("Diamonds", "3")); 
        assertEquals(9, dealer.getScore());

        dealer.playTurn(Deck.getInstance());

        assertTrue(dealer.getScore() >= 17);

    }


}
